<template>
  <div class="bg-white shadow rounded-lg">
    <!-- En-tête -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-800">Historique des demandes</h2>
        <div class="flex space-x-3">
          <!-- Filtres -->
          <div class="relative">
            <button @click="showFilters = !showFilters" class="btn-outline flex items-center">
              <i class="fas fa-filter mr-2"></i> Filtres
              <span v-if="activeFilters > 0" class="ml-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {{ activeFilters }}
              </span>
            </button>
            <!-- Panneau de filtres -->
            <div v-if="showFilters" class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Type de stage</label>
                  <select v-model="filters.type" class="mt-1 input-field">
                    <option value="">Tous</option>
                    <option value="academique">Stage académique</option>
                    <option value="professionnel">Stage professionnel</option>
                    <option value="recherche">Stage de recherche</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Structure</label>
                  <select v-model="filters.structure" class="mt-1 input-field">
                    <option value="">Toutes</option>
                    <option v-for="structure in structures" :key="structure.id" :value="structure.id">
                      {{ structure.nom }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Statut</label>
                  <select v-model="filters.statut" class="mt-1 input-field">
                    <option value="">Tous</option>
                    <option value="termine">Terminé</option>
                    <option value="annule">Annulé</option>
                    <option value="refuse">Refusé</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Période</label>
                  <div class="grid grid-cols-2 gap-2">
                    <input type="date" v-model="filters.dateDebut" class="mt-1 input-field" placeholder="Date début">
                    <input type="date" v-model="filters.dateFin" class="mt-1 input-field" placeholder="Date fin">
                  </div>
                </div>
                <div class="flex justify-end space-x-2 pt-2">
                  <button @click="resetFilters" class="btn-outline py-1 px-3 text-sm">Réinitialiser</button>
                  <button @click="applyFilters" class="btn-primary py-1 px-3 text-sm">Appliquer</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Export -->
          <button class="btn-outline flex items-center">
            <i class="fas fa-download mr-2"></i> Exporter
          </button>
        </div>
      </div>
    </div>

    <!-- Tableau de l'historique -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-for="header in tableHeaders" :key="header.key" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div class="flex items-center space-x-1">
                <span>{{ header.label }}</span>
                <button v-if="header.sortable" @click="sortBy(header.key)" class="text-gray-400 hover:text-gray-600">
                  <i class="fas" :class="getSortIcon(header.key)"></i>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="demande in filteredDemandes" :key="demande.id" 
              class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="text-sm font-medium text-gray-900">{{ demande.stagiaire.nom }}</div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ demande.type }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ demande.structure }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(demande.dateDebut) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(demande.dateFin) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="getStatusClass(demande.statut)">
                {{ demande.statut }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="viewDetails(demande)" class="text-primary hover:text-primary-dark">
                <i class="fas fa-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Affichage de {{ startIndex + 1 }} à {{ endIndex }} sur {{ totalDemandes }} demandes
        </div>
        <div class="flex space-x-2">
          <button 
            @click="previousPage" 
            :disabled="currentPage === 1"
            class="btn-outline py-1 px-3 disabled:opacity-50"
          >
            Précédent
          </button>
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="btn-outline py-1 px-3 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de détails -->
    <div v-if="selectedDemande" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Détails de la demande</h3>
          <button @click="selectedDemande = null" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Stagiaire</label>
                <p class="mt-1">{{ selectedDemande.stagiaire.nom }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <p class="mt-1">{{ selectedDemande.stagiaire.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Type de stage</label>
                <p class="mt-1">{{ selectedDemande.type }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Structure</label>
                <p class="mt-1">{{ selectedDemande.structure }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Date de début</label>
                <p class="mt-1">{{ formatDate(selectedDemande.dateDebut) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Date de fin</label>
                <p class="mt-1">{{ formatDate(selectedDemande.dateFin) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Statut</label>
                <p class="mt-1">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="getStatusClass(selectedDemande.statut)">
                    {{ selectedDemande.statut }}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Commentaires</label>
              <p class="mt-1">{{ selectedDemande.commentaires || 'Aucun commentaire' }}</p>
            </div>
            <div v-if="selectedDemande.raisonRefus">
              <label class="block text-sm font-medium text-gray-700">Raison du refus</label>
              <p class="mt-1">{{ selectedDemande.raisonRefus }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'DemandesHistorique',
  setup() {
    const store = useStore()
    const showFilters = ref(false)
    const selectedDemande = ref(null)
    const currentPage = ref(1)
    const itemsPerPage = 10

    const filters = ref({
      type: '',
      structure: '',
      statut: '',
      dateDebut: '',
      dateFin: ''
    })

    const tableHeaders = [
      { key: 'stagiaire', label: 'Stagiaire', sortable: true },
      { key: 'type', label: 'Type', sortable: true },
      { key: 'structure', label: 'Structure', sortable: true },
      { key: 'dateDebut', label: 'Date début', sortable: true },
      { key: 'dateFin', label: 'Date fin', sortable: true },
      { key: 'statut', label: 'Statut', sortable: true },
      { key: 'actions', label: 'Actions', sortable: false }
    ]

    // Données simulées - À remplacer par des appels API
    const demandes = ref([
      {
        id: 1,
        stagiaire: { nom: 'Jean Dupont', email: 'jean@example.com' },
        type: 'Stage académique',
        structure: 'Direction des Systèmes d\'Information',
        dateDebut: '2023-09-15',
        dateFin: '2024-02-15',
        statut: 'Terminé',
        commentaires: 'Stage complété avec succès.'
      },
      {
        id: 2,
        stagiaire: { nom: 'Marie Martin', email: 'marie@example.com' },
        type: 'Stage professionnel',
        structure: 'Direction Générale du Budget',
        dateDebut: '2023-10-01',
        dateFin: '2024-01-01',
        statut: 'Annulé',
        commentaires: 'Annulation à la demande du stagiaire.'
      }
      // Ajoutez plus de données simulées ici
    ])

    const structures = ref([
      { id: 1, nom: 'Direction des Systèmes d\'Information' },
      { id: 2, nom: 'Direction Générale du Budget' },
      // Ajoutez plus de structures
    ])

    // Computed properties
    const activeFilters = computed(() => {
      return Object.values(filters.value).filter(Boolean).length
    })

    const filteredDemandes = computed(() => {
      let result = [...demandes.value]
      
      if (filters.value.type) {
        result = result.filter(d => d.type === filters.value.type)
      }
      if (filters.value.structure) {
        result = result.filter(d => d.structure === filters.value.structure)
      }
      if (filters.value.statut) {
        result = result.filter(d => d.statut.toLowerCase() === filters.value.statut)
      }
      if (filters.value.dateDebut) {
        result = result.filter(d => d.dateDebut >= filters.value.dateDebut)
      }
      if (filters.value.dateFin) {
        result = result.filter(d => d.dateFin <= filters.value.dateFin)
      }

      return result
    })

    const totalDemandes = computed(() => filteredDemandes.value.length)
    const totalPages = computed(() => Math.ceil(totalDemandes.value / itemsPerPage))
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalDemandes.value))

    // Methods
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR')
    }

    const getStatusClass = (statut) => {
      const classes = {
        'Terminé': 'bg-green-100 text-green-800',
        'Annulé': 'bg-gray-100 text-gray-800',
        'Refusé': 'bg-red-100 text-red-800'
      }
      return classes[statut] || 'bg-gray-100 text-gray-800'
    }

    const viewDetails = (demande) => {
      selectedDemande.value = demande
    }

    const resetFilters = () => {
      filters.value = {
        type: '',
        structure: '',
        statut: '',
        dateDebut: '',
        dateFin: ''
      }
    }

    const applyFilters = () => {
      showFilters.value = false
      currentPage.value = 1
    }

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    // Lifecycle hooks
    onMounted(async () => {
      // Charger les données initiales
      // await store.dispatch('fetchDemandesHistorique')
    })

    return {
      showFilters,
      filters,
      selectedDemande,
      currentPage,
      tableHeaders,
      structures,
      demandes,
      activeFilters,
      filteredDemandes,
      totalDemandes,
      totalPages,
      startIndex,
      endIndex,
      formatDate,
      getStatusClass,
      viewDetails,
      resetFilters,
      applyFilters,
      previousPage,
      nextPage
    }
  }
}
</script> 
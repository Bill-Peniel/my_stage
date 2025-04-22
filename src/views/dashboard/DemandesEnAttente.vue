<template>
  <div class="bg-white shadow rounded-lg">
    <!-- En-tête -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-800">Demandes en attente</h2>
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
                  <label class="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" v-model="filters.date" class="mt-1 input-field">
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

    <!-- Tableau des demandes -->
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
              <div class="text-sm text-gray-900">{{ formatDate(demande.dateDemande) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="getStatusClass(demande.status)">
                {{ demande.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="viewDetails(demande)" class="text-primary hover:text-primary-dark mr-3">
                <i class="fas fa-eye"></i>
              </button>
              <button @click="approveDemande(demande)" class="text-success hover:text-green-700 mr-3">
                <i class="fas fa-check"></i>
              </button>
              <button @click="rejectDemande(demande)" class="text-danger hover:text-red-700">
                <i class="fas fa-times"></i>
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
          <!-- Contenu des détails -->
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
                <label class="block text-sm font-medium text-gray-700">Date de demande</label>
                <p class="mt-1">{{ formatDate(selectedDemande.dateDemande) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Statut</label>
                <p class="mt-1">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="getStatusClass(selectedDemande.status)">
                    {{ selectedDemande.status }}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Motivation</label>
              <p class="mt-1">{{ selectedDemande.motivation }}</p>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button @click="rejectDemande(selectedDemande)" class="btn-danger">Refuser</button>
            <button @click="approveDemande(selectedDemande)" class="btn-success">Approuver</button>
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
  name: 'DemandesEnAttente',
  setup() {
    const store = useStore()
    const showFilters = ref(false)
    const selectedDemande = ref(null)
    const currentPage = ref(1)
    const itemsPerPage = 10

    const filters = ref({
      type: '',
      structure: '',
      date: ''
    })

    const tableHeaders = [
      { key: 'stagiaire', label: 'Stagiaire', sortable: true },
      { key: 'type', label: 'Type', sortable: true },
      { key: 'structure', label: 'Structure', sortable: true },
      { key: 'dateDemande', label: 'Date', sortable: true },
      { key: 'status', label: 'Statut', sortable: true },
      { key: 'actions', label: 'Actions', sortable: false }
    ]

    // Données simulées - À remplacer par des appels API
    const demandes = ref([
      {
        id: 1,
        stagiaire: { nom: 'Jean Dupont', email: 'jean@example.com' },
        type: 'Stage académique',
        structure: 'Direction des Systèmes d\'Information',
        dateDemande: '2024-03-15',
        status: 'En attente',
        motivation: 'Je souhaite acquérir une expérience pratique dans le domaine...'
      },
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
      if (filters.value.date) {
        result = result.filter(d => d.dateDemande === filters.value.date)
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

    const getStatusClass = (status) => {
      const classes = {
        'En attente': 'bg-yellow-100 text-yellow-800',
        'Approuvé': 'bg-green-100 text-green-800',
        'Refusé': 'bg-red-100 text-red-800'
      }
      return classes[status] || ''
    }

    const viewDetails = (demande) => {
      selectedDemande.value = demande
    }

    const approveDemande = async (demande) => {
      // Implémenter la logique d'approbation
      console.log('Approuver demande:', demande.id)
    }

    const rejectDemande = async (demande) => {
      // Implémenter la logique de refus
      console.log('Refuser demande:', demande.id)
    }

    const resetFilters = () => {
      filters.value = {
        type: '',
        structure: '',
        date: ''
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
      // await store.dispatch('fetchDemandes')
    })

    return {
      showFilters,
      filters,
      selectedDemande,
      currentPage,
      tableHeaders,
      structures,
      activeFilters,
      filteredDemandes,
      totalDemandes,
      totalPages,
      startIndex,
      endIndex,
      formatDate,
      getStatusClass,
      viewDetails,
      approveDemande,
      rejectDemande,
      resetFilters,
      applyFilters,
      previousPage,
      nextPage
    }
  }
}
</script> 
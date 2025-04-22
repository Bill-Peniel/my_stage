<template>
  <div class="bg-white shadow rounded-lg ml-64">
    <!-- En-tête -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-800">Gestion des stagiaires</h2>
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
                  <label class="block text-sm font-medium text-gray-700">Statut</label>
                  <select v-model="filters.statut" class="mt-1 input-field">
                    <option value="">Tous</option>
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
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
          <!-- Ajouter un stagiaire -->
          <button @click="showAddModal = true" class="btn-primary flex items-center">
            <i class="fas fa-plus mr-2"></i> Ajouter un stagiaire
          </button>
        </div>
      </div>
    </div>

    <!-- Tableau des stagiaires -->
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
          <tr v-for="stagiaire in filteredStagiaires" :key="stagiaire.id" 
              class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="text-sm font-medium text-gray-900">{{ stagiaire.nom }}</div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ stagiaire.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ stagiaire.telephone }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ stagiaire.structure }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="getStatusClass(stagiaire.statut)">
                {{ stagiaire.statut }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="viewDetails(stagiaire)" class="text-primary hover:text-primary-dark mr-3">
                <i class="fas fa-eye"></i>
              </button>
              <button @click="editStagiaire(stagiaire)" class="text-blue-600 hover:text-blue-800 mr-3">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deleteStagiaire(stagiaire)" class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i>
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
          Affichage de {{ startIndex + 1 }} à {{ endIndex }} sur {{ totalStagiaires }} stagiaires
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
    <div v-if="selectedStagiaire" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Détails du stagiaire</h3>
          <button @click="selectedStagiaire = null" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nom complet</label>
                <p class="mt-1">{{ selectedStagiaire.nom }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <p class="mt-1">{{ selectedStagiaire.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Téléphone</label>
                <p class="mt-1">{{ selectedStagiaire.telephone }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Structure</label>
                <p class="mt-1">{{ selectedStagiaire.structure }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Statut</label>
                <p class="mt-1">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="getStatusClass(selectedStagiaire.statut)">
                    {{ selectedStagiaire.statut }}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Stages effectués</label>
              <div class="mt-2 space-y-2">
                <div v-for="stage in selectedStagiaire.stages" :key="stage.id" 
                     class="p-3 bg-gray-50 rounded-lg">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium">{{ stage.type }}</p>
                      <p class="text-sm text-gray-600">{{ stage.structure }}</p>
                      <p class="text-sm text-gray-500">
                        Du {{ formatDate(stage.dateDebut) }} au {{ formatDate(stage.dateFin) }}
                      </p>
                    </div>
                    <span class="px-2 py-1 text-xs font-semibold rounded-full"
                          :class="getStatusClass(stage.statut)">
                      {{ stage.statut }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal d'ajout/modification -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ editingStagiaire ? 'Modifier le stagiaire' : 'Ajouter un stagiaire' }}
          </h3>
          <button @click="closeAddModal" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form @submit.prevent="saveStagiaire" class="p-6">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nom complet</label>
                <input type="text" v-model="formData.nom" required
                       class="mt-1 input-field">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" v-model="formData.email" required
                       class="mt-1 input-field">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Téléphone</label>
                <input type="tel" v-model="formData.telephone" required
                       class="mt-1 input-field">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Structure</label>
                <select v-model="formData.structure" required class="mt-1 input-field">
                  <option value="">Sélectionner une structure</option>
                  <option v-for="structure in structures" :key="structure.id" :value="structure.id">
                    {{ structure.nom }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="closeAddModal" class="btn-outline">
              Annuler
            </button>
            <button type="submit" class="btn-primary">
              {{ editingStagiaire ? 'Enregistrer' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Stagiaires',
  setup() {
    const store = useStore()
    const showFilters = ref(false)
    const showAddModal = ref(false)
    const selectedStagiaire = ref(null)
    const editingStagiaire = ref(null)
    const currentPage = ref(1)
    const itemsPerPage = 10

    const formData = ref({
      nom: '',
      email: '',
      telephone: '',
      structure: ''
    })

    const filters = ref({
      statut: '',
      structure: ''
    })

    const tableHeaders = [
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'telephone', label: 'Téléphone', sortable: true },
      { key: 'structure', label: 'Structure', sortable: true },
      { key: 'statut', label: 'Statut', sortable: true },
      { key: 'actions', label: 'Actions', sortable: false }
    ]

    // Données simulées - À remplacer par des appels API
    const stagiaires = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean@example.com',
        telephone: '+212 6XX-XXXXXX',
        structure: 'Direction des Systèmes d\'Information',
        statut: 'Actif',
        stages: [
          {
            id: 1,
            type: 'Stage académique',
            structure: 'Direction des Systèmes d\'Information',
            dateDebut: '2024-01-15',
            dateFin: '2024-06-15',
            statut: 'En cours'
          }
        ]
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

    const filteredStagiaires = computed(() => {
      let result = [...stagiaires.value]
      
      if (filters.value.statut) {
        result = result.filter(s => s.statut.toLowerCase() === filters.value.statut)
      }
      if (filters.value.structure) {
        result = result.filter(s => s.structure === filters.value.structure)
      }

      return result
    })

    const totalStagiaires = computed(() => filteredStagiaires.value.length)
    const totalPages = computed(() => Math.ceil(totalStagiaires.value / itemsPerPage))
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalStagiaires.value))

    // Methods
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR')
    }

    const getStatusClass = (statut) => {
      const classes = {
        'Actif': 'bg-green-100 text-green-800',
        'Inactif': 'bg-gray-100 text-gray-800',
        'En cours': 'bg-blue-100 text-blue-800',
        'Terminé': 'bg-green-100 text-green-800'
      }
      return classes[statut] || 'bg-gray-100 text-gray-800'
    }

    const viewDetails = (stagiaire) => {
      selectedStagiaire.value = stagiaire
    }

    const editStagiaire = (stagiaire) => {
      editingStagiaire.value = stagiaire
      formData.value = { ...stagiaire }
      showAddModal.value = true
    }

    const deleteStagiaire = async (stagiaire) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce stagiaire ?')) {
        // Implémenter la logique de suppression
        console.log('Supprimer stagiaire:', stagiaire.id)
      }
    }

    const resetFilters = () => {
      filters.value = {
        statut: '',
        structure: ''
      }
    }

    const applyFilters = () => {
      showFilters.value = false
      currentPage.value = 1
    }

    const closeAddModal = () => {
      showAddModal.value = false
      editingStagiaire.value = null
      formData.value = {
        nom: '',
        email: '',
        telephone: '',
        structure: ''
      }
    }

    const saveStagiaire = async () => {
      // Implémenter la logique de sauvegarde
      if (editingStagiaire.value) {
        console.log('Modifier stagiaire:', formData.value)
      } else {
        console.log('Ajouter stagiaire:', formData.value)
      }
      closeAddModal()
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
      // await store.dispatch('fetchStagiaires')
      // await store.dispatch('fetchStructures')
    })

    return {
      showFilters,
      showAddModal,
      selectedStagiaire,
      editingStagiaire,
      currentPage,
      formData,
      filters,
      tableHeaders,
      structures,
      stagiaires,
      activeFilters,
      filteredStagiaires,
      totalStagiaires,
      totalPages,
      startIndex,
      endIndex,
      formatDate,
      getStatusClass,
      viewDetails,
      editStagiaire,
      deleteStagiaire,
      resetFilters,
      applyFilters,
      closeAddModal,
      saveStagiaire,
      previousPage,
      nextPage
    }
  }
}
</script> 
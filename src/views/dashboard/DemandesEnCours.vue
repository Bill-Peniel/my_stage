<template>
  <div class="bg-white shadow rounded-lg">
    <!-- En-tête -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-800">Stages en cours</h2>
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
                  <label class="block text-sm font-medium text-gray-700">Date de début</label>
                  <input type="date" v-model="filters.dateDebut" class="mt-1 input-field">
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

    <!-- Tableau des stages -->
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
          <tr v-for="stage in filteredStages" :key="stage.id" 
              class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="text-sm font-medium text-gray-900">{{ stage.stagiaire.nom }}</div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ stage.type }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ stage.structure }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(stage.dateDebut) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(stage.dateFin) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="getProgressClass(stage.progression)">
                {{ stage.progression }}%
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="viewDetails(stage)" class="text-primary hover:text-primary-dark mr-3">
                <i class="fas fa-eye"></i>
              </button>
              <button @click="editStage(stage)" class="text-blue-600 hover:text-blue-800 mr-3">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="terminerStage(stage)" class="text-success hover:text-green-700">
                <i class="fas fa-check-circle"></i>
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
          Affichage de {{ startIndex + 1 }} à {{ endIndex }} sur {{ totalStages }} stages
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
    <div v-if="selectedStage" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Détails du stage</h3>
          <button @click="selectedStage = null" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Stagiaire</label>
                <p class="mt-1">{{ selectedStage.stagiaire.nom }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <p class="mt-1">{{ selectedStage.stagiaire.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Type de stage</label>
                <p class="mt-1">{{ selectedStage.type }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Structure</label>
                <p class="mt-1">{{ selectedStage.structure }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Date de début</label>
                <p class="mt-1">{{ formatDate(selectedStage.dateDebut) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Date de fin</label>
                <p class="mt-1">{{ formatDate(selectedStage.dateFin) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Progression</label>
                <p class="mt-1">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="getProgressClass(selectedStage.progression)">
                    {{ selectedStage.progression }}%
                  </span>
                </p>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Commentaires</label>
              <p class="mt-1">{{ selectedStage.commentaires || 'Aucun commentaire' }}</p>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button @click="editStage(selectedStage)" class="btn-primary">Modifier</button>
            <button @click="terminerStage(selectedStage)" class="btn-success">Terminer le stage</button>
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
  name: 'DemandesEnCours',
  setup() {
    const store = useStore()
    const showFilters = ref(false)
    const selectedStage = ref(null)
    const currentPage = ref(1)
    const itemsPerPage = 10

    const filters = ref({
      type: '',
      structure: '',
      dateDebut: ''
    })

    const tableHeaders = [
      { key: 'stagiaire', label: 'Stagiaire', sortable: true },
      { key: 'type', label: 'Type', sortable: true },
      { key: 'structure', label: 'Structure', sortable: true },
      { key: 'dateDebut', label: 'Date début', sortable: true },
      { key: 'dateFin', label: 'Date fin', sortable: true },
      { key: 'progression', label: 'Progression', sortable: true },
      { key: 'actions', label: 'Actions', sortable: false }
    ]

    // Données simulées - À remplacer par des appels API
    const stages = ref([
      {
        id: 1,
        stagiaire: { nom: 'Jean Dupont', email: 'jean@example.com' },
        type: 'Stage académique',
        structure: 'Direction des Systèmes d\'Information',
        dateDebut: '2024-01-15',
        dateFin: '2024-06-15',
        progression: 45,
        commentaires: 'Très bon stagiaire, progression satisfaisante.'
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

    const filteredStages = computed(() => {
      let result = [...stages.value]
      
      if (filters.value.type) {
        result = result.filter(s => s.type === filters.value.type)
      }
      if (filters.value.structure) {
        result = result.filter(s => s.structure === filters.value.structure)
      }
      if (filters.value.dateDebut) {
        result = result.filter(s => s.dateDebut >= filters.value.dateDebut)
      }

      return result
    })

    const totalStages = computed(() => filteredStages.value.length)
    const totalPages = computed(() => Math.ceil(totalStages.value / itemsPerPage))
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalStages.value))

    // Methods
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR')
    }

    const getProgressClass = (progression) => {
      if (progression < 30) return 'bg-red-100 text-red-800'
      if (progression < 70) return 'bg-yellow-100 text-yellow-800'
      return 'bg-green-100 text-green-800'
    }

    const viewDetails = (stage) => {
      selectedStage.value = stage
    }

    const editStage = async (stage) => {
      // Implémenter la logique de modification
      console.log('Modifier stage:', stage.id)
    }

    const terminerStage = async (stage) => {
      // Implémenter la logique de fin de stage
      console.log('Terminer stage:', stage.id)
    }

    const resetFilters = () => {
      filters.value = {
        type: '',
        structure: '',
        dateDebut: ''
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
      // await store.dispatch('fetchStagesEnCours')
    })

    return {
      showFilters,
      filters,
      selectedStage,
      currentPage,
      tableHeaders,
      structures,
      stages,
      activeFilters,
      filteredStages,
      totalStages,
      totalPages,
      startIndex,
      endIndex,
      formatDate,
      getProgressClass,
      viewDetails,
      editStage,
      terminerStage,
      resetFilters,
      applyFilters,
      previousPage,
      nextPage
    }
  }
}
</script> 
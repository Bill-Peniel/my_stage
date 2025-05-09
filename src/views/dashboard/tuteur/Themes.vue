
<template>
  <div class="p-6">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Gestion des Thèmes</h1>
      <button @click="showAddModal = true" class="btn-primary">
        <i class="fas fa-plus mr-2"></i> Ajouter un thème
      </button>
    </div>

    <!-- Liste des thèmes -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="theme in themes" :key="theme.id" class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="font-semibold text-lg text-gray-800">{{ theme.titre }}</h3>
          <div class="flex space-x-2">
            <button @click="editTheme(theme)" class="text-primary hover:text-primary-dark">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteTheme(theme.id)" class="text-red-600 hover:text-red-800">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <p class="text-gray-600 mb-4">{{ theme.description }}</p>
        <div class="flex justify-between items-center">
          <span :class="[
            'px-2 py-1 rounded-full text-sm',
            theme.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]">
            {{ theme.disponible ? 'Disponible' : 'Non disponible' }}
          </span>
          <button 
            @click="toggleDisponibilite(theme)"
            class="text-sm text-primary hover:text-primary-dark"
          >
            {{ theme.disponible ? 'Marquer comme indisponible' : 'Marquer comme disponible' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal d'ajout/modification -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-md">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold">{{ editMode ? 'Modifier' : 'Ajouter' }} un thème</h3>
        </div>
        <form @submit.prevent="saveTheme" class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Titre</label>
              <input 
                type="text" 
                v-model="formData.titre" 
                required 
                class="mt-1 input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                v-model="formData.description" 
                rows="4" 
                class="mt-1 input-field"
              ></textarea>
            </div>
            <div class="flex items-center">
              <input 
                type="checkbox" 
                v-model="formData.disponible" 
                id="disponible" 
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label for="disponible" class="ml-2 block text-sm text-gray-700">
                Disponible pour affectation
              </label>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="showAddModal = false" class="btn-outline">
              Annuler
            </button>
            <button type="submit" class="btn-primary">
              {{ editMode ? 'Enregistrer' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
<!-- Section d'affectation des thèmes -->
  <div class="mt-8 bg-white rounded-lg shadow-sm p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Affecter un thème</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Filtres -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Filtrer par statut</label>
          <select v-model="filtreStatut" class="mt-1 input-field">
            <option value="">Tous les thèmes</option>
            <option value="disponible">Disponibles</option>
            <option value="non_disponible">Non disponibles</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Rechercher un thème</label>
          <input 
            type="text"
            v-model="searchTheme"
            placeholder="Titre du thème..."
            class="mt-1 input-field"
          />
        </div>
      </div>
      
      <!-- Affectation -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Sélectionner un stagiaire</label>
          <select v-model="selectedStagiaire" class="mt-1 input-field">
            <option value="">Choisir un stagiaire</option>
            <option v-for="stagiaire in stagiaires" :key="stagiaire.id" :value="stagiaire.id">
              {{ stagiaire.nom }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Sélectionner un thème</label>
          <select v-model="selectedTheme" class="mt-1 input-field">
            <option value="">Choisir un thème</option>
            <option 
              v-for="theme in filteredThemes" 
              :key="theme.id" 
              :value="theme.id"
              :disabled="!theme.disponible"
            >
              {{ theme.titre }}
            </option>
          </select>
        </div>
        
        <button 
          @click="affecterTheme"
          class="btn-primary w-full"
          :disabled="!selectedStagiaire || !selectedTheme"
        >
          Affecter le thème
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Themes',
  setup() {
    const showAddModal = ref(false)
    const editMode = ref(false)
    const themes = ref([])
    const stagiaires = ref([
      { id: 1, nom: 'Jean Dupont' },
      { id: 2, nom: 'Marie Martin' },
      { id: 3, nom: 'Paul Bernard' }
    ])
    const formData = ref({
      titre: '',
      description: '',
      disponible: true
    })
    
    const filtreStatut = ref('')
    const searchTheme = ref('')
    const selectedStagiaire = ref('')
    const selectedTheme = ref('')

    const filteredThemes = computed(() => {
      return themes.value.filter(theme => {
        const matchStatus = !filtreStatut.value || 
          (filtreStatut.value === 'disponible' ? theme.disponible : !theme.disponible)
        const matchSearch = !searchTheme.value || 
          theme.titre.toLowerCase().includes(searchTheme.value.toLowerCase())
        return matchStatus && matchSearch
      })
    })

    const affecterTheme = () => {
      if (!selectedStagiaire.value || !selectedTheme.value) return

      const theme = themes.value.find(t => t.id === selectedTheme.value)
      const stagiaire = stagiaires.value.find(s => s.id === selectedStagiaire.value)

      if (theme && stagiaire) {
        theme.disponible = false
        alert(`Le thème "${theme.titre}" a été affecté à ${stagiaire.nom}`)
        selectedStagiaire.value = ''
        selectedTheme.value = ''
      }
    }

    const saveTheme = () => {
      if (editMode.value) {
        const index = themes.value.findIndex(t => t.id === formData.value.id)
        if (index !== -1) {
          themes.value[index] = { ...formData.value }
        }
      } else {
        themes.value.push({
          id: Date.now(),
          ...formData.value
        })
      }
      showAddModal.value = false
      resetForm()
    }

    const editTheme = (theme) => {
      editMode.value = true
      formData.value = { ...theme }
      showAddModal.value = true
    }

    const deleteTheme = (id) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce thème ?')) {
        themes.value = themes.value.filter(t => t.id !== id)
      }
    }

    const toggleDisponibilite = (theme) => {
      theme.disponible = !theme.disponible
    }

    const resetForm = () => {
      editMode.value = false
      formData.value = {
        titre: '',
        description: '',
        disponible: true
      }
    }

    return {
      showAddModal,
      editMode,
      themes,
      formData,
      saveTheme,
      editTheme,
      deleteTheme,
      toggleDisponibilite
    }
  }
}
</script>


<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex-1">
      <header class="bg-primary shadow">
        <div class="px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-white">Gestion des tuteurs</h1>
          <button @click="showAddModal = true" class="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100">
            <i class="fas fa-plus mr-2"></i> Ajouter un tuteur
          </button>
        </div>
      </header>

      <main class="p-6">
        <div class="bg-white shadow rounded-lg">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Structure</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="tuteur in tuteurs" :key="tuteur.id">
                  <td class="px-6 py-4">{{ tuteur.nom }}</td>
                  <td class="px-6 py-4 break-words">{{ tuteur.structure }}</td>
                  <td class="px-6 py-4">{{ tuteur.email }}</td>
                  <td class="px-6 py-4">{{ tuteur.telephone }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="editTuteur(tuteur)" class="text-primary hover:text-primary-dark mr-3">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button @click="deleteTuteur(tuteur.id)" class="text-danger hover:text-red-700">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal d'ajout/modification -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-md">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold">{{ editMode ? 'Modifier' : 'Ajouter' }} un tuteur</h3>
        </div>
        <form @submit.prevent="saveTuteur" class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nom complet</label>
              <input type="text" v-model="formData.nom" required class="mt-1 input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" v-model="formData.email" required class="mt-1 input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Téléphone</label>
              <input type="tel" v-model="formData.telephone" required class="mt-1 input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Structure</label>
              <select v-model="formData.structure" required class="mt-1 input-field">
                <option value="">Sélectionner une structure</option>
                <option value="DSI">Direction des Systèmes d'Information</option>
                <option value="DAF">Direction Administrative et Financière</option>
                <option value="DRH">Direction des Ressources Humaines</option>
              </select>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="showAddModal = false" class="btn-outline">Annuler</button>
            <button type="submit" class="btn-primary">{{ editMode ? 'Enregistrer' : 'Ajouter' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Tuteurs',
  setup() {
    const showAddModal = ref(false)
    const editMode = ref(false)
    const tuteurs = ref([])
    const formData = ref({
      nom: '',
      email: '',
      telephone: '',
      structure: ''
    })

    const saveTuteur = () => {
      if (editMode.value) {
        const index = tuteurs.value.findIndex(t => t.id === formData.value.id)
        if (index !== -1) {
          tuteurs.value[index] = { ...formData.value }
        }
      } else {
        tuteurs.value.push({
          id: Date.now(),
          ...formData.value
        })
      }
      showAddModal.value = false
      resetForm()
    }

    const editTuteur = (tuteur) => {
      editMode.value = true
      formData.value = { ...tuteur }
      showAddModal.value = true
    }

    const deleteTuteur = (id) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce tuteur ?')) {
        tuteurs.value = tuteurs.value.filter(t => t.id !== id)
      }
    }

    const resetForm = () => {
      editMode.value = false
      formData.value = {
        nom: '',
        email: '',
        telephone: '',
        structure: ''
      }
    }

    return {
      showAddModal,
      editMode,
      tuteurs,
      formData,
      saveTuteur,
      editTuteur,
      deleteTuteur
    }
  }
}
</script>

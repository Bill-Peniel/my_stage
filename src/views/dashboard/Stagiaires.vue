<template>
  <div class="p-6">
    <div class="bg-white shadow rounded-lg">
      <!-- En-tête -->
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-800">Gestion des stagiaires</h2>
          <div class="flex space-x-3">
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Structure</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="stagiaire in stagiaires" :key="stagiaire.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">{{ stagiaire.nom }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ stagiaire.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ stagiaire.telephone }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ stagiaire.structure }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(stagiaire.statut)" class="px-2 py-1 text-xs rounded-full">
                  {{ stagiaire.statut }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <button @click="editStagiaire(stagiaire)" class="text-blue-600 hover:text-blue-800 mx-2">
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
    </div>

    <!-- Modal d'ajout/modification -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-md">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold">{{ editMode ? 'Modifier' : 'Ajouter' }} un stagiaire</h3>
        </div>
        <form @submit.prevent="saveStagiaire" class="p-6">
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
  name: 'Stagiaires',
  setup() {
    const showAddModal = ref(false)
    const editMode = ref(false)
    const formData = ref({
      nom: '',
      email: '',
      telephone: '',
      structure: ''
    })

    const stagiaires = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean@example.com',
        telephone: '+229 97000000',
        structure: 'Direction des Systèmes d\'Information',
        statut: 'Actif'
      }
    ])

    const getStatusClass = (statut) => {
      return {
        'Actif': 'bg-green-100 text-green-800',
        'Inactif': 'bg-red-100 text-red-800'
      }[statut] || 'bg-gray-100 text-gray-800'
    }

    const editStagiaire = (stagiaire) => {
      editMode.value = true
      formData.value = { ...stagiaire }
      showAddModal.value = true
    }

    const deleteStagiaire = (stagiaire) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce stagiaire ?')) {
        stagiaires.value = stagiaires.value.filter(s => s.id !== stagiaire.id)
      }
    }

    const saveStagiaire = () => {
      if (editMode.value) {
        const index = stagiaires.value.findIndex(s => s.id === formData.value.id)
        if (index !== -1) {
          stagiaires.value[index] = { ...formData.value }
        }
      } else {
        stagiaires.value.push({
          id: Date.now(),
          ...formData.value,
          statut: 'Actif'
        })
      }
      showAddModal.value = false
      editMode.value = false
      formData.value = { nom: '', email: '', telephone: '', structure: '' }
    }

    return {
      showAddModal,
      editMode,
      formData,
      stagiaires,
      getStatusClass,
      editStagiaire,
      deleteStagiaire,
      saveStagiaire
    }
  }
}
</script>
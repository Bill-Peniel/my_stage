
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Nouvelles Demandes de Stage</h1>
    
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="flex flex-wrap gap-4 mb-4">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Rechercher une demande..." 
          class="input-field max-w-xs"
        />
        <select v-model="filterStructure" class="input-field max-w-xs">
          <option value="">Toutes les structures</option>
          <option v-for="structure in structures" :key="structure" :value="structure">
            {{ structure }}
          </option>
        </select>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stagiaire</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Structure Demandée</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type de Stage</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Soumission</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="demande in filteredDemandes" :key="demande.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ demande.nom }}</div>
                <div class="text-sm text-gray-500">{{ demande.email }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ demande.structure }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ demande.typeStage }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(demande.dateSoumission) }}</td>
              <td class="px-6 py-4 text-sm font-medium space-x-2">
                <button @click="viewDetails(demande)" class="text-primary hover:text-primary-dark">
                  <i class="fas fa-eye"></i>
                </button>
                <button @click="approveRequest(demande)" class="text-success hover:text-green-700">
                  <i class="fas fa-check"></i>
                </button>
                <button @click="rejectRequest(demande)" class="text-danger hover:text-red-700">
                  <i class="fas fa-times"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'NouvellesDemandes',
  setup() {
    const searchQuery = ref('')
    const filterStructure = ref('')
    
    const demandes = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        structure: 'Direction des Systèmes d\'Information',
        typeStage: 'Stage académique',
        dateSoumission: '2024-03-15'
      }
    ])

    const structures = ['Direction des Systèmes d\'Information', 'Direction Générale du Budget']

    const filteredDemandes = computed(() => {
      return demandes.value.filter(demande => {
        const matchSearch = !searchQuery.value || 
          demande.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          demande.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        
        const matchStructure = !filterStructure.value || demande.structure === filterStructure.value

        return matchSearch && matchStructure
      })
    })

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR')
    }

    const viewDetails = (demande) => {
      console.log('Voir détails:', demande.id)
    }

    const approveRequest = (demande) => {
      console.log('Approuver demande:', demande.id)
    }

    const rejectRequest = (demande) => {
      console.log('Rejeter demande:', demande.id)
    }

    return {
      searchQuery,
      filterStructure,
      structures,
      filteredDemandes,
      formatDate,
      viewDetails,
      approveRequest,
      rejectRequest
    }
  }
}
</script>

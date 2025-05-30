
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Historique des demandes</h1>
    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <input 
              type="text" 
              placeholder="Rechercher une demande..." 
              class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              v-model="searchQuery"
            >
            <select 
              v-model="filterStatus" 
              class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Tous les statuts</option>
              <option value="en_cours">En cours</option>
              <option value="confirme">Confirmé</option>
              <option value="refuse">Refusé</option>
            </select>
          </div>
          <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
            <i class="fas fa-download mr-2"></i>Exporter
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stagiaire</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Structure</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type de Stage</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
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
              <td class="px-6 py-4">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                      :class="getStatusClass(demande.status)">
                  {{ getStatusLabel(demande.status) }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm font-medium">
                <button @click="viewDetails(demande)" class="text-primary hover:text-primary-dark">
                  <i class="fas fa-eye"></i>
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
  name: 'Historique',
  setup() {
    const searchQuery = ref('')
    const filterStatus = ref('')

    const demandes = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        structure: "Direction des Systèmes d'Information",
        typeStage: 'Stage académique',
        dateSoumission: '2024-03-15',
        status: 'en_cours'
      },
      {
        id: 2,
        nom: 'Marie Martin',
        email: 'marie.martin@email.com',
        structure: 'Direction Générale du Budget',
        typeStage: 'Stage professionnel',
        dateSoumission: '2024-03-14',
        status: 'confirme'
      }
    ])

    const filteredDemandes = computed(() => {
      let filtered = demandes.value
      if (searchQuery.value) {
        filtered = filtered.filter(demande => {
          return demande.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                 demande.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                 demande.structure.toLowerCase().includes(searchQuery.value.toLowerCase())
        })
      }
      if (filterStatus.value) {
        filtered = filtered.filter(demande => demande.status === filterStatus.value)
      }
      return filtered
    })

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR')
    }

    const getStatusClass = (status) => {
      const classes = {
        en_cours: 'bg-yellow-100 text-yellow-800',
        confirme: 'bg-green-100 text-green-800',
        refuse: 'bg-red-100 text-red-800'
      }
      return classes[status] || ''
    }

    const getStatusLabel = (status) => {
      const labels = {
        en_cours: 'En cours',
        confirme: 'Confirmé',
        refuse: 'Refusé'
      }
      return labels[status] || status
    }

    const viewDetails = (demande) => {
      console.log('Voir détails:', demande.id)
    }

    return {
      searchQuery,
      filterStatus,
      filteredDemandes,
      formatDate,
      getStatusClass,
      getStatusLabel,
      viewDetails
    }
  }
}
</script>


<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Nouvelles Demandes de Stage</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(demandes, structure) in demandesParStructure" :key="structure" 
           class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-primary p-4">
          <h2 class="text-white text-xl font-semibold">{{ structure }}</h2>
          <div class="mt-2 text-white/80">
            <span class="text-sm">{{ demandes.length }} nouvelle(s) demande(s)</span>
          </div>
        </div>
        
        <div class="p-4">
          <div class="space-y-3">
            <div v-for="(demande, index) in demandes.slice(0, 3)" :key="demande.id" 
                 class="flex items-center justify-between">
              <div>
                <p class="font-medium">{{ demande.nom }}</p>
                <p class="text-sm text-gray-500">{{ demande.typeStage }}</p>
              </div>
              <span class="text-xs text-gray-400">{{ formatDate(demande.dateSoumission) }}</span>
            </div>
          </div>
          
          <div class="mt-4 flex justify-end">
            <button @click="voirPlusPourStructure(structure)" 
                    class="text-primary hover:text-primary-dark text-sm font-medium">
              Voir plus ({{ demandes.length }}) →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour voir plus de demandes -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-4xl mx-4">
        <div class="p-4 border-b flex justify-between items-center">
          <h3 class="text-lg font-semibold">Demandes pour {{ structureSelectionnee }}</h3>
          <button @click="showModal = false" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="p-4">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stagiaire</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type de Stage</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Soumission</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="demande in getDemandesForStructure(structureSelectionnee)" :key="demande.id">
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ demande.nom }}</div>
                    <div class="text-sm text-gray-500">{{ demande.email }}</div>
                  </td>
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
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'NouvellesDemandes',
  setup() {
    const demandes = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        structure: 'Direction des Systèmes d\'Information',
        typeStage: 'Stage académique',
        dateSoumission: '2024-03-15'
      },
      {
        id: 2,
        nom: 'Marie Martin',
        email: 'marie.martin@email.com',
        structure: 'Direction Générale du Budget',
        typeStage: 'Stage professionnel',
        dateSoumission: '2024-03-14'
      },
      {
        id: 3,
        nom: 'Paul Dubois',
        email: 'paul.dubois@email.com',
        structure: 'Direction des Systèmes d\'Information',
        typeStage: 'Stage académique',
        dateSoumission: '2024-03-13'
      }
    ])

    const showModal = ref(false)
    const structureSelectionnee = ref('')

    const demandesParStructure = computed(() => {
      return demandes.value.reduce((acc, demande) => {
        if (!acc[demande.structure]) {
          acc[demande.structure] = []
        }
        acc[demande.structure].push(demande)
        return acc
      }, {})
    })

    const getDemandesForStructure = (structure) => {
      return demandes.value.filter(d => d.structure === structure)
    }

    const voirPlusPourStructure = (structure) => {
      structureSelectionnee.value = structure
      showModal.value = true
    }

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
      demandesParStructure,
      showModal,
      structureSelectionnee,
      formatDate,
      voirPlusPourStructure,
      getDemandesForStructure,
      viewDetails,
      approveRequest,
      rejectRequest
    }
  }
}
</script>

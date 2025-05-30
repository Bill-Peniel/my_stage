<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Demandes Classées</h1>

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
              <option value="nouveau">Nouveau</option>
            </select>
          </div>
          <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
            <i class="fas fa-download mr-2"></i>Exporter
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <div v-for="(demandes, structure) in demandesParStructure" :key="structure" class="mb-8">
          <h2 class="text-xl font-semibold mb-4 px-6 text-primary">{{ structure }}</h2>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stagiaire</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type de Stage</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="demande in demandes" :key="demande.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">{{ demande.nom }}</div>
                  <div class="text-sm text-gray-500">{{ demande.email }}</div>
                </td>
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

    <DemandeDetails 
      v-if="selectedDemande" 
      :demande="selectedDemande" 
      @close="closeDetails"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import DemandeDetails from '@/components/demandes/DemandeDetails.vue'

export default {
  name: 'NouvellesDemandes',
  components: {
    DemandeDetails
  },
  setup() {
    const searchQuery = ref('')
    const filterStatus = ref('')
    const selectedDemande = ref(null)

    const demandes = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        structure: 'Direction des Systèmes d\'Information',
        typeStage: 'Stage académique',
        dateSoumission: '2024-03-15',
        status: 'accepte',
        telephone: '+229 97000000',
        formation: 'Licence Informatique',
        dateDebut: '2024-06-01',
        dateFin: '2024-08-31',
        documents: [
          { 
            nom: 'CV',
            type: 'PDF',
            url: '/documents/cv.pdf'
          },
          {
            nom: 'Lettre de motivation',
            type: 'PDF',
            url: '/documents/lettre.pdf'
          },
          {
            nom: 'Attestation de scolarité',
            type: 'PDF',
            url: '/documents/attestation.pdf'
          }
        ]
      },
      {
        id: 2,
        nom: 'Marie Martin',
        email: 'marie.martin@email.com',
        structure: 'Direction Générale du Budget',
        typeStage: 'Stage professionnel',
        dateSoumission: '2024-03-14',
        status: 'refuse'
      }
    ])

    const demandesParStructure = computed(() => {
      const demandesGrouped = {};
      demandes.value.forEach(demande => {
        if (!demandesGrouped[demande.structure]) {
          demandesGrouped[demande.structure] = [];
        }
        demandesGrouped[demande.structure].push(demande);
      });
      return demandesGrouped;
    });


    const filteredDemandes = computed(() => {
      let filtered = demandes.value;
      if (searchQuery.value) {
        filtered = filtered.filter(demande => {
          return demande.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                 demande.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                 demande.structure.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                 demande.typeStage.toLowerCase().includes(searchQuery.value.toLowerCase());
        })
      }
      if (filterStatus.value) {
        filtered = filtered.filter(demande => demande.status === filterStatus.value);
      }
      return filtered;
    })

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR')
    }

    const getStatusClass = (status) => {
      const classes = {
        nouveau: 'bg-blue-100 text-blue-800',
        en_cours: 'bg-yellow-100 text-yellow-800',
        confirme: 'bg-green-100 text-green-800',
        refuse: 'bg-red-100 text-red-800'
      }
      return classes[status] || ''
    }

    const getStatusLabel = (status) => {
      const labels = {
        nouveau: 'Nouveau',
        en_cours: 'En cours',
        confirme: 'Confirmé',
        refuse: 'Refusé'
      }
      return labels[status] || status
    }

    const viewDetails = (demande) => {
      selectedDemande.value = demande
    }

    const closeDetails = () => {
      selectedDemande.value = null
    }

    return {
      searchQuery,
      filterStatus,
      filteredDemandes,
      demandesParStructure,
      formatDate,
      getStatusClass,
      getStatusLabel,
      viewDetails,
      selectedDemande,
      closeDetails
    }
  }
}
</script>
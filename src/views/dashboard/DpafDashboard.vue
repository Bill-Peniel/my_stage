
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-primary shadow fixed top-0 w-full z-20">
      <div class="px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img src="@/assets/finance-logo1.png" alt="Logo du ministère" class="h-12 w-auto" />
          <h1 class="text-2xl font-bold text-white">Direction du Personnel - Gestion des Stages</h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-white">{{ store.getters.roleDisplay }}</span>
          <button @click="logout" class="text-white hover:text-accent-yellow">
            <i class="fas fa-sign-out-alt"></i> Déconnexion
          </button>
        </div>
      </div>
    </header>

    <div class="flex pt-16">
      <Sidebar class="fixed left-0 top-16 h-[calc(100vh-4rem)] z-10" />

      <div class="flex-1 md:ml-64 p-6 bg-gray-50">
        <router-view v-if="$route.path !== '/dashboard/dpaf'" />
        <div v-else>
          <!-- Statistiques -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-blue-500 text-white rounded-lg p-6 shadow-sm">
              <div class="flex justify-between items-center">
                <div class="w-full">
                  <p class="text-sm opacity-75">Nouvelles demandes</p>
                  <h2 class="text-4xl font-bold mb-2">{{ stats.nouveaux }}</h2>
                  <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
                    <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 40%"></div>
                  </div>
                </div>
                <div class="text-3xl opacity-75">
                  <i class="fas fa-file-alt"></i>
                </div>
              </div>
              <p class="mt-4 text-sm">
                <router-link to="/dashboard/dpaf/nouvelles-demandes" class="opacity-75 hover:opacity-100">
                  Voir les demandes <i class="fas fa-arrow-right ml-1"></i>
                </router-link>
              </p>
            </div>

            <div class="bg-green-500 text-white rounded-lg p-6 shadow-sm">
              <div class="flex justify-between items-center">
                <div class="w-full">
                  <p class="text-sm opacity-75">Stages en cours</p>
                  <h2 class="text-4xl font-bold mb-2">{{ stats.enCours }}</h2>
                  <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
                    <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 65%"></div>
                  </div>
                </div>
                <div class="text-3xl opacity-75">
                  <i class="fas fa-user-graduate"></i>
                </div>
              </div>
              <p class="mt-4 text-sm">
                <router-link to="/dashboard/dpaf/affectations" class="opacity-75 hover:opacity-100">
                  Voir les stages <i class="fas fa-arrow-right ml-1"></i>
                </router-link>
              </p>
            </div>

            <div class="bg-yellow-500 text-white rounded-lg p-6 shadow-sm">
              <div class="flex justify-between items-center">
                <div class="w-full">
                  <p class="text-sm opacity-75">Stages terminés</p>
                  <h2 class="text-4xl font-bold mb-2">{{ stats.confirmes }}</h2>
                  <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
                    <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 75%"></div>
                  </div>
                </div>
                <div class="text-3xl opacity-75">
                  <i class="fas fa-check-circle"></i>
                </div>
              </div>
              <p class="mt-4 text-sm">
                <router-link to="/dashboard/dpaf/historique" class="opacity-75 hover:opacity-100">
                  Voir l'historique <i class="fas fa-arrow-right ml-1"></i>
                </router-link>
              </p>
            </div>

            <div class="bg-red-500 text-white rounded-lg p-6 shadow-sm">
              <div class="flex justify-between items-center">
                <div class="w-full">
                  <p class="text-sm opacity-75">Demandes refusées</p>
                  <h2 class="text-4xl font-bold mb-2">{{ stats.refuses }}</h2>
                  <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
                    <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 55%"></div>
                  </div>
                </div>
                <div class="text-3xl opacity-75">
                  <i class="fas fa-times-circle"></i>
                </div>
              </div>
              <p class="mt-4 text-sm">
                <router-link to="/dashboard/dpaf/historique" class="opacity-75 hover:opacity-100">
                  Voir les refus <i class="fas fa-arrow-right ml-1"></i>
                </router-link>
              </p>
            </div>
          </div>

          <!-- Graphiques -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Répartition par structure</h3>
                <button class="text-gray-400 hover:text-gray-600">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
              </div>
              <canvas ref="donutChart" class="max-h-80"></canvas>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Évolution des demandes</h3>
                <button class="text-gray-400 hover:text-gray-600">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
              </div>
              <canvas ref="barChart" class="max-h-80"></canvas>
            </div>
          </div>

          <!-- Liste des dernières demandes -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h2 class="text-lg font-medium text-gray-900">Dernières demandes reçues</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stagiaire</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Structure Demandée</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type de Stage</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Soumission</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="demande in recentDemandes" :key="demande.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <div class="text-sm text-gray-900">{{ demande.nom }}</div>
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
                    <td class="px-6 py-4 text-sm font-medium space-x-2">
                      <button @click="viewDetails(demande)" class="text-primary hover:text-primary-dark">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button v-if="canConfirm(demande)" @click="confirmDemande(demande)"
                              class="text-success hover:text-green-700">
                        <i class="fas fa-check"></i>
                      </button>
                      <button v-if="canReject(demande)" @click="rejectDemande(demande)"
                              class="text-danger hover:text-red-700">
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
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Chart from 'chart.js/auto'
import Sidebar from '../../components/SidebarDpaf.vue'

export default {
  name: 'DpafDashboard',
  components: {
    Sidebar
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const donutChart = ref(null)
    const barChart = ref(null)

    const stats = ref({
      nouveaux: 12,
      enCours: 8,
      confirmes: 15,
      refuses: 5
    })

    const recentDemandes = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        structure: "Direction des Systèmes d'Information",
        typeStage: 'Stage académique',
        dateSoumission: '2024-03-15',
        status: 'nouveau'
      },
      {
        id: 2,
        nom: 'Marie Martin',
        email: 'marie.martin@email.com',
        structure: 'Direction Générale du Budget',
        typeStage: 'Stage professionnel',
        dateSoumission: '2024-03-14',
        status: 'en_cours'
      }
    ])

    onMounted(() => {
      // Graphique donut des structures
      new Chart(donutChart.value, {
        type: 'doughnut',
        data: {
          labels: ['DSI', 'DGB', 'DGID', 'DRH', 'DAF', 'Autres'],
          datasets: [{
            data: [30, 25, 15, 10, 10, 10],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      })

      // Graphique en barres de l'évolution des demandes
      new Chart(barChart.value, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
          datasets: [
            {
              label: 'Demandes reçues',
              data: [65, 59, 80, 81, 56, 55],
              backgroundColor: '#36A2EB'
            },
            {
              label: 'Demandes traitées',
              data: [45, 49, 60, 71, 46, 45],
              backgroundColor: '#FF6384'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
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

    const canConfirm = (demande) => ['nouveau', 'en_cours'].includes(demande.status)
    const canReject = (demande) => ['nouveau', 'en_cours'].includes(demande.status)

    const viewDetails = (demande) => {
      console.log('Voir détails:', demande.id)
    }

    const confirmDemande = (demande) => {
      console.log('Confirmer demande:', demande.id)
    }

    const rejectDemande = (demande) => {
      console.log('Refuser demande:', demande.id)
    }

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    return {
      store,
      stats,
      recentDemandes,
      donutChart,
      barChart,
      formatDate,
      getStatusClass,
      getStatusLabel,
      canConfirm,
      canReject,
      viewDetails,
      confirmDemande,
      rejectDemande,
      logout
    }
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- En-tête -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Tableau de bord</h1>
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
          <i class="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
        </div>
        <button class="btn-primary">
          <i class="fas fa-plus mr-2"></i> Nouveau stage
        </button>
      </div>
    </div>

    <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <i class="fas fa-users text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total des stagiaires</p>
            <p class="text-2xl font-semibold text-gray-900">1,234</p>
          </div>
        </div>
        <div class="mt-4">
          <span class="text-green-600 text-sm font-medium">
            <i class="fas fa-arrow-up"></i> 12%
          </span>
          <span class="text-gray-500 text-sm ml-2">depuis le mois dernier</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <i class="fas fa-building text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Structures partenaires</p>
            <p class="text-2xl font-semibold text-gray-900">89</p>
          </div>
        </div>
        <div class="mt-4">
          <span class="text-green-600 text-sm font-medium">
            <i class="fas fa-arrow-up"></i> 5%
          </span>
          <span class="text-gray-500 text-sm ml-2">depuis le mois dernier</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <i class="fas fa-clock text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Stages en cours</p>
            <p class="text-2xl font-semibold text-gray-900">156</p>
          </div>
        </div>
        <div class="mt-4">
          <span class="text-green-600 text-sm font-medium">
            <i class="fas fa-arrow-up"></i> 8%
          </span>
          <span class="text-gray-500 text-sm ml-2">depuis le mois dernier</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-red-100 text-red-600">
            <i class="fas fa-exclamation-circle text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Demandes en attente</p>
            <p class="text-2xl font-semibold text-gray-900">23</p>
          </div>
        </div>
        <div class="mt-4">
          <span class="text-red-600 text-sm font-medium">
            <i class="fas fa-arrow-down"></i> 3%
          </span>
          <span class="text-gray-500 text-sm ml-2">depuis le mois dernier</span>
        </div>
      </div>
    </div>

    <!-- Graphiques et tableaux -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Graphique des stages par mois -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Évolution des stages</h3>
        <div class="h-64">
          <LineChart
            :chartData="stagesData"
            :options="lineChartOptions"
          />
        </div>
      </div>

      <!-- Répartition par type de stage -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Répartition par type</h3>
        <div class="h-64">
          <PieChart
            :chartData="typesData"
            :options="pieChartOptions"
          />
        </div>
      </div>
    </div>

    <!-- Dernières demandes -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Dernières demandes</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stagiaire</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Structure</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="demande in demandes" :key="demande.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" :src="demande.stagiaire.avatar" :alt="demande.stagiaire.nom">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ demande.stagiaire.nom }}</div>
                    <div class="text-sm text-gray-500">{{ demande.stagiaire.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ demande.structure.nom }}</div>
                <div class="text-sm text-gray-500">{{ demande.structure.ville }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                      :class="getTypeClass(demande.type)">
                  {{ demande.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(demande.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                      :class="getStatusClass(demande.statut)">
                  {{ demande.statut }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="voirDetails(demande)" class="text-primary hover:text-primary-dark mr-3">
                  <i class="fas fa-eye"></i>
                </button>
                <button @click="traiterDemande(demande)" class="text-green-600 hover:text-green-900">
                  <i class="fas fa-check"></i>
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
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Line as LineChart, Pie as PieChart } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default {
  name: 'Dashboard',
  components: {
    LineChart,
    PieChart
  },
  setup() {
    const store = useStore()

    // Données simulées - À remplacer par des appels API
    const demandes = ref([
      {
        id: 1,
        stagiaire: {
          nom: 'Jean Dupont',
          email: 'jean.dupont@email.com',
          avatar: 'https://ui-avatars.com/api/?name=Jean+Dupont'
        },
        structure: {
          nom: 'Entreprise XYZ',
          ville: 'Cotonou'
        },
        type: 'Stage académique',
        date: new Date('2024-03-15'),
        statut: 'En attente'
      },
      {
        id: 2,
        stagiaire: {
          nom: 'Marie Martin',
          email: 'marie.martin@email.com',
          avatar: 'https://ui-avatars.com/api/?name=Marie+Martin'
        },
        structure: {
          nom: 'Société ABC',
          ville: 'Porto-Novo'
        },
        type: 'Stage professionnel',
        date: new Date('2024-03-14'),
        statut: 'Validé'
      }
    ])

    // Données pour le graphique en ligne (évolution des stages)
    const stagesData = ref({
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
      datasets: [
        {
          label: 'Stages académiques',
          data: [12, 19, 15, 25, 22, 30, 28, 35, 40, 45, 50, 55],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        },
        {
          label: 'Stages professionnels',
          data: [8, 12, 18, 22, 25, 28, 32, 38, 42, 48, 52, 58],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4
        }
      ]
    })

    // Données pour le graphique en camembert (répartition par type)
    const typesData = ref({
      labels: ['Stage académique', 'Stage professionnel', 'Stage de recherche'],
      datasets: [
        {
          data: [45, 35, 20],
          backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6'],
          borderWidth: 0
        }
      ]
    })

    // Options pour le graphique en ligne
    const lineChartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: true,
            drawBorder: false
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    })

    // Options pour le graphique en camembert
    const pieChartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        }
      }
    })

    const getTypeClass = (type) => {
      const classes = {
        'Stage académique': 'bg-blue-100 text-blue-800',
        'Stage professionnel': 'bg-green-100 text-green-800',
        'Stage de recherche': 'bg-purple-100 text-purple-800'
      }
      return classes[type] || 'bg-gray-100 text-gray-800'
    }

    const getStatusClass = (statut) => {
      const classes = {
        'En attente': 'bg-yellow-100 text-yellow-800',
        'Validé': 'bg-green-100 text-green-800',
        'Rejeté': 'bg-red-100 text-red-800'
      }
      return classes[statut] || 'bg-gray-100 text-gray-800'
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }

    const voirDetails = (demande) => {
      // Implémenter la logique de visualisation des détails
      console.log('Voir détails:', demande)
    }

    const traiterDemande = (demande) => {
      // Implémenter la logique de traitement
      console.log('Traiter demande:', demande)
    }

    return {
      demandes,
      stagesData,
      typesData,
      lineChartOptions,
      pieChartOptions,
      getTypeClass,
      getStatusClass,
      formatDate,
      voirDetails,
      traiterDemande
    }
  }
}
</script> 
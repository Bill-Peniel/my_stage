
<template>
  <div class="p-6 bg-gray-50 overflow-x-hidden">
    <!-- En-tête avec statistiques -->
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
            <p class="text-sm opacity-75">En cours d'analyse</p>
            <h2 class="text-4xl font-bold mb-2">{{ stats.enCours }}</h2>
            <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
              <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 65%"></div>
            </div>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-clock"></i>
          </div>
        </div>
        <p class="mt-4 text-sm">
          <a href="#" class="opacity-75 hover:opacity-100">Voir les analyses <i class="fas fa-arrow-right ml-1"></i></a>
        </p>
      </div>

      <div class="bg-yellow-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div class="w-full">
            <p class="text-sm opacity-75">Confirmés</p>
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
          <router-link to="/dashboard/dpaf/affectations" class="opacity-75 hover:opacity-100">
            Voir les affectations <i class="fas fa-arrow-right ml-1"></i>
          </router-link>
        </p>
      </div>

      <div class="bg-red-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div class="w-full">
            <p class="text-sm opacity-75">Refusés</p>
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
            Voir l'historique <i class="fas fa-arrow-right ml-1"></i>
          </router-link>
        </p>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    <div class="mt-8 bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Dernières demandes</h3>
        <router-link to="/dashboard/dpaf/nouvelles-demandes" class="text-primary hover:text-primary-dark">
          Voir plus <i class="fas fa-arrow-right ml-1"></i>
        </router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stagiaire</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Structure demandée</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type de stage</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date de soumission</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="demande in dernieresDemandes" :key="demande.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">{{ demande.nom }}</td>
              <td class="px-6 py-4">{{ demande.structure }}</td>
              <td class="px-6 py-4">{{ demande.typeStage }}</td>
              <td class="px-6 py-4">{{ formatDate(demande.dateSoumission) }}</td>
              <td class="px-6 py-4">
                <span :class="getStatusClass(demande.status)" class="px-2 py-1 text-xs rounded-full">
                  {{ getStatusLabel(demande.status) }}
                </span>
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
import Chart from 'chart.js/auto'

export default {
  name: 'DpafDashboard',
  setup() {
    const donutChart = ref(null)
    const barChart = ref(null)
    const stats = ref({
      nouveaux: 12,
      enCours: 8,
      confirmes: 15,
      refuses: 5
    })

    const dernieresDemandes = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        structure: 'Direction des Systèmes d\'Information',
        typeStage: 'Stage académique',
        dateSoumission: '2024-03-15',
        status: 'nouveau'
      },
      {
        id: 2,
        nom: 'Marie Martin',
        structure: 'Direction du Budget',
        typeStage: 'Stage professionnel',
        dateSoumission: '2024-03-14',
        status: 'en_cours'
      },
      {
        id: 3,
        nom: 'Paul Bernard',
        structure: 'Direction des Ressources Humaines',
        typeStage: 'Stage de fin d\'études',
        dateSoumission: '2024-03-13',
        status: 'confirme'
      }
    ])

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
      return classes[status]
    }

    const getStatusLabel = (status) => {
      const labels = {
        nouveau: 'Nouveau',
        en_cours: 'En cours',
        confirme: 'Confirmé',
        refuse: 'Refusé'
      }
      return labels[status]
    }

    onMounted(() => {
      // Graphique donut des structures
      new Chart(donutChart.value, {
        type: 'doughnut',
        data: {
          labels: ['DSI', 'DRH', 'DAF', 'DGB', 'DGID', 'Autres'],
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
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [
            {
              label: 'Nouvelles demandes',
              data: [15, 22, 28, 32, 38, 42],
              backgroundColor: 'rgba(54, 162, 235, 0.7)'
            },
            {
              label: 'Demandes traitées',
              data: [10, 18, 25, 30, 35, 40],
              backgroundColor: 'rgba(75, 192, 192, 0.7)'
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

    return {
      stats,
      dernieresDemandes,
      donutChart,
      barChart,
      formatDate,
      getStatusClass,
      getStatusLabel
    }
  }
}
</script>

<style scoped>
.transform {
  transition: all 0.2s ease-in-out;
}
</style>

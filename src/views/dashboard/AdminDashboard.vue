<template>
  <div class="p-6 bg-gray-50 overflow-x-hidden">
    <!-- En-tête avec statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-blue-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Demandes en attente</p>
            <h2 class="text-4xl font-bold">12</h2>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-clock"></i>
          </div>
        </div>
        <p class="mt-4 text-sm">
          <a href="#" class="opacity-75 hover:opacity-100">Voir les demandes <i class="fas fa-arrow-right ml-1"></i></a>
        </p>
      </div>

      <div class="bg-green-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Stages en cours</p>
            <h2 class="text-4xl font-bold">8</h2>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-user-graduate"></i>
          </div>
        </div>
        <p class="mt-4 text-sm">
          <a href="#" class="opacity-75 hover:opacity-100">Voir les stages <i class="fas fa-arrow-right ml-1"></i></a>
        </p>
      </div>

      <div class="bg-yellow-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Stagiaires actifs</p>
            <h2 class="text-4xl font-bold">24</h2>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-users"></i>
          </div>
        </div>
        <p class="mt-4 text-sm">
          <a href="#" class="opacity-75 hover:opacity-100">Voir les stagiaires <i class="fas fa-arrow-right ml-1"></i></a>
        </p>
      </div>

      <div class="bg-red-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Structures partenaires</p>
            <h2 class="text-4xl font-bold">15</h2>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-building"></i>
          </div>
        </div>
        <p class="mt-4 text-sm">
          <a href="#" class="opacity-75 hover:opacity-100">Voir les structures <i class="fas fa-arrow-right ml-1"></i></a>
        </p>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Répartition par domaine de stage</h3>
          <button class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>
        <canvas ref="donutChart" class="max-h-80"></canvas>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Évolution mensuelle des demandes</h3>
          <button class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>
        <canvas ref="barChart" class="max-h-80"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

export default {
  name: 'AdminDashboard',
  setup() {
    const donutChart = ref(null)
    const barChart = ref(null)

    onMounted(() => {
      // Graphique donut des domaines de stage
      new Chart(donutChart.value, {
        type: 'doughnut',
        data: {
          labels: ['Administration', 'Finances', 'Ressources Humaines', 'Communication', 'Juridique', 'Informatique'],
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
      const stagesData = ref({
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      datasets: [
        {
          label: 'Demandes en attente',
          data: [15, 22, 28, 32, 38, 42, 45, 48, 52, 55, 58, 62],
          borderColor: '#FFA500',
          backgroundColor: 'rgba(255, 165, 0, 0.1)',
          tension: 0.4
        },
        {
          label: 'Demandes validées',
          data: [10, 18, 25, 30, 35, 40, 43, 46, 50, 53, 56, 60],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4
        },
        {
          label: 'Demandes rejetées',
          data: [5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 32],
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4
        }
      ]
    })
      new Chart(barChart.value, {
        type: 'bar',
        data: stagesData.value,
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
      donutChart,
      barChart
    }
  }
}
</script>

<style scoped>
.transform {
  transition: all 0.2s ease-in-out;
}
</style>
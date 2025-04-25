<template>
  <div class="p-6 bg-gray-50 overflow-x-hidden">
    <!-- En-tête avec statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-blue-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Nouvelles commandes</p>
            <h2 class="text-4xl font-bold">150</h2>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-shopping-cart"></i>
          </div>
        </div>
        <p class="mt-4 text-sm">
          <a href="#" class="opacity-75 hover:opacity-100">Plus d'info <i class="fas fa-arrow-right ml-1"></i></a>
        </p>
      </div>

      <div class="bg-green-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Taux de rebond</p>
            <h2 class="text-4xl font-bold">53%</h2>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-chart-line"></i>
          </div>
        </div>
        <p class="mt-4 text-sm">
          <a href="#" class="opacity-75 hover:opacity-100">Plus d'info <i class="fas fa-arrow-right ml-1"></i></a>
        </p>
      </div>

      <div class="bg-yellow-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Inscriptions utilisateurs</p>
            <h2 class="text-4xl font-bold">44</h2>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-user-plus"></i>
          </div>
        </div>
        <p class="mt-4 text-sm">
          <a href="#" class="opacity-75 hover:opacity-100">Plus d'info <i class="fas fa-arrow-right ml-1"></i></a>
        </p>
      </div>

      <div class="bg-red-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Visiteurs uniques</p>
            <h2 class="text-4xl font-bold">65</h2>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-users"></i>
          </div>
        </div>
        <p class="mt-4 text-sm">
          <a href="#" class="opacity-75 hover:opacity-100">Plus d'info <i class="fas fa-arrow-right ml-1"></i></a>
        </p>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Navigateurs utilisés</h3>
          <button class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>
        <canvas ref="donutChart" class="max-h-80"></canvas>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Statistiques mensuelles</h3>
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
      // Graphique donut des navigateurs
      new Chart(donutChart.value, {
        type: 'doughnut',
        data: {
          labels: ['Chrome', 'IE', 'Firefox', 'Safari', 'Opera', 'Navigator'],
          datasets: [{
            data: [700, 500, 400, 600, 300, 100],
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

      // Graphique en barres des statistiques mensuelles
      new Chart(barChart.value, {
        type: 'bar',
        data: {
          labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
          datasets: [
            {
              label: 'Electronics',
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: '#FF6384'
            },
            {
              label: 'Fashion',
              data: [28, 48, 40, 19, 86, 27, 90],
              backgroundColor: '#36A2EB'
            },
            {
              label: 'Foods',
              data: [45, 25, 16, 36, 67, 18, 76],
              backgroundColor: '#4BC0C0'
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
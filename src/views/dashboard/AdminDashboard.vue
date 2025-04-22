
<template>
  <div class="p-6 bg-gray-50 overflow-x-hidden">
    <!-- En-tête -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Bienvenue Admin !</h1>
      <p class="text-gray-600">Tableau de bord</p>
    </div>

    <!-- Cartes statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Médecins -->
      <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Médecins</p>
            <h3 class="text-2xl font-bold text-gray-800">168</h3>
          </div>
          <div class="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
            <i class="fas fa-user-md text-xl text-blue-500"></i>
          </div>
        </div>
      </div>

      <!-- Patient -->
      <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Patient</p>
            <h3 class="text-2xl font-bold text-gray-800">487</h3>
          </div>
          <div class="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
            <i class="fas fa-users text-xl text-green-500"></i>
          </div>
        </div>
      </div>

      <!-- Rendez-vous -->
      <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Rendez-vous</p>
            <h3 class="text-2xl font-bold text-gray-800">485</h3>
          </div>
          <div class="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full">
            <i class="fas fa-calendar text-xl text-red-500"></i>
          </div>
        </div>
      </div>

      <!-- Revenu -->
      <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Revenu</p>
            <h3 class="text-2xl font-bold text-gray-800">62523 $</h3>
          </div>
          <div class="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full">
            <i class="fas fa-dollar-sign text-xl text-yellow-500"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Graphique des revenus -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Revenu</h3>
        <canvas ref="revenueChart" class="w-full h-64"></canvas>
      </div>

      <!-- Graphique des statuts -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Statut</h3>
        <canvas ref="statusChart" class="w-full h-64"></canvas>
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
    const revenueChart = ref(null)
    const statusChart = ref(null)

    onMounted(() => {
      // Graphique des revenus
      new Chart(revenueChart.value, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [{
            label: 'Revenu mensuel',
            data: [30000, 35000, 25000, 45000, 30000, 62523],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
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
        }
      })

      // Graphique des statuts
      new Chart(statusChart.value, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [{
            label: 'En attente',
            data: [100, 80, 60, 90, 70, 120],
            borderColor: '#EAB308',
            borderWidth: 2,
            tension: 0.4,
            fill: false
          },
          {
            label: 'Terminé',
            data: [50, 70, 90, 60, 80, 110],
            borderColor: '#22C55E',
            borderWidth: 2,
            tension: 0.4,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
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
        }
      })
    })

    return {
      revenueChart,
      statusChart
    }
  }
}
</script>

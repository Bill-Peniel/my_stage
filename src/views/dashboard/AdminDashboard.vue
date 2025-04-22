
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
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Graphique des revenus -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Evolution des Revenus</h3>
          <div class="flex gap-2">
            <button class="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">Mois</button>
            <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">Année</button>
          </div>
        </div>
        <canvas ref="revenueChart" class="w-full h-64"></canvas>
      </div>

      <!-- Graphique des stages -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Répartition des Stages</h3>
          <div class="flex items-center text-sm text-gray-500">
            <i class="fas fa-circle text-green-500 mr-2"></i> Actif
            <i class="fas fa-circle text-yellow-500 mx-2"></i> En attente
            <i class="fas fa-circle text-red-500 ml-2"></i> Terminé
          </div>
        </div>
        <canvas ref="stagesChart" class="w-full h-64"></canvas>
      </div>

      <!-- Activité des stagiaires -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Activité des Stagiaires</h3>
        <canvas ref="activityChart" class="w-full h-64"></canvas>
      </div>

      <!-- Performance par structure -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Performance par Structure</h3>
        <canvas ref="performanceChart" class="w-full h-64"></canvas>
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
    const stagesChart = ref(null)
    const activityChart = ref(null)
    const performanceChart = ref(null)

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
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#3B82F6',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#fff',
              titleColor: '#1f2937',
              bodyColor: '#1f2937',
              borderColor: '#e5e7eb',
              borderWidth: 1,
              padding: 12,
              displayColors: false,
              callbacks: {
                label: function(context) {
                  return context.parsed.y + ' FCFA'
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                drawBorder: false,
                color: '#f3f4f6'
              },
              ticks: {
                callback: function(value) {
                  return value + ' FCFA'
                }
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

      // Graphique des stages
      new Chart(stagesChart.value, {
        type: 'doughnut',
        data: {
          labels: ['Actif', 'En attente', 'Terminé'],
          datasets: [{
            data: [65, 25, 10],
            backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
            borderWidth: 0,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '75%',
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })

      // Graphique d'activité
      new Chart(activityChart.value, {
        type: 'bar',
        data: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          datasets: [{
            label: 'Heures de présence',
            data: [8, 7.5, 8, 6, 7, 4, 0],
            backgroundColor: '#10b981',
            borderRadius: 4
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
                drawBorder: false,
                color: '#f3f4f6'
              },
              ticks: {
                callback: function(value) {
                  return value + 'h'
                }
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

      // Graphique de performance
      new Chart(performanceChart.value, {
        type: 'radar',
        data: {
          labels: ['Communication', 'Ponctualité', 'Travail d\'équipe', 'Initiative', 'Compétences'],
          datasets: [{
            label: 'Moyenne',
            data: [85, 90, 78, 88, 82],
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            pointBackgroundColor: '#8b5cf6',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 20
              }
            }
          },
          plugins: {
            legend: {
              display: false
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

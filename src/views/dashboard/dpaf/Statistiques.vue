
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Statistiques Détaillées</h1>
    
    <!-- Statistiques générales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in generalStats" :key="stat.title" 
           class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm text-gray-600">{{ stat.title }}</p>
            <h2 class="text-3xl font-bold mt-2">{{ stat.value }}</h2>
            <p class="text-sm mt-2" :class="stat.trend >= 0 ? 'text-green-600' : 'text-red-600'">
              <i :class="stat.trend >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
              {{ Math.abs(stat.trend) }}% depuis le mois dernier
            </p>
          </div>
          <div :class="stat.iconColor" class="p-4 rounded-full">
            <i :class="stat.icon" class="text-2xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Evolution mensuelle -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Évolution mensuelle des stages</h3>
        <canvas ref="monthlyChart" height="300"></canvas>
      </div>

      <!-- Répartition par type -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Répartition par type de stage</h3>
        <canvas ref="typeChart" height="300"></canvas>
      </div>
    </div>

    <!-- Statistiques détaillées -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Par structure -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Répartition par structure</h3>
        <div class="space-y-4">
          <div v-for="structure in structureStats" :key="structure.name" class="flex items-center">
            <div class="flex-1">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium">{{ structure.name }}</span>
                <span class="text-sm text-gray-600">{{ structure.count }} stagiaires</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" :style="{ width: structure.percentage + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Par niveau d'études -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Répartition par niveau d'études</h3>
        <canvas ref="educationChart" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

export default {
  name: 'Statistiques',
  setup() {
    const monthlyChart = ref(null)
    const typeChart = ref(null)
    const educationChart = ref(null)

    const generalStats = ref([
      {
        title: 'Total des stages',
        value: '486',
        trend: 12,
        icon: 'fas fa-users',
        iconColor: 'bg-blue-100 text-blue-600'
      },
      {
        title: 'Stages en cours',
        value: '234',
        trend: 8,
        icon: 'fas fa-clock',
        iconColor: 'bg-green-100 text-green-600'
      },
      {
        title: 'Taux de completion',
        value: '92%',
        trend: 5,
        icon: 'fas fa-check-circle',
        iconColor: 'bg-yellow-100 text-yellow-600'
      },
      {
        title: 'Taux de satisfaction',
        value: '4.8/5',
        trend: -2,
        icon: 'fas fa-star',
        iconColor: 'bg-purple-100 text-purple-600'
      }
    ])

    const structureStats = ref([
      { name: 'Direction des Systèmes d\'Information', count: 45, percentage: 75 },
      { name: 'Direction Générale du Budget', count: 32, percentage: 60 },
      { name: 'Direction des Ressources Humaines', count: 28, percentage: 45 },
      { name: 'Direction de la Communication', count: 25, percentage: 40 },
      { name: 'Autres structures', count: 15, percentage: 25 }
    ])

    onMounted(() => {
      // Graphique d'évolution mensuelle
      new Chart(monthlyChart.value, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
          datasets: [{
            label: 'Nouveaux stages',
            data: [65, 59, 80, 81, 56, 55, 70, 75, 82, 85, 90, 95],
            borderColor: '#3B82F6',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      })

      // Graphique par type de stage
      new Chart(typeChart.value, {
        type: 'doughnut',
        data: {
          labels: ['Stage académique', 'Stage professionnel', 'Stage de recherche'],
          datasets: [{
            data: [45, 35, 20],
            backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6']
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

      // Graphique par niveau d'études
      new Chart(educationChart.value, {
        type: 'bar',
        data: {
          labels: ['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2', 'Doctorat'],
          datasets: [{
            label: 'Nombre de stagiaires',
            data: [30, 45, 60, 50, 40, 15],
            backgroundColor: '#60A5FA'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })
    })

    return {
      generalStats,
      structureStats,
      monthlyChart,
      typeChart,
      educationChart
    }
  }
}
</script>

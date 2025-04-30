<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Évolution mensuelle des stagiaires</h3>
        <canvas ref="monthlyChart" height="300"></canvas>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Répartition par type de stage</h3>
        <canvas ref="typeChart" height="300"></canvas>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Répartition par tuteur</h3>
        <div class="space-y-4">
          <div v-for="tuteur in tuteurStats" :key="tuteur.name" class="flex items-center">
            <div class="flex-1">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium">{{ tuteur.name }}</span>
                <span class="text-sm text-gray-600">{{ tuteur.count }} stagiaires</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" :style="{ width: tuteur.percentage + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
  name: 'StructureOverview',
  setup() {
    const monthlyChart = ref(null)
    const typeChart = ref(null)
    const educationChart = ref(null)

    const generalStats = ref([
      {
        title: 'Total des stagiaires',
        value: '24',
        trend: 15,
        icon: 'fas fa-users',
        iconColor: 'bg-blue-100 text-blue-600'
      },
      {
        title: 'Tuteurs actifs',
        value: '8',
        trend: 5,
        icon: 'fas fa-chalkboard-teacher',
        iconColor: 'bg-green-100 text-green-600'
      },
      {
        title: 'Taux de completion',
        value: '85%',
        trend: 3,
        icon: 'fas fa-check-circle',
        iconColor: 'bg-yellow-100 text-yellow-600'
      },
      {
        title: 'Taux de satisfaction',
        value: '4.5/5',
        trend: -1,
        icon: 'fas fa-star',
        iconColor: 'bg-purple-100 text-purple-600'
      }
    ])

    const tuteurStats = ref([
      { name: 'Marie Martin', count: 6, percentage: 75 },
      { name: 'Paul Dubois', count: 5, percentage: 62 },
      { name: 'Sophie Laurent', count: 4, percentage: 50 },
      { name: 'Thomas Bernard', count: 3, percentage: 37 },
      { name: 'Autres tuteurs', count: 2, percentage: 25 }
    ])

    onMounted(() => {
      // Graphique d'évolution mensuelle
      new Chart(monthlyChart.value, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [{
            label: 'Nombre de stagiaires',
            data: [15, 18, 20, 22, 24, 24],
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
          labels: ['Stage académique', 'Stage professionnel', 'Stage de fin d\'études'],
          datasets: [{
            data: [40, 35, 25],
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
          labels: ['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2'],
          datasets: [{
            label: 'Nombre de stagiaires',
            data: [4, 5, 6, 5, 4],
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
      tuteurStats,
      monthlyChart,
      typeChart,
      educationChart
    }
  }
}
</script>
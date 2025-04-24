<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Carte statistique - Stagiaires -->
      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-2xl font-bold text-gray-800">{{ stats.stagiairesActifs }}</h3>
            <p class="text-sm text-gray-600">Stagiaires actifs</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <i class="fas fa-users text-blue-500"></i>
          </div>
        </div>
      </div>

      <!-- Carte statistique - Demandes -->
      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-2xl font-bold text-gray-800">{{ stats.demandesEnCours }}</h3>
            <p class="text-sm text-gray-600">Demandes en cours</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <i class="fas fa-clipboard-list text-green-500"></i>
          </div>
        </div>
      </div>

      <!-- Carte statistique - Structures -->
      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-2xl font-bold text-gray-800">{{ stats.structures }}</h3>
            <p class="text-sm text-gray-600">Structures actives</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <i class="fas fa-building text-purple-500"></i>
          </div>
        </div>
      </div>

      <!-- Carte statistique - Taux d'acceptation -->
      <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-2xl font-bold text-gray-800">{{ stats.tauxAcceptation }}%</h3>
            <p class="text-sm text-gray-600">Taux d'acceptation</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <i class="fas fa-chart-line text-yellow-500"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Graphique - Évolution des demandes -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Évolution des demandes</h3>
        <canvas ref="demandesChart" height="300"></canvas>
      </div>

      <!-- Graphique - Répartition par structure -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Répartition par structure</h3>
        <canvas ref="structuresChart" height="300"></canvas>
      </div>

      <!-- Graphique - Types de stages -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Types de stages</h3>
        <canvas ref="typesChart" height="300"></canvas>
      </div>

      <!-- Graphique - Statut des demandes -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Statut des demandes</h3>
        <canvas ref="statutChart" height="300"></canvas>
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
    const demandesChart = ref(null)
    const structuresChart = ref(null)
    const typesChart = ref(null)
    const statutChart = ref(null)

    const stats = ref({
      stagiairesActifs: 245,
      demandesEnCours: 78,
      structures: 12,
      tauxAcceptation: 85
    })

    const initCharts = () => {
      // Graphique d'évolution des demandes
      new Chart(demandesChart.value.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [{
            label: 'Demandes reçues',
            data: [65, 78, 90, 85, 95, 110],
            borderColor: '#3B82F6',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })

      // Graphique de répartition par structure
      new Chart(structuresChart.value.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['DSI', 'DRH', 'DAF', 'DPAF', 'DC'],
          datasets: [{
            data: [25, 18, 22, 15, 20],
            backgroundColor: [
              '#3B82F6',
              '#8B5CF6',
              '#EC4899',
              '#10B981',
              '#F59E0B'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })

      // Graphique des types de stages
      new Chart(typesChart.value.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Stage académique', 'Stage professionnel'],
          datasets: [{
            data: [65, 35],
            backgroundColor: ['#3B82F6', '#10B981']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })

      // Graphique de statut des demandes
      new Chart(statutChart.value.getContext('2d'), {
        type: 'pie',
        data: {
          labels: ['En attente', 'Acceptées', 'Refusées'],
          datasets: [{
            data: [30, 55, 15],
            backgroundColor: ['#F59E0B', '#10B981', '#EF4444']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })
    }

    onMounted(() => {
      initCharts()
    })

    return {
      stats,
      demandesChart,
      structuresChart,
      typesChart,
      statutChart
    }
  }
}
</script>

<style scoped>
.transform {
  transition: all 0.2s ease-in-out;
}

/* Animation des cartes au survol */
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
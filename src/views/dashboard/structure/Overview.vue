
<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-blue-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Stagiaires actifs</p>
            <h2 class="text-4xl font-bold">{{ stats.stagiairesActifs }}</h2>
            <p class="text-sm mt-2" :class="stats.stagiairesTrend >= 0 ? 'text-white' : 'text-red-200'">
              <i :class="stats.stagiairesTrend >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
              {{ Math.abs(stats.stagiairesTrend) }}% ce mois
            </p>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-user-graduate"></i>
          </div>
        </div>
      </div>

      <div class="bg-green-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Tuteurs actifs</p>
            <h2 class="text-4xl font-bold">{{ stats.tuteursActifs }}</h2>
            <p class="text-sm mt-2" :class="stats.tuteursTrend >= 0 ? 'text-white' : 'text-red-200'">
              <i :class="stats.tuteursTrend >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
              {{ Math.abs(stats.tuteursTrend) }}% ce mois
            </p>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-chalkboard-teacher"></i>
          </div>
        </div>
      </div>

      <div class="bg-yellow-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Taux de complétion</p>
            <h2 class="text-4xl font-bold">{{ stats.tauxCompletion }}%</h2>
            <p class="text-sm mt-2" :class="stats.completionTrend >= 0 ? 'text-white' : 'text-red-200'">
              <i :class="stats.completionTrend >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
              {{ Math.abs(stats.completionTrend) }}% ce mois
            </p>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-chart-line"></i>
          </div>
        </div>
      </div>

      <div class="bg-purple-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Satisfaction</p>
            <h2 class="text-4xl font-bold">{{ stats.satisfaction }}/5</h2>
            <p class="text-sm mt-2" :class="stats.satisfactionTrend >= 0 ? 'text-white' : 'text-red-200'">
              <i :class="stats.satisfactionTrend >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
              {{ Math.abs(stats.satisfactionTrend) }}% ce mois
            </p>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-star"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Répartition des stages par type</h3>
        <canvas ref="typeStageChart" height="300"></canvas>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold mb-4">Évolution mensuelle des stagiaires</h3>
        <canvas ref="evolutionChart" height="300"></canvas>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h2 class="text-lg font-medium text-gray-900">Stagiaires actuels</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type de Stage</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Début</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Fin</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tuteur</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progression</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="stagiaire in stagiaires" :key="stagiaire.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ stagiaire.nom }}</div>
                <div class="text-sm text-gray-500">{{ stagiaire.email }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ stagiaire.typeStage }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(stagiaire.dateDebut) }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(stagiaire.dateFin) }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ stagiaire.tuteur }}</td>
              <td class="px-6 py-4">
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: stagiaire.progression + '%' }"></div>
                </div>
                <span class="text-xs text-gray-500">{{ stagiaire.progression }}%</span>
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
  name: 'StructureOverview',
  setup() {
    const typeStageChart = ref(null)
    const evolutionChart = ref(null)

    const stats = ref({
      stagiairesActifs: 5,
      stagiairesTrend: 12,
      tuteursActifs: 3,
      tuteursTrend: 8,
      tauxCompletion: 85,
      completionTrend: 5,
      satisfaction: 4.8,
      satisfactionTrend: -2
    })

    const stagiaires = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        typeStage: 'Stage académique',
        dateDebut: '2024-02-01',
        dateFin: '2024-04-30',
        tuteur: 'Marie Martin',
        progression: 75
      },
      {
        id: 2,
        nom: 'Alice Bernard',
        email: 'alice.bernard@email.com',
        typeStage: 'Stage professionnel',
        dateDebut: '2024-03-01',
        dateFin: '2024-05-31',
        tuteur: 'Paul Dubois',
        progression: 45
      }
    ])

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR')
    }

    onMounted(() => {
      // Graphique de répartition des types de stage
      new Chart(typeStageChart.value, {
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

      // Graphique d'évolution mensuelle
      new Chart(evolutionChart.value, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [{
            label: 'Nombre de stagiaires',
            data: [4, 6, 8, 5, 7, 5],
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
    })

    return {
      stats,
      stagiaires,
      formatDate,
      typeStageChart,
      evolutionChart
    }
  }
}
</script>


<template>
  <div class="p-6 bg-gray-50 overflow-x-hidden">
    <!-- En-tête avec stats temps réel -->
    <div class="mb-8" data-aos="fade-right">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Tableau de bord</h1>
      <p class="text-gray-600">Vue d'ensemble de l'activité</p>
    </div>

    <!-- Cartes statistiques avec animations -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-transform duration-200" 
           data-aos="zoom-in" data-aos-delay="100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Stagiaires Actifs</p>
            <h3 class="text-2xl font-bold text-gray-800">{{ stats.stagiaires }}</h3>
            <p class="text-xs text-green-500 mt-1">+{{ stats.nouveauxStagiaires }} cette semaine</p>
          </div>
          <div class="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
            <i class="fas fa-user-graduate text-xl text-blue-500"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-transform duration-200"
           data-aos="zoom-in" data-aos-delay="200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Tuteurs</p>
            <h3 class="text-2xl font-bold text-gray-800">{{ stats.tuteurs }}</h3>
            <p class="text-xs text-purple-500 mt-1">{{ stats.tuteursDispo }} disponibles</p>
          </div>
          <div class="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full">
            <i class="fas fa-chalkboard-teacher text-xl text-purple-500"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500 transform hover:scale-105 transition-transform duration-200"
           data-aos="zoom-in" data-aos-delay="300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Stages en cours</p>
            <h3 class="text-2xl font-bold text-gray-800">{{ stats.stagesEnCours }}</h3>
            <p class="text-xs text-green-500 mt-1">{{ stats.stagesTermines }} terminés</p>
          </div>
          <div class="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
            <i class="fas fa-briefcase text-xl text-green-500"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500 transform hover:scale-105 transition-transform duration-200"
           data-aos="zoom-in" data-aos-delay="400">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Demandes en attente</p>
            <h3 class="text-2xl font-bold text-gray-800">{{ stats.demandesEnAttente }}</h3>
            <p class="text-xs text-yellow-500 mt-1">{{ stats.demandesTraitees }} traitées aujourd'hui</p>
          </div>
          <div class="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full">
            <i class="fas fa-clock text-xl text-yellow-500"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow-sm p-6" data-aos="fade-up">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-800">Activité des stagiaires</h3>
          <div class="flex gap-2">
            <button @click="periodeActivite = 'semaine'" 
                    :class="['px-3 py-1 text-sm rounded-full transition-colors', 
                    periodeActivite === 'semaine' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100']">
              Semaine
            </button>
            <button @click="periodeActivite = 'mois'"
                    :class="['px-3 py-1 text-sm rounded-full transition-colors',
                    periodeActivite === 'mois' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100']">
              Mois
            </button>
          </div>
        </div>
        <canvas ref="activityChart" class="w-full h-64"></canvas>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6" data-aos="fade-up" data-aos-delay="100">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-800">Répartition par structure</h3>
          <div class="flex items-center text-sm text-gray-500">
            <span class="w-3 h-3 rounded-full bg-blue-500 mr-1"></span> Actifs
            <span class="w-3 h-3 rounded-full bg-gray-300 mx-2"></span> Places disponibles
          </div>
        </div>
        <canvas ref="structuresChart" class="w-full h-64"></canvas>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6" data-aos="fade-up" data-aos-delay="200">
        <h3 class="text-lg font-semibold text-gray-800 mb-6">Satisfaction des stagiaires</h3>
        <canvas ref="satisfactionChart" class="w-full h-64"></canvas>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6" data-aos="fade-up" data-aos-delay="300">
        <h3 class="text-lg font-semibold text-gray-800 mb-6">Types de stages</h3>
        <canvas ref="typesChart" class="w-full h-64"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import AOS from 'aos'

export default {
  name: 'AdminDashboard',
  setup() {
    const activityChart = ref(null)
    const structuresChart = ref(null)
    const satisfactionChart = ref(null)
    const typesChart = ref(null)
    const periodeActivite = ref('semaine')

    const stats = reactive({
      stagiaires: 487,
      nouveauxStagiaires: 24,
      tuteurs: 168,
      tuteursDispo: 45,
      stagesEnCours: 312,
      stagesTermines: 175,
      demandesEnAttente: 56,
      demandesTraitees: 12
    })

    const initCharts = () => {
      // Configuration des graphiques avec des animations fluides
      const commonOptions = {
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart'
        }
      }

      // Graphique d'activité
      new Chart(activityChart.value, {
        type: 'line',
        data: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          datasets: [{
            label: 'Connexions',
            data: [65, 78, 82, 74, 85, 45, 30],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          ...commonOptions,
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
              }
            }
          }
        }
      })

      // Graphique des structures
      new Chart(structuresChart.value, {
        type: 'bar',
        data: {
          labels: ['DSI', 'DRH', 'DAF', 'DPAF', 'DC'],
          datasets: [{
            label: 'Stagiaires actifs',
            data: [45, 32, 28, 35, 25],
            backgroundColor: '#3B82F6'
          }, {
            label: 'Places disponibles',
            data: [15, 8, 12, 5, 10],
            backgroundColor: '#E5E7EB'
          }]
        },
        options: {
          ...commonOptions,
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              beginAtZero: true
            }
          }
        }
      })

      // Graphique de satisfaction
      new Chart(satisfactionChart.value, {
        type: 'doughnut',
        data: {
          labels: ['Très satisfait', 'Satisfait', 'Neutre', 'Insatisfait'],
          datasets: [{
            data: [45, 35, 15, 5],
            backgroundColor: ['#22C55E', '#3B82F6', '#F59E0B', '#EF4444']
          }]
        },
        options: {
          ...commonOptions,
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      })

      // Graphique des types de stages
      new Chart(typesChart.value, {
        type: 'radar',
        data: {
          labels: ['Développement', 'Design', 'Support', 'Administration', 'Réseau', 'Sécurité'],
          datasets: [{
            label: 'Répartition',
            data: [85, 65, 45, 55, 60, 70],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3B82F6',
            pointBackgroundColor: '#3B82F6'
          }]
        },
        options: {
          ...commonOptions,
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      })
    }

    onMounted(() => {
      AOS.init({
        duration: 1000,
        once: true
      })
      // Attendre que le DOM soit complètement chargé
      nextTick(() => {
        if (activityChart.value && 
            structuresChart.value && 
            satisfactionChart.value && 
            typesChart.value) {
          initCharts()
        }
      })
    })

    return {
      activityChart,
      structuresChart,
      satisfactionChart,
      typesChart,
      periodeActivite,
      stats
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

<template>
  <div class="space-y-6">
    <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
           data-aos="fade-up" data-aos-delay="100">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm font-medium text-gray-600">Demandes en attente</p>
            <p class="text-3xl font-bold text-primary mt-2">{{ stats.demandesEnAttente }}</p>
          </div>
          <div class="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
            <i class="fas fa-clock text-xl text-primary"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center">
            <span class="text-green-500 text-sm font-medium">
              <i class="fas fa-arrow-up mr-1"></i>+5%
            </span>
            <span class="text-gray-500 text-sm ml-2">vs la semaine dernière</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
           data-aos="fade-up" data-aos-delay="200">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm font-medium text-gray-600">Stages en cours</p>
            <p class="text-3xl font-bold text-secondary mt-2">{{ stats.stagesEnCours }}</p>
          </div>
          <div class="w-12 h-12 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center">
            <i class="fas fa-user-graduate text-xl text-secondary"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center">
            <span class="text-green-500 text-sm font-medium">
              <i class="fas fa-arrow-up mr-1"></i>+12%
            </span>
            <span class="text-gray-500 text-sm ml-2">vs le mois dernier</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
           data-aos="fade-up" data-aos-delay="300">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm font-medium text-gray-600">Structures actives</p>
            <p class="text-3xl font-bold text-accent-yellow mt-2">{{ stats.structuresActives }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <i class="fas fa-building text-xl text-yellow-600"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center">
            <span class="text-gray-500 text-sm">
              <i class="fas fa-equals mr-1"></i>Stable
            </span>
            <span class="text-gray-500 text-sm ml-2">ce mois-ci</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
           data-aos="fade-up" data-aos-delay="400">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm font-medium text-gray-600">Taux d'acceptation</p>
            <p class="text-3xl font-bold text-success mt-2">{{ stats.tauxAcceptation }}%</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <i class="fas fa-chart-line text-xl text-green-600"></i>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center">
            <span class="text-red-500 text-sm font-medium">
              <i class="fas fa-arrow-down mr-1"></i>-2%
            </span>
            <span class="text-gray-500 text-sm ml-2">vs le mois dernier</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Demandes par mois -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Évolution des demandes</h3>
        <div class="h-80">
          <!-- Intégrer ici un graphique (Chart.js ou autre) -->
          <div class="w-full h-full bg-gray-50 rounded flex items-center justify-center">
            <p class="text-gray-500">Graphique des demandes par mois</p>
          </div>
        </div>
      </div>

      <!-- Répartition par type de stage -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Répartition par type de stage</h3>
        <div class="h-80">
          <!-- Intégrer ici un graphique circulaire -->
          <div class="w-full h-full bg-gray-50 rounded flex items-center justify-center">
            <p class="text-gray-500">Graphique de répartition des types de stage</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Dernières activités -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Dernières activités</h3>
        <button class="text-primary hover:text-primary-dark">
          Voir tout <i class="fas fa-arrow-right ml-1"></i>
        </button>
      </div>
      
      <div class="space-y-4">
        <div v-for="(activite, index) in dernieresActivites" :key="index" 
             class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
          <div class="flex-shrink-0">
            <div :class="getActivityIconClass(activite.type)" class="w-8 h-8 rounded-full flex items-center justify-center">
              <i :class="getActivityIcon(activite.type)" class="text-sm"></i>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm text-gray-900">{{ activite.message }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ formatDate(activite.date) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'DashboardOverview',
  setup() {
    const stats = ref({
      demandesEnAttente: 12,
      stagesEnCours: 45,
      structuresActives: 8,
      tauxAcceptation: 85
    })

    const dernieresActivites = ref([
      {
        type: 'nouvelle_demande',
        message: 'Nouvelle demande de stage reçue de Jean Dupont',
        date: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      },
      {
        type: 'validation',
        message: 'Demande de stage approuvée pour Marie Martin',
        date: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      },
      {
        type: 'nouvelle_structure',
        message: 'Nouvelle structure ajoutée : Direction des Impôts',
        date: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
      }
    ])

    const getActivityIconClass = (type) => {
      const classes = {
        nouvelle_demande: 'bg-blue-100 text-blue-600',
        validation: 'bg-green-100 text-green-600',
        nouvelle_structure: 'bg-yellow-100 text-yellow-600',
        refus: 'bg-red-100 text-red-600'
      }
      return classes[type] || 'bg-gray-100 text-gray-600'
    }

    const getActivityIcon = (type) => {
      const icons = {
        nouvelle_demande: 'fas fa-file-alt',
        validation: 'fas fa-check',
        nouvelle_structure: 'fas fa-building',
        refus: 'fas fa-times'
      }
      return icons[type] || 'fas fa-circle'
    }

    const formatDate = (date) => {
      const now = new Date()
      const diff = now - date
      
      if (diff < 1000 * 60) {
        return 'À l\'instant'
      } else if (diff < 1000 * 60 * 60) {
        const minutes = Math.floor(diff / (1000 * 60))
        return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
      } else if (diff < 1000 * 60 * 60 * 24) {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`
      } else {
        return date.toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    }

    onMounted(() => {
      // Charger les données réelles ici
    })

    return {
      stats,
      dernieresActivites,
      getActivityIconClass,
      getActivityIcon,
      formatDate
    }
  }
}
</script> 
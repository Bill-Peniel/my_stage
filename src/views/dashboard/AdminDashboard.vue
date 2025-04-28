<template>
  <div class="p-6 bg-gray-50 overflow-x-hidden">
    <!-- En-tête avec notifications -->
    <div class="flex justify-end mb-6">
      <div class="relative" ref="notificationMenu">
        <button @click="toggleNotificationMenu" class="relative text-gray-700 hover:text-green-800 focus:outline-none">
          <i class="fas fa-bell text-xl"></i>
          <span v-if="notifications.length > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {{ notifications.length }}
          </span>
        </button>
        <div v-show="showNotificationMenu" class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20">
          <div class="px-4 py-2 border-b border-gray-200">
            <h3 class="text-lg font-semibold">Notifications</h3>
          </div>
          <div class="max-h-64 overflow-y-auto">
            <div v-for="notification in notifications" :key="notification.id" class="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0">
              <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ notification.message }}</p>
            </div>
          </div>
          <div class="px-4 py-2 border-t border-gray-200">
            <router-link to="/dashboard/notifications" class="block text-center text-sm text-primary hover:text-primary-dark">
              Voir toutes les notifications
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- En-tête avec statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-blue-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div class="w-full">
            <p class="text-sm opacity-75">Demandes en attente</p>
            <h2 class="text-4xl font-bold mb-2">12</h2>
            <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
              <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 40%"></div>
            </div>
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
          <div class="w-full">
            <p class="text-sm opacity-75">Stages en cours</p>
            <h2 class="text-4xl font-bold mb-2">8</h2>
            <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
              <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 65%"></div>
            </div>
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
          <div class="w-full">
            <p class="text-sm opacity-75">Stagiaires actifs</p>
            <h2 class="text-4xl font-bold mb-2">24</h2>
            <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
              <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 75%"></div>
            </div>
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
          <div class="w-full">
            <p class="text-sm opacity-75">Structures partenaires</p>
            <h2 class="text-4xl font-bold mb-2">15</h2>
            <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
              <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 55%"></div>
            </div>
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

    <!-- Tableau des tuteurs récents -->
    <div class="mt-8 bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Tuteurs récents</h3>
        <router-link to="/dashboard/tuteurs" class="text-primary hover:text-primary-dark">
          Voir plus <i class="fas fa-arrow-right ml-1"></i>
        </router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Structure</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4">Jean Dupont</td>
              <td class="px-6 py-4">Direction des Systèmes d'Information</td>
              <td class="px-6 py-4">jean.dupont@example.com</td>
              <td class="px-6 py-4">+229 97000001</td>
            </tr>
            <tr>
              <td class="px-6 py-4">Marie Martin</td>
              <td class="px-6 py-4">Direction Administrative et Financière</td>
              <td class="px-6 py-4">marie.martin@example.com</td>
              <td class="px-6 py-4">+229 97000002</td>
            </tr>
            <tr>
              <td class="px-6 py-4">Paul Bernard</td>
              <td class="px-6 py-4">Direction des Ressources Humaines</td>
              <td class="px-6 py-4">paul.bernard@example.com</td>
              <td class="px-6 py-4">+229 97000003</td>
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
  name: 'AdminDashboard',
  setup() {
    const donutChart = ref(null)
    const barChart = ref(null)
    const notificationMenu = ref(null)
    const showNotificationMenu = ref(false)
    const notifications = ref([
      {
        id: 1,
        title: 'Nouvelle demande de stage',
        message: 'Une nouvelle demande a été soumise par Jean Dupont'
      },
      {
        id: 2,
        title: 'Rappel',
        message: 'Validation en attente pour 3 demandes de stage'
      }
    ])

    const toggleNotificationMenu = () => {
      showNotificationMenu.value = !showNotificationMenu.value
    }

    onMounted(() => {
      document.addEventListener('click', (e) => {
        if (notificationMenu.value && !notificationMenu.value.contains(e.target)) {
          showNotificationMenu.value = false
        }
      })

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
          borderColor: '#FF0000',
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
          tension: 0.4
        },
        {
          label: 'Demandes validées',
          data: [10, 18, 25, 30, 35, 40, 43, 46, 50, 53, 56, 60],
          borderColor: '#00FF00',
          backgroundColor: 'rgba(0, 255, 0, 0.7)',
          tension: 0.4
        },
        {
          label: 'Demandes rejetées',
          data: [5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 32],
          borderColor: '#0000FF',
          backgroundColor: 'rgba(0, 0, 255, 0.7)',
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
      barChart,
      notificationMenu,
      showNotificationMenu,
      notifications,
      toggleNotificationMenu
    }
  }
}
</script>

<style scoped>
.transform {
  transition: all 0.2s ease-in-out;
}
</style>
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-primary shadow fixed top-0 w-full z-20">
      <div class="px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img src="@/assets/finance-logo1.png" alt="Logo du ministère" class="h-12 w-auto" />
          <h1 class="text-2xl font-bold text-white">DPAF - Gestion des Stages</h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-white">{{ store.getters.roleDisplay }}</span>

          <!-- Notification Icon and Dropdown -->
          <div class="relative" ref="notifMenu">
            <button @click="toggleNotifMenu" class="text-white hover:text-accent-yellow relative">
              <i class="fas fa-bell text-xl"></i>
              <span v-if="unreadNotifications > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {{ unreadNotifications }}
              </span>
            </button>
            <div v-show="showNotifMenu" class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 max-h-96 overflow-y-auto">
              <div class="px-4 py-2 border-b border-gray-200">
                <div class="flex justify-between items-center">
                  <h3 class="text-sm font-semibold text-gray-700">Notifications</h3>
                  <button @click="markAllAsRead" class="text-xs text-primary hover:text-primary-dark">
                    Tout marquer comme lu
                  </button>
                </div>
              </div>
              <div v-if="notifications.length === 0" class="px-4 py-3 text-sm text-gray-500">
                Aucune notification
              </div>
              <div v-else>
                <div v-for="notif in notifications" :key="notif.id" 
                     class="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
                     :class="{ 'bg-blue-50': !notif.read }">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <span class="inline-flex items-center justify-center h-8 w-8 rounded-full" 
                            :class="getNotificationTypeClass(notif.type)">
                        <i class="fas" :class="getNotificationIcon(notif.type)"></i>
                      </span>
                    </div>
                    <div class="ml-3 w-0 flex-1">
                      <p class="text-sm font-medium text-gray-900" :class="{ 'font-bold': !notif.read }">
                        {{ notif.title }}
                      </p>
                      <p class="mt-1 text-xs text-gray-500">{{ notif.message }}</p>
                      <p class="mt-1 text-xs text-gray-400">{{ formatNotifDate(notif.date) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-2 border-t border-gray-200">
                <router-link to="/dashboard/dpaf/notifications" class="text-xs text-primary hover:text-primary-dark block text-center">
                  Voir toutes les notifications
                </router-link>
              </div>
            </div>
          </div>

          <div class="relative" ref="userMenu">
            <button @click="toggleUserMenu" class="flex items-center space-x-3 focus:outline-none">
              <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition">
                <span class="text-sm font-medium">{{ userInitials }}</span>
              </div>
            </button>
            <div v-show="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-user mr-2"></i> Mon profil
              </a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-cog mr-2"></i> Paramètres
              </a>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                <i class="fas fa-sign-out-alt mr-2"></i> Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex pt-16">
      <Sidebar class="fixed left-0 top-16 h-[calc(100vh-4rem)] z-10" />

      <div class="flex-1 ml-16 p-6 bg-gray-50 transition-all duration-300">
        <router-view v-if="$route.path !== '/dashboard/dpaf'" />
        <div v-else>
          <!-- Statistiques -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-blue-500 text-white rounded-lg p-6 shadow-sm">
              <div class="flex justify-between items-center">
                <div class="w-full">
                  <p class="text-sm opacity-75">Nouvelles demandes</p>
                  <h2 class="text-4xl font-bold mb-2">{{ stats.nouveaux }}</h2>
                  <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
                    <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 40%"></div>
                  </div>
                </div>
                <div class="text-3xl opacity-75 rotate-on-hover">
                  <i class="fas fa-file-alt"></i>
                </div>
              </div>
              <p class="mt-4 text-sm">
                <router-link to="/dashboard/dpaf/nouvelles-demandes" class="opacity-75 hover:opacity-100">
                  Voir les demandes <i class="fas fa-arrow-right ml-1"></i>
                </router-link>
              </p>
            </div>

            <div class="bg-green-500 text-white rounded-lg p-6 shadow-sm">
              <div class="flex justify-between items-center">
                <div class="w-full">
                  <p class="text-sm opacity-75">Stages en cours</p>
                  <h2 class="text-4xl font-bold mb-2">{{ stats.enCours }}</h2>
                  <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
                    <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 65%"></div>
                  </div>
                </div>
                <div class="text-3xl opacity-75 rotate-on-hover">
                  <i class="fas fa-user-graduate"></i>
                </div>
              </div>
              <p class="mt-4 text-sm">
                <router-link to="/dashboard/dpaf/affectations" class="opacity-75 hover:opacity-100">
                  Voir les stages <i class="fas fa-arrow-right ml-1"></i>
                </router-link>
              </p>
            </div>

            <div class="bg-yellow-500 text-white rounded-lg p-6 shadow-sm">
              <div class="flex justify-between items-center">
                <div class="w-full">
                  <p class="text-sm opacity-75">Stages terminés</p>
                  <h2 class="text-4xl font-bold mb-2">{{ stats.confirmes }}</h2>
                  <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
                    <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 75%"></div>
                  </div>
                </div>
                <div class="text-3xl opacity-75 rotate-on-hover">
                  <i class="fas fa-check-circle"></i>
                </div>
              </div>
              <p class="mt-4 text-sm">
                <router-link to="/dashboard/dpaf/historique" class="opacity-75 hover:opacity-100">
                  Voir l'historique <i class="fas fa-arrow-right ml-1"></i>
                </router-link>
              </p>
            </div>

            <div class="bg-red-500 text-white rounded-lg p-6 shadow-sm">
              <div class="flex justify-between items-center">
                <div class="w-full">
                  <p class="text-sm opacity-75">Demandes refusées</p>
                  <h2 class="text-4xl font-bold mb-2">{{ stats.refuses }}</h2>
                  <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
                    <div class="bg-white h-2.5 rounded-full animate-progress" style="width: 55%"></div>
                  </div>
                </div>
                <div class="text-3xl opacity-75 rotate-on-hover">
                  <i class="fas fa-times-circle"></i>
                </div>
              </div>
              <p class="mt-4 text-sm">
                <router-link to="/dashboard/dpaf/historique" class="opacity-75 hover:opacity-100">
                  Voir les refus <i class="fas fa-arrow-right ml-1"></i>
                </router-link>
              </p>
            </div>
          </div>

          <!-- Graphiques -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow-sm p-6 chart-container">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Répartition par structure</h3>
                <button class="text-gray-400 hover:text-gray-600">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
              </div>
              <canvas ref="donutChart" class="max-h-80"></canvas>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6 chart-container">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Évolution des demandes</h3>
                <button class="text-gray-400 hover:text-gray-600">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
              </div>
              <canvas ref="barChart" class="max-h-80"></canvas>
            </div>
          </div>

          <!-- Liste des dernières demandes -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h2 class="text-lg font-medium text-gray-900">Dernières demandes reçues</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stagiaire</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Structure Demandée</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type de Stage</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Soumission</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="demande in recentDemandes" :key="demande.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <div class="text-sm text-gray-900">{{ demande.nom }}</div>
                      <div class="text-sm text-gray-500">{{ demande.email }}</div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ demande.structure }}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ demande.typeStage }}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(demande.dateSoumission) }}</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                            :class="getStatusClass(demande.status)">
                        {{ getStatusLabel(demande.status) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm font-medium space-x-2">
                      <button @click="viewDetails(demande)" class="text-primary hover:text-primary-dark">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button v-if="canConfirm(demande)" @click="confirmDemande(demande)"
                              class="text-success hover:text-green-700">
                        <i class="fas fa-check"></i>
                      </button>
                      <button v-if="canReject(demande)" @click="rejectDemande(demande)"
                              class="text-danger hover:text-red-700">
                        <i class="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Chart from 'chart.js/auto'
import Sidebar from '../../components/SidebarDpaf.vue'

export default {
  name: 'DpafDashboard',
  components: {
    Sidebar
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const showUserMenu = ref(false)
    const showNotifMenu = ref(false)
    const userMenu = ref(null)
    const notifMenu = ref(null)
    const unreadNotifications = ref(2)

    const notifications = ref([
      {
        id: 1,
        type: 'info',
        title: 'Nouvelle demande',
        message: 'Une nouvelle demande de stage a été soumise',
        date: new Date(),
        read: false
      },
      {
        id: 2,
        type: 'warning',
        title: 'Rappel',
        message: 'Évaluation de stage en attente',
        date: new Date(Date.now() - 3600000),
        read: true
      }
    ])

    const getNotificationTypeClass = (type) => {
      const classes = {
        info: 'bg-blue-100 text-blue-600',
        success: 'bg-green-100 text-green-600',
        warning: 'bg-yellow-100 text-yellow-600',
        error: 'bg-red-100 text-red-600'
      }
      return classes[type] || classes.info
    }

    const getNotificationIcon = (type) => {
      const icons = {
        info: 'fa-info',
        success: 'fa-check',
        warning: 'fa-exclamation',
        error: 'fa-times'
      }
      return icons[type] || icons.info
    }

    const formatNotifDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const toggleNotifMenu = () => {
      showNotifMenu.value = !showNotifMenu.value
      if (showUserMenu.value) showUserMenu.value = false
    }

    const markAllAsRead = () => {
      notifications.value.forEach(notif => {
        notif.read = true
      })
      unreadNotifications.value = 0
    }

    const userInitials = computed(() => {
      const user = store.state.user
      if (!user || !user.name)
      return user.name.charAt(0).toUpperCase()
    })


    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
    }

    // Close menu when clicking outside
    onMounted(() => {
      document.addEventListener('click', (e) => {
        if (userMenu.value && !userMenu.value.contains(e.target)) {
          showUserMenu.value = false
        }
        if (notifMenu.value && !notifMenu.value.contains(e.target)) {
          showNotifMenu.value = false
        }
      })
    })
    const donutChart = ref(null)
    const barChart = ref(null)

    const stats = ref({
      nouveaux: 12,
      enCours: 8,
      confirmes: 15,
      refuses: 5
    })

    const recentDemandes = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        structure: "Direction des Systèmes d'Information",
        typeStage: 'Stage académique',
        dateSoumission: '2024-03-15',
        status: 'nouveau'
      },
      {
        id: 2,
        nom: 'Marie Martin',
        email: 'marie.martin@email.com',
        structure: 'Direction Générale du Budget',
        typeStage: 'Stage professionnel',
        dateSoumission: '2024-03-14',
        status: 'en_cours'
      }
    ])

    onMounted(() => {
      // Graphique donut des structures
      new Chart(donutChart.value, {
        type: 'doughnut',
        data: {
          labels: ['DSI', 'DGB', 'DGID', 'DRH', 'DAF', 'Autres'],
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
      new Chart(barChart.value, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
          datasets: [
            {
              label: 'Demandes reçues',
              data: [65, 59, 80, 81, 56, 55],
              backgroundColor: '#36A2EB'
            },
            {
              label: 'Demandes traitées',
              data: [45, 49, 60, 71, 46, 45],
              backgroundColor: '#FF6384'
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

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR')
    }

    const getStatusClass = (status) => {
      const classes = {
        nouveau: 'bg-blue-100 text-blue-800',
        en_cours: 'bg-yellow-100 text-yellow-800',
        confirme: 'bg-green-100 text-green-800',
        refuse: 'bg-red-100 text-red-800'
      }
      return classes[status] || ''
    }

    const getStatusLabel = (status) => {
      const labels = {
        nouveau: 'Nouveau',
        en_cours: 'En cours',
        confirme: 'Confirmé',
        refuse: 'Refusé'
      }
      return labels[status] || status
    }

    const canConfirm = (demande) => ['nouveau', 'en_cours'].includes(demande.status)
    const canReject = (demande) => ['nouveau', 'en_cours'].includes(demande.status)

    const viewDetails = (demande) => {
      console.log('Voir détails:', demande.id)
    }

    const confirmDemande = (demande) => {
      console.log('Confirmer demande:', demande.id)
    }

    const rejectDemande = (demande) => {
      console.log('Refuser demande:', demande.id)
    }

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    return {
      store,
      stats,
      recentDemandes,
      donutChart,
      barChart,
      formatDate,
      getStatusClass,
      getStatusLabel,
      canConfirm,
      canReject,
      viewDetails,
      confirmDemande,
      rejectDemande,
      logout,
      showUserMenu,
      showNotifMenu,
      toggleUserMenu,
      toggleNotifMenu,
      userMenu,
      notifMenu,
      userInitials,
      notifications,
      unreadNotifications,
      getNotificationTypeClass,
      getNotificationIcon,
      formatNotifDate,
      markAllAsRead
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-primary shadow fixed top-0 w-full z-20">
      <div class="px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img src="@/assets/finance-logo1.png" alt="Logo du ministère" class="h-12 w-auto" />
          <h1 class="text-2xl font-bold text-white">Structure - Gestion des Stages</h1>
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
                <router-link to="/dashboard/structure/notifications" class="text-xs text-primary hover:text-primary-dark block text-center">
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
              <router-link to="/dashboard/structure/profil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-user mr-2"></i> Mon profil
              </router-link>
              <router-link to="/dashboard/structure/parametres" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-cog mr-2"></i> Paramètres
              </router-link>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                <i class="fas fa-sign-out-alt mr-2"></i> Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex pt-20">
      <SidebarStructure class="fixed left-0 top-16 h-[calc(100vh-4rem)] z-10" />
      
      <div class="flex-1 md:ml-64 p-6 bg-gray-50">
        <router-view v-if="$route.path !== '/dashboard/structure'" />
        <div v-else>
          <!-- Statistiques -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div class="bg-blue-500 text-white rounded-lg p-6 shadow-sm">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm opacity-75">Stagiaires actifs</p>
                  <h2 class="text-4xl font-bold">{{ stats.stagiairesActifs }}</h2>
                </div>
                <div class="text-3xl opacity-75">
                  <i class="fas fa-user-graduate"></i>
                </div>
              </div>
            </div>

            <div class="bg-green-500 text-white rounded-lg p-6 shadow-sm">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm opacity-75">Évaluations en attente</p>
                  <h2 class="text-4xl font-bold">{{ stats.evaluationsEnAttente }}</h2>
                </div>
                <div class="text-3xl opacity-75">
                  <i class="fas fa-clipboard-check"></i>
                </div>
              </div>
            </div>

            <div class="bg-yellow-500 text-white rounded-lg p-6 shadow-sm">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm opacity-75">Stages terminés</p>
                  <h2 class="text-4xl font-bold">{{ stats.stagesTermines }}</h2>
                </div>
                <div class="text-3xl opacity-75">
                  <i class="fas fa-flag-checkered"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Liste des stagiaires -->
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
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
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
                    <td class="px-6 py-4 text-sm font-medium space-x-2">
                      <button class="text-primary hover:text-primary-dark">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="text-success hover:text-green-700">
                        <i class="fas fa-clipboard-check"></i>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SidebarStructure from '@/components/SidebarStructure.vue'

export default {
  name: 'StructureDashboard',
  components: {
    SidebarStructure
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const showUserMenu = ref(false)
    const showNotifMenu = ref(false)
    const userMenu = ref(null)
    const notifMenu = ref(null)
    const unreadNotifications = ref(2)

    const stats = ref({
      stagiairesActifs: 5,
      evaluationsEnAttente: 2,
      stagesTermines: 8
    })

    const notifications = ref([
      {
        id: 1,
        type: 'info',
        title: 'Nouveau stagiaire',
        message: 'Un nouveau stagiaire a été affecté à votre structure',
        date: new Date(),
        read: false
      },
      {
        id: 2,
        type: 'warning',
        title: 'Évaluation en attente',
        message: 'Une évaluation de stage est en attente',
        date: new Date(Date.now() - 3600000),
        read: true
      }
    ])

    const stagiaires = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        typeStage: 'Stage académique',
        dateDebut: '2024-02-01',
        dateFin: '2024-04-30',
        tuteur: 'Marie Martin'
      },
      {
        id: 2,
        nom: 'Alice Bernard',
        email: 'alice.bernard@email.com',
        typeStage: 'Stage professionnel',
        dateDebut: '2024-03-01',
        dateFin: '2024-05-31',
        tuteur: 'Paul Dubois'
      }
    ])

    const userInitials = computed(() => {
      const user = store.state.user
      return user?.name?.charAt(0).toUpperCase() || 'U'
    })

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

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
      if (showNotifMenu.value) showNotifMenu.value = false
    }

    const markAllAsRead = () => {
      notifications.value.forEach(notif => {
        notif.read = true
      })
      unreadNotifications.value = 0
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR')
    }

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    // Close menus when clicking outside
    const closeMenus = (e) => {
      if (userMenu.value && !userMenu.value.contains(e.target)) {
        showUserMenu.value = false
      }
      if (notifMenu.value && !notifMenu.value.contains(e.target)) {
        showNotifMenu.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', closeMenus)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeMenus)
    })

    return {
      store,
      stats,
      stagiaires,
      showUserMenu,
      showNotifMenu,
      userMenu,
      notifMenu,
      userInitials,
      notifications,
      unreadNotifications,
      toggleUserMenu,
      toggleNotifMenu,
      formatDate,
      formatNotifDate,
      getNotificationTypeClass,
      getNotificationIcon,
      markAllAsRead,
      logout
    }
  }
}
</script>

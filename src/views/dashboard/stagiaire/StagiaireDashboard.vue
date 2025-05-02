
<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white border-b fixed top-0 left-0 right-0 z-50">
      <div class="px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img src="@/assets/finance-logo.png" alt="Logo" class="h-12 w-auto" />
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button @click="toggleNotifications" class="p-2 text-gray-600 hover:text-gray-800 inline-block">
              <i class="fas fa-bell"></i>
              <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50">
              <div class="px-4 py-2 border-b border-gray-200">
                <div class="flex justify-between items-center">
                  <h3 class="font-semibold text-gray-800">Notifications</h3>
                  <router-link to="/dashboard/stagiaire/notifications" class="text-sm text-primary hover:text-primary-dark">
                    Voir tout
                  </router-link>
                </div>
              </div>

              <div class="max-h-96 overflow-y-auto">
                <div v-for="(notification, index) in recentNotifications" :key="index" class="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <span :class="['w-8 h-8 rounded-full flex items-center justify-center', notification.iconBg, notification.iconColor]">
                        <i :class="notification.icon"></i>
                      </span>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                      <p class="text-sm text-gray-500">{{ notification.message }}</p>
                      <span class="text-xs text-gray-400">{{ notification.time }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button @click="logout" class="flex items-center text-gray-600 hover:text-gray-800">
            <i class="fas fa-sign-out-alt mr-2"></i>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </header>

    <div class="flex pt-20">
      <aside class="w-64 bg-white shadow-lg min-h-screen fixed left-0 top-20">
        <div class="p-4">
          <div class="flex items-center mb-8">
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <img src="@/assets/finance-logo1.png" alt="Profile" class="h-8 w-8 rounded-full" />
            </div>
            <div class="ml-3">
              <p class="font-medium">{{ store.state.user?.name }}</p>
              <p class="text-sm text-gray-500">Stagiaire</p>
            </div>
          </div>
          <nav class="space-y-2">
            <router-link to="/dashboard/stagiaire" class="flex items-center px-4 py-2 text-primary bg-blue-50 rounded-lg">
              <i class="fas fa-home mr-3"></i> Tableau de bord
            </router-link>
            <router-link to="/dashboard/stagiaire/suivi" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-tasks mr-3"></i> Suivi de stage
            </router-link>
            <router-link to="/dashboard/stagiaire/documents" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-file-alt mr-3"></i> Documents
            </router-link>
            <router-link to="/dashboard/stagiaire/rapports" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-book mr-3"></i> Rapports
            </router-link>
            <router-link to="/dashboard/stagiaire/messages" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-envelope mr-3"></i> Messages
            </router-link>
            <router-link to="/dashboard/stagiaire/notifications" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-bell mr-3"></i> Notifications
            </router-link>
            <router-link to="/dashboard/stagiaire/parametres" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-cog mr-3"></i> Paramètres
            </router-link>
          </nav>
        </div>
      </aside>

      <div class="flex-1 ml-64">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'StagiaireDashboard',
  setup() {
    const store = useStore()
    const router = useRouter()
    const showNotifications = ref(false)
    
    const recentNotifications = ref([
      {
        title: 'Nouveau message',
        message: 'Votre tuteur vous a envoyé un message',
        time: 'Il y a 30 minutes',
        icon: 'fas fa-envelope',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-500'
      },
      {
        title: 'Rappel',
        message: 'N\'oubliez pas de soumettre votre rapport hebdomadaire',
        time: 'Il y a 2 heures',
        icon: 'fas fa-clock',
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-500'
      },
      {
        title: 'Document validé',
        message: 'Votre convention de stage a été validée',
        time: 'Il y a 1 jour',
        icon: 'fas fa-check-circle',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-500'
      }
    ])

    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value
    }

    onMounted(() => {
      document.addEventListener('click', (e) => {
        const target = e.target
        if (!target.closest('.relative')) {
          showNotifications.value = false
        }
      })
    })

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    return {
      store,
      showNotifications,
      recentNotifications,
      toggleNotifications,
      logout
    }
  }
}
</script>

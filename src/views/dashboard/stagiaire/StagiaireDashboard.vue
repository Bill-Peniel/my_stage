<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="h-12 w-auto" src="@/assets/finance-logo.png" alt="Logo MEF" />
            </div>
          </div>
          <div class="flex items-center">
            <button @click="toggleNotifications" class="p-2 text-gray-600 hover:text-gray-800 relative">
              <i class="fas fa-bell"></i>
              <span v-if="hasNotifications" class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div class="ml-4">
              <button @click="logout" class="flex items-center text-gray-600 hover:text-gray-800">
                <i class="fas fa-sign-out-alt mr-2"></i>
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-lg min-h-screen">
        <div class="p-4">
          <div class="flex items-center mb-8">
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <i class="fas fa-user text-gray-600"></i>
            </div>
            <div class="ml-3">
              <p class="font-medium text-gray-900">{{ userName }}</p>
              <p class="text-sm text-gray-500">Stagiaire</p>
            </div>
          </div>
          <nav class="space-y-2">
            <router-link to="/dashboard/stagiaire" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-home mr-3"></i> Tableau de bord
            </router-link>
            <router-link to="/dashboard/stagiaire/suivi" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-tasks mr-3"></i> Suivi de stage
            </router-link>
            <router-link to="/dashboard/stagiaire/documents" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-file-alt mr-3"></i> Documents
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

      <!-- Main content -->
      <div class="flex-1 p-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'StagiaireDashboard',
  setup() {
    const store = useStore()
    const router = useRouter()
    const hasNotifications = ref(true)

    const userName = computed(() => store.state.user?.name || 'Stagiaire')

    const toggleNotifications = () => {
      hasNotifications.value = !hasNotifications.value
    }

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    return {
      userName,
      hasNotifications,
      toggleNotifications,
      logout
    }
  }
}
</script>
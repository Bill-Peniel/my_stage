<template>
  <header class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-3">
        <!-- Logo and title -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img src="../assets/finance-logo.png" alt="Logo du Ministère" class="h-12 w-auto" />
          </router-link>
        </div>
        
        <!-- Desktop navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <!-- Notification Icon & Menu -->
          <div class="relative" ref="notificationsMenu">
            <button @click="toggleNotifications" class="relative text-gray-700 hover:text-green-800 focus:outline-none">
              <i class="fas fa-bell text-xl"></i>
              <span v-if="notifications.length > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {{ notifications.length }}
              </span>
            </button>
            <div v-show="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20">
              <div class="px-4 py-2 border-b border-gray-200">
                <h3 class="text-lg font-semibold">Notifications</h3>
              </div>
              <div class="max-h-64 overflow-y-auto">
                <div v-for="notification in notifications.slice(0, 5)" :key="notification.id" class="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                  <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ notification.message }}</p>
                </div>
                <div v-if="notifications.length === 0" class="px-4 py-3 text-sm text-gray-500">
                  Aucune notification
                </div>
              </div>
              <div class="px-4 py-2 border-t border-gray-200">
                <router-link to="/dashboard/notifications" class="block text-center text-sm text-primary hover:text-primary-dark">
                  Voir toutes les notifications
                </router-link>
              </div>
            </div>
          </div>
          <router-link to="/" class="text-gray-700 hover:text-green-800 transition duration-150">
            Accueil
          </router-link>
          <router-link to="/application" class="text-gray-700 hover:text-green-800 transition duration-150">
            Faire une demande
          </router-link>
          <router-link to="/status" class="text-gray-700 hover:text-green-800 transition duration-150">
            Statut de la demande
          </router-link>
          <router-link to="/contact" class="text-gray-700 hover:text-green-800 transition duration-150">
            Contact
          </router-link>
          <template v-if="!isAuthenticated">
            <router-link to="/login" class="btn-outline py-1.5 px-4">
              Se connecter
            </router-link>
            <router-link to="/register" class="btn-primary py-1.5 px-4">
              S'inscrire
            </router-link>
          </template>
          <div v-else class="relative" ref="profileMenu">
            <button 
              @click="toggleProfileMenu" 
              class="flex items-center text-gray-700 hover:text-green-800 focus:outline-none"
            >
              <span class="mr-1">{{ currentUser.name }}</span>
              <i class="fas fa-chevron-down text-xs"></i>
            </button>
            <div 
              v-show="showProfileMenu" 
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
            >
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Mon profil
              </a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Mes demandes
              </a>
              <button 
                @click="logout" 
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </nav>
        
        <!-- Mobile menu button -->
        <button @click="toggleMobileMenu" class="md:hidden flex items-center p-2 rounded-md text-gray-600 hover:text-green-800 hover:bg-gray-100 focus:outline-none">
          <span class="sr-only">Open main menu</span>
          <i :class="[mobileMenuOpen ? 'fa-times' : 'fa-bars', 'fas text-xl']"></i>
        </button>
      </div>
      
      <!-- Mobile menu -->
      <div class="md:hidden" v-show="mobileMenuOpen">
        <div class="pt-2 pb-4 space-y-1">
          <router-link to="/" class="block py-2 px-3 text-base font-medium rounded-md hover:bg-gray-50 hover:text-green-800">
            Accueil
          </router-link>
          <router-link to="/application" class="block py-2 px-3 text-base font-medium rounded-md hover:bg-gray-50 hover:text-green-800">
            Faire une demande
          </router-link>
          <router-link to="/status" class="block py-2 px-3 text-base font-medium rounded-md hover:bg-gray-50 hover:text-green-800">
            Statut de la demande
          </router-link>
          <router-link to="/contact" class="block py-2 px-3 text-base font-medium rounded-md hover:bg-gray-50 hover:text-green-800">
            Contact
          </router-link>
          <template v-if="!isAuthenticated">
            <router-link to="/login" class="block py-2 px-3 text-base font-medium rounded-md hover:bg-gray-50 hover:text-green-800">
              Se connecter
            </router-link>
            <router-link to="/register" class="block py-2 px-3 text-base font-medium rounded-md hover:bg-gray-50 hover:text-green-800">
              S'inscrire
            </router-link>
          </template>
          <div v-else class="border-t border-gray-200 pt-2">
            <div class="px-3 py-1 text-sm font-medium text-gray-500">
              {{ currentUser.name }}
            </div>
            <a href="#" class="block py-2 px-3 text-base font-medium rounded-md hover:bg-gray-50 hover:text-green-800">
              Mon profil
            </a>
            <a href="#" class="block py-2 px-3 text-base font-medium rounded-md hover:bg-gray-50 hover:text-green-800">
              Mes demandes
            </a>
            <button 
              @click="logout" 
              class="block w-full text-left py-2 px-3 text-base font-medium rounded-md hover:bg-gray-50 hover:text-green-800"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Header',
  setup() {
    const store = useStore()
    const router = useRouter()
    const mobileMenuOpen = ref(false)
    const showProfileMenu = ref(false)
    const showNotifications = ref(false)
    const profileMenu = ref(null)
    const notificationsMenu = ref(null)
    
    // Exemple de notifications (à remplacer par des données réelles)
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
    
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    const currentUser = computed(() => store.getters.currentUser)
    
    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }
    
    const toggleProfileMenu = () => {
      showProfileMenu.value = !showProfileMenu.value
      showNotifications.value = false
    }
    
    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value
      showProfileMenu.value = false
    }
    
    const logout = async () => {
      await store.dispatch('logout')
      showProfileMenu.value = false
      router.push('/login')
    }
    
    const closeProfileMenu = (e) => {
      if (profileMenu.value && !profileMenu.value.contains(e.target)) {
        showProfileMenu.value = false
      }
    }
    
    onMounted(() => {
      document.addEventListener('click', closeProfileMenu)
    })
    
    onBeforeUnmount(() => {
      document.removeEventListener('click', closeProfileMenu)
    })
    
    return {
      mobileMenuOpen,
      toggleMobileMenu,
      showProfileMenu,
      toggleProfileMenu,
      showNotifications,
      toggleNotifications,
      notifications,
      profileMenu,
      notificationsMenu,
      isAuthenticated,
      currentUser,
      logout
    }
  }
}
</script>

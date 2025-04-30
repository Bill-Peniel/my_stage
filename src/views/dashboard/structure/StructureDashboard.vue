<template>
  <div class="min-h-screen bg-gray-100 transform-gpu">
    <header class="bg-primary shadow fixed top-0 w-full z-20">
      <div class="px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img src="@/assets/finance-logo1.png" alt="Logo du ministère" class="h-12 w-auto" />
          <h1 class="text-2xl font-bold text-white">Structure - Gestion des Stages</h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-white">{{ store.getters.roleDisplay }}</span>
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

      <div class="flex-1 md:ml-64 transition-all duration-500 ease-out max-w-7xl mx-auto" :class="{'translate-x-64': isSidebarOpen}">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full">
          <router-view v-slot="{ Component }">
            <transition
              enter-active-class="animate-enter"
              leave-active-class="animate-leave"
              mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SidebarStructure from '@/components/SidebarStructure.vue'
import gsap from 'gsap'

export default {
  name: 'StructureDashboard',
  components: {
    SidebarStructure
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const showUserMenu = ref(false)
    const userMenu = ref(null)
    const isSidebarOpen = ref(true)

    const stats = ref({
      stagiairesActifs: 5,
      evaluationsEnAttente: 2,
      stagesTermines: 8
    })

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

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR')
    }

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    onMounted(() => {
      gsap.from('.flex-1', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      })
    })

    return {
      store,
      stats,
      stagiaires,
      showUserMenu,
      userMenu,
      userInitials,
      toggleUserMenu,
      formatDate,
      logout,
      isSidebarOpen
    }
  }
}
</script>

<style scoped>
.transform-gpu {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.animate-enter {
  animation: page-enter 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-leave {
  animation: page-leave 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes page-enter {
  0% {
    opacity: 0;
    transform: translate3d(0, 20px, 0) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes page-leave {
  0% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate3d(0, -20px, 0) scale(0.95);
  }
}
</style>
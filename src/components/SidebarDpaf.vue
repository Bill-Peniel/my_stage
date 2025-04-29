<template>
  <aside 
    class="bg-primary text-white shadow-lg overflow-y-auto fixed h-[calc(100vh-4rem)] z-50 sidebar-custom-scroll transition-all duration-300 ease-in-out"
    :class="[
      isSidebarOpen ? 'w-64' : 'w-16',
      isHovered && !isSidebarOpen ? 'w-64' : '',
      'top-16'
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <button 
      @click="toggleSidebar" 
      class="absolute right-4 top-4 text-white p-2 rounded-full hover:bg-primary-dark transition-all duration-300"
    >
      <i class="fas" :class="isSidebarOpen ? 'fa-times' : 'fa-bars'"></i>
    </button>

    <nav class="p-2 mt-12">
      <!-- Vue d'ensemble -->
      <div class="mb-4">
        <router-link 
          to="/dashboard/dpaf" 
          class="flex items-center px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200 whitespace-nowrap"
          :class="{ 'bg-primary-dark': $route.path === '/dashboard/dpaf' }"
        >
          <i class="fas fa-chart-line min-w-[20px]"></i>
          <span :class="[isSidebarOpen || isHovered ? 'ml-2 opacity-100' : 'opacity-0 w-0']" class="transition-all duration-300">
            Vue d'ensemble
          </span>
        </router-link>
      </div>

      <!-- Gestion des demandes -->
      <div class="mb-4">
        <h3 :class="[isSidebarOpen || isHovered ? 'px-4 opacity-100' : 'px-2 opacity-0', 'py-2 text-sm font-semibold text-gray-300 uppercase transition-all duration-300']">
          Gestion
        </h3>

        <router-link 
          to="/dashboard/dpaf/toutes-demandes" 
          class="flex items-center px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200 whitespace-nowrap"
        >
          <i class="fas fa-inbox min-w-[20px]"></i>
          <span :class="[isSidebarOpen || isHovered ? 'ml-2 opacity-100' : 'opacity-0 w-0']" class="transition-all duration-300">
            Nouvelles demandes
          </span>
        </router-link>

        <router-link 
          to="/dashboard/dpaf/nouvelles-demandes" 
          class="flex items-center px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200 whitespace-nowrap"
        >
          <i class="fas fa-file-alt min-w-[20px]"></i>
          <span :class="[isSidebarOpen || isHovered ? 'ml-2 opacity-100' : 'opacity-0 w-0']" class="transition-all duration-300">
            Demandes classées
          </span>
        </router-link>

        <router-link 
          to="/dashboard/dpaf/affectations" 
          class="flex items-center px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200 whitespace-nowrap"
        >
          <i class="fas fa-user-plus min-w-[20px]"></i>
          <span :class="[isSidebarOpen || isHovered ? 'ml-2 opacity-100' : 'opacity-0 w-0']" class="transition-all duration-300">
            Affectations
          </span>
        </router-link>

        <router-link 
          to="/dashboard/dpaf/historique" 
          class="flex items-center px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200 whitespace-nowrap"
        >
          <i class="fas fa-history min-w-[20px]"></i>
          <span :class="[isSidebarOpen || isHovered ? 'ml-2 opacity-100' : 'opacity-0 w-0']" class="transition-all duration-300">
            Historique
          </span>
        </router-link>
      </div>

      <!-- Rapports -->
      <div class="mb-4">
        <h3 :class="[isSidebarOpen || isHovered ? 'px-4 opacity-100' : 'px-2 opacity-0', 'py-2 text-sm font-semibold text-gray-300 uppercase transition-all duration-300']">
          Rapports
        </h3>

        <router-link 
          to="/dashboard/dpaf/statistiques" 
          class="flex items-center px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200 whitespace-nowrap"
        >
          <i class="fas fa-chart-bar min-w-[20px]"></i>
          <span :class="[isSidebarOpen || isHovered ? 'ml-2 opacity-100' : 'opacity-0 w-0']" class="transition-all duration-300">
            Statistiques
          </span>
        </router-link>

        <router-link 
          to="/dashboard/dpaf/evaluations" 
          class="flex items-center px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200 whitespace-nowrap"
        >
          <i class="fas fa-star min-w-[20px]"></i>
          <span :class="[isSidebarOpen || isHovered ? 'ml-2 opacity-100' : 'opacity-0 w-0']" class="transition-all duration-300">
            Évaluations
          </span>
        </router-link>
      </div>

      <!-- Configuration -->
      <div class="mb-4">
        <h3 :class="[isSidebarOpen || isHovered ? 'px-4 opacity-100' : 'px-2 opacity-0', 'py-2 text-sm font-semibold text-gray-300 uppercase transition-all duration-300']">
          Configuration
        </h3>

        <router-link 
          to="/dashboard/dpaf/parametres" 
          class="flex items-center px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200 whitespace-nowrap"
        >
          <i class="fas fa-cog min-w-[20px]"></i>
          <span :class="[isSidebarOpen || isHovered ? 'ml-2 opacity-100' : 'opacity-0 w-0']" class="transition-all duration-300">
            Paramètres
          </span>
        </router-link>

        <router-link 
          to="/dashboard/dpaf/notifications" 
          class="flex items-center px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200 whitespace-nowrap"
        >
          <i class="fas fa-bell min-w-[20px]"></i>
          <span :class="[isSidebarOpen || isHovered ? 'ml-2 opacity-100' : 'opacity-0 w-0']" class="transition-all duration-300">
            Notifications
          </span>
        </router-link>

        <router-link 
          to="/dashboard/dpaf/profil" 
          class="flex items-center px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200 whitespace-nowrap"
        >
          <i class="fas fa-user min-w-[20px]"></i>
          <span :class="[isSidebarOpen || isHovered ? 'ml-2 opacity-100' : 'opacity-0 w-0']" class="transition-all duration-300">
            Profil
          </span>
        </router-link>
      </div>
    </nav>
  </aside>
</template>

<script>
import { ref, defineEmits } from 'vue'

export default {
  name: 'SidebarDpaf',
  setup() {
    const isSidebarOpen = ref(true)
    const isHovered = ref(false)
    const emit = defineEmits(['sidebar-state-changed'])

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value
      emit('sidebar-state-changed', isSidebarOpen.value)
    }

    const handleMouseEnter = () => {
      isHovered.value = true
      if (!isSidebarOpen.value) {
        emit('sidebar-state-changed', true)
      }
    }

    const handleMouseLeave = () => {
      isHovered.value = false
      if (!isSidebarOpen.value) {
        emit('sidebar-state-changed', false)
      }
    }

    return {
      isSidebarOpen,
      isHovered,
      toggleSidebar,
      handleMouseEnter,
      handleMouseLeave
    }
  }
}
</script>

<style scoped>
.sidebar-custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.sidebar-custom-scroll:hover {
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.sidebar-custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.sidebar-custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-custom-scroll::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.3s;
}

.sidebar-custom-scroll:hover::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>

<template>
  <aside class="bg-primary w-64 text-white shadow-lg overflow-y-auto transform transition-all duration-300 ease-in-out fixed md:translate-x-0 z-50 sidebar-custom-scroll" :class="{ '-translate-x-full': !isSidebarOpen }" data-aos="fade-right">
    <button @click="toggleSidebar" class="md:hidden fixed top-20 left-4 z-50 bg-primary text-white p-2 rounded-full">
      <i class="fas" :class="isSidebarOpen ? 'fa-times' : 'fa-bars'"></i>
    </button>
    <nav class="p-2 mt-4">
      <!-- Vue d'ensemble -->
      <div class="mb-4">
        <router-link 
          to="/dashboard/dpaf" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
          :class="{ 'bg-primary-dark': $route.path === '/dashboard/dpaf' }"
        >
          <i class="fas fa-chart-line mr-2"></i> Vue d'ensemble
        </router-link>
      </div>

      <!-- Gestion des demandes -->
      <div class="mb-4">
        <h3 class="px-4 py-2 text-sm font-semibold text-gray-300 uppercase">Gestion des demandes</h3>
        <router-link 
          to="/dashboard/dpaf/toutes-demandes" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-inbox mr-2"></i> Nouvelles demandes
        </router-link>
        <router-link 
          to="/dashboard/dpaf/nouvelles-demandes" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-file-alt mr-2"></i> Demandes classées
        </router-link>
        <router-link 
          to="/dashboard/dpaf/affectations" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-user-plus mr-2"></i> Affectations
        </router-link>
        <router-link 
          to="/dashboard/dpaf/historique" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-history mr-2"></i> Historique
        </router-link>
      </div>

      <!-- Rapports -->
      <div class="mb-4">
        <h3 class="px-4 py-2 text-sm font-semibold text-gray-300 uppercase">Rapports</h3>
        <router-link 
          to="/dashboard/dpaf/statistiques" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-chart-bar mr-2"></i> Statistiques
        </router-link>
        <router-link 
          to="/dashboard/dpaf/evaluations" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-star mr-2"></i> Évaluations
        </router-link>
      </div>

      <!-- Configuration -->
      <div class="mb-4">
        <h3 class="px-4 py-2 text-sm font-semibold text-gray-300 uppercase">Configuration</h3>
        <router-link 
          to="/dashboard/dpaf/parametres" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-cog mr-2"></i> Paramètres
        </router-link>
        <router-link 
          to="/dashboard/dpaf/notifications" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-bell mr-2"></i> Notifications
        </router-link>
        <router-link 
          to="/dashboard/dpaf/profil" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-user mr-2"></i> Profil
        </router-link>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'SidebarDpaf',
  data() {
    return {
      isSidebarOpen: true
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
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

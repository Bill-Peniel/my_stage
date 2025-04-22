<template>
  <aside class="bg-primary w-64 text-white shadow-lg overflow-y-auto transform transition-all duration-300 ease-in-out fixed md:translate-x-0 z-50 sidebar-custom-scroll" :class="{ '-translate-x-full': !isSidebarOpen }" data-aos="fade-right">
    <button @click="toggleSidebar" class="md:hidden fixed top-20 left-4 z-50 bg-primary text-white p-2 rounded-full">
      <i class="fas" :class="isSidebarOpen ? 'fa-times' : 'fa-bars'"></i>
    </button>
    <div class="p-4 border-b border-primary-dark sticky top-0 bg-primary z-10">
      <h2 class="text-xl font-bold">Administration</h2>
    </div>
    <nav class="p-2">
      <!-- Tableau de bord -->
      <div class="mb-4">
        <router-link 
          to="/dashboard" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
          :class="{ 'bg-primary-dark': $route.path === '/dashboard' }"
        >
          <i class="fas fa-chart-line mr-2"></i> Tableau de bord
        </router-link>
      </div>

      <!-- Gestion des demandes -->
      <div class="mb-4">
        <h3 class="px-4 py-2 text-sm font-semibold text-gray-300 uppercase">Gestion des demandes</h3>
        <router-link 
          to="/dashboard/demandes/en-attente" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
          :class="{ 'bg-primary-dark': $route.path.includes('/demandes/en-attente') }"
        >
          <i class="fas fa-clock mr-2"></i> En attente
        </router-link>
        <router-link 
          to="/dashboard/demandes/en-cours" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
          :class="{ 'bg-primary-dark': $route.path.includes('/demandes/en-cours') }"
        >
          <i class="fas fa-spinner mr-2"></i> En cours
        </router-link>
        <router-link 
          to="/dashboard/demandes/historique" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
          :class="{ 'bg-primary-dark': $route.path.includes('/demandes/historique') }"
        >
          <i class="fas fa-history mr-2"></i> Historique
        </router-link>
      </div>

      <!-- Gestion des utilisateurs -->
      <div class="mb-4">
        <h3 class="px-4 py-2 text-sm font-semibold text-gray-300 uppercase">Gestion des utilisateurs</h3>
        <router-link 
          to="/dashboard/structures" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
          :class="{ 'bg-primary-dark': $route.path.includes('/structures') }"
        >
          <i class="fas fa-building mr-2"></i> Structures
        </router-link>
        <router-link 
          to="/dashboard/tuteurs" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
          :class="{ 'bg-primary-dark': $route.path.includes('/tuteurs') }"
        >
          <i class="fas fa-user-tie mr-2"></i> Tuteurs
        </router-link>
        <router-link 
          to="/dashboard/stagiaires" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
          :class="{ 'bg-primary-dark': $route.path.includes('/stagiaires') }"
        >
          <i class="fas fa-user-graduate mr-2"></i> Stagiaires
        </router-link>
      </div>

      <!-- Configuration -->
      <div class="mb-4">
        <h3 class="px-4 py-2 text-sm font-semibold text-gray-300 uppercase">Configuration</h3>
        <router-link 
          to="/dashboard/parametres" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
          :class="{ 'bg-primary-dark': $route.path.includes('/parametres') }"
        >
          <i class="fas fa-cog mr-2"></i> Paramètres
        </router-link>
        <router-link 
          to="/dashboard/notifications" 
          class="block px-4 py-2 my-1 rounded hover:bg-primary-dark transition-colors duration-200"
          :class="{ 'bg-primary-dark': $route.path.includes('/notifications') }"
        >
          <i class="fas fa-bell mr-2"></i> Notifications
        </router-link>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
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

<template>
  <aside class="bg-primary w-64 text-white shadow-lg overflow-y-auto transform transition-all duration-300 ease-in-out fixed md:translate-x-0 z-50 sidebar-custom-scroll" :class="{ '-translate-x-full': !isSidebarOpen }">
    <nav class="p-4">
      <!-- Vue d'ensemble -->
      <router-link 
        to="/dashboard/structure" 
        class="block px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
        :class="{ 'bg-primary-dark': $route.path === '/dashboard/structure' }"
      >
        <i class="fas fa-chart-line mr-2"></i> Vue d'ensemble
      </router-link>

      <!-- Gestion des stagiaires -->
      <div class="mt-6">
        <h3 class="px-4 py-2 text-sm font-semibold text-gray-300 uppercase">Stagiaires</h3>
        <router-link 
          to="/dashboard/structure/stagiaires"
          class="block px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-users mr-2"></i> Liste des stagiaires
        </router-link>
        <router-link 
          to="/dashboard/structure/evaluations"
          class="block px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-star mr-2"></i> Évaluations
        </router-link>
      </div>

      <!-- Tuteurs -->
      <div class="mt-6">
        <h3 class="px-4 py-2 text-sm font-semibold text-gray-300 uppercase">Tuteurs</h3>
        <router-link 
          to="/dashboard/structure/tuteurs"
          class="block px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-chalkboard-teacher mr-2"></i> Gestion des tuteurs
        </router-link>
        <router-link 
          to="/dashboard/structure/affectations"
          class="block px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-user-plus mr-2"></i> Affectations
        </router-link>
      </div>

      <!-- Paramètres -->
      <div class="mt-6">
        <h3 class="px-4 py-2 text-sm font-semibold text-gray-300 uppercase">Paramètres</h3>
        <router-link 
          to="/dashboard/structure/profil"
          class="block px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-user mr-2"></i> Profil
        </router-link>
        <router-link 
          to="/dashboard/structure/parametres"
          class="block px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-cog mr-2"></i> Paramètres
        </router-link>
        <router-link 
          to="/dashboard/structure/notifications"
          class="block px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          <i class="fas fa-bell mr-2"></i> Notifications
        </router-link>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'SidebarStructure',
  data() {
    return {
      isSidebarOpen: true
    }
  }
}
</script>

<style scoped>
.sidebar-custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.sidebar-custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.sidebar-custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-custom-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}
</style>

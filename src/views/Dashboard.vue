<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar class="w-64 flex-shrink-0" />

    <!-- Contenu principal -->
    <div class="flex-1 overflow-x-hidden overflow-y-auto">
      <header class="bg-primary shadow fixed top-0 w-full z-20">
        <div class="px-4 py-4 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <img src="@/assets/finance-logo1.png" alt="Logo du ministère" class="h-12 w-auto" />
            <h1 class="text-2xl font-bold text-white">Tableau de bord administratif</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-white">{{ store.getters.roleDisplay }}</span>
            <button @click="logout" class="text-white hover:text-accent-yellow">
              <i class="fas fa-sign-out-alt"></i> Déconnexion
            </button>
          </div>
        </div>
      </header>
      <div class="pt-16">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'Dashboard',
  components: {
    Sidebar
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    return {
      store,
      logout
    }
  }
}
</script>
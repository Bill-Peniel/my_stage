
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-primary shadow fixed top-0 w-full z-20">
      <div class="px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img src="@/assets/finance-logo1.png" alt="Logo" class="h-12 w-auto" />
          <h1 class="text-2xl font-bold text-white">Tuteur - Gestion des Stages</h1>
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
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-user mr-2"></i> Mon profil
              </a>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                <i class="fas fa-sign-out-alt mr-2"></i> Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex pt-20">
      <div class="fixed left-0 top-16 h-[calc(100vh-4rem)] z-10 w-64 bg-white shadow-lg">
        <div class="p-4">
          <div class="text-center mb-6">
            <div class="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3">
              <!-- Profile image or initials -->
              <div class="w-full h-full flex items-center justify-center text-xl font-semibold">
                {{ userInitials }}
              </div>
            </div>
            <h3 class="font-semibold">Dr {{ userName }}</h3>
            <p class="text-sm text-gray-500">{{ userRole }}</p>
          </div>
          <nav class="space-y-2">
            <a href="#" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-home mr-3"></i> Tableau de bord
            </a>
            <a href="#" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-calendar mr-3"></i> Rendez-vous
            </a>
            <a href="#" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-users mr-3"></i> Mes Patients
            </a>
            <a href="#" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-clipboard-list mr-3"></i> Évaluations
            </a>
          </nav>
        </div>
      </div>

      <div class="flex-1 md:ml-64 p-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-lg font-semibold text-gray-900">Total Stagiaires</p>
                <h3 class="text-3xl font-bold text-primary">1500</h3>
              </div>
              <div class="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <i class="fas fa-users text-primary text-xl"></i>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-lg font-semibold text-gray-900">Aujourd'hui</p>
                <h3 class="text-3xl font-bold text-green-600">160</h3>
              </div>
              <div class="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <i class="fas fa-calendar-day text-green-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-lg font-semibold text-gray-900">Évaluations</p>
                <h3 class="text-3xl font-bold text-blue-600">85</h3>
              </div>
              <div class="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fas fa-clipboard-check text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Appointments Table -->
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Entretiens avec les stagiaires</h2>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom du stagiaire</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">État</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="rdv in rendezVous" :key="rdv.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <span class="font-medium text-gray-900">{{ rdv.nom }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-500">{{ rdv.date }}</td>
                    <td class="px-6 py-4">
                      <span :class="getStatusClass(rdv.status)" class="px-2 py-1 text-xs rounded-full">
                        {{ rdv.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-gray-500">{{ rdv.type }}</td>
                    <td class="px-6 py-4 space-x-2">
                      <button class="text-primary hover:text-primary-dark">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="text-green-600 hover:text-green-700">
                        <i class="fas fa-check"></i>
                      </button>
                      <button class="text-red-600 hover:text-red-700">
                        <i class="fas fa-times"></i>
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
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'TuteurDashboard',
  setup() {
    const store = useStore()
    const router = useRouter()
    const showUserMenu = ref(false)
    const userMenu = ref(null)

    const userName = computed(() => store.state.user?.name || 'Tuteur')
    const userRole = computed(() => store.getters.roleDisplay || 'Tuteur de Stage')
    const userInitials = computed(() => {
      const name = store.state.user?.name || 'T'
      return name.charAt(0).toUpperCase()
    })

    const rendezVous = ref([
      {
        id: 1,
        nom: 'Michel Wilson',
        date: '5 novembre 2023',
        status: 'En attente',
        type: 'Évaluation'
      },
      {
        id: 2,
        nom: 'Charlotte Boyd',
        date: '3 novembre 2023',
        status: 'Confirmé',
        type: 'Suivi'
      }
    ])

    const getStatusClass = (status) => {
      const classes = {
        'En attente': 'bg-yellow-100 text-yellow-800',
        'Confirmé': 'bg-green-100 text-green-800',
        'Annulé': 'bg-red-100 text-red-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
    }

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    onMounted(() => {
      document.addEventListener('click', (e) => {
        if (userMenu.value && !userMenu.value.contains(e.target)) {
          showUserMenu.value = false
        }
      })
    })

    return {
      showUserMenu,
      userMenu,
      userName,
      userRole,
      userInitials,
      rendezVous,
      toggleUserMenu,
      getStatusClass,
      logout
    }
  }
}
</script>

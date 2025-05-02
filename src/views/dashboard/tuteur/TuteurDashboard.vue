
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

            <!-- Menu déroulant des notifications -->
            <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50">
              <div class="px-4 py-2 border-b border-gray-200">
                <div class="flex justify-between items-center">
                  <h3 class="font-semibold text-gray-800">Notifications</h3>
                  <router-link to="/dashboard/tuteur/notifications" class="text-sm text-primary hover:text-primary-dark">
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
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-lg min-h-screen fixed left-0 top-20">
        <div class="p-4">
          <div class="flex items-center mb-8">
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <img src="@/assets/finance-logo1.png" alt="Profile" class="h-8 w-8 rounded-full" />
            </div>
            <div class="ml-3">
              <p class="font-medium">Dr. {{ store.state.user?.name }}</p>
              <p class="text-sm text-gray-500">Tuteur de Stage</p>
            </div>
          </div>
          <nav class="space-y-2">
            <router-link to="/dashboard/tuteur" class="flex items-center px-4 py-2 text-primary bg-blue-50 rounded-lg">
              <i class="fas fa-home mr-3"></i> Tableau de bord
            </router-link>
            <router-link to="/dashboard/tuteur/stagiaires" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-users mr-3"></i> Mes Stagiaires
            </router-link>
            <router-link to="/dashboard/tuteur/messages" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-envelope mr-3"></i> Messages
            </router-link>
            <router-link to="/dashboard/tuteur/themes" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-bookmark mr-3"></i> Thèmes
            </router-link>
            <router-link to="/dashboard/tuteur/notifications" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-bell mr-3"></i> Notifications
            </router-link>
            <router-link to="/dashboard/tuteur/parametres" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-cog mr-3"></i> Paramètres
            </router-link>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
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
  name: 'TuteurDashboard',
  setup() {
    const store = useStore()
    const router = useRouter()
    const showNotifications = ref(false)
    
    const recentNotifications = ref([
      {
        title: 'Nouveau stagiaire assigné',
        message: 'Un nouveau stagiaire a été assigné à votre supervision',
        time: 'Il y a 2 heures',
        icon: 'fas fa-user-graduate',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-500'
      },
      {
        title: 'Thème approuvé',
        message: 'Votre thème proposé a été approuvé par la structure',
        time: 'Il y a 1 jour',
        icon: 'fas fa-check-circle',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-500'
      },
      {
        title: "Rappel d'évaluation",
        message: "N'oubliez pas d'évaluer vos stagiaires avant la fin de la semaine",
        time: 'Il y a 2 jours',
        icon: 'fas fa-bell',
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-500'
      }
    ])

    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value
    }

    // Fermer le menu au clic en dehors
    onMounted(() => {
      document.addEventListener('click', (e) => {
        const target = e.target
        if (!target.closest('.relative')) {
          showNotifications.value = false
        }
      })
    })

    const patients = ref([
      {
        id: 1,
        nom: 'Michel Wilson',
        avatar: 'https://ui-avatars.com/api/?name=Michel+Wilson',
        date: '5 novembre 2024',
        type: 'Généraliste',
        statut: 'Nouveau patient',
        montant: '150 DH'
      },
      {
        id: 2,
        nom: 'Charlotte Reed',
        avatar: 'https://ui-avatars.com/api/?name=Charlotte+Reed',
        date: '3 novembre 2024',
        type: 'Généraliste',
        statut: 'Vieux patient',
        montant: '200 DH'
      },
      {
        id: 3,
        nom: 'Steve Moore',
        avatar: 'https://ui-avatars.com/api/?name=Steve+Moore',
        date: '2 novembre 2024',
        type: 'Urgence',
        statut: 'En attente',
        montant: '250 DH'
      }
    ])

    const getStatusClass = (statut) => {
      const classes = {
        'Nouveau patient': 'bg-green-100 text-green-800',
        'Vieux patient': 'bg-blue-100 text-blue-800',
        'En attente': 'bg-yellow-100 text-yellow-800'
      }
      return classes[statut] || 'bg-gray-100 text-gray-800'
    }

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    return {
      store,
      patients,
      getStatusClass,
      logout,
      showNotifications,
      recentNotifications,
      toggleNotifications
    }
  }
}
</script>

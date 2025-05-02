
<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white border-b">
      <div class="px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img src="@/assets/finance-logo1.png" alt="Logo" class="h-8 w-auto" />
          <div class="flex items-center">
            <i class="fas fa-phone-alt text-gray-600 mr-2"></i>
            <span class="text-gray-600">+1 (416) 365-9642</span>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button class="p-2 text-gray-600 hover:text-gray-800">
              <i class="fas fa-bell"></i>
              <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
          <button @click="logout" class="flex items-center text-gray-600 hover:text-gray-800">
            <i class="fas fa-sign-out-alt mr-2"></i>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-lg min-h-screen">
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
            <router-link to="/dashboard/tuteur/evaluations" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-star mr-3"></i> Évaluations
            </router-link>
            <router-link to="/dashboard/tuteur/rapports" class="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-file-alt mr-3"></i> Rapports
            </router-link>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 p-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="flex items-center">
              <div class="rounded-full p-3 bg-pink-100">
                <i class="fas fa-users text-pink-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <h4 class="text-gray-500 text-sm">Total Patients</h4>
                <div class="flex items-baseline">
                  <p class="text-2xl font-semibold">1500</p>
                  <p class="text-green-500 text-sm ml-2">+2.5%</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="flex items-center">
              <div class="rounded-full p-3 bg-blue-100">
                <i class="fas fa-calendar-check text-blue-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <h4 class="text-gray-500 text-sm">Aujourd'hui</h4>
                <div class="flex items-baseline">
                  <p class="text-2xl font-semibold">160</p>
                  <span class="text-sm text-gray-500 ml-2">Patients</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="flex items-center">
              <div class="rounded-full p-3 bg-purple-100">
                <i class="fas fa-calendar-alt text-purple-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <h4 class="text-gray-500 text-sm">En attente</h4>
                <div class="flex items-baseline">
                  <p class="text-2xl font-semibold">85</p>
                  <span class="text-sm text-gray-500 ml-2">Patients</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Patient Table -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-gray-800">Entretien avec le patient</h2>
              <div class="flex items-center gap-4">
                <div class="relative">
                  <input type="text" placeholder="Rechercher..." class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                  <i class="fas fa-plus mr-2"></i> Nouveau
                </button>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4 text-gray-500 font-medium">Nom du patient</th>
                    <th class="text-left py-3 px-4 text-gray-500 font-medium">Date d'application</th>
                    <th class="text-left py-3 px-4 text-gray-500 font-medium">État</th>
                    <th class="text-left py-3 px-4 text-gray-500 font-medium">Type</th>
                    <th class="text-left py-3 px-4 text-gray-500 font-medium">Montant payé</th>
                    <th class="text-center py-3 px-4 text-gray-500 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="patient in patients" :key="patient.id" class="border-b hover:bg-gray-50">
                    <td class="py-3 px-4">
                      <div class="flex items-center">
                        <img :src="patient.avatar" alt="Avatar" class="w-8 h-8 rounded-full mr-3" />
                        {{ patient.nom }}
                      </div>
                    </td>
                    <td class="py-3 px-4 text-gray-600">{{ patient.date }}</td>
                    <td class="py-3 px-4">
                      <span :class="getStatusClass(patient.statut)" class="px-3 py-1 rounded-full text-sm">
                        {{ patient.statut }}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-gray-600">{{ patient.type }}</td>
                    <td class="py-3 px-4 text-gray-600">{{ patient.montant }}</td>
                    <td class="py-3 px-4">
                      <div class="flex justify-center space-x-2">
                        <button class="text-green-600 hover:text-green-800">
                          <i class="fas fa-check"></i>
                        </button>
                        <button class="text-blue-600 hover:text-blue-800">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="text-red-600 hover:text-red-800">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="flex justify-between items-center mt-6">
              <p class="text-gray-600">Affichage de 1 à 10 sur 50 entrées</p>
              <div class="flex space-x-2">
                <button class="px-3 py-1 border rounded hover:bg-gray-100">Précédent</button>
                <button class="px-3 py-1 bg-primary text-white rounded">1</button>
                <button class="px-3 py-1 border rounded hover:bg-gray-100">2</button>
                <button class="px-3 py-1 border rounded hover:bg-gray-100">3</button>
                <button class="px-3 py-1 border rounded hover:bg-gray-100">Suivant</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'TuteurDashboard',
  setup() {
    const store = useStore()
    const router = useRouter()

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
      logout
    }
  }
}
</script>

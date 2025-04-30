
<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-primary shadow">
      <div class="px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img src="@/assets/finance-logo1.png" alt="Logo" class="h-12 w-auto" />
          <h1 class="text-2xl font-bold text-white">Tableau de bord Tuteur</h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-white">Dr. {{ store.state.user?.name }}</span>
          <button @click="logout" class="text-white hover:text-gray-200">
            <i class="fas fa-sign-out-alt"></i> Déconnexion
          </button>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-lg min-h-screen">
        <div class="p-4 flex flex-col">
          <div class="flex items-center mb-8">
            <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <i class="fas fa-user-md text-2xl text-gray-600"></i>
            </div>
            <div class="ml-3">
              <p class="font-semibold">{{ store.state.user?.name }}</p>
              <p class="text-sm text-gray-600">Tuteur de Stage</p>
            </div>
          </div>
          <nav class="space-y-2">
            <router-link to="/dashboard/tuteur" class="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg">
              <i class="fas fa-home mr-3"></i> Tableau de bord
            </router-link>
            <router-link to="/dashboard/tuteur/stagiaires" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-users mr-3"></i> Mes Stagiaires
            </router-link>
            <router-link to="/dashboard/tuteur/evaluations" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-star mr-3"></i> Évaluations
            </router-link>
            <router-link to="/dashboard/tuteur/rapports" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <i class="fas fa-file-alt mr-3"></i> Rapports
            </router-link>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 p-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-lg p-6 shadow flex items-center">
            <div class="rounded-full bg-blue-100 p-3 mr-4">
              <i class="fas fa-users text-blue-600 text-xl"></i>
            </div>
            <div>
              <p class="text-gray-600">Total Stagiaires</p>
              <p class="text-2xl font-bold text-gray-900">1500</p>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow flex items-center">
            <div class="rounded-full bg-green-100 p-3 mr-4">
              <i class="fas fa-calendar-check text-green-600 text-xl"></i>
            </div>
            <div>
              <p class="text-gray-600">Aujourd'hui</p>
              <p class="text-2xl font-bold text-gray-900">160</p>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow flex items-center">
            <div class="rounded-full bg-purple-100 p-3 mr-4">
              <i class="fas fa-clipboard-list text-purple-600 text-xl"></i>
            </div>
            <div>
              <p class="text-gray-600">En attente</p>
              <p class="text-2xl font-bold text-gray-900">85</p>
            </div>
          </div>
        </div>

        <!-- Table Section -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold">Entretien avec le patient</h2>
              <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                <i class="fas fa-plus mr-2"></i> Nouveau
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left py-3 px-4">Nom du patient</th>
                    <th class="text-left py-3 px-4">Date d'application</th>
                    <th class="text-left py-3 px-4">État</th>
                    <th class="text-left py-3 px-4">Type</th>
                    <th class="text-left py-3 px-4">Montant payé</th>
                    <th class="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="stagiaire in stagiaires" :key="stagiaire.id" class="border-b hover:bg-gray-50">
                    <td class="py-3 px-4">
                      <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                        {{ stagiaire.nom }}
                      </div>
                    </td>
                    <td class="py-3 px-4">{{ stagiaire.dateDebut }}</td>
                    <td class="py-3 px-4">
                      <span :class="getStatusClass(stagiaire.statut)" class="px-3 py-1 rounded-full text-sm">
                        {{ stagiaire.statut }}
                      </span>
                    </td>
                    <td class="py-3 px-4">{{ stagiaire.type }}</td>
                    <td class="py-3 px-4">{{ stagiaire.montant }} DH</td>
                    <td class="py-3 px-4 text-right">
                      <button class="text-blue-600 hover:text-blue-800 mr-2">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
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
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'TuteurDashboard',
  setup() {
    const store = useStore()
    const router = useRouter()

    const stagiaires = ref([
      {
        id: 1,
        nom: 'Michel Wilson',
        dateDebut: '5 novembre 2024',
        type: 'Généraliste',
        statut: 'Nouveau patient',
        montant: '150'
      },
      {
        id: 2,
        nom: 'Charlotte Reed',
        dateDebut: '3 novembre 2024',
        type: 'Généraliste',
        statut: 'Vieux patient',
        montant: '200'
      }
    ])

    const getStatusClass = (statut) => {
      const classes = {
        'Nouveau patient': 'bg-green-100 text-green-800',
        'Vieux patient': 'bg-blue-100 text-blue-800',
        'En attente': 'bg-yellow-100 text-yellow-800'
      }
      return classes[statut]
    }

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    return {
      store,
      stagiaires,
      getStatusClass,
      logout
    }
  }
}
</script>

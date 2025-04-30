<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-primary shadow">
      <div class="px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img src="@/assets/finance-logo1.png" alt="Logo" class="h-12 w-auto" />
          <h1 class="text-2xl font-bold text-white">Tableau de bord Tuteur</h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-white">{{ store.getters.roleDisplay }}</span>
          <button @click="logout" class="text-white hover:text-gray-200">
            <i class="fas fa-sign-out-alt"></i> Déconnexion
          </button>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-lg min-h-screen">
        <div class="p-4">
          <nav class="space-y-2">
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-lg p-6 shadow">
            <h3 class="text-lg font-semibold text-gray-900">Total Stagiaires</h3>
            <p class="text-3xl font-bold text-primary mt-2">12</p>
          </div>

          <div class="bg-white rounded-lg p-6 shadow">
            <h3 class="text-lg font-semibold text-gray-900">Évaluations en attente</h3>
            <p class="text-3xl font-bold text-orange-500 mt-2">5</p>
          </div>

          <div class="bg-white rounded-lg p-6 shadow">
            <h3 class="text-lg font-semibold text-gray-900">Rapports soumis</h3>
            <p class="text-3xl font-bold text-green-500 mt-2">7</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow">
          <div class="p-6">
            <h2 class="text-xl font-semibold mb-4">Stagiaires récents</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date début</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durée</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="stagiaire in stagiaires" :key="stagiaire.id">
                    <td class="px-6 py-4 whitespace-nowrap">{{ stagiaire.nom }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ stagiaire.dateDebut }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ stagiaire.duree }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusClass(stagiaire.statut)">
                        {{ stagiaire.statut }}
                      </span>
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
        nom: 'Jean Dupont',
        dateDebut: '01/03/2024',
        duree: '3 mois',
        statut: 'En cours'
      },
      {
        id: 2,
        nom: 'Marie Martin',
        dateDebut: '15/02/2024',
        duree: '6 mois',
        statut: 'En cours'
      }
    ])

    const getStatusClass = (statut) => {
      const classes = {
        'En cours': 'px-2 py-1 text-sm rounded-full bg-green-100 text-green-800',
        'Terminé': 'px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-800',
        'En attente': 'px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800'
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
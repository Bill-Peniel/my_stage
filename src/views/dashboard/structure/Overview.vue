
<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-blue-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Stagiaires actifs</p>
            <h2 class="text-4xl font-bold">{{ stats.stagiairesActifs }}</h2>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-user-graduate"></i>
          </div>
        </div>
      </div>

      <div class="bg-green-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Évaluations en attente</p>
            <h2 class="text-4xl font-bold">{{ stats.evaluationsEnAttente }}</h2>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-clipboard-check"></i>
          </div>
        </div>
      </div>

      <div class="bg-yellow-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Stages terminés</p>
            <h2 class="text-4xl font-bold">{{ stats.stagesTermines }}</h2>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-flag-checkered"></i>
          </div>
        </div>
      </div>

      <div class="bg-purple-500 text-white rounded-lg p-6 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm opacity-75">Tuteurs actifs</p>
            <h2 class="text-4xl font-bold">{{ stats.tuteursActifs }}</h2>
          </div>
          <div class="text-3xl opacity-75">
            <i class="fas fa-chalkboard-teacher"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Liste des stagiaires -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h2 class="text-lg font-medium text-gray-900">Stagiaires actuels</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type de Stage</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Début</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Fin</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tuteur</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="stagiaire in stagiaires" :key="stagiaire.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ stagiaire.nom }}</div>
                <div class="text-sm text-gray-500">{{ stagiaire.email }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ stagiaire.typeStage }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(stagiaire.dateDebut) }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(stagiaire.dateFin) }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ stagiaire.tuteur }}</td>
              <td class="px-6 py-4 text-sm font-medium space-x-2">
                <button class="text-primary hover:text-primary-dark">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="text-success hover:text-green-700">
                  <i class="fas fa-clipboard-check"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'StructureOverview',
  setup() {
    const stats = ref({
      stagiairesActifs: 5,
      evaluationsEnAttente: 2,
      stagesTermines: 8,
      tuteursActifs: 3
    })

    const stagiaires = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        typeStage: 'Stage académique',
        dateDebut: '2024-02-01',
        dateFin: '2024-04-30',
        tuteur: 'Marie Martin'
      },
      {
        id: 2,
        nom: 'Alice Bernard',
        email: 'alice.bernard@email.com',
        typeStage: 'Stage professionnel',
        dateDebut: '2024-03-01',
        dateFin: '2024-05-31',
        tuteur: 'Paul Dubois'
      }
    ])

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR')
    }

    return {
      stats,
      stagiaires,
      formatDate
    }
  }
}
</script>

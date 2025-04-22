<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Historique des stages</h1>

    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="mb-4">
        <div class="flex gap-4">
          <div class="flex-1">
            <input type="text" placeholder="Rechercher..." class="input-field">
          </div>
          <div class="flex gap-2">
            <button class="btn-outline">
              <i class="fas fa-filter mr-2"></i>Filtrer
            </button>
            <button class="btn-outline">
              <i class="fas fa-download mr-2"></i>Exporter
            </button>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stagiaire</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Structure</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Période</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(stage, index) in historique" :key="index">
              <td class="px-6 py-4 whitespace-nowrap font-medium">{{ stage.reference }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ stage.stagiaire }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ stage.structure }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ stage.periode }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(stage.statut)">
                  {{ stage.statut }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button class="text-primary hover:text-primary-dark">
                  <i class="fas fa-file-alt"></i>
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
export default {
  name: 'DemandesHistorique',
  data() {
    return {
      historique: [
        {
          reference: 'STG-2023-001',
          stagiaire: 'Lucas Bernard',
          structure: 'Direction des Impôts',
          periode: 'Jan - Mar 2023',
          statut: 'Terminé'
        },
        {
          reference: 'STG-2023-002',
          stagiaire: 'Emma Petit',
          structure: 'Service Informatique',
          periode: 'Avr - Juin 2023',
          statut: 'Terminé'
        }
      ]
    }
  },
  methods: {
    getStatusClass(statut) {
      return {
        'Terminé': 'bg-green-100 text-green-800',
        'Annulé': 'bg-red-100 text-red-800',
        'Interrompu': 'bg-yellow-100 text-yellow-800'
      }[statut]
    }
  }
}
</script>
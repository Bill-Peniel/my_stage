<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Demandes en attente</h1>

    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stagiaire</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Structure</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de demande</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(demande, index) in demandes" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">{{ demande.stagiaire }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ demande.structure }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ demande.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(demande.status)">
                  {{ demande.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button class="text-primary hover:text-primary-dark mr-2">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="text-success hover:text-green-700 mr-2">
                  <i class="fas fa-check"></i>
                </button>
                <button class="text-danger hover:text-red-700">
                  <i class="fas fa-times"></i>
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
  name: 'DemandesEnAttente',
  data() {
    return {
      demandes: [
        {
          stagiaire: 'Jean Dupont',
          structure: 'Direction des Impôts',
          date: '23/02/2024',
          status: 'En attente'
        },
        {
          stagiaire: 'Marie Martin',
          structure: 'Service Informatique',
          date: '22/02/2024',
          status: 'En attente'
        }
      ]
    }
  },
  methods: {
    getStatusClass(status) {
      return {
        'En attente': 'bg-yellow-100 text-yellow-800',
        'Validé': 'bg-green-100 text-green-800',
        'Refusé': 'bg-red-100 text-red-800'
      }[status]
    }
  }
}
</script>
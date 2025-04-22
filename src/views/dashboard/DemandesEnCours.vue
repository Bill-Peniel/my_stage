<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Stages en cours</h1>

    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stagiaire</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Structure</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de début</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de fin</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progression</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(stage, index) in stages" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">{{ stage.stagiaire }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ stage.structure }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ stage.dateDebut }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ stage.dateFin }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-primary h-2 rounded-full" :style="{ width: stage.progression + '%' }"></div>
                </div>
                <span class="text-xs text-gray-600 mt-1">{{ stage.progression }}%</span>
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
  name: 'DemandesEnCours',
  data() {
    return {
      stages: [
        {
          stagiaire: 'Paul Dubois',
          structure: 'Direction des Impôts',
          dateDebut: '01/02/2024',
          dateFin: '01/05/2024',
          progression: 45
        },
        {
          stagiaire: 'Sophie Martin',
          structure: 'Service Informatique',
          dateDebut: '15/01/2024',
          dateFin: '15/04/2024',
          progression: 70
        }
      ]
    }
  }
}
</script>
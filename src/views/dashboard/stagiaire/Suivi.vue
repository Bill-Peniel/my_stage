
<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">Suivi de Stage</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium mb-4">Progression globale</h3>
        <div class="relative pt-1">
          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
            <div class="w-2/3 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
          </div>
          <div class="flex justify-between text-sm">
            <span>Début: 01/01/2024</span>
            <span>Fin: 31/03/2024</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium mb-4">Informations du stage</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Tuteur:</span>
            <span class="font-medium">M. John Doe</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Structure:</span>
            <span class="font-medium">Direction des Finances</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Thème:</span>
            <span class="font-medium">Gestion financière</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow lg:col-span-2">
        <h3 class="text-lg font-medium mb-4">Activités hebdomadaires</h3>
        <div class="space-y-4">
          <div v-for="(week, index) in weeks" :key="index" class="border-b pb-4 last:border-0">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-medium">Semaine {{ week.number }}</h4>
              <span :class="getStatusClass(week.status)">{{ week.status }}</span>
            </div>
            <p class="text-gray-600">{{ week.summary }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Suivi',
  data() {
    return {
      weeks: [
        {
          number: 1,
          status: 'Validé',
          summary: 'Introduction aux procédures financières'
        },
        {
          number: 2,
          status: 'En cours',
          summary: 'Analyse des flux financiers'
        },
        {
          number: 3,
          status: 'À venir',
          summary: 'Planification budgétaire'
        }
      ]
    }
  },
  methods: {
    getStatusClass(status) {
      switch (status) {
        case 'Validé':
          return 'text-green-500'
        case 'En cours':
          return 'text-blue-500'
        default:
          return 'text-gray-500'
      }
    }
  }
}
</script>

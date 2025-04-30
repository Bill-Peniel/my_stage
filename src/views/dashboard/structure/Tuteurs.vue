
<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex-1">
      <header class="bg-primary shadow">
        <div class="px-4 py-4">
          <h1 class="text-2xl font-bold text-white">Liste des tuteurs</h1>
        </div>
      </header>

      <main class="p-6">
        <div class="bg-white shadow rounded-lg">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Structure</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="tuteur in tuteurs" :key="tuteur.id">
                  <td class="px-6 py-4">{{ tuteur.nom }}</td>
                  <td class="px-6 py-4 break-words">{{ tuteur.structure }}</td>
                  <td class="px-6 py-4">{{ tuteur.email }}</td>
                  <td class="px-6 py-4">{{ tuteur.telephone }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Tuteurs',
  setup() {
    const tuteurs = ref([])

    const fetchTuteurs = async () => {
      try {
        // Simuler la récupération des données de l'API
        tuteurs.value = [
          {
            id: 1,
            nom: 'Tuteur Test',
            structure: 'Structure Test SARL',
            email: 'tuteur@mystage.com',
            telephone: '+229 44444444'
          }
        ]
      } catch (error) {
        console.error('Erreur lors de la récupération des tuteurs:', error)
      }
    }

    onMounted(() => {
      fetchTuteurs()
    })

    return {
      tuteurs
    }
  }
}
</script>

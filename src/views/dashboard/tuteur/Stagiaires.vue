
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Gestion des Stagiaires</h1>
    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="stagiaire in stagiaires" :key="stagiaire.id">
              <td class="px-6 py-4">{{ stagiaire.nom }}</td>
              <td class="px-6 py-4">{{ stagiaire.email }}</td>
              <td class="px-6 py-4">{{ stagiaire.telephone }}</td>
              <td class="px-6 py-4">
                <button class="text-primary hover:text-primary-dark mr-2">
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
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Stagiaires',
  setup() {
    const stagiaires = ref([
      {
        id: 1,
        nom: 'Jean Dupont',
        email: 'jean@example.com',
        telephone: '0123456789'
      }
    ])

    return {
      stagiaires
    }
  }
}
</script>

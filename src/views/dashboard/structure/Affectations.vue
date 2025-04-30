
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Affectation des Tuteurs</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-4">Nouvelle Affectation</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Stagiaire</label>
            <select v-model="selectedStagiaire" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Sélectionner un stagiaire</option>
              <option v-for="stagiaire in stagiaires" :key="stagiaire.id" :value="stagiaire.id">
                {{ stagiaire.nom }} {{ stagiaire.prenom }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tuteur</label>
            <select v-model="selectedTuteur" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Sélectionner un tuteur</option>
              <option v-for="tuteur in tuteurs" :key="tuteur.id" :value="tuteur.id">
                {{ tuteur.nom }} {{ tuteur.prenom }} - {{ tuteur.fonction }}
              </option>
            </select>
          </div>
        </div>
        <button @click="affecter" class="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          Affecter
        </button>
      </div>

      <div class="mt-8">
        <h2 class="text-lg font-semibold mb-4">Affectations en cours</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stagiaire</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tuteur</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date d'affectation</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="affectation in affectations" :key="affectation.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ affectation.stagiaire }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ affectation.tuteur }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(affectation.dateAffectation) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="supprimerAffectation(affectation.id)" class="text-red-600 hover:text-red-800">
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
</template>

<script>
export default {
  name: 'Affectations',
  data() {
    return {
      selectedStagiaire: '',
      selectedTuteur: '',
      stagiaires: [],
      tuteurs: [],
      affectations: []
    }
  },
  methods: {
    async fetchData() {
      // À implémenter: Charger les données depuis l'API
      this.stagiaires = [
        { id: 1, nom: 'Dupont', prenom: 'Jean' },
        { id: 2, nom: 'Martin', prenom: 'Sophie' }
      ]
      this.tuteurs = [
        { id: 1, nom: 'Smith', prenom: 'John', fonction: 'Chef de projet' },
        { id: 2, nom: 'Dubois', prenom: 'Marie', fonction: 'Développeur senior' }
      ]
      this.affectations = [
        { 
          id: 1, 
          stagiaire: 'Jean Dupont',
          tuteur: 'John Smith',
          dateAffectation: new Date()
        }
      ]
    },
    async affecter() {
      if (!this.selectedStagiaire || !this.selectedTuteur) {
        alert('Veuillez sélectionner un stagiaire et un tuteur')
        return
      }
      // À implémenter: Envoyer l'affectation à l'API
      await this.fetchData()
    },
    async supprimerAffectation(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette affectation ?')) {
        // À implémenter: Supprimer l'affectation via l'API
        await this.fetchData()
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-FR')
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

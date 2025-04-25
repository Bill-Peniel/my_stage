
<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex-1">
      <header class="bg-primary shadow">
        <div class="px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-white">Gestion des structures</h1>
          <button @click="showAddModal = true" class="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100">
            <i class="fas fa-plus mr-2"></i> Ajouter une structure
          </button>
        </div>
      </header>

      <main class="p-6 overflow-x-hidden">
        <div class="bg-white shadow rounded-lg">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="structure in structures" :key="structure.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ structure.nomStructure }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ structure.type }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ structure.adresse }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ structure.emailContact }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="editStructure(structure)" class="text-primary hover:text-primary-dark mr-3" title="Modifier">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button @click="deleteStructure(structure.id)" class="text-danger hover:text-red-700" title="Supprimer">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <!-- Modal d'ajout de structure -->
      <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="p-6">
            <h2 class="text-xl font-bold mb-4">Ajouter une structure</h2>
            <form @submit.prevent="submitStructure">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nom de la structure</label>
                  <input v-model="newStructure.nomStructure" type="text" class="mt-1 input-field" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Type de structure</label>
                  <select v-model="newStructure.type" class="mt-1 input-field" required>
                    <option value="Entreprise">Entreprise</option>
                    <option value="Administration">Administration</option>
                    <option value="ONG">ONG</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Adresse</label>
                  <input v-model="newStructure.adresse" type="text" class="mt-1 input-field" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email de contact</label>
                  <input v-model="newStructure.emailContact" type="email" class="mt-1 input-field" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Téléphone</label>
                  <input v-model="newStructure.telephoneContact" type="tel" class="mt-1 input-field" required>
                </div>
              </div>
              <div class="mt-6 flex justify-end space-x-3">
                <button type="button" @click="showAddModal = false" class="btn-outline">
                  Annuler
                </button>
                <button type="submit" class="btn-primary">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Structures',
  data() {
    return {
      showAddModal: false,
      structures: [],
      newStructure: {
        nomStructure: '',
        type: '',
        adresse: '',
        emailContact: '',
        telephoneContact: ''
      }
    }
  },
  methods: {
    async submitStructure() {
      try {
        // Appel API pour créer la structure
        const response = await fetch('/api/structures', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newStructure)
        });

        if (response.ok) {
          // Rafraîchir la liste des structures
          await this.fetchStructures();
          this.showAddModal = false;
          // Réinitialiser le formulaire
          this.newStructure = {
            nomStructure: '',
            type: '',
            adresse: '',
            emailContact: '',
            telephoneContact: ''
          };
        }
      } catch (error) {
        console.error('Erreur lors de la création de la structure:', error);
      }
    },
    async fetchStructures() {
      try {
        const response = await fetch('/api/structures');
        if (response.ok) {
          this.structures = await response.json();
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des structures:', error);
      }
    },
    editStructure(structure) {
      // Implémenter la logique de modification
    },
    deleteStructure(id) {
      // Implémenter la logique de suppression
    }
  },
  mounted() {
    this.fetchStructures();
  }
}
</script>

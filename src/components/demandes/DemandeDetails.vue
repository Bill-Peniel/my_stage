
<template>
  <div v-if="demande" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Détails de la demande</h2>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Informations personnelles -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4 text-primary">Informations personnelles</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-600">Nom complet</p>
              <p class="font-medium">{{ demande.nom }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Email</p>
              <p class="font-medium">{{ demande.email }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Téléphone</p>
              <p class="font-medium">{{ demande.telephone }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Formation</p>
              <p class="font-medium">{{ demande.formation }}</p>
            </div>
          </div>
        </div>

        <!-- Informations du stage -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4 text-primary">Informations du stage</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-600">Type de stage</p>
              <p class="font-medium">{{ demande.typeStage }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Structure</p>
              <p class="font-medium">{{ demande.structure }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Date de début</p>
              <p class="font-medium">{{ formatDate(demande.dateDebut) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Date de fin</p>
              <p class="font-medium">{{ formatDate(demande.dateFin) }}</p>
            </div>
          </div>
        </div>

        <!-- Documents -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4 text-primary">Documents</h3>
          <div class="space-y-4">
            <div v-for="(doc, index) in demande.documents" :key="index" class="border rounded-lg p-4">
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium">{{ doc.nom }}</p>
                  <p class="text-sm text-gray-600">{{ doc.type }}</p>
                </div>
                <button 
                  @click="viewDocument(doc)"
                  class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
                >
                  <i class="fas fa-eye mr-2"></i>Voir
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4 mt-6 pt-6 border-t">
          <button 
            @click="$emit('reject')" 
            class="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
          >
            <i class="fas fa-times mr-2"></i>Refuser
          </button>
          <button 
            @click="$emit('approve')" 
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <i class="fas fa-check mr-2"></i>Accepter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemandeDetails',
  props: {
    demande: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-FR')
    },
    viewDocument(doc) {
      // Implémenter la visualisation du document
      console.log('Visualiser document:', doc)
    }
  }
}
</script>

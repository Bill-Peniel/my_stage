
<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">Mes Documents</h1>
    
    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-4">Documents requis</h3>
          <div class="space-y-4">
            <div v-for="(doc, index) in documents" :key="index" class="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p class="font-medium">{{ doc.name }}</p>
                <p class="text-sm text-gray-500">{{ doc.description }}</p>
              </div>
              <div class="flex items-center space-x-3">
                <span :class="getStatusClass(doc.status)">{{ doc.status }}</span>
                <button class="btn-primary">
                  <i class="fas fa-upload mr-2"></i>
                  Téléverser
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Documents',
  data() {
    return {
      documents: [
        {
          name: 'Lettre de motivation',
          description: 'Format PDF, maximum 2 Mo',
          status: 'En attente'
        },
        {
          name: 'CV',
          description: 'Format PDF, maximum 2 Mo',
          status: 'Validé'
        },
        {
          name: 'Convention de stage',
          description: 'Document à faire signer',
          status: 'Non soumis'
        }
      ]
    }
  },
  methods: {
    getStatusClass(status) {
      switch (status) {
        case 'Validé':
          return 'text-green-500'
        case 'En attente':
          return 'text-yellow-500'
        default:
          return 'text-gray-500'
      }
    }
  }
}
</script>

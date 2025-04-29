
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Paramètres</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Paramètres généraux -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-semibold mb-4">Paramètres généraux</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Durée maximale de stage (mois)
            </label>
            <input type="number" v-model="settings.maxDuration" min="1" max="12"
                   class="input-field" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nombre maximum de stagiaires par structure
            </label>
            <input type="number" v-model="settings.maxStagiairesPerStructure" min="1"
                   class="input-field" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Délai de réponse aux demandes (jours)
            </label>
            <input type="number" v-model="settings.responseDelay" min="1"
                   class="input-field" />
          </div>
        </div>

        <div class="mt-6">
          <button @click="saveGeneralSettings" class="btn-primary">
            Enregistrer les modifications
          </button>
        </div>
      </div>

      <!-- Notifications -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-semibold mb-4">Paramètres de notification</h2>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <input type="checkbox" v-model="notifications.newRequests"
                   class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
            <label class="ml-2 block text-sm text-gray-700">
              Nouvelles demandes de stage
            </label>
          </div>

          <div class="flex items-center">
            <input type="checkbox" v-model="notifications.endingInternships"
                   class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
            <label class="ml-2 block text-sm text-gray-700">
              Stages arrivant à terme
            </label>
          </div>

          <div class="flex items-center">
            <input type="checkbox" v-model="notifications.evaluations"
                   class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
            <label class="ml-2 block text-sm text-gray-700">
              Nouvelles évaluations
            </label>
          </div>
        </div>

        <div class="mt-6">
          <button @click="saveNotificationSettings" class="btn-primary">
            Enregistrer les préférences
          </button>
        </div>
      </div>

      <!-- Documents requis -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-semibold mb-4">Documents requis</h2>
        
        <div class="space-y-4">
          <div v-for="(doc, index) in requiredDocs" :key="index" class="flex items-center gap-2">
            <input type="text" v-model="doc.name" class="input-field flex-1"
                   placeholder="Nom du document" />
            <button @click="removeDocument(index)" class="text-red-600 hover:text-red-800">
              <i class="fas fa-trash"></i>
            </button>
          </div>

          <button @click="addDocument" class="btn-outline w-full">
            <i class="fas fa-plus mr-2"></i>Ajouter un document
          </button>
        </div>

        <div class="mt-6">
          <button @click="saveDocumentSettings" class="btn-primary">
            Enregistrer la liste
          </button>
        </div>
      </div>

      <!-- Périodes de stage -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-semibold mb-4">Périodes de stage</h2>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Date de début
              </label>
              <input type="date" v-model="periodSettings.startDate" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Date de fin
              </label>
              <input type="date" v-model="periodSettings.endDate" class="input-field" />
            </div>
          </div>

          <div class="flex items-center">
            <input type="checkbox" v-model="periodSettings.allowFlexibleDates"
                   class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
            <label class="ml-2 block text-sm text-gray-700">
              Autoriser les dates flexibles
            </label>
          </div>
        </div>

        <div class="mt-6">
          <button @click="savePeriodSettings" class="btn-primary">
            Enregistrer les périodes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Parametres',
  setup() {
    const settings = ref({
      maxDuration: 6,
      maxStagiairesPerStructure: 5,
      responseDelay: 7
    })

    const notifications = ref({
      newRequests: true,
      endingInternships: true,
      evaluations: true
    })

    const requiredDocs = ref([
      { name: 'Lettre de motivation' },
      { name: 'CV' },
      { name: 'Carte étudiant' }
    ])

    const periodSettings = ref({
      startDate: '',
      endDate: '',
      allowFlexibleDates: false
    })

    const addDocument = () => {
      requiredDocs.value.push({ name: '' })
    }

    const removeDocument = (index) => {
      requiredDocs.value.splice(index, 1)
    }

    const saveGeneralSettings = () => {
      // Implémenter la sauvegarde des paramètres généraux
      console.log('Saving general settings:', settings.value)
    }

    const saveNotificationSettings = () => {
      // Implémenter la sauvegarde des paramètres de notification
      console.log('Saving notification settings:', notifications.value)
    }

    const saveDocumentSettings = () => {
      // Implémenter la sauvegarde des documents requis
      console.log('Saving document settings:', requiredDocs.value)
    }

    const savePeriodSettings = () => {
      // Implémenter la sauvegarde des périodes
      console.log('Saving period settings:', periodSettings.value)
    }

    return {
      settings,
      notifications,
      requiredDocs,
      periodSettings,
      addDocument,
      removeDocument,
      saveGeneralSettings,
      saveNotificationSettings,
      saveDocumentSettings,
      savePeriodSettings
    }
  }
}
</script>

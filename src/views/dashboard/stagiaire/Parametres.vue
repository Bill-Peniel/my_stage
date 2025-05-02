
<template>
  <div class="p-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">Paramètres du compte</h2>
      </div>

      <div class="p-6">
        <!-- Informations personnelles -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Informations personnelles</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nom complet</label>
              <input type="text" v-model="settings.fullName" class="mt-1 input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" v-model="settings.email" class="mt-1 input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Téléphone</label>
              <input type="tel" v-model="settings.telephone" class="mt-1 input-field" />
            </div>
          </div>
        </div>

        <!-- Préférences de notification -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Préférences de notification</h3>
          <div class="space-y-4">
            <div class="flex items-center">
              <input type="checkbox" v-model="settings.notifMessages" class="h-4 w-4 text-primary border-gray-300 rounded" />
              <label class="ml-2 block text-sm text-gray-900">Nouveaux messages</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" v-model="settings.notifEvaluation" class="h-4 w-4 text-primary border-gray-300 rounded" />
              <label class="ml-2 block text-sm text-gray-900">Évaluations</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" v-model="settings.notifRapports" class="h-4 w-4 text-primary border-gray-300 rounded" />
              <label class="ml-2 block text-sm text-gray-900">Rapports</label>
            </div>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex justify-end space-x-3">
          <button @click="resetSettings" class="btn-outline">
            Réinitialiser
          </button>
          <button @click="saveSettings" class="btn-primary">
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'StagiaireParametres',
  setup() {
    const settings = ref({
      fullName: 'Stagiaire Test',
      email: 'stagiaire@test.com',
      telephone: '+229 55555555',
      notifMessages: true,
      notifEvaluation: true,
      notifRapports: true
    })

    const saveSettings = async () => {
      try {
        console.log('Saving settings:', settings.value)
      } catch (error) {
        console.error('Error saving settings:', error)
      }
    }

    const resetSettings = () => {
      settings.value = {
        fullName: 'Stagiaire Test',
        email: 'stagiaire@test.com',
        telephone: '+229 55555555',
        notifMessages: true,
        notifEvaluation: true,
        notifRapports: true
      }
    }

    return {
      settings,
      saveSettings,
      resetSettings
    }
  }
}
</script>

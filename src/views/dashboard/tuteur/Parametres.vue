
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Paramètres</h1>

    <div class="bg-white rounded-lg shadow-sm p-6">
      <!-- Informations personnelles -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Informations personnelles</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom complet</label>
            <input type="text" v-model="profile.nom" class="mt-1 input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" v-model="profile.email" class="mt-1 input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Téléphone</label>
            <input type="tel" v-model="profile.telephone" class="mt-1 input-field" />
          </div>
        </div>
        <button @click="saveProfile" class="btn-primary mt-4">
          Enregistrer les modifications
        </button>
      </div>

      <!-- Sécurité -->
      <div class="border-t pt-8 mb-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Sécurité</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Ancien mot de passe</label>
            <input type="password" v-model="security.oldPassword" class="mt-1 input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
            <input type="password" v-model="security.newPassword" class="mt-1 input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input type="password" v-model="security.confirmPassword" class="mt-1 input-field" />
          </div>
        </div>
        <button @click="changePassword" class="btn-primary mt-4">
          Changer le mot de passe
        </button>
      </div>

      <!-- Notifications -->
      <div class="border-t pt-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Préférences de notification</h2>
        <div class="space-y-4">
          <div class="flex items-center">
            <input 
              type="checkbox" 
              v-model="notifications.email" 
              id="email-notif"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label for="email-notif" class="ml-2 block text-sm text-gray-700">
              Recevoir les notifications par email
            </label>
          </div>
          <div class="flex items-center">
            <input 
              type="checkbox" 
              v-model="notifications.site" 
              id="site-notif"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label for="site-notif" class="ml-2 block text-sm text-gray-700">
              Recevoir les notifications sur le site
            </label>
          </div>
        </div>
        <button @click="saveNotificationPreferences" class="btn-primary mt-4">
          Enregistrer les préférences
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Parametres',
  setup() {
    const profile = ref({
      nom: '',
      email: '',
      telephone: ''
    })

    const security = ref({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    const notifications = ref({
      email: true,
      site: true
    })

    const saveProfile = () => {
      // Logique pour sauvegarder le profil
      alert('Profil mis à jour avec succès')
    }

    const changePassword = () => {
      if (security.value.newPassword !== security.value.confirmPassword) {
        alert('Les mots de passe ne correspondent pas')
        return
      }
      // Logique pour changer le mot de passe
      alert('Mot de passe changé avec succès')
      security.value = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }

    const saveNotificationPreferences = () => {
      // Logique pour sauvegarder les préférences
      alert('Préférences de notification mises à jour')
    }

    return {
      profile,
      security,
      notifications,
      saveProfile,
      changePassword,
      saveNotificationPreferences
    }
  }
}
</script>

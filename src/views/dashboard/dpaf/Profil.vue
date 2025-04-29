<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Mon Profil</h1>

    <div class="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
      <form @submit.prevent="saveProfile" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input type="email" v-model="profile.email" class="input-field" required />
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Changer le mot de passe</h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Ancien mot de passe
            </label>
            <input type="password" v-model="passwords.old" class="input-field" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nouveau mot de passe
            </label>
            <input type="password" v-model="passwords.new" class="input-field" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le nouveau mot de passe
            </label>
            <input type="password" v-model="passwords.confirm" class="input-field" />
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button type="button" @click="resetForm" class="btn-outline">
            Annuler
          </button>
          <button type="submit" class="btn-primary">
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Profil',
  setup() {
    const store = useStore()
    const profile = ref({
      email: store.state.user?.email || ''
    })

    const passwords = ref({
      old: '',
      new: '',
      confirm: ''
    })

    const saveProfile = () => {
      // Implémenter la sauvegarde du profil
      console.log('Saving profile:', profile.value)
      if (passwords.value.new) {
        console.log('Changing password')
      }
    }

    const resetForm = () => {
      profile.value = {
        email: store.state.user?.email || ''
      }
      passwords.value = {
        old: '',
        new: '',
        confirm: ''
      }
    }

    return {
      profile,
      passwords,
      saveProfile,
      resetForm
    }
  }
}
</script>
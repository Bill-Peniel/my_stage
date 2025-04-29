
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Mon Profil</h1>
    
    <div class="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
      <form @submit.prevent="saveProfile" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input type="text" v-model="profile.nom" class="input-field" required />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Prénom
            </label>
            <input type="text" v-model="profile.prenom" class="input-field" required />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input type="email" v-model="profile.email" class="input-field" required />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input type="tel" v-model="profile.telephone" class="input-field" required />
          </div>
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
      nom: store.state.user?.profile?.nom || '',
      prenom: store.state.user?.profile?.prenom || '',
      email: store.state.user?.email || '',
      telephone: store.state.user?.profile?.telephone || ''
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
        nom: store.state.user?.profile?.nom || '',
        prenom: store.state.user?.profile?.prenom || '',
        email: store.state.user?.email || '',
        telephone: store.state.user?.profile?.telephone || ''
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

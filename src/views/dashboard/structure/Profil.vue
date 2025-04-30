
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Mon Profil Structure</h1>

    <div class="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
      <form @submit.prevent="saveProfile" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              Email de contact
            </label>
            <input type="email" v-model="profile.emailContact" class="input-field" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input type="tel" v-model="profile.telephoneContact" class="input-field" required />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Adresse
            </label>
            <input type="text" v-model="profile.adresse" class="input-field" required />
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
  name: 'StructureProfil',
  setup() {
    const store = useStore()
    const profile = ref({
      nom: '',
      prenom: '',
      emailContact: '',
      telephoneContact: '',
      adresse: ''
    })

    const passwords = ref({
      old: '',
      new: '',
      confirm: ''
    })

    const saveProfile = async () => {
      try {
        // TODO: Implémenter la sauvegarde du profil
        console.log('Saving profile:', profile.value)
        if (passwords.value.new) {
          console.log('Changing password')
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error)
      }
    }

    const resetForm = () => {
      // TODO: Réinitialiser avec les données actuelles de la structure
      profile.value = {
        nomStructure: '',
        type: '',
        emailContact: '',
        telephoneContact: '',
        adresse: ''
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

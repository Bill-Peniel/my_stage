<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Gestion des Affectations</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Liste des stagiaires à affecter -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Stagiaires en attente d'affectation</h2>
        <div class="space-y-4">
          <div v-for="stagiaire in stagiaires" :key="stagiaire.id" 
               class="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer"
               @click="selectStagiaire(stagiaire)">
            <div class="font-medium">{{ stagiaire.nom }}</div>
            <div class="text-sm text-gray-500">{{ stagiaire.typeStage }}</div>
            <div class="text-sm text-gray-500">Structure souhaitée: {{ stagiaire.structureSouhaitee }}</div>
          </div>
        </div>
      </div>

      <!-- Formulaire d'affectation -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Détails de l'affectation</h2>
        <form @submit.prevent="submitAffectation" v-if="selectedStagiaire" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Stagiaire</label>
            <input type="text" :value="selectedStagiaire.nom" disabled class="input-field mt-1" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Structure d'accueil</label>
            <select v-model="affectation.structure" required class="input-field mt-1">
              <option value="">Sélectionner une structure</option>
              <option v-for="structure in structures" :key="structure" :value="structure">
                {{ structure }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Date de début</label>
            <input type="date" v-model="affectation.dateDebut" required class="input-field mt-1" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Date de fin</label>
            <input type="date" v-model="affectation.dateFin" required class="input-field mt-1" />
          </div>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="resetForm" class="btn-outline">Annuler</button>
            <button type="submit" class="btn-primary">Confirmer l'affectation</button>
          </div>
        </form>
        <div v-else class="text-center text-gray-500 py-8">
          Sélectionnez un stagiaire pour procéder à l'affectation
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'Affectations',
  setup() {
    const selectedStagiaire = ref(null)
    const affectation = reactive({
      structure: '',
      dateDebut: '',
      dateFin: ''
    })

    const stagiaires = ref([
      {
        id: 1,
        nom: 'Marie Martin',
        typeStage: 'Stage académique',
        structureSouhaitee: 'Direction des Systèmes d\'Information'
      }
    ])

    const structures = ['Direction des Systèmes d\'Information', 'Direction Générale du Budget']

    const selectStagiaire = (stagiaire) => {
      selectedStagiaire.value = stagiaire
    }

    const submitAffectation = () => {
      console.log('Affectation soumise:', {
        stagiaire: selectedStagiaire.value,
        ...affectation
      })
    }

    const resetForm = () => {
      selectedStagiaire.value = null
      Object.keys(affectation).forEach(key => affectation[key] = '')
    }

    return {
      selectedStagiaire,
      affectation,
      stagiaires,
      structures,
      selectStagiaire,
      submitAffectation,
      resetForm
    }
  }
}
</script>
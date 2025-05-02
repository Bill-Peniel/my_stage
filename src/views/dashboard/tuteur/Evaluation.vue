
<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Évaluation des Stagiaires</h1>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Sélectionner un stagiaire</label>
        <select v-model="selectedStagiaire" class="w-full border border-gray-300 rounded-lg p-2">
          <option value="">Choisir un stagiaire</option>
          <option v-for="stagiaire in stagiaires" :key="stagiaire.id" :value="stagiaire.id">
            {{ stagiaire.nom }}
          </option>
        </select>
      </div>

      <div v-if="selectedStagiaire" class="space-y-6">
        <div class="mb-4 p-4 bg-blue-50 rounded-lg">
          <p class="text-blue-800">
            <i class="fas fa-info-circle mr-2"></i>
            Note totale: {{ totalPoints }}/20
          </p>
        </div>

        <div v-for="(critere, index) in criteres" :key="index" class="border-b pb-4">
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-medium text-gray-900">{{ critere.label }}</h3>
            <span class="text-sm text-gray-600">Note: {{ evaluations[critere.id] || 0 }}/4</span>
          </div>
          <div class="flex items-center space-x-4">
            <template v-for="note in 4" :key="note">
              <button 
                @click="evaluer(critere.id, note)"
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  evaluations[critere.id] === note 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                {{ note }}
              </button>
            </template>
          </div>
        </div>

        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Commentaires</label>
          <textarea 
            v-model="commentaire" 
            rows="4" 
            class="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Ajouter vos observations..."
          ></textarea>
        </div>

        <div class="flex justify-end mt-6">
          <button 
            @click="soumettreEvaluation" 
            class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
            :disabled="totalPoints > 20"
          >
            Soumettre l'évaluation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Evaluation',
  setup() {
    const selectedStagiaire = ref('')
    const commentaire = ref('')
    const evaluations = ref({})

    const criteres = [
      { id: 'ponctualite', label: 'Ponctualité' },
      { id: 'assiduite', label: 'Assiduité' },
      { id: 'aptitudePro', label: 'Aptitudes Professionnelles' },
      { id: 'savoirEtre', label: 'Savoir-être' },
      { id: 'curiosite', label: 'Curiosité' }
    ]

    const stagiaires = ref([
      { id: 1, nom: 'Jean Dupont' },
      { id: 2, nom: 'Marie Martin' },
      { id: 3, nom: 'Paul Bernard' }
    ])

    const totalPoints = computed(() => {
      return Object.values(evaluations.value).reduce((sum, note) => sum + note, 0)
    })

    const evaluer = (critereId, note) => {
      evaluations.value[critereId] = note
    }

    const soumettreEvaluation = () => {
      if (totalPoints.value !== 20) {
        alert('Le total des notes doit être égal à 20')
        return
      }
      
      console.log({
        stagiaireId: selectedStagiaire.value,
        evaluations: evaluations.value,
        totalPoints: totalPoints.value,
        commentaire: commentaire.value
      })
    }

    return {
      selectedStagiaire,
      commentaire,
      evaluations,
      criteres,
      stagiaires,
      evaluer,
      soumettreEvaluation,
      totalPoints
    }
  }
}
</script>

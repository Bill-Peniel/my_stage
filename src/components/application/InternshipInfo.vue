
<template>
  <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6 border-t-4 border-primary">
    <h2 class="text-xl sm:text-2xl font-bold text-primary-dark mb-6 relative pb-2">
      Informations sur le stage
      <span class="absolute bottom-0 left-0 w-16 h-1 bg-primary-light"></span>
    </h2>

    <!-- Candidat Principal -->
    <div class="form-group border rounded-lg overflow-hidden mb-6">
      <button 
        type="button"
        @click="toggleAccordion('candidat1')" 
        class="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
      >
        <span class="text-lg font-semibold flex items-center">
          <i class="fas fa-user text-primary-light mr-2"></i>
          Candidat 1 (Principal)
        </span>
        <i :class="['fas', accordionStates.candidat1 ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
      </button>

      <div v-show="accordionStates.candidat1" class="p-4 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Type de stage -->
          <div class="form-group md:col-span-2">
            <label for="internshipType" class="form-label">Type de stage <span class="text-red-600">*</span></label>
            <select 
              id="internshipType"
              v-model="form.internshipType"
              class="input-field"
              required
            >
              <option value="" disabled>Sélectionnez le type de stage</option>
              <option value="academique">Stage académique</option>
              <option value="professionnel">Stage professionnel</option>
            </select>
          </div>

          <!-- Département -->
          <div class="form-group md:col-span-2">
            <label for="department" class="form-label">Département souhaité <span class="text-red-600">*</span></label>
            <select 
              id="department"
              v-model="form.department"
              class="input-field"
              required
            >
              <option value="" disabled>Sélectionnez un département</option>
              <option value="informatique">Direction des Systèmes d'Information</option>
              <option value="rh">Direction des Ressources Humaines</option>
              <option value="finance">Direction Financière</option>
              <option value="communication">Direction de la Communication</option>
            </select>
          </div>

          <!-- Dates de stage -->
          <div class="form-group">
            <label for="startDate" class="form-label">Date de début <span class="text-red-600">*</span></label>
            <input 
              type="date"
              id="startDate"
              v-model="form.startDate"
              class="input-field"
              required
            >
          </div>

          <div class="form-group">
            <label for="endDate" class="form-label">Date de fin <span class="text-red-600">*</span></label>
            <input 
              type="date"
              id="endDate"
              v-model="form.endDate"
              class="input-field"
              required
            >
          </div>

          <!-- Motivation -->
          <div class="form-group md:col-span-2">
            <label for="motivation" class="form-label">Motivation <span class="text-red-600">*</span></label>
            <textarea 
              id="motivation"
              v-model="form.motivation"
              class="input-field"
              rows="4"
              required
              placeholder="Décrivez votre motivation pour ce stage"
            ></textarea>
          </div>

          <!-- Compétences -->
          <div class="form-group md:col-span-2">
            <label for="skills" class="form-label">Compétences <span class="text-red-600">*</span></label>
            <textarea 
              id="skills"
              v-model="form.skills"
              class="input-field"
              rows="4"
              required
              placeholder="Listez vos principales compétences"
            ></textarea>
          </div>

          <!-- Expérience -->
          <div class="form-group md:col-span-2">
            <label for="previousExperience" class="form-label">Expérience précédente</label>
            <textarea 
              id="previousExperience"
              v-model="form.previousExperience"
              class="input-field"
              rows="4"
              placeholder="Décrivez vos expériences précédentes (optionnel)"
            ></textarea>
          </div>

          <!-- Université -->
          <div class="form-group">
            <label for="universityName" class="form-label">Établissement <span class="text-red-600">*</span></label>
            <input 
              type="text"
              id="universityName"
              v-model="form.universityName"
              class="input-field"
              required
              placeholder="Nom de votre établissement"
            >
          </div>

          <!-- Domaine d'études -->
          <div class="form-group">
            <label for="studyField" class="form-label">Domaine d'études <span class="text-red-600">*</span></label>
            <input 
              type="text"
              id="studyField"
              v-model="form.studyField"
              class="input-field"
              required
              placeholder="Votre domaine d'études"
            >
          </div>

          
        </div>
      </div>
    </div>

    <!-- Candidats supplémentaires pour binôme/groupe -->
    <template v-if="stageType === 'binome' || stageType === 'groupe'">
      <div v-for="(member, index) in groupMembers" :key="index" class="form-group border rounded-lg overflow-hidden mb-6">
        <button 
          type="button"
          @click="toggleAccordion(`candidat${index + 2}`)" 
          class="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
        >
          <span class="text-lg font-semibold flex items-center">
            <i class="fas fa-user-friends text-primary-light mr-2"></i>
            Candidat {{ index + 2 }}
          </span>
          <i :class="['fas', accordionStates[`candidat${index + 2}`] ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>

        <div v-show="accordionStates[`candidat${index + 2}`]" class="p-4 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Mêmes champs que pour le candidat principal -->
            <div class="form-group md:col-span-2">
              <label :for="'internshipType' + (index + 2)" class="form-label">Type de stage <span class="text-red-600">*</span></label>
              <select 
                :id="'internshipType' + (index + 2)"
                v-model="member.internshipType"
                class="input-field"
                required
              >
                <option value="" disabled>Sélectionnez le type de stage</option>
                <option value="academique">Stage académique</option>
                <option value="professionnel">Stage professionnel</option>
                <option value="fin_etudes">Stage de fin d'études</option>
              </select>
            </div>

            <div class="form-group md:col-span-2">
              <label :for="'motivation' + (index + 2)" class="form-label">Motivation <span class="text-red-600">*</span></label>
              <textarea 
                :id="'motivation' + (index + 2)"
                v-model="member.motivation"
                class="input-field"
                rows="4"
                required
                placeholder="Décrivez votre motivation pour ce stage"
              ></textarea>
            </div>

            <div class="form-group md:col-span-2">
              <label :for="'skills' + (index + 2)" class="form-label">Compétences <span class="text-red-600">*</span></label>
              <textarea 
                :id="'skills' + (index + 2)"
                v-model="member.skills"
                class="input-field"
                rows="4"
                required
                placeholder="Listez vos principales compétences"
              ></textarea>
            </div>

            <div class="form-group md:col-span-2">
              <label :for="'previousExperience' + (index + 2)" class="form-label">Expérience précédente</label>
              <textarea 
                :id="'previousExperience' + (index + 2)"
                v-model="member.previousExperience"
                class="input-field"
                rows="4"
                placeholder="Décrivez vos expériences précédentes (optionnel)"
              ></textarea>
            </div>

            <div class="form-group">
              <label :for="'universityName' + (index + 2)" class="form-label">Établissement <span class="text-red-600">*</span></label>
              <input 
                type="text"
                :id="'universityName' + (index + 2)"
                v-model="member.universityName"
                class="input-field"
                required
                placeholder="Nom de votre établissement"
              >
            </div>

            <div class="form-group">
              <label :for="'studyField' + (index + 2)" class="form-label">Domaine d'études <span class="text-red-600">*</span></label>
              <input 
                type="text"
                :id="'studyField' + (index + 2)"
                v-model="member.studyField"
                class="input-field"
                required
                placeholder="Votre domaine d'études"
              >
            </div>

            <div class="form-group md:col-span-2">
              <label :for="'studyYear' + (index + 2)" class="form-label">Année d'études <span class="text-red-600">*</span></label>
              <select 
                :id="'studyYear' + (index + 2)"
                v-model="member.studyYear"
                class="input-field"
                required
              >
                <option value="" disabled>Sélectionnez votre année d'études</option>
                <option value="licence1">Licence 1</option>
                <option value="licence2">Licence 2</option>
                <option value="licence3">Licence 3</option>
                <option value="master1">Master 1</option>
                <option value="master2">Master 2</option>
                <option value="doctorat">Doctorat</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Navigation buttons -->
    <div class="mt-8 flex justify-between items-center">
      <button 
        @click="previousStep" 
        class="btn-secondary px-6 py-2"
      >
        <i class="fas fa-arrow-left mr-2"></i> Précédent
      </button>
      <button 
        @click="nextStep"
        class="btn-primary px-6 py-2"
      >
        Suivant <i class="fas fa-arrow-right ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'InternshipInfo',
  setup() {
    const store = useStore()
    const accordionStates = ref({
      candidat1: true
    })

    const stageType = computed(() => store.state.applicationForm.personalInfo.stageType)
    const groupMembers = computed(() => store.state.applicationForm.personalInfo.groupMembers)

    const form = ref({
      internshipType: '',
      department: '',
      startDate: '',
      endDate: '',
      motivation: '',
      skills: '',
      previousExperience: '',
      universityName: '',
      studyField: '',
      studyYear: ''
    })

    const toggleAccordion = (accordion) => {
      accordionStates.value[accordion] = !accordionStates.value[accordion]
    }

    const previousStep = () => {
      store.commit('previousStep')
    }

    const nextStep = () => {
      store.commit('updateInternshipInfo', form.value)
      store.commit('nextStep')
    }

    return {
      form,
      stageType,
      groupMembers,
      accordionStates,
      toggleAccordion,
      previousStep,
      nextStep
    }
  }
}
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition duration-200;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.btn-primary {
  @apply bg-primary text-white rounded-md hover:bg-primary-dark transition duration-200;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200;
}
</style>

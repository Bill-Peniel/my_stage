
<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Informations sur le Stage</h2>
    
    <!-- Information pour le candidat principal -->
    <div class="form-group md:col-span-2 border rounded-lg overflow-hidden mb-6">
      <button 
        type="button"
        @click.prevent="toggleAccordion('candidat1')" 
        class="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
      >
        <span class="text-lg font-semibold flex items-center">
          <i class="fas fa-user text-primary-light mr-2"></i>
          Candidat 1 (Principal)
        </span>
        <i :class="['fas', accordionStates.candidat1 ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
      </button>

      <div v-show="accordionStates.candidat1" class="p-4">
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Internship Type -->
            <div class="form-group">
              <label for="internshipType" class="form-label">Type de stage <span class="text-red-600">*</span></label>
              <select
                id="internshipType"
                v-model="form.internshipType"
                class="input-field"
                :class="{ 'border-red-500': v$.internshipType.$error }"
                @blur="v$.internshipType.$touch()"
              >
                <option value="" disabled selected>Sélectionnez le type de stage</option>
                <option value="academic">Stage académique</option>
                <option value="professional">Stage professionnel</option>
              </select>
              <p v-if="v$.internshipType.$error" class="error-message">
                {{ v$.internshipType.$errors[0].$message }}
              </p>
            </div>
            
            <!-- Department -->
            <div class="form-group">
              <label for="department" class="form-label">Département souhaité <span class="text-red-600">*</span></label>
              <select
                id="department"
                v-model="form.department"
                class="input-field"
                :class="{ 'border-red-500': v$.department.$error }"
                @blur="v$.department.$touch()"
              >
                <option value="" disabled selected>Sélectionnez un département</option>
                <option value="budget">Direction Générale du Budget</option>
                <option value="tax">Direction Générale des Impôts</option>
                <option value="treasury">Direction Générale du Trésor</option>
                <option value="customs">Direction Générale des Douanes</option>
                <option value="procurement">Direction des Marchés Publics</option>
                <option value="planning">Direction de la Planification</option>
                <option value="it">Direction des Systèmes d'Information</option>
                <option value="hr">Direction des Ressources Humaines</option>
              </select>
              <p v-if="v$.department.$error" class="error-message">
                {{ v$.department.$errors[0].$message }}
              </p>
            </div>
            
            <!-- Start Date -->
            <div class="form-group">
              <label for="startDate" class="form-label">Date de début <span class="text-red-600">*</span></label>
              <input
                id="startDate"
                v-model="form.startDate"
                type="date"
                class="input-field"
                :class="{ 'border-red-500': v$.startDate.$error }"
                @blur="v$.startDate.$touch()"
              />
              <p v-if="v$.startDate.$error" class="error-message">
                {{ v$.startDate.$errors[0].$message }}
              </p>
            </div>
            
            <!-- End Date -->
            <div class="form-group">
              <label for="endDate" class="form-label">Date de fin <span class="text-red-600">*</span></label>
              <input
                id="endDate"
                v-model="form.endDate"
                type="date"
                class="input-field"
                :class="{ 'border-red-500': v$.endDate.$error || dateError }"
                @blur="v$.endDate.$touch()"
              />
              <p v-if="v$.endDate.$error" class="error-message">
                {{ v$.endDate.$errors[0].$message }}
              </p>
              <p v-if="dateError && !v$.endDate.$error" class="error-message">
                La date de fin doit être ultérieure à la date de début
              </p>
            </div>
            
            <!-- University Name (uniquement pour stage académique) -->
            <div v-if="form.internshipType === 'academic'" class="form-group">
              <label for="universityName" class="form-label">Établissement d'enseignement <span class="text-red-600">*</span></label>
              <input
                id="universityName"
                v-model="form.universityName"
                type="text"
                class="input-field"
                :class="{ 'border-red-500': v$.universityName.$error }"
                @blur="v$.universityName.$touch()"
              />
              <p v-if="v$.universityName.$error" class="error-message">
                {{ v$.universityName.$errors[0].$message }}
              </p>
            </div>
            
            <!-- Study Field -->
            <div class="form-group">
              <label for="studyField" class="form-label">Domaine d'études <span class="text-red-600">*</span></label>
              <input
                id="studyField"
                v-model="form.studyField"
                type="text"
                class="input-field"
                :class="{ 'border-red-500': v$.studyField.$error }"
                @blur="v$.studyField.$touch()"
              />
              <p v-if="v$.studyField.$error" class="error-message">
                {{ v$.studyField.$errors[0].$message }}
              </p>
            </div>
            
            <!-- Previous Experience -->
            <div class="form-group md:col-span-2">
              <label for="previousExperience" class="form-label">Expérience professionnelle précédente</label>
              <textarea
                id="previousExperience"
                v-model="form.previousExperience"
                rows="3"
                class="input-field"
                placeholder="Décrivez brièvement vos expériences professionnelles précédentes (facultatif)"
              ></textarea>
            </div>
            
            <!-- Skills -->
            <div class="form-group md:col-span-2">
              <label for="skills" class="form-label">Compétences <span class="text-red-600">*</span></label>
              <textarea
                id="skills"
                v-model="form.skills"
                rows="3"
                class="input-field"
                :class="{ 'border-red-500': v$.skills.$error }"
                @blur="v$.skills.$touch()"
                placeholder="Listez vos principales compétences et qualifications pertinentes pour ce stage"
              ></textarea>
              <p v-if="v$.skills.$error" class="error-message">
                {{ v$.skills.$errors[0].$message }}
              </p>
            </div>
            
            <!-- Motivation -->
            <div class="form-group md:col-span-2">
              <label for="motivation" class="form-label">Motivation <span class="text-red-600">*</span></label>
              <textarea
                id="motivation"
                v-model="form.motivation"
                rows="5"
                class="input-field"
                :class="{ 'border-red-500': v$.motivation.$error }"
                @blur="v$.motivation.$touch()"
                placeholder="Expliquez votre motivation pour effectuer un stage au sein du Ministère de l'Économie et des Finances"
              ></textarea>
              <p v-if="v$.motivation.$error" class="error-message">
                {{ v$.motivation.$errors[0].$message }}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Informations pour les autres candidats -->
    <template v-if="store.state.applicationForm.personalInfo.stageType === 'binome' || store.state.applicationForm.personalInfo.stageType === 'groupe'">
      <div v-for="(member, index) in store.state.applicationForm.personalInfo.groupMembers" :key="index" class="form-group md:col-span-2 border rounded-lg overflow-hidden mb-6">
        <button 
          type="button"
          @click.prevent="toggleAccordion(`candidat${index + 2}`)" 
          class="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
        >
          <span class="text-lg font-semibold flex items-center">
            <i class="fas fa-user-friends text-primary-light mr-2"></i>
            Candidat {{ index + 2 }}
          </span>
          <i :class="['fas', accordionStates[`candidat${index + 2}`] ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>

        <div v-show="accordionStates[`candidat${index + 2}`]" class="p-4">
          <!-- Même contenu que le formulaire principal mais avec des champs liés aux autres membres -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-group">
              <label :for="`internshipType${index + 2}`" class="form-label">Type de stage <span class="text-red-600">*</span></label>
              <select
                :id="`internshipType${index + 2}`"
                v-model="member.internshipInfo.internshipType"
                class="input-field"
              >
                <option value="" disabled selected>Sélectionnez le type de stage</option>
                <option value="academic">Stage académique</option>
                <option value="professional">Stage professionnel</option>
              </select>
            </div>

            <!-- Autres champs identiques au formulaire principal -->
            <!-- ... Répéter les mêmes champs que pour le candidat principal ... -->
          </div>
        </div>
      </div>
    </template>

    <div class="mt-8 flex justify-between">
      <button type="button" @click="previousStep" class="btn-outline">
        <i class="fas fa-arrow-left mr-2"></i> Précédent
      </button>
      <button type="submit" class="btn-primary" @click="submitForm">
        Suivant <i class="fas fa-arrow-right ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
  name: 'InternshipInfo',
  setup() {
    const store = useStore()
    const dateError = ref(false)
    
    const accordionStates = reactive({
      candidat1: true
    })

    // Initialiser les états d'accordéon pour les autres candidats
    if (store.state.applicationForm.personalInfo.groupMembers) {
      store.state.applicationForm.personalInfo.groupMembers.forEach((_, index) => {
        accordionStates[`candidat${index + 2}`] = false
      })
    }
    
    const form = reactive({
      internshipType: store.state.applicationForm.internshipInfo.internshipType,
      department: store.state.applicationForm.internshipInfo.department,
      startDate: store.state.applicationForm.internshipInfo.startDate,
      endDate: store.state.applicationForm.internshipInfo.endDate,
      motivation: store.state.applicationForm.internshipInfo.motivation,
      skills: store.state.applicationForm.internshipInfo.skills,
      previousExperience: store.state.applicationForm.internshipInfo.previousExperience,
      universityName: store.state.applicationForm.internshipInfo.universityName,
      studyField: store.state.applicationForm.internshipInfo.studyField
    })
    
    const rules = computed(() => ({
      internshipType: { required: helpers.withMessage('Veuillez sélectionner le type de stage', required) },
      department: { required: helpers.withMessage('Veuillez sélectionner un département', required) },
      startDate: { required: helpers.withMessage('Veuillez sélectionner une date de début', required) },
      endDate: { required: helpers.withMessage('Veuillez sélectionner une date de fin', required) },
      motivation: { required: helpers.withMessage('Veuillez expliquer votre motivation', required) },
      skills: { required: helpers.withMessage('Veuillez lister vos compétences', required) },
      ...(form.internshipType === 'academic' ? {
        universityName: { required: helpers.withMessage('Veuillez indiquer votre établissement d\'enseignement', required) }
      } : {}),
      studyField: { required: helpers.withMessage('Veuillez indiquer votre domaine d\'études', required) }
    }))
    
    const v$ = useVuelidate(rules, form)
    
    const validateDates = () => {
      if (form.startDate && form.endDate) {
        const start = new Date(form.startDate)
        const end = new Date(form.endDate)
        
        if (end <= start) {
          dateError.value = true
          return false
        }
      }
      
      dateError.value = false
      return true
    }

    const toggleAccordion = (accordion) => {
      accordionStates[accordion] = !accordionStates[accordion]
    }
    
    const submitForm = async () => {
      const isFormValid = await v$.value.$validate()
      const areDatesValid = validateDates()
      
      if (isFormValid && areDatesValid) {
        // Update store with form data for all candidates
        store.commit('updateInternshipInfo', {
          mainCandidate: {
            internshipType: form.internshipType,
            department: form.department,
            startDate: form.startDate,
            endDate: form.endDate,
            motivation: form.motivation,
            skills: form.skills,
            previousExperience: form.previousExperience,
            universityName: form.internshipType === 'academic' ? form.universityName : '',
            studyField: form.studyField
          },
          otherCandidates: store.state.applicationForm.personalInfo.groupMembers.map(member => member.internshipInfo)
        })
        
        // Move to next step
        store.commit('nextStep')
      }
    }
    
    const previousStep = () => {
      store.commit('previousStep')
    }
    
    return {
      form,
      v$,
      dateError,
      submitForm,
      previousStep,
      store,
      accordionStates,
      toggleAccordion
    }
  }
}
</script>


<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Messages</h1>
    </div>

    <div class="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      <!-- Liste des tuteurs -->
      <div class="col-span-4 bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-4 border-b">
          <div class="relative">
            <input 
              type="text" 
              placeholder="Rechercher un tuteur..." 
              class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              v-model="searchQuery"
            >
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
        <div class="overflow-y-auto h-full">
          <div 
            v-for="tuteur in tuteurs" 
            :key="tuteur.id"
            @click="selectTuteur(tuteur)"
            class="p-4 border-b hover:bg-gray-50 cursor-pointer"
            :class="{'bg-primary-light': selectedTuteur?.id === tuteur.id}"
          >
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span class="text-gray-600 font-medium">{{ tuteur.nom[0] }}</span>
              </div>
              <div class="ml-3">
                <p class="font-medium">{{ tuteur.nom }}</p>
                <p class="text-sm text-gray-500">{{ tuteur.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Zone de conversation -->
      <div class="col-span-8 bg-white rounded-lg shadow-sm flex flex-col">
        <div v-if="selectedTuteur" class="flex-1">
          <div class="p-4 border-b">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span class="text-gray-600 font-medium">{{ selectedTuteur.nom[0] }}</span>
              </div>
              <div class="ml-3">
                <p class="font-medium">{{ selectedTuteur.nom }}</p>
                <p class="text-sm text-gray-500">{{ selectedTuteur.role }}</p>
              </div>
            </div>
          </div>

          <div class="flex-1 p-4 overflow-y-auto">
            <div v-for="message in messages" :key="message.id" class="mb-4">
              <div :class="[
                'max-w-[70%] rounded-lg p-3',
                message.sender === 'stagiaire' ? 'ml-auto bg-primary text-white' : 'bg-gray-100'
              ]">
                <p>{{ message.content }}</p>
                <p class="text-xs mt-1 opacity-70">{{ message.time }}</p>
              </div>
            </div>
          </div>

          <div class="p-4 border-t">
            <div class="flex gap-2">
              <input 
                type="text" 
                v-model="newMessage"
                @keyup.enter="sendMessage"
                placeholder="Écrivez votre message..." 
                class="flex-1 p-2 border rounded-lg focus:ring-primary focus:border-primary"
              >
              <button 
                @click="sendMessage"
                class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        <div v-else class="flex-1 flex items-center justify-center text-gray-500">
          <p>Sélectionnez un tuteur pour commencer la conversation</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Messages',
  setup() {
    const searchQuery = ref('')
    const selectedTuteur = ref(null)
    const newMessage = ref('')

    const tuteurs = ref([
      { id: 1, nom: 'Pierre Martin', role: 'Tuteur principal' },
      { id: 2, nom: 'Marie Dubois', role: 'Tuteur adjoint' }
    ])

    const messages = ref([
      { id: 1, content: 'Bonjour, avez-vous des questions sur vos tâches ?', sender: 'tuteur', time: '10:30' },
      { id: 2, content: 'Oui, je voudrais savoir si je peux commencer le nouveau projet.', sender: 'stagiaire', time: '10:32' },
      { id: 3, content: 'Bien sûr, je vous envoie les détails.', sender: 'tuteur', time: '10:35' }
    ])

    const selectTuteur = (tuteur) => {
      selectedTuteur.value = tuteur
    }

    const sendMessage = () => {
      if (!newMessage.value.trim()) return

      messages.value.push({
        id: Date.now(),
        content: newMessage.value,
        sender: 'stagiaire',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      })

      newMessage.value = ''
    }

    return {
      searchQuery,
      tuteurs,
      selectedTuteur,
      messages,
      newMessage,
      selectTuteur,
      sendMessage
    }
  }
}
</script>

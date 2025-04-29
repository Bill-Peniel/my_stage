
<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex flex-wrap gap-4 justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-800">Notifications</h2>
        <div class="flex flex-wrap gap-3">
          <div class="flex items-center space-x-2">
            <label class="text-sm text-gray-600">Filtrer par:</label>
            <select v-model="filterType" class="input-field py-1 px-2">
              <option value="all">Tous</option>
              <option value="info">Information</option>
              <option value="success">Succès</option>
              <option value="warning">Avertissement</option>
              <option value="error">Erreur</option>
            </select>
          </div>
          <div class="flex space-x-2">
            <button @click="markAllAsRead" class="btn-outline flex items-center">
              <i class="fas fa-check-double mr-2"></i> Tout marquer comme lu
            </button>
            <button @click="deleteAllRead" class="btn-outline flex items-center text-red-600 hover:text-red-800">
              <i class="fas fa-trash mr-2"></i> Supprimer lues
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="divide-y divide-gray-200">
      <div v-for="notification in filteredNotifications" :key="notification.id" 
           class="p-6 hover:bg-gray-50 transition-colors duration-200"
           :class="{ 'bg-blue-50': !notification.read }">
        <div class="flex items-start justify-between">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <span class="inline-flex items-center justify-center h-10 w-10 rounded-full" 
                    :class="getNotificationTypeClass(notification.type)">
                <i class="fas" :class="getNotificationIcon(notification.type)"></i>
              </span>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900" :class="{ 'font-bold': !notification.read }">
                {{ notification.title }}
              </p>
              <p class="mt-1 text-sm text-gray-500">{{ notification.message }}</p>
              <p class="mt-2 text-xs text-gray-400">{{ formatDate(notification.date) }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button v-if="!notification.read" 
                    @click="markAsRead(notification.id)" 
                    class="text-primary hover:text-primary-dark"
                    title="Marquer comme lu">
              <i class="fas fa-check"></i>
            </button>
            <button @click="deleteNotification(notification.id)" 
                    class="text-gray-400 hover:text-red-600"
                    title="Supprimer">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- État vide -->
      <div v-if="filteredNotifications.length === 0" class="p-6 text-center">
        <span class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
          <i class="fas fa-bell text-gray-400 text-xl"></i>
        </span>
        <h3 class="text-sm font-medium text-gray-900">Aucune notification</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ filterType === 'all' ? "Vous n'avez pas de nouvelles notifications." : "Aucune notification de ce type." }}
        </p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="filteredNotifications.length > 0" class="px-6 py-4 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Affichage de {{ startIndex + 1 }} à {{ endIndex }} sur {{ totalFilteredNotifications }} notifications
        </div>
        <div class="flex space-x-2">
          <button 
            @click="previousPage" 
            :disabled="currentPage === 1"
            class="btn-outline py-1 px-3 disabled:opacity-50"
          >
            Précédent
          </button>
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="btn-outline py-1 px-3 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Notifications',
  setup() {
    const store = useStore()
    const currentPage = ref(1)
    const itemsPerPage = 10
    const filterType = ref('all')

    const notifications = ref([
      {
        id: 1,
        type: 'info',
        title: 'Nouvelle demande de stage',
        message: 'Une nouvelle demande de stage a été soumise par Jean Dupont.',
        date: new Date('2024-03-15T10:30:00'),
        read: false
      },
      {
        id: 2,
        type: 'success',
        title: 'Stage terminé',
        message: 'Le stage de Marie Martin a été marqué comme terminé.',
        date: new Date('2024-03-14T15:45:00'),
        read: true
      },
      {
        id: 3,
        type: 'warning',
        title: 'Rappel',
        message: 'Le stage de Paul Dubois se termine dans 7 jours.',
        date: new Date('2024-03-13T09:15:00'),
        read: false
      }
    ])

    const filteredNotifications = computed(() => {
      if (filterType.value === 'all') {
        return notifications.value
      }
      return notifications.value.filter(n => n.type === filterType.value)
    })

    const totalFilteredNotifications = computed(() => filteredNotifications.value.length)
    const totalPages = computed(() => Math.ceil(totalFilteredNotifications.value / itemsPerPage))
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalFilteredNotifications.value))

    const getNotificationTypeClass = (type) => {
      const classes = {
        info: 'bg-blue-100 text-blue-600',
        success: 'bg-green-100 text-green-600',
        warning: 'bg-yellow-100 text-yellow-600',
        error: 'bg-red-100 text-red-600'
      }
      return classes[type] || classes.info
    }

    const getNotificationIcon = (type) => {
      const icons = {
        info: 'fa-info',
        success: 'fa-check',
        warning: 'fa-exclamation',
        error: 'fa-times'
      }
      return icons[type] || icons.info
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const markAsRead = async (id) => {
      const notification = notifications.value.find(n => n.id === id)
      if (notification) {
        notification.read = true
      }
    }

    const markAllAsRead = async () => {
      notifications.value.forEach(notification => {
        notification.read = true
      })
    }

    const deleteNotification = async (id) => {
      const index = notifications.value.findIndex(n => n.id === id)
      if (index !== -1) {
        notifications.value.splice(index, 1)
      }
    }

    const deleteAllRead = () => {
      notifications.value = notifications.value.filter(n => !n.read)
    }

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    return {
      notifications,
      filteredNotifications,
      filterType,
      currentPage,
      totalFilteredNotifications,
      totalPages,
      startIndex,
      endIndex,
      getNotificationTypeClass,
      getNotificationIcon,
      formatDate,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      deleteAllRead,
      previousPage,
      nextPage
    }
  }
}
</script>

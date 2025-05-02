
<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Notifications</h1>
      <p class="text-gray-600">Gérez vos notifications</p>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Toutes les notifications</h2>
          <button class="text-primary hover:text-primary-dark">
            <i class="fas fa-check-double mr-2"></i>Tout marquer comme lu
          </button>
        </div>
      </div>

      <div class="divide-y">
        <!-- Liste des notifications -->
        <div class="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <span class="w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                <i class="fas fa-user-graduate"></i>
              </span>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-900">Nouveau stagiaire assigné</p>
              <p class="text-sm text-gray-500">Un nouveau stagiaire a été assigné à votre supervision</p>
              <span class="text-xs text-gray-400">Il y a 2 heures</span>
            </div>
            <div class="ml-4 flex-shrink-0">
              <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div class="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <span class="w-8 h-8 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                <i class="fas fa-check-circle"></i>
              </span>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-900">Thème approuvé</p>
              <p class="text-sm text-gray-500">Votre thème proposé a été approuvé par la structure</p>
              <span class="text-xs text-gray-400">Il y a 1 jour</span>
            </div>
          </div>
        </div>

        <div class="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <span class="w-8 h-8 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center">
                <i class="fas fa-bell"></i>
              </span>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-900">Rappel d'évaluation</p>
              <p class="text-sm text-gray-500">N'oubliez pas d'évaluer vos stagiaires avant la fin de la semaine</p>
              <span class="text-xs text-gray-400">Il y a 2 jours</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="p-4 border-t">
        <div class="flex items-center justify-between">
          <button class="text-sm text-gray-600 hover:text-primary">
            <i class="fas fa-chevron-left mr-2"></i>Précédent
          </button>
          <button class="text-sm text-gray-600 hover:text-primary">
            Suivant<i class="fas fa-chevron-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TuteurNotifications',
  setup() {
    return {}
  }
}
</script>

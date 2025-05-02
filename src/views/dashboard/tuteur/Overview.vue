
<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Tableau de bord</h1>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg p-6 shadow-sm">
        <div class="flex items-center">
          <div class="rounded-full p-3 bg-primary-light">
            <i class="fas fa-users text-primary text-xl"></i>
          </div>
          <div class="ml-4">
            <h4 class="text-gray-500 text-sm">Total Stagiaires</h4>
            <div class="flex items-baseline">
              <p class="text-2xl font-semibold">8</p>
              <p class="text-green-500 text-sm ml-2">+2.5%</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-6 shadow-sm">
        <div class="flex items-center">
          <div class="rounded-full p-3 bg-blue-100">
            <i class="fas fa-user-graduate text-blue-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <h4 class="text-gray-500 text-sm">Stagiaires Actifs</h4>
            <div class="flex items-baseline">
              <p class="text-2xl font-semibold">5</p>
              <span class="text-sm text-gray-500 ml-2">En cours</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-6 shadow-sm">
        <div class="flex items-center">
          <div class="rounded-full p-3 bg-green-100">
            <i class="fas fa-check-circle text-green-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <h4 class="text-gray-500 text-sm">Stages Terminés</h4>
            <div class="flex items-baseline">
              <p class="text-2xl font-semibold">3</p>
              <span class="text-sm text-gray-500 ml-2">Complétés</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Activités Récentes</h2>
        <div class="space-y-4">
          <div class="flex items-center p-4 border rounded-lg">
            <div class="rounded-full bg-blue-100 p-2">
              <i class="fas fa-user-plus text-blue-600"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium">Nouveau stagiaire assigné</p>
              <p class="text-xs text-gray-500">Il y a 2 heures</p>
            </div>
          </div>
          
          <div class="flex items-center p-4 border rounded-lg">
            <div class="rounded-full bg-green-100 p-2">
              <i class="fas fa-check text-green-600"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium">Évaluation complétée</p>
              <p class="text-xs text-gray-500">Il y a 1 jour</p>
            </div>
          </div>
          
          <div class="flex items-center p-4 border rounded-lg">
            <div class="rounded-full bg-yellow-100 p-2">
              <i class="fas fa-star text-yellow-600"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium">Nouveau feedback reçu</p>
              <p class="text-xs text-gray-500">Il y a 2 jours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overview'
}
</script>

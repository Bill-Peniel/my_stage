<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Tableau de bord</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Statistiques -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="font-semibold text-gray-600">Demandes en attente</h3>
        <p class="text-2xl font-bold text-primary">12</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="font-semibold text-gray-600">Demandes en cours</h3>
        <p class="text-2xl font-bold text-primary">8</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="font-semibold text-gray-600">Stagiaires actifs</h3>
        <p class="text-2xl font-bold text-primary">24</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="font-semibold text-gray-600">Total structures</h3>
        <p class="text-2xl font-bold text-primary">15</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overview'
}
</script>
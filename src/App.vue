<template>
  <div class="flex flex-col min-h-screen">
    <Header v-if="!isDashboardRoute" />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition
          mode="out-in"
          @before-enter="startLoading"
          @after-leave="endLoading"
        >
          <Spinner v-if="isLoading" />
          <component :is="Component" v-else />
        </transition>
      </router-view>
    </main>
    <Footer v-if="!isDashboardRoute" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { ref } from 'vue'
import Spinner from './components/Spinner.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Spinner
  },
  setup() {
    const isLoading = ref(false)

    const startLoading = () => {
      isLoading.value = true
    }

    const endLoading = () => {
      setTimeout(() => {
        isLoading.value = false
      }, 500)
    }

    return {
      isLoading,
      startLoading,
      endLoading
    }
  },
  computed: {
    isDashboardRoute() {
      return this.$route.path.startsWith('/dashboard')
    }
  }
}
</script>

<style lang="postcss">
@import './assets/tailwind.css';

body {
  font-family: 'Poppins', sans-serif;
  @apply bg-gray-50;
}

.btn-primary {
  @apply bg-green-800 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition duration-200;
}

.btn-secondary {
  @apply bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50 transition duration-200;
}

.btn-outline {
  @apply border border-green-800 text-green-800 py-2 px-6 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition duration-200;
}

.input-field {
  @apply w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent;
}

.form-group {
  @apply mb-4;
}

.form-label {
  @apply block text-gray-700 font-medium mb-2;
}

.error-message {
  @apply text-red-600 text-sm mt-1;
}
</style>
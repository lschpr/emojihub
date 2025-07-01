<template>
  <div :class="{ dark: isDark }">
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      
      <header class="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 class="text-xl sm:text-2xl font-bold">🌐 EmojiHub</h1>
          <div class="flex gap-4 items-center">
            <button
              @click="toggleDark"
              class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              🌓 {{ isDark ? 'Licht' : 'Donker' }} modus
            </button>
            <router-link
              to="/"
              class="text-sm text-gray-600 dark:text-gray-300 hover:underline"
            >
              🏠 Home
            </router-link>
            <router-link
              to="/categories"
              class="text-sm text-gray-600 dark:text-gray-300 hover:underline"
            >
              📂 Categorieen
            </router-link>
            <h1>Lars Schipper</h1>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-6 py-10">
        <RouterView />
      </main>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'

const isDark = ref(false)

onMounted(() => {
  isDark.value = localStorage.getItem('dark') === 'true'
})

watch(isDark, (value) => {
  localStorage.setItem('dark', String(value))
})

function toggleDark() {
  isDark.value = !isDark.value
}
</script>

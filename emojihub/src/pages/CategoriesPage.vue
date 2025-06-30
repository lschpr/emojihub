<template>
  <div class="space-y-8">
    <h2 class="text-2xl font-bold">Emoji Categorieën</h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <router-link
        v-for="cat in categories"
        :key="cat.name"
        :to="`/?category=${cat.value}`"
        class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-5 flex flex-col items-center text-center hover:shadow-md transition"
      >
        <div class="text-3xl mb-2">{{ cat.emoji }}</div>
        <p class="text-sm font-medium text-gray-800 dark:text-gray-100">
          {{ cat.name }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const categories = [
  { name: 'Smileys and People', value: 'smileys-and-people', emoji: '😄' },
  { name: 'Animals and Nature', value: 'animals-and-nature', emoji: '🐶' },
  { name: 'Food and Drink', value: 'food-and-drink', emoji: '🍕' },
  { name: 'Travel and Places', value: 'travel-and-places', emoji: '✈️' },
  { name: 'Activities', value: 'activities', emoji: '⚽' },
  { name: 'Objects', value: 'objects', emoji: '💡' },
  { name: 'Symbols', value: 'symbols', emoji: '🔣' },
  { name: 'Flags', value: 'flags', emoji: '🏁' }
]
</script>

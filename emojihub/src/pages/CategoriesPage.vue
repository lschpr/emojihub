<template>
  <div class="space-y-8">
    <h2 class="text-2xl font-bold">📂 Emoji Categorieën</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <router-link
        v-for="cat in categories"
        :key="cat.value"
        :to="{ path: '/', query: { category: cat.value || undefined } }"
        class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-5 flex flex-col items-center text-center hover:shadow-md transition"
      >
        <div class="text-3xl mb-2">{{ cat.emoji }}</div>
        <p class="text-sm font-medium text-gray-800 dark:text-gray-100">
          {{ cat.label }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const categories = [
  { label: 'Alle categorieën',    value: ''                 , emoji: '🌐' },
  { label: 'Smileys And People',   value: 'smileys-and-people', emoji: '😄' },
  { label: 'Animals And Nature',   value: 'animals-and-nature', emoji: '🐶' },
  { label: 'Food And Drink',       value: 'food-and-drink'    , emoji: '🍕' },
  { label: 'Travel And Places',    value: 'travel-and-places' , emoji: '✈️' },
  { label: 'Activities',           value: 'activities'        , emoji: '⚽' },
  { label: 'Objects',              value: 'objects'           , emoji: '💡' },
  { label: 'Symbols',              value: 'symbols'           , emoji: '🔣' },
  { label: 'Flags',                value: 'flags'             , emoji: '🏁' },
]
</script>

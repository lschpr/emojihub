<template>
  <aside class="w-full sm:w-64 mb-6 sm:mb-0">
    <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
      Categorieën
    </h3>
    <ul class="space-y-2">
      <li v-for="cat in categories" :key="cat.value">
        <router-link
          :to="{ path: '/', query: { category: cat.value || undefined } }"
          class="block px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900 transition"
          :class="{ 'bg-indigo-200 dark:bg-indigo-800 font-semibold': current === cat.value }"
        >
          {{ cat.label }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const categories = [
  { label: 'Alle categorieën',    value: '' },
  { label: 'Smileys And People',   value: 'smileys-and-people' },
  { label: 'Animals And Nature',   value: 'animals-and-nature' },
  { label: 'Food And Drink',       value: 'food-and-drink' },
  { label: 'Travel And Places',    value: 'travel-and-places' },
  { label: 'Activities',           value: 'activities' },
  { label: 'Objects',              value: 'objects' },
  { label: 'Symbols',              value: 'symbols' },
  { label: 'Flags',                value: 'flags' },
]

const current = computed(() => {
  const q = route.query.category
  return typeof q === 'string' ? q : ''
})
</script>

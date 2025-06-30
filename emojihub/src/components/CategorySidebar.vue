<template>
  <aside class="w-full sm:w-64 mb-6 sm:mb-0">
    <h3 class="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Categorieën</h3>

    <div class="sm:hidden mb-4">
      <select
        v-model="selected"
        @change="emitSelected"
        class="w-full border rounded p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        <option value="">Alle categorieën</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ format(cat) }}</option>
      </select>
    </div>

    <ul class="hidden sm:block space-y-2">
      <li
        v-for="cat in categories"
        :key="cat"
        @click="select(cat)"
        :class="[
          'cursor-pointer px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900',
          selected === cat ? 'bg-indigo-200 dark:bg-indigo-800 font-semibold' : ''
        ]"
      >
        {{ format(cat) }}
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'update:category', value: string): void
}>()

const selected = ref('')
const categories = [
  '',
  'smileys-and-people',
  'animals-and-nature',
  'food-and-drink',
  'travel-and-places',
  'activities',
  'objects',
  'symbols',
  'flags'
]

const select = (value: string) => {
  selected.value = value
  emit('update:category', value)
}

const emitSelected = () => {
  emit('update:category', selected.value)
}

const format = (str: string) =>
  str === '' ? 'Alle categorieën' : str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
</script>

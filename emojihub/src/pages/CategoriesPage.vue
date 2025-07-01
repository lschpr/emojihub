<template>
  <div class="space-y-8">
    <h2 class="text-2xl font-bold">Emoji Categorieën</h2>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <router-link
        v-for="cat in categories"
        :key="cat.value"
        :to="`/?category=${cat.value}`"
        class="block"
      >
        <div class="bg-gray-800 rounded-xl p-6 flex flex-col items-center hover:bg-gray-700 transition cursor-pointer">
        <span class="text-4xl mb-2">{{ cat.emoji }}</span>
          <span class="font-semibold">{{ cat.label }}</span>
        </div>
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

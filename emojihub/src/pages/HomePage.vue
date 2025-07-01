<template>
  <div class="flex flex-col sm:flex-row gap-6">
    <!-- Sidebarcategorieën -->
    <CategorySidebar />

    <div class="flex-1 space-y-8">
      <!-- Header: zoekveld + random-knop -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          v-model="search"
          type="text"
          placeholder="🔍 Zoek een emoji..."
          class="flex-1 px-3 py-2 border rounded shadow-sm dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          @click="goToRandomEmoji"
          class="mt-2 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          🎲 Willekeurige emoji
        </button>
      </div>

      <!-- Favorieten -->
      <div v-if="favorites.length" class="space-y-2">
        <h3 class="text-xl font-semibold">⭐ Mijn favorieten</h3>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          <div
            v-for="name in favorites"
            :key="name"
            class="relative p-3 bg-white dark:bg-gray-800 rounded-xl shadow flex flex-col items-center"
          >
            <!-- Verwijder-ster -->
            <button
              @click.stop.prevent="toggleFavorite(name)"
              class="absolute top-1 right-1 text-lg"
              title="Verwijder uit favorieten"
            >⭐</button>
            <RouterLink :to="`/emoji/${encodeURIComponent(name)}`" class="text-3xl mb-1">
              {{ getEmojiChar(name) }}
            </RouterLink>
            <p class="text-xs dark:text-gray-300 truncate">{{ formatName(name) }}</p>
          </div>
        </div>
      </div>

      <!-- Emoji-overzicht -->
      <EmojiList :category="selectedCategory" :search="search" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import api from '../services/api'
import EmojiList from '../components/EmojiList.vue'
import CategorySidebar from '../components/CategorySidebar.vue'
import { useFavorites } from '../composables/useFavorites'

// Router
const router = useRouter()
const route = useRoute()

// Zoekterm
const search = ref('')

// Geselecteerde categorie uit URL ?category=…
const selectedCategory = computed<string>(() => {
  const q = route.query.category
  return typeof q === 'string' ? q : ''
})

// Favorieten composable
const { favorites, toggleFavorite } = useFavorites()

// Voor emoji-char in favorieten preview
const emojiMap = ref<Record<string, string>>({})
onMounted(async () => {
  const { data } = await api.get('/all')
  data.forEach((e: any) => {
    emojiMap.value[e.name] = e.unicode
      .map((u: string) => String.fromCodePoint(parseInt(u.replace('U+', ''), 16)))
      .join('')
  })
})

// Haal één karakter uit de map
function getEmojiChar(name: string): string {
  return emojiMap.value[name] || ''
}

// Strip huidskleur suffix en maak leesbare naam
function formatName(n: string): string {
  return n
    .replace(/-type-\d(-\d)?/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

// Navigeren naar een random emoji
async function goToRandomEmoji() {
  const { data } = await api.get('/random')
  router.push(`/emoji/${encodeURIComponent(data.name)}`)
}
</script>

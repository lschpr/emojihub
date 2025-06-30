<template>
  <div class="flex flex-col sm:flex-row gap-6">
    <CategorySidebar v-model:category="selectedCategory" />

    <div class="flex-1 space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 class="text-2xl font-bold">Emoji overzicht</h2>

        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            v-model="search"
            type="text"
            placeholder="🔍 Zoek een emoji..."
            class="w-full sm:w-64 px-3 py-2 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700"
          />
          <button
            @click="goToRandomEmoji"
            class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition whitespace-nowrap"
          >
            🎲 Willekeurige emoji
          </button>
        </div>
      </div>

      <div v-if="favorites.length > 0" class="space-y-3">
        <h3 class="text-xl font-semibold">⭐ Mijn favorieten</h3>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          <router-link
            v-for="name in favorites"
            :key="name"
            :to="`/emoji/${name}`"
            class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-xl p-3 flex flex-col items-center text-center"
          >
            <div class="text-3xl">
              {{ getEmojiCharacter(name) }}
            </div>
            <p class="text-xs text-gray-700 dark:text-gray-300 truncate mt-1 w-full max-w-[7rem]">
              {{ name }}
            </p>
          </router-link>
        </div>
      </div>

      <EmojiList :category="selectedCategory" :search="search" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import EmojiList from '../components/EmojiList.vue'
import CategorySidebar from '../components/CategorySidebar.vue'
import { useFavorites } from '../composables/useFavorites'

const selectedCategory = ref('')
const search = ref('')
const router = useRouter()

const { favorites } = useFavorites()
const emojiMap = ref<Record<string, { unicode: string[] }>>({})

onMounted(async () => {
  const res = await api.get('/all')
  for (const emoji of res.data) {
    emojiMap.value[emoji.name] = emoji
  }
})

const getEmojiCharacter = (name: string) => {
  const unicode = emojiMap.value[name]?.unicode || []
  return unicode
    .map(code => String.fromCodePoint(parseInt(code.replace('U+', ''), 16)))
    .join('')
}

async function goToRandomEmoji() {
  const res = await api.get('/random')
  router.push(`/emoji/${res.data.name}`)
}
</script>

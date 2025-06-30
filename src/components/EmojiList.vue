<template>
  <div class="space-y-8">
    <div v-for="(emojisInCat, cat) in groupedEmojis" :key="cat">
      <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100 capitalize">
        {{ format(cat) }}
      </h3>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <router-link
          v-for="emoji in emojisInCat"
          :key="emoji.name"
          :to="`/emoji/${emoji.name}`"
          class="relative bg-white dark:bg-gray-800 shadow hover:shadow-lg transition rounded-xl p-4 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700"
        >
          <button
            @click.stop.prevent="toggleFavorite(emoji.name)"
            class="absolute top-2 right-2 text-xl"
          >
            <span v-if="isFavorite(emoji.name)">⭐</span>
            <span v-else>☆</span>
          </button>

          <div class="text-4xl mb-2" v-html="emoji.htmlCode[0]" />
          <p class="text-sm text-gray-700 dark:text-gray-200 font-medium truncate w-full">
            {{ emoji.name }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '../services/api'
import { useFavorites } from '../composables/useFavorites'

interface Emoji {
  name: string
  category: string
  group: string
  htmlCode: string[]
  unicode: string[]
}

const props = defineProps<{
  category: string
  search: string
  onlyFavorites?: boolean
}>()

const emojis = ref<Emoji[]>([])
const { favorites, isFavorite, toggleFavorite } = useFavorites()

onMounted(async () => {
  const res = await api.get<Emoji[]>('/all')
  emojis.value = res.data
})

const filteredEmojis = computed(() =>
  emojis.value.filter((emoji) => {
    const matchCategory = !props.category || emoji.category === props.category
    const matchSearch = !props.search || emoji.name.toLowerCase().includes(props.search.toLowerCase())
    const matchFavorite = !props.onlyFavorites || favorites.value.includes(emoji.name)
    return matchCategory && matchSearch && matchFavorite
  })
)

const groupedEmojis = computed(() => {
  const groups: Record<string, Emoji[]> = {}
  for (const emoji of filteredEmojis.value) {
    if (!groups[emoji.category]) {
      groups[emoji.category] = []
    }
    groups[emoji.category].push(emoji)
  }
  return groups
})

function format(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>
<template>
  <div class="space-y-8">
    <div v-for="(group, category) in groupedEmojis" :key="category">
      <h3
        class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100 capitalize"
      >
        {{ format(category) }}
      </h3>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <router-link
          v-for="emoji in group"
          :key="emoji.name"
          :to="`/emoji/${encodeURIComponent(emoji.name)}`"
          class="relative bg-white dark:bg-gray-800 shadow hover:shadow-lg transition rounded-xl p-4 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700"
        >
          <button
            @click.stop.prevent="toggleFavorite(emoji.name)"
            class="absolute top-2 right-2 text-xl"
          >
            <span v-if="isFavorite(emoji.name)">⭐</span>
            <span v-else>☆</span>
          </button>

          <!-- Render alle htmlCode entries aan elkaar -->
          <div class="text-4xl mb-2" v-html="emoji.htmlCode.join('')"></div>

          <p class="text-sm text-gray-700 dark:text-gray-200 font-medium truncate w-full">
            {{ formatName(emoji.name) }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
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
}>()

const emojis = ref<Emoji[]>([])
const { isFavorite, toggleFavorite } = useFavorites()

async function loadEmojis() {
  const path = props.category
    ? `/all/category/${props.category}`
    : '/all'
  const res = await api.get<Emoji[]>(path)
  emojis.value = res.data
}

onMounted(loadEmojis)
watch(() => props.category, loadEmojis)
watch(() => props.search, loadEmojis)

// Client‐side zoekfilter
const filteredEmojis = computed(() =>
  emojis.value.filter(e =>
    !props.search ||
    e.name.toLowerCase().includes(props.search.toLowerCase())
  )
)

const groupedEmojis = computed(() => {
  const groups: Record<string, Emoji[]> = {}
  for (const e of filteredEmojis.value) {
    if (!groups[e.category]) groups[e.category] = []
    groups[e.category].push(e)
  }
  return groups
})

function format(str: string) {
  return str
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}
function formatName(name: string) {
  return name
    .replace(/-type-\d(-\d)?/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}
</script>

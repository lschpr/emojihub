<template>
  <div
    v-if="emoji"
    class="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6 text-center border border-gray-200 dark:border-gray-700"
  >
    <div class="text-6xl mb-4">{{ emojiCharacter }}</div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
      {{ emoji.name }}
    </h2>
    <p class="text-sm text-gray-600 dark:text-gray-300">
      <strong>Categorie:</strong> {{ emoji.category }}
    </p>
    <p class="text-sm text-gray-600 dark:text-gray-300">
      <strong>Groep:</strong> {{ emoji.group }}
    </p>
    <p class="text-sm text-gray-600 dark:text-gray-300">
      <strong>Unicode:</strong> {{ emoji.unicode.join(', ') }}
    </p>
    <p class="text-sm text-gray-600 dark:text-gray-300">
      <strong>HTML-code:</strong> {{ emoji.htmlCode.join(', ') }}
    </p>

    <div class="mt-6 flex flex-col items-center gap-3">
      <button
        @click="copyEmoji"
        class="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Kopieer deze emoji
      </button>
      <p v-if="copied" class="text-green-500 text-sm">✅</p>

      <router-link
        to="/"
        class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
      >
        ← Terug naar overzicht
      </router-link>
    </div>
  </div>

  <div
    v-else
    class="text-center mt-10 text-gray-500 dark:text-gray-400 text-sm"
  >
    Emoji niet gevonden...
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

interface Emoji {
  name: string
  category: string
  group: string
  htmlCode: string[]
  unicode: string[]
}

const route = useRoute()
const emoji = ref<Emoji | null>(null)
const copied = ref(false)

const emojiCharacter = computed(() => {
  if (!emoji.value?.unicode?.length) return ''
  return emoji.value.unicode
    .map((code) => String.fromCodePoint(parseInt(code.replace('U+', ''), 16)))
    .join('')
})

onMounted(async () => {
  const res = await api.get<Emoji[]>('/all')
  emoji.value = res.data.find((e) => e.name === route.params.name)
})

function copyEmoji() {
  navigator.clipboard.writeText(emojiCharacter.value).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  })
}
</script>

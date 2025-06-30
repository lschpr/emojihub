import { ref, watch } from 'vue'

const STORAGE_KEY = 'favorites'

const stored = localStorage.getItem(STORAGE_KEY)
const favorites = ref<string[]>(stored ? JSON.parse(stored) : [])

// Automatisch bijwerken in localStorage bij verandering
watch(favorites, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
}, { deep: true })

export function useFavorites() {
  const isFavorite = (name: string) => favorites.value.includes(name)

  const toggleFavorite = (name: string) => {
    const index = favorites.value.indexOf(name)
    if (index !== -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(name)
    }
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite
  }
}

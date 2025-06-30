import { ref, watch } from 'vue'

const stored = localStorage.getItem('favorites')
const favorites = ref<string[]>(stored ? JSON.parse(stored) : [])

watch(favorites, (val) => {
  localStorage.setItem('favorites', JSON.stringify(val))
}, { deep: true })

export function useFavorites() {
  const isFavorite = (name: string) => favorites.value.includes(name)

  const toggleFavorite = (name: string) => {
    if (isFavorite(name)) {
      favorites.value = favorites.value.filter(n => n !== name)
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

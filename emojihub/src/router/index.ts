import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import EmojiDetail from '../components/EmojiDetail.vue'
import CategoriesPage from '../pages/CategoriesPage.vue' // ← nieuw

const routes = [
  { path: '/', component: HomePage },
  { path: '/emoji/:name', component: EmojiDetail },
  { path: '/categories', component: CategoriesPage }, // ← nieuw
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

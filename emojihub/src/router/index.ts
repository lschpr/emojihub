import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import EmojiDetail from '../components/EmojiDetail.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/emoji/:name', component: EmojiDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

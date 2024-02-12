import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoardListView from '../views/BoardListView.vue'
import BoardInfoView from '../views/BoardInfoView.vue'
import BoardFormView from '../views/BoardFormView.vue'
import CommentListView from '../views/CommentListView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/boardList',
    name: 'boardList',
    component: BoardListView
  },
  {
    path: '/boardInfo',
    name: 'boardInfo',
    component: BoardInfoView
  },
  {
    path: '/boardForm',
    name: 'boardForm',
    component: BoardFormView
  },
  {
    path: '/commentList',
    name: 'commentList',
    component: CommentListView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

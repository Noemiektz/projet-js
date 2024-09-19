// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from './components/ArticleList.vue';
import NewArticle from './components/NewArticle.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

const routes = [
  {
    path: '/articles',
    name: 'articles',
    component: ArticleList, 
  },
  {
    path: '/new',
    name: 'NewArticle',
    component: NewArticle, 
  },
  {
    path: '/register',
    name: 'register',
    component: Register, 
  },
  {
    path: '/login',
    name: 'login',
    component: Login, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from './components/ArticleList.vue';
import NewArticle from './components/NewArticle.vue';

const routes = [
  {
    path: '/articles',
    name: 'articles',
    component: ArticleList, // Page par défaut qui affiche les articles
  },
  {
    path: '/new',
    name: 'NewArticle',
    component: NewArticle, // Page pour ajouter un nouvel article
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

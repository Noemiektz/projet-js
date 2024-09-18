<template>
  <div class="article-list">
    <h1>Liste des Articles</h1>
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="article in articles" :key="article._id">
        <h2>{{ article.nom }}</h2>
        <p>{{ article.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'ArticleList',
  setup() {
    const articles = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3000/articles');
        if (!response.ok) throw new Error('Erreur lors de la récupération des articles');
        articles.value = await response.json();
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchArticles();
    });

    return {
      articles,
      loading,
      error
    };
  }
};
</script>

<style scoped>

h1{
  color: black;
}
.article-list {
  padding: 20px;
}
.loading {
  font-size: 18px;
  color: #888;
}
.error {
  color: red;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
h2 {
  margin: 0;
}
</style>

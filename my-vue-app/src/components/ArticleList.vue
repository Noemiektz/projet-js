<!-- src/components/ArticleList.vue -->
<template>
  <div>
    <h1>Liste des articles</h1>
    
    <ul>
      <li v-for="article in articles" :key="article._id">
        {{ article.nom }} - {{ article.description }}
        <!-- Bouton poubelle pour supprimer -->
        <button @click="deleteArticle(article._id)" class="delete-button">
          🗑️
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
    };
  },
  methods: {
    async fetchArticles() {
  try {
    const token = localStorage.getItem('token'); // Récupère le token du localStorage
    const response = await fetch('http://localhost:3000/articles', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des articles');
    }

    const data = await response.json();
    this.articles = data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }
},
    
    // Méthode pour supprimer un article
    async deleteArticle(id) {
      try {
        const response = await fetch(`http://localhost:3000/delete/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de l\'article');
        }
        
        // Actualise la liste des articles après suppression
        this.articles = this.articles.filter(article => article._id !== id);
        alert('Article supprimé avec succès');
      } catch (error) {
        console.error('Failed to delete article:', error);
        alert('Erreur lors de la suppression de l\'article');
      }
    }
  },
  mounted() {
    this.fetchArticles(); // Appel pour récupérer les articles au montage du composant
  }
};
</script>

<style>
/* Style pour la liste et les boutons */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: red;
}

.delete-button:hover {
  color: darkred;
}
</style>

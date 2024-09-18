<!-- src/components/NewArticle.vue -->
<template>
    <div>
      <h2>Ajouter un nouvel article</h2>
      <form @submit.prevent="addArticle">
        <div>
          <label for="nom">Nom :</label>
          <input type="text" id="nom" v-model="nom" required />
        </div>
  
        <div>
          <label for="description">Description :</label>
          <textarea id="description" v-model="description" required></textarea>
        </div>
  
        <button type="submit">Ajouter l'article</button>
      </form>
  
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
  
      <div v-if="success" class="success">
        <p>{{ success }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nom: 'NewArticle',
        description: '',
        error: null,
        success: null
      };
    },
    methods: {
      async addArticle() {
        try {
          const response = await fetch('http://localhost:3000/new', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nom: this.nom,
              description: this.description
            }),
          });
  
          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }
  
          const result = await response.json();
          this.success = "L'article a été ajouté avec succès !";
          this.error = null;
          this.nom = '';
          this.description = '';
  
        } catch (err) {
          this.error = `Erreur lors de l'ajout de l'article : ${err.message}`;
          this.success = null;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Simple styling */
  form {
    margin-bottom: 20px;
  }
  input, textarea {
    display: block;
    margin: 10px 0;
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  </style>
  
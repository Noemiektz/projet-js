<!-- src/views/Register.vue -->
<template>
    <div class="auth-container">
      <h1>Inscription</h1>
      <form @submit.prevent="register">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
  
        <label for="password">Mot de passe:</label>
        <input type="password" v-model="password" id="password" required />
  
        <button type="submit">S'inscrire</button>
      </form>
      <p>
        Déjà un compte ? <router-link to="/login">Connectez-vous</router-link>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async register() {
        try {
          const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: this.email, password: this.password }),
          });
  
          if (!response.ok) {
            throw new Error('Erreur lors de l\'inscription');
          }
  
          alert('Inscription réussie, vous pouvez maintenant vous connecter.');
          this.$router.push('/login'); // Redirection vers la page de connexion
        } catch (error) {
          console.error('Erreur d\'inscription:', error);
          alert('Erreur lors de l\'inscription');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 10px;
  }
  
  input {
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  </style>
  
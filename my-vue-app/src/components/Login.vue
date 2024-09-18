<!-- src/views/Login.vue -->
<template>
    <div class="auth-container">
      <h1>Connexion</h1>
      <form @submit.prevent="login">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
  
        <label for="password">Mot de passe:</label>
        <input type="password" v-model="password" id="password" required />
  
        <button type="submit">Se connecter</button>
      </form>
      <p>
        Pas encore de compte ? <router-link to="/register">Inscrivez-vous</router-link>
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
      async login() {
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: this.email, password: this.password }),
          });
  
          if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
          }
  
          const data = await response.json();
          localStorage.setItem('token', data.token); // Stocke le token JWT
          this.$router.push('/'); // Redirection vers la page d'accueil ou une autre page protégée
        } catch (error) {
          console.error('Erreur de connexion:', error);
          alert('Erreur lors de la connexion');
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
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  
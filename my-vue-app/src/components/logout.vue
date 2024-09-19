
<template>
    <div>
      <!-- Autres éléments de l'interface utilisateur -->
  
      <button @click="logout" class="logout-button">Déconnexion</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Supprimer le jeton JWT du stockage local
        localStorage.removeItem('token');
        
        // Rediriger vers la page de connexion ou la page d'accueil
        this.$router.push('/login');
      }
    }
  }
  </script>
  
  <style>
  /* Style pour le bouton de déconnexion */
  .logout-button {
    background-color: red;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  .logout-button:hover {
    background-color: darkred;
  }
  </style>
  
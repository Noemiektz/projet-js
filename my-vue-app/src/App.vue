<!-- src/App.vue -->
<template>
  <div id="app">
    <div v-if="!isLoggedIn">
      <button><a href="/register">Inscription</a></button>
      <button><a href="/login">Connexion</a></button>
    </div>
    
    <!-- Afficher le bouton Déconnexion si l'utilisateur est connecté -->
    <div v-else>
      <button @click="logout">Déconnexion</button>
    </div>
    <h1>Gestion des Articles</h1>
    <nav>
      <router-link to="/articles">Liste des articles</router-link>
      <router-link to="/new">Ajouter un nouvel article</router-link>
    </nav>

    
    <!-- Cette section affichera le composant correspondant à la route actuelle -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    checkAuthStatus() {
      // Vérifie la présence du jeton dans le localStorage pour déterminer si l'utilisateur est connecté
      this.isLoggedIn = !!localStorage.getItem('token');
    },
    logout() {
      // Supprime le jeton et redirige vers la page de connexion
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  },
  created() {
    this.checkAuthStatus(); // Vérifie le statut d'authentification au démarrage du composant
  }
};

</script>

<style>



body{
  background-color: #bfd9ff;
}

h1{
  color: black;
}
nav {
  margin-bottom: 20px;
}

nav a {
  margin-right: 15px;
  text-decoration: none;
  color: blue;
}

nav a.router-link-active {
  font-weight: bold;
  color: green;
}


</style>

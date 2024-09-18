<!-- src/App.vue -->
<template>
  <div id="app">
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
};
</script>

<style>
/* Style pour le header et le lien de navigation */
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

// import { getArticles, addArticle, deleteArticle, updateArticle, addUser, findUserByEmail} from './db.js' //importer le fichier de la base
const { getArticles, addArticle, deleteArticle, updateArticle, addUser, findUserByEmail } = db;

import * as db from './db.js';


import express from 'express'
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';






var corsOptions = {
  origin: 'http://localhost:5173/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



const app = express()
const port = 3000

const JWT_SECRET = 'secret_key'; // Clé secrète pour signer les JWT

app.use(cors())

app.use(express.json());




var articles = []

var updatedarticles = []

var articleIdCounter = 0;

app.get('/', (req, res) => {
  res.send('Hello World!')
})



// Route pour l'inscription
app.post('/register', async (req, res) => {
  console.log('here')
  const { email, password } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: 'Cet email est déjà utilisé' });
  }

  try {
    await addUser(email, password);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur', details: err.message });
  }
});

// Route pour la connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
  }

  // Générer un token JWT
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
});

/* ----- Middleware pour protéger les routes ----- */

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Accès refusé' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide ou expiré' });
    }
    req.user = user;
    next();
  });
}



app.post('/logout', (req, res) => {
  // Ici, tu peux ajouter des opérations de nettoyage ou d'invalidation du jeton côté serveur si nécessaire
  res.status(200).json({ message: 'Déconnexion réussie' });
});

app.get('/articles' , async (req, res) => {
  try {
    
    const articles = await getArticles();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des articles', details: err.message });
  }
});


app.post('/new', async (req, res) => {
  const { nom, description } = req.body;


  try {
    const newArticle = await addArticle(nom, description);
    res.status(201).json(newArticle);
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'article:', err); // Logue l'erreur
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'article', details: err.message });
  }
});


app.delete('/delete/:id', async (req, res) => {
  const articleId = req.params.id;
  console.log(`Requête reçue pour supprimer l'article avec l'ID : ${articleId}`);

  try {
    const result = await deleteArticle(articleId);

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Article supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Article non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'article', details: err.message });
  }
});



app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, description } = req.body;

  // Valider l'ID MongoDB
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  // Valider les données
  if (!nom || !description) {
    return res.status(400).json({ error: 'Le nom et la description sont requis' });
  }

  try {
    const updatedArticle = await updateArticle(id, { nom, description });

    if (updatedArticle.matchedCount === 0) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    res.status(200).json({ message: 'Article mis à jour avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'article', details: err.message });
  }
});


// // Endpoint POST /articles : ajouter un nouvel article
// app.post('/new', async (req, res) => {
//   const { nom, description } = req.body;

//   // if (!nom || !description) {
//   //   return res.status(400).json({ error: 'Le nom et la description sont requis' });
//   // }

//   try {
//     const newArticle = await addArticle(nom, description);
//     res.status(201).json(newArticle);
//   } catch (err) {
//     res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'article', details: err.message });
//   }
// });



 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






import { getArticles, addArticle} from './db.js' //importer le fichier de la base
import express from 'express'

const app = express()
const port = 3000



app.use(express.json());

var articles = []

var updatedarticles = []

var articleIdCounter = 0;

app.get('/', (req, res) => {
  res.send('Hello World!')
})




app.get('/articles', async (req, res) => {
  try {
    
    const articles = await getArticles();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des articles', details: err.message });
  }
});



// Endpoint POST /articles : ajouter un nouvel article
app.post('/new', async (req, res) => {
  const { nom, description } = req.body;

  // if (!nom || !description) {
  //   return res.status(400).json({ error: 'Le nom et la description sont requis' });
  // }

  try {
    const newArticle = await addArticle(nom, description);
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'article', details: err.message });
  }
});



 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






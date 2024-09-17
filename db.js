const { MongoClient } = require('mongodb') ;
const uri = "mongodb://localhost:27017";




function getClient(){
  const client = new MongoClient(uri);
  return client;
}

function getCollection(client){
  const db = client.db("articleManager"); 
  const collection = db.collection("articles");
  return { client, collection };
}

async function getArticles() {
  const {collection} = getCollection(getClient())
  try {
    return await collection.find({}).toArray();
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    throw error;
  }


}




async function addArticle(nom, description) {
  // const db = await connectToMongo(); //connexion bdd
  // const collection = db.collection('tasks');
  // const task: Task = {
  //   nom,
  //   description,
  //   taskIdCounter: Date.now(), // Utiliser un identifiant basé sur le timestamp pour l'unicité
  // };
  // await collection.insertOne(task);
}

module.exports = {
  getArticles,
  addArticle,
  

}



  

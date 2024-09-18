const { MongoClient, ObjectId } = require('mongodb') ;
const uri = "mongodb://localhost:27017";
import bcrypt from 'bcryptjs';




function getClient(){
  const client = new MongoClient(uri);
  return client;
}


async function findUserByEmail(email) {
  const { client, collection } = getCollection(getClient(), 'users');
  try {
    await client.connect();
    return await collection.findOne({ email });
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
}

async function addUser(email, password) {
  const { client, collection } = getCollection(getClient(), 'users');
  try {
    await client.connect();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await collection.insertOne({ email, password: hashedPassword });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
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
  const { client, collection } = getCollection(getClient());
  try {
    await client.connect(); // Etablir la connexion
  
    const result = await collection.insertOne({ nom, description });

    return { _id: result.insertedId, nom, description }; // Retourne l'article avec son nouvel ID
  } catch (error) {
    throw error; // Relance l'erreur pour qu'elle soit capturée au niveau supérieur
  } finally {
    await client.close(); // Fermer la connexion MongoDB
   
  }
}


async function deleteArticle(id) {
  const { client, collection } = getCollection(getClient());
  try {
    await client.connect();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } finally {
    await client.close();
  }
}


async function updateArticle(id, updatedData) {
  const { client, collection } = getCollection(getClient());
  try {
    await client.connect();
    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = {
  getArticles,
  addArticle,
  deleteArticle,
  updateArticle,
  findUserByEmail,
  addUser

  

}



  

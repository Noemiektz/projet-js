import { getArticles} from './db.js' //importer le fichier de la base
import express from 'express'

const express = require('express')
const app = express()
const port = 3000



app.use(express.json());

var articles = []

var updatedarticles = []

var articleIdCounter = 0;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






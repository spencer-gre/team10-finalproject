import express from 'express'
import ViteExpress from 'vite-express'

require("dotenv").config();
const app = express();
app.use(cookie({name : 'session', keys : [ 'key1', 'key2' ], username : ''}))

// Database Code
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASS}@${
    process.env.HOST}`;
const {parse} = require("path");
const client = new MongoClient(uri, {
  serverApi : {
    version : ServerApiVersion.v1,
    strict : true,
    deprecationErrors : true,
  }
});

let users
let crosswords
let boards
let hangmans

async function run() {
  await client.connect()
  const myDatabase = await client.db("final_project")
  users = myDatabase.collection('Users')
  crosswords = myDatabase.collection('Crossword')
  boards = myDatabase.collection('Board')
  hangmans = myDatabase.collection('Hangman')
}

run()

app.use(express.json())

app.use( (req,res, next) => {
  console.log( req.url )
  next()
})

  ViteExpress.listen(app, 3000)
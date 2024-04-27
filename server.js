import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import ViteExpress from "vite-express";
import dotenv from "dotenv"
import { connect, database } from "./db/connection.js"
import { passportConfig } from "./config/passport.js";
import path from 'path';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();

app.use(express.json());
passportConfig(passport);
app.use(cors());
app.use(
  session({
    secret: "sessionSecretHehe",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 * 24 },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

dotenv.config();


// generic middleware that can be put on any route where user must first be
// authenticated
const ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

app.get('/login', (req, res) => {
  res.redirect("login.html")
})

app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/auth/user', ensureAuthenticated, (req, res) => {
  res.send({ user: req.user.username} );
})

app.get('/', ensureAuthenticated, (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.sendFile(resolve(__dirname, 'index.html'));
})

app.get('/hangman', ensureAuthenticated, (req, res) => {
  res.sendStatus('200').end();
})

app.get('/admin', ensureAuthenticated, (req, res) => {
  res.send('200').end()
})

app.get('/hangmanWords', async (req, res) => {
  const db = database();
  const coll = db.collection("hangmans");

  let hangmanWords = [];

  hangmanWords = await coll.find({}).toArray();
  res.writeHead( 200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify(hangmanWords));
})

connect().then(() => {
  console.log("Connected to Mongo");
  ViteExpress.listen(app, 3000, () => {
    console.log("Listening to web requests");
  })

}).catch((err) => {
  console.log(err);
});





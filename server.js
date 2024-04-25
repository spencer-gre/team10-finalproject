import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import ViteExpress from "vite-express";
import dotenv from "dotenv"
import { connect, database } from "./db/connection.js"
import { passportConfig } from "./config/passport.js";

const app = express();

app.use(express.json());
passportConfig(passport);
app.use(express.json());
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
  res.redirect("login.html");
};

app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



app.use((req, res, next) => {
  console.log(req.url);
  next();
});



app.get((req, res) => {
  console.log(req.url);
  next();
});

app.post((req, res) => {
  console.log(req.url);
  next();
});

connect().then(() => {
	console.log("Connected to Mongo");
	ViteExpress.listen(app, 3000, () => {
		console.log("Listening to web requests");
	})

}).catch((err) => {
	console.log(err);
});

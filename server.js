import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import ViteExpress from "vite-express";

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

// generic middleware that can be put on any route where user must first be
// authenticated
const ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("login.html");
};

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

ViteExpress.listen(app, 3000);

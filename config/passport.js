import dotenv from "dotenv";
import GithubStrategy from "passport-github2";

dotenv.config();

const passportConfig = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(
    new GithubStrategy.Strategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK,
      },
      function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
          // To keep the example simple, the user's GitHub profile is
          // returned to represent the logged-in user.  In a typical
          // application, you would want to associate the GitHub account
          // with a user record in your database, and return that user
          // instead.
          return done(null, profile);
        });
      },
    ),
  );
};

export { passportConfig };

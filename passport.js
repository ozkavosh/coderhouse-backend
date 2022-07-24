const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const User = require("./models/user");
const { isValidPassword, encryptPassword } = require("./utils/password");

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        return done(null, false, {
          message: `No se encontro el usuario ${username}`,
        });
      }

      if (!isValidPassword(user, password)) {
        return done(null, false, { message: "Contraseña incorrecta" });
      }

      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (req, username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          console.log("Error en signup", err);
          return done(err);
        }

        if (user) {
          return done(null, false, { message: "El usuario ya existe!" });
        }

        const newUser = {
          username,
          password: encryptPassword(password)
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log(`Error guardando el usuario`, err);
            return done(err);
          }

          console.log("Se registro el usuario");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

module.exports = passport;

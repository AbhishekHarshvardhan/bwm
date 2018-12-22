const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config/dev");
const User = require("../model/user.model");
const { normalizeMongooseError } = require("../helpers/mongoose.helper");
const saltRounds = 10;

exports.register = (req, res) => {
  const { username, password, email, passwordConfirmation } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: [{ title: "Data missing!", details: "Provide email and password!" }] });
  }

  if (passwordConfirmation !== password) {
    return res.status(422).send({
      error: [
        {
          title: "Invalid password!",
          details: "Password is not same as confirmation!"
        }
      ]
    });
  }

  // Using shorthand as the key and value are same ie. email
  User.findOne({ email }, (error, existingUser) => {
    if (error) {
      return res.status(422).send({ error: normalizeMongooseError(error.errors) });
    }

    if (existingUser) {
      return res.status(422).send({
        error: [
          {
            title: "Invalid email!",
            details: "User with email already exist!"
          }
        ]
      });
    }

    // Using shorthand as the key and value are same ie. username,password and hashing password
    const user = new User({
      username,
      email,
      password: bcrypt.hashSync(password, saltRounds)
    });

    user.save(error => {
      if (error) {
        return res.status(422).send({ error: normalizeMongooseError(error.errors) });
      }

      return res.json({ registered: true });
    });
  });
};

exports.auth = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      error: [
        {
          title: "Data missing!",
          details: "Provide email and password!"
        }
      ]
    });
  }

  User.findOne({ email }, (error, existingUser) => {
    if (error) {
      return res.status(422).send({ error: normalizeMongooseError(error.errors) });
    }

    if (!existingUser) {
      return res.status(422).send({
        error: [
          {
            title: "Invalid email!",
            details: "User does not exist!"
          }
        ]
      });
    }

    if (!bcrypt.compareSync(password, existingUser.password)) {
      return res.status(422).send({
        error: [
          {
            title: "Wrong data!",
            details: "Wrong email or password!"
          }
        ]
      });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        username: existingUser.username
      },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json(token);
  });
};

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.includes("Bearer")) {
    return notAuthorizedError(res);
  }

  jwt.verify(token.split(" ")[1], config.JWT_SECRET, (err, user) => {
    if (err) {
      return notAuthorizedError(res);
    }
    User.findById(user.userId, (error, authUser) => {
      if (error) {
        return res.status(422).send({ error: normalizeMongooseError(error.errors) });
      }
      if (!authUser) {
        return notAuthorizedError(res);
      }
      res.locals.user = authUser;
      next();
    });
  });
};

notAuthorizedError = res =>
  res.status(401).send({
    error: [
      {
        title: "Not Authorized!",
        details: "You need to login to get access!"
      }
    ]
  });

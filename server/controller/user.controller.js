const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config/dev");
const User = require("../model/user.model");
const { normalizeMongooseError } = require("../helpers/mongoose.helper");
const saltRounds = 10;

exports.register = (req, res) => {
  const { username, password, email, passwordConfirmation } = req.body;

  if (!email || !password)
    return res.status(422).send({
      error: [{ title: "Data missing!", detail: "Provide email and password!" }]
    });

  if (passwordConfirmation !== password)
    return res.status(422).send({
      error: [{ title: "Invalid password!", detail: "Password is not same as confirmation!" }]
    });

  //using shorthand as the key and value are same ie. email
  User.findOne({ email }, (error, existingUser) => {
    if (error) return res.status(422).send({ error: normalizeMongooseError(error.errors) });

    if (existingUser)
      return res.status(422).send({ "Invalid email": "User with email already exist" });
    //using shorthand as the key and value are same ie. username,password and hashing password
    const user = new User({
      username,
      email,
      password: bcrypt.hashSync(password, saltRounds)
    });
    user.save(error => {
      if (error) return res.status(422).send({ error: normalizeMongooseError(error.errors) });

      return res.json({ registered: true });
    });
  });
};

exports.auth = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).send({
      error: [{ title: "Data missing!", detail: "Provide email and password!" }]
    });

  User.findOne({ email }, (error, existingUser) => {
    if (error) return res.status(422).send({ error: normalizeMongooseError(error.errors) });

    if (!existingUser) return res.status(422).send({ "Invalid email": "User does not exist" });

    if (!bcrypt.compareSync(password, existingUser.password))
      return res.status(422).send({
        error: [{ title: "Wrong data!", detail: "Wrong email or password!" }]
      });

    const token = jwt.sign(
      { userId: existingUser._id, username: existingUser.username },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json(token);
  });
};

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return notAuthorizedError(res);
  const user = parseToken(token);
  User.findById(user.userId, (error, authUser) => {
    if (error) return res.status(422).send({ error: normalizeMongooseError(error.errors) });
    if (!authUser) return notAuthorizedError(res);
    res.locals.user = authUser;
    next();
  });
};

parseToken = token => {
  let decoded = jwt.decode(token.split(" ")[1], { complete: true });
  return decoded.payload;
};

notAuthorizedError = res => {
  return res.status(401).send({
    error: [{ title: "Not Authorized!", detail: "You need to login to get access!" }]
  });
};

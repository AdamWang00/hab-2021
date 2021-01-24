const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcrypt");
const User = require("../models/user")

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const userId = await User.login({email, password});
  if (userId == 0) res.json({error: "Invalid Credentials"})
  const token = jwt.sign(
    {
      email,
      userId,
    },
    process.env.JWT_KEY
  );
  res.json({token});
};

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const imageUrl = req.body.imageUrl;

  // add user to db
  const userId = await User.register({name, email, password, imageUrl});

  // create jwt
  const token = jwt.sign({
      email,
      userId,
    },
    process.env.JWT_KEY
  );
  res.json({token});
};

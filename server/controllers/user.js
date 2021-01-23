const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // find user in database + compare password

    // create jwt TODO: add email and userId to token
    const token = jwt.sign({
      email: "",
      userId: "",
    });
  } catch (error) {
    return next(error);
  }
};

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  try {
    // handle profile pic
    let profilePic;
    if (req.file) {
      const uploadResponse = await images.upload(req.file.path);
      profilePic = {
        url: uploadResponse.url,
      };

      // remove file from disk storage
      fs.unlinkSync(req.file.path);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // add user to db

    // create jwt
    const token = jwt.sign(
      {
        email: "",
        userId: "",
      },
      process.env.JWT_KEY
    );
  } catch (error) {
    return next(error);
  }
};

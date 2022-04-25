const res = require("express/lib/response");
const User = require("../models/user.model");
const { registerSchema, loginSchema } = require("../utils/validation");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { value, error } = registerSchema.validate(req.body);
  //   console.log(value);
  if (error) {
    return res.status(400).json(error.message);
  }

  let user = await User.findOne({ email: value.email });

  if (user) {
    return res.status(409).json({ msg: "EMail already in use." });
  }
  const hashedPassword = await bcrypt.hash(value.password, 10);
  console.log(hashedPassword);

  user = await User.create({
    username: value.username,
    email: value.email,
    password: hashedPassword,
  });

  res.status(201).json(user);
};

const login = async (req, res) => {
  // validate user input
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  // check if user is in the database
  let user = await User.findOne({ email: value.email });

  // if user is not found
  if (!user) {
    return res.status(400).json({ msg: "invalid credentials" });
  }

  //   compare password with the stored password

  const isMatch = await bcrypt.compare(value.password, user.password);

  //   if passwords do not match
  if (!isMatch) {
    return res.status(400).json({ msg: "invalid credentials" });
  }
  // return the user if everything works well

  // generate token

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "star",
    { expiresIn: "1hr" }
  );
  res.status(200).json(token);
};

module.exports = {
  register,
  login,
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const saltRounds = 10;

const register = async (req, res) => {
  const emailExist = await User.exists({ email: req.body.email });
  if (emailExist) return res.status(409).send({ msg: "Email already exist!" });
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  await User.create(req.body)
  res.status(200).send({ msg: "Account created successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send({ msg: "Invalid Email!!" });
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched)
    return res.status(401).send({ msg: "Invalid Password!!" });
  const token = jwt.sign({ email }, process.env.SECRET_KEY);
  res.send({ token, user, isLoggedIn: true, msg: "Authorized!!" });
};

module.exports = { register, login };

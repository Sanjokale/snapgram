const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const saltRounds = 10;

const register = async (req, res) => {
  const emailExist = await User.exists({ email: req.body.email });
  if (emailExist) return res.status(409).send({ msg: "Email already exist!" });
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  await User.create(req.body);
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

const uploadAvatar = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User Id is invalid");
  user.avatar = req.file.filename;
  user.save();
  res.send({
    msg: "Avatar uploaded successfully",
    user,
  });
};

const findUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
};


const followUser = async (req, res) => {
  const { requestedBy, requestedTo } = req.params;
  const requestedUser = await User.findById(requestedBy);
  const requestedToUser = await User.findById(requestedTo);

  if (!requestedUser || !requestedToUser) {
    return res.status(404).send({ msg: "User not found" });
  }

  // Check if the user is already following the requested user
  if (requestedUser.following.includes(requestedTo)) {
    // If already following, unfollow the user
    requestedUser.following.pull(requestedTo); // Remove from following
    requestedToUser.followers.pull(requestedBy); // Remove from followers

    await requestedUser.save(); // Save changes to the requesting user
    await requestedToUser.save(); // Save changes to the requested user

    return res.send({ msg: `You have unfollowed ${requestedToUser.username}` });
  } else {
    // If not following, follow the user
    requestedUser.following.push(requestedTo); // Add to following
    requestedToUser.followers.push(requestedBy); // Add to followers

    await requestedUser.save(); // Save changes to the requesting user
    await requestedToUser.save(); // Save changes to the requested user

    return res.send({ msg: `You are now following ${requestedToUser.username}` });
  }
};

const getFollowersList = async (req, res) => {
  const user = await User.findById(req.params.userId)
    .populate("followers")
    .select("followers");
  return res.json(user);
};

const getFollowingList = async (req, res) => {
  const user = await User.findById(req.params.userId)
    .populate("following")
    .select("following");
  return res.json(user);
};

module.exports = {
  register,
  login,
  uploadAvatar,
  findUserById,
  followUser,
  getFollowersList,
  getFollowingList,
};

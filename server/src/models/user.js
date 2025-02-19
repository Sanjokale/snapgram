const mongoose = require("mongoose");

const { Schema } = mongoose;

userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  address: { type: String },
  website: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  saved_posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  avatar: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User; 

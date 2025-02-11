const mongoose = require("mongoose");

commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

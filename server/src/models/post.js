const  mongoose= require("mongoose");

postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  image: { type: String },
  created_at: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

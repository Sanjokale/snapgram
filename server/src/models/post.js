const  mongoose= require("mongoose");

postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  image: { type: String },
  
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
},
{timestamps: true}
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
     
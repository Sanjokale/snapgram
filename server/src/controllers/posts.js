const Post = require("../models/post");


const createPost = async (req, res) => {
  const { user, content } = req.body;
  let image = null;
  if (req.file) {
    image = req.file.filename;
  }
  await Post.create({user, content, image})
  //console.log(req.file);
  res.send({ msg: "Post Created Successfully" });
};


const getAllPost = async (req, res) => {
  const posts = await Post.find().populate('user')
  res.json({posts})

}

const Comment = require("../models/comment");

const createCommentOnPost = async (req, res) => {
  const postId = req.params.postId;
  const { commentedBy, text } = req.body;
  await Comment.create({commentedBy, text, post: postId})
  res.send({ msg: "Comment Created Successfully" });
};

const getCommentsOnPost = async (req, res) => {
  const postId = req.params.postId
  const data = await Comment.find({post: postId}).populate("commentedBy", "username") //this line of code only populate the field username of that partucular commnetedBy Field
  res.json(data)
}
  
 
module.exports = { createPost, getAllPost, createCommentOnPost, getCommentsOnPost};

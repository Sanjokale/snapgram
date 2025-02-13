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
module.exports = { createPost, getAllPost };

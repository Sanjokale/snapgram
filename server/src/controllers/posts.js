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

const postLikeToggled = async (req,res) => {
  const {userId, postId} = req.body;
  const post = await Post.findById(postId);

  if(!post) {
    return res.status(404),json({msg: "post not found"})
  }
  const isLiked = post.likes?.includes(userId)
  console.log(isLiked);
  
  if(isLiked) {
    post.likes = post.likes.filter( id => id.toString() !== userId.toString())
    await post.save();
    res.json({msg: "Post unliked successfully!!"})
  } else {
    post.likes.push(userId)
    post.save()
    res.json({msg: "Post liked successfully"})
  }
 
  
//   if (isLiked) {  
//     // Unlike: Remove user ID from likes array
//     await Post.findByIdAndUpdate(postId, {
//         $pull: { likes: userId }  //if we use the mongoose operator
//     });
//     res.json({ message: 'Post unliked successfully' });
// } else {
//     // Like: Add user ID to likes array
//     await Post.findByIdAndUpdate(postId, {
//         $push: { likes: userId }
//     });
//     res.json({ message: 'Post liked successfully' });
// }

}
  
 
module.exports = { createPost, getAllPost, createCommentOnPost, getCommentsOnPost, postLikeToggled};

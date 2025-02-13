"use client"


import { Post } from "./post"

 // Import currentUser
import { useSelector } from "react-redux";

export function PostFeed( {posts}) {
  const {currentUser: userDetails} = useSelector((state) => state.user);

  // const handleLike = (postId) => {
  //   setPosts(
  //     posts.map((post) => {
  //       if (post._id === postId) {
  //         const isLiked = post.likes.includes(currentUser.id)
  //         return {
  //           ...post,
  //           likes: isLiked ? post.likes.filter((id) => id !== currentUser.id) : [...post.likes, currentUser.id],
  //         }
  //       }
  //       return post
  //     }),
  //   )
  // }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  )
}


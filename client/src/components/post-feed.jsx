"use client"

import { useState } from "react"
import { Post } from "./post"
import { samplePosts } from "@/lib/data"
import { currentUser } from "@/lib/session"

export function PostFeed() {
  const [posts, setPosts] = useState(samplePosts)

  const handleLike = (postId) => {
    setPosts(posts.map((post) => {
      if (post._id === postId) {
        const isLiked = post.likes.includes(currentUser.id)
        return {
          ...post,
          likes: isLiked ? post.likes.filter((id) => id !== currentUser.id) : [...post.likes, currentUser.id],
        };
      }
      return post
    }))
  }

  const handleComment = (postId, commentText) => {
    setPosts(posts.map((post) => {
      if (post._id === postId) {
        const newComment = {
          _id: `c${Date.now()}`,
          user: {
            _id: currentUser.id,
            name: currentUser.name,
            imageUrl: currentUser.imageUrl,
          },
          content: commentText,
          created_at: new Date().toISOString(),
        }
        return {
          ...post,
          comments: [...post.comments, newComment],
        }
      }
      return post
    }))
  }

  return (
    (<div className="space-y-6">
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          onLike={() => handleLike(post._id)}
          onComment={handleComment}
          currentUser={currentUser} />
      ))}
    </div>)
  );
}


"use client";

import { Bookmark, Heart, MessageCircle, Send, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addToSavePost } from "@/redux/slices/postSlice";

export function Post({ post }) {
  const router = useRouter();
  const { toast } = useToast();
  const [postId, setPostId] = useState("");
  const inputRef = useRef(null);
  const [postComments, setPostComments] = useState([]);

  const { userDetails } = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const { savePost } = useSelector((state) => state.post);
  const isSaved = savePost.some((item) => item?._id === post?._id);
  const dispatch = useDispatch()

  const handleSubmitComment = async (commentedPost, e) => {
    e.preventDefault();

    try {
      //console.log("Comment value:", inputRef.current.value);

      const content = inputRef.current.value;
      if (content) {
        const { data } = await axios.post(
          `http://localhost:8080/post/${commentedPost}/comment`,
          {
            text: inputRef.current.value,
            commentedBy: userDetails?.user?._id,
          }
        );

        toast({
          title: data.msg,
        });
      } else {
        toast({
          title: "can not post empty post",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "could not comment",
      });
    }

    // Do something with the comment value
    inputRef.current.value = ""; // Clear input after submission
  };

  const handleSave = (post) => {
    dispatch(addToSavePost({ ...post, isSaved: true }));
    // Check if the post is already saved
    // const isPostSaved = savePost?.some((item) => item?._id === post?._id);

    // // Update the isSaved state based on whether the post is saved
    // setIsSaved(!isPostSaved);
  };


  const fetchComments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/post/${postId}/comments`
      );
      setPostComments(data);
      //console.log(postComments);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  const onLike = async () => {
    const { data } = await axios.put("http://localhost:8080/post/like", {
      postId: post._id,
      userId: userDetails.user._id,
    });

    if (data) {
      setIsLiked(!isLiked);
    }
  };

  const fetchLikesData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/post/${post._id}/likes/${userDetails.user._id}`
      );
      // console.log(data);

      setLikesCount(data.likesCount); // Assuming your API returns likesCount
      setIsLiked(data.isLiked); // Assuming your API returns isLiked
    } catch (error) {
      console.error("Error fetching likes data:", error);
    }
  };

  useEffect(() => {
    fetchLikesData();
  }, [likesCount, isLiked]);

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId, postComments]);

  return (
    <>
      <Card className=" border-none shadow-lg">
        <CardHeader className="flex flex-row items-center gap-2">
          <Avatar onClick={() => router.push("/profile/" + post?.user._id)}>
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${post?.user?.avatar}`}
              alt={post?.user?.username}
            />
            <AvatarFallback>{post?.user?.username[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{post?.user?.username}</p>
            <p className="text-xs text-muted-foreground">1 min ago</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{post.content}</p>
          {post.image && (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/static/posts/${post.image}`}
              alt="Post attachment"
              className="rounded-lg w-full object-cover max-h-[512px]"
            />
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" onClick={onLike}>
              <Heart
                className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`}
              />
              {likesCount}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPostId(postId === post._id ? "" : post._id)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {post?.comments?.length}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={isSaved ? "text-primary" : ""}
            onClick={() => handleSave(post)}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </CardFooter>
        {/* {comment section} */}

        {postId && postId == post._id && (
          <div className="w-full space-y-4 p-2 m-2 bg-blue-100 max-w-[65%]  rounded-lg border-none">
            <form
              onSubmit={(e) => handleSubmitComment(postId, e)}
              className="flex w-full gap-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${userDetails?.user?.avatar}`}
                  alt={userDetails.user.username}
                />
                <AvatarFallback>{userDetails.user.username}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  ref={inputRef}
                  placeholder="Write a comment..."
                  className="flex-1 border-none shadow-md bg-slate-100"
                  onClick={() => setPostId(post._id)}
                />
                <Button type="submit" size="sm" className=" bg-blue-400">
                  <Send className="h-4 w-4 " />
                </Button>
              </div>
            </form>
          </div>
        )}

        {postComments.length > 0 && postId ? (
          <div className="space-y-4 bg-blue-100 max-w-[65%] rounded-lg ml-2 p-2">
            {postComments.map((comment) => (
              <div key={comment._id} className="flex items-start gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${comment?.commentedBy?.avatar}`}
                    alt={comment.commentedBy.username}
                  />
                  <AvatarFallback>
                    {comment.commentedBy.username[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="rounded-xl bg-muted px-3 py-2">
                    <p className="text-sm font-semibold">
                      {comment.commentedBy.username}
                    </p>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    1 min ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </Card>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { PenSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PostFeed } from "@/components/post-feed";
import { currentUser } from "@/lib/data";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { userDetails } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/posts");
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* What's on your mind section */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={currentUser.imageUrl}
              alt={userDetails?.user?.username}
            />
            <AvatarFallback>{userDetails?.user?.username}</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground"
            asChild
          >
            <Link href="/home/create-post">
              <PenSquare className="mr-2 h-4 w-4" />
              What's on your mind, {userDetails?.user?.username.split(" ")[0]}?
            </Link>
          </Button>
        </div>
      </div>

      {/* Posts Feed */}
      <PostFeed posts={posts} />
    </div>
  );
}

"use client";

import Link from "next/link";
import { PenSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import PostFeed from "@/components/post-feed";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";


export default function HomePage() {
  const router = useRouter()
  const { userDetails } = useSelector((state) => state.user);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* What's on your mind section */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10"  onClick={ () => router.push('/profile/' + userDetails?.user._id)}>
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${userDetails?.user?.avatar}`}
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
      <PostFeed />
    </div>
  );
}

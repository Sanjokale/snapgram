"use client"

import { Heart, MessageCircle, Share } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Post({ post}) {
  //const isLiked = post.likes.includes(currentUser.user_id)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={null} alt={post?.user?.username} />
          <AvatarFallback>{post?.user?.username[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{post?.user?.username}</p>
          <p className="text-xs text-muted-foreground">
            1 min ago
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{post.content}</p>
        {post.image && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/static/${post.image}`}
            alt="Post attachment"
            className="rounded-lg w-full object-cover max-h-[512px]"
          />
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            <Heart className={`mr-2 h-4 w-4 ${false ? "fill-current" : ""}`} />
            {post.likes.length}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="mr-2 h-4 w-4" />
            {post.comments.length}
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(window.location.href)}>
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem>Share to...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}


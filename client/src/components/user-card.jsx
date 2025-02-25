'use client'
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

export function UserCard({user, userDetails}) {
 
const isFollowing = user.following.includes(userDetails.user._id)

  return (
    <Card>
    <CardContent className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user?.avatar || null} alt={user?.username} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{user?.username}</p>
          <p className="text-sm text-muted-foreground">@{user?.username}</p>
        </div>
      </div>
      <Button > {/* Pass user._id directly */}
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </CardContent>
  </Card>
  );
}

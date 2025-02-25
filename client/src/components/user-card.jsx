'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export function UserCard({user}) {
 


  return (
    <Card className=" border-none shadow-md bg-blue-100">
    <CardContent className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${user?.avatar}` || null} alt={user?.username} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{user?.username}</p>
          <p className="text-sm text-muted-foreground">@{user?.username}</p>
        </div>
      </div>
    
    </CardContent>
  </Card>
  );
}

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"

export function UserCard({
  user,
  onToggleFollow
}) {
  return (
    (<Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.imageUrl} alt={user.name} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </div>
        <Button
          variant={user.isFollowing ? "outline" : "default"}
          onClick={() => onToggleFollow(user.id)}>
          {user.isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </CardContent>
    </Card>)
  );
}


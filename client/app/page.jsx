import Link from "next/link"
import { PenSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PostFeed } from "@/components/post-feed"
import { currentUser } from "@/lib/data"

export default function HomePage() {
  return (
    (<div className="max-w-3xl mx-auto space-y-6">
      {/* What's on your mind section */}
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.imageUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground"
            asChild>
            <Link href="/create-post">
              <PenSquare className="mr-2 h-4 w-4" />
              What's on your mind, {currentUser.name.split(" ")[0]}?
            </Link>
          </Button>
        </div>
      </div>
      {/* Posts Feed */}
      <PostFeed />
    </div>)
  );
}


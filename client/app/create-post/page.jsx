"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ImagePlus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { currentUser } from "@/lib/data"

export default function CreatePostPage() {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate post creation delay
    setTimeout(() => {
      // In a real app, this would be handled by your backend
      const newPost = {
        _id: Date.now().toString(),
        user: currentUser,
        content,
        image: image || null,
        created_at: new Date().toISOString(),
        likes: [],
        comments: [],
      }

      // You could store this in localStorage or state management
      console.log("New post created:", newPost)

      setIsLoading(false)
      router.push("/")
    }, 1000)
  }

  return (
    (<div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="resize-none" />
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("image-upload").click()}>
                <ImagePlus className="mr-2 h-4 w-4" />
                Add Image
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    // In a real app, you'd handle image upload
                    setImage("/placeholder.svg?height=400&width=600")
                  }
                }} />
              {image && <span className="text-sm text-muted-foreground">Image selected</span>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={!content.trim() || isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>)
  );
}


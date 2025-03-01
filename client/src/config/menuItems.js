// Menu items with icons and labels

import { Home, PenSquare, Bookmark, Users, User, MessageSquare } from "lucide-react"
const menuItems = [
    {
      icon: Home,
      label: "Home",
      href: "/home",
    },
    {
      icon: PenSquare,
      label: "Posts",
      href: "/posts",
    },
    {
      icon: Bookmark,
      label: "Saved Posts",
      href: "/favorite",
    },
    {
      icon: Users,
      label: "Connections",
      href: "/followers",
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      href: "/messages",
    },
  ]
  
  export default menuItems
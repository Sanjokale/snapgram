"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import menuItems from "@/config/menuItems";
import Link from "next/link";
import { useSelector } from "react-redux";

export function AppSidebar() {
  const { userDetails } = useSelector((state) => state.user);
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <div className="flex h-full items-center px-6 font-semibold">
          Social App
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <Link
                  href={
                    item.label == "Profile"
                      ? (item.href + "/" + userDetails.user._id)
                      : item.href
                  }
                  className="flex items-center gap-2"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="text-sm text-sidebar-foreground/60">
          © 2024 Social App
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

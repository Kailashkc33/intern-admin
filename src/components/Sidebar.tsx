"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, FolderKanban } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/project-assignments", label: "Project Assignments", icon: FolderKanban },
  { href: "/admin/interns", label: "Manage Interns", icon: Users },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="overflow-hidden">
      <SidebarHeader className="border-b p-4">
        <h1 className="text-2xl font-bold">Admin</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive} className="overflow-hidden">
                  <Link href={item.href} className="flex items-center gap-3 whitespace-nowrap">
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}


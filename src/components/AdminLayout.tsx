"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/Sidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { BulkUploadModal } from "@/components/BulkUploadModal"

interface AdminLayoutProps {
  children: React.ReactNode
}

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/admin/dashboard":
      return "Dashboard"
    case "/admin/project-assignments":
      return "Project Assignments"
    case "/admin/interns":
      return "Manage Interns"
    default:
      return "Admin Dashboard"
  }
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const title = getPageTitle(pathname)
  const showActionButtons = pathname === "/admin/project-assignments"

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <div className="fixed inset-y-0 z-50">
          <AppSidebar />
        </div>
        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="font-semibold">{title}</h1>
            </div>
            {showActionButtons && (
              <div className="flex items-center gap-2">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Assignment
                </Button>
                <BulkUploadModal />
              </div>
            )}
          </header>
          <main className="flex-1 overflow-auto p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}


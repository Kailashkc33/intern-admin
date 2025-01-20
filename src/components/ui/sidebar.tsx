"use client"

import * as React from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext<{
  isOpen: boolean
  toggle: () => void
}>({
  isOpen: true,
  toggle: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true)
  return (
    <SidebarContext.Provider value={{ isOpen, toggle: () => setIsOpen((prev) => !prev) }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function Sidebar({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  const { isOpen } = React.useContext(SidebarContext)
  return (
    <aside className={cn(
      "fixed top-0 left-0 z-40 h-full bg-background border-r transition-all duration-300",
      isOpen ? "w-64" : "w-16",
      className
    )}>
      {children}
    </aside>
  )
}

export function SidebarTrigger() {
  const { toggle, isOpen } = React.useContext(SidebarContext)
  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      <ChevronLeft className={cn("h-4 w-4 transition-transform", !isOpen && "rotate-180")} />
    </Button>
  )
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />
}

export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1 p-4", className)} {...props} />
}

export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />
}

export function SidebarMenuButton({ 
  className, 
  isActive,
  asChild,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  isActive?: boolean
  asChild?: boolean 
}) {
  return (
    <button
      className={cn(
        "w-full rounded-lg px-2 py-2 hover:bg-accent",
        isActive && "bg-accent",
        className
      )}
      {...props}
    />
  )
}

export function SidebarInset({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = React.useContext(SidebarContext)
  return (
    <div
      className={cn("transition-all duration-300", isOpen ? "pl-64" : "pl-16", className)}
      {...props}
    />
  )
} 
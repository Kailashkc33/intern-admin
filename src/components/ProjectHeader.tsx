"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export function ProjectHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Project Assignments</h1>
        <p className="text-muted-foreground">Manage project assignments for interns</p>
      </div>
      {/* <Button asChild>
        <Link href="/admin/project-assignments/new">
          <Plus className="mr-2 h-4 w-4" />
          Create New Assignment
        </Link>
      </Button> */}
    </div>
  )
}


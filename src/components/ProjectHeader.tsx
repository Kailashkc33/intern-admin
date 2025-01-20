"use client"

import { Button } from "@/components/ui/button"
import { Upload, Plus } from "lucide-react"
import { BulkUploadModal } from "./BulkUploadModal"

export function ProjectHeader() {
  return (
    <div className="w-full bg-white px-6 py-4 border-b">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Project Assignment</h1>
        <div className="flex items-center gap-3">
          <Button className="bg-black hover:bg-black/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Create New Association
          </Button>
          <BulkUploadModal />
        </div>
      </div>
    </div>
  )
}


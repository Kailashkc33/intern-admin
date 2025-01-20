import { AdminLayout } from "@/components/AdminLayout"
import { ProjectAssignmentTable } from "@/components/ProjectAssignmentTable"

export default function ProjectAssignmentsPage() {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Project Assignments</h1>
        <ProjectAssignmentTable />
      </div>
    </AdminLayout>
  )
}


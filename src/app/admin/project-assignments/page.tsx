import { ProjectHeader } from "@/components/ProjectHeader"
import { ProjectAssignmentTable } from "@/components/ProjectAssignmentTable"
import { AdminLayout } from "@/components/AdminLayout"

export default function ProjectAssignmentsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <ProjectHeader />
        <ProjectAssignmentTable />
      </div>
    </AdminLayout>
  )
}
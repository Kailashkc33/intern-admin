import { InternUploadSection } from "@/components/InternUploadSection"
import { AdminLayout } from "@/components/AdminLayout"

export default function InternsPage() {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Intern Management</h1>
        <InternUploadSection />
      </div>
    </AdminLayout>
  )
} 
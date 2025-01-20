import { AdminLayout } from "@/components/AdminLayout"
import { DashboardContent } from "@/components/DashboardContent"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <DashboardContent />
      </div>
    </AdminLayout>
  )
}


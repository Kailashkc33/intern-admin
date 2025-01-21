import { CreateAssignmentForm } from '@/components/CreateAssignmentForm'

export default function NewAssignmentPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Assignment</h1>
      <CreateAssignmentForm />
    </div>
  )
}
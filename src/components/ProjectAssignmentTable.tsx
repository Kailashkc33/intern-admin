"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

interface Assignment {
  id: string
  intern: {
    name: string
  }
  project: {
    name: string
  }
  status: "ACTIVE" | "COMPLETED" | "CANCELLED"
  startDate: string
  endDate: string | null
}

export function ProjectAssignmentTable() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [totalRecords, setTotalRecords] = useState(0)

  const fetchAssignments = async (page: number, size: number) => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/assignments?page=${page}&pageSize=${size}`
      )
      if (!response.ok) throw new Error('Failed to fetch assignments')
      const data = await response.json()
      setAssignments(data.assignments)
      setTotalRecords(data.totalRecords)
    } catch (error) {
      console.error('Error fetching assignments:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssignments(currentPage, pageSize)
  }, [currentPage, pageSize])

  // Calculate pagination values
  const totalPages = Math.ceil(totalRecords / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalRecords)
  const currentRecords = assignments.slice(startIndex, endIndex)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value))
    setCurrentPage(1) // Reset to first page when changing page size
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Select>
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="Filter by Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="fullstack">Full Stack</SelectItem>
            <SelectItem value="business">Business Analyst</SelectItem>
            <SelectItem value="security">Cyber Security</SelectItem>
            <SelectItem value="data">Data Analyst</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="bg-white">
          <Calendar className="mr-2 h-4 w-4" />
          Filter by Start Date
        </Button>

        <Button variant="outline" className="bg-white">
          <Calendar className="mr-2 h-4 w-4" />
          Filter by Joining Date
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-gray-500">Intern</th>
                <th className="text-left p-4 font-medium text-gray-500">Project</th>
                <th className="text-left p-4 font-medium text-gray-500">Status</th>
                <th className="text-left p-4 font-medium text-gray-500">Start Date</th>
                <th className="text-left p-4 font-medium text-gray-500">End Date</th>
                <th className="text-left p-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((assignment) => (
                <tr key={assignment.id} className="border-b last:border-0">
                  <td className="p-4">{assignment.intern.name}</td>
                  <td className="p-4">{assignment.project.name}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.status === "ACTIVE" 
                          ? "bg-green-100 text-green-700" 
                          : assignment.status === "COMPLETED"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                  <td className="p-4">{new Date(assignment.startDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    {assignment.endDate ? new Date(assignment.endDate).toLocaleDateString() : 'Not set'}
                  </td>
                  <td className="p-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
                <SelectItem value="100">100 per page</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">
              Showing {startIndex + 1}-{endIndex} of {totalRecords} interns
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              <span className="px-3 py-1 bg-white border rounded text-sm">{currentPage}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

interface Assignment {
  id: string
  user: string
  project: string
  status: "ASSIGNED" | "REJECTED"
  startDate: string
  endDate: string
}

// Mock data - in real app this would come from API
const mockAssignments: Assignment[] = Array.from({ length: 150 }, (_, i) => ({
  id: `${i + 1}`,
  user: `User ${i + 1}`,
  project: i % 2 === 0 ? "AI Chatbot to supplement LMS" : "Cancer Data Analytics (Python)",
  status: i % 3 === 0 ? "REJECTED" : "ASSIGNED",
  startDate: i % 3 === 0 ? "Not set" : "Nov 4, 2024",
  endDate: i % 3 === 0 ? "Not set" : "Dec 20, 2024",
}))

export function ProjectAssignmentTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const totalRecords = mockAssignments.length

  // Calculate pagination values
  const totalPages = Math.ceil(totalRecords / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalRecords)
  const currentRecords = mockAssignments.slice(startIndex, endIndex)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value))
    setCurrentPage(1) // Reset to first page when changing page size
  }

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
                <th className="text-left p-4 font-medium text-gray-500">User</th>
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
                  <td className="p-4">{assignment.user}</td>
                  <td className="p-4">{assignment.project}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                      ${assignment.status === "ASSIGNED" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                  <td className="p-4">{assignment.startDate}</td>
                  <td className="p-4">{assignment.endDate}</td>
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


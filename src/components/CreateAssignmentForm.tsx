"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"

interface Intern {
  id: string
  name: string
  type: string
}

interface Project {
  id: string
  name: string
}

export function CreateAssignmentForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [interns, setInterns] = useState<Intern[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  
  const [formData, setFormData] = useState({
    internId: "",
    projectId: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE"
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [internsRes, projectsRes] = await Promise.all([
          fetch("/api/interns"),
          fetch("/api/projects")
        ])
        
        const internsData = await internsRes.json()
        const projectsData = await projectsRes.json()
        
        setInterns(internsData)
        setProjects(projectsData)
      } catch (error) {
        setError("Failed to load data")
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error("Failed to create assignment")
      }

      router.push("/admin/project-assignments")
      router.refresh()
    } catch (err) {
      setError("Failed to create assignment")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Intern
            </label>
            <Select
              value={formData.internId}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, internId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an intern..." />
              </SelectTrigger>
              <SelectContent>
                {interns.map((intern) => (
                  <SelectItem key={intern.id} value={intern.id}>
                    {intern.name} ({intern.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Select Project
            </label>
            <Select
              value={formData.projectId}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, projectId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a project..." />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Start Date
            </label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => 
                setFormData(prev => ({ ...prev, startDate: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              End Date (Optional)
            </label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => 
                setFormData(prev => ({ ...prev, endDate: e.target.value }))
              }
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Assignment"}
          </Button>
        </div>
      </form>
    </Card>
  )
} 
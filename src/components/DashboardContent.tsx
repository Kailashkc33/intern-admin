"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Briefcase, CheckCircle, AlertCircle, ArrowRight, ArrowUpRight, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Define types for our stats
interface DashboardStats {
  internStats: {
    total: number
    previousTotal: number
    byType: Array<{
      type: string
      _count: number
    }>
  }
  projectStats: {
    total: number
    byStatus: Array<{
      status: string
      _count: number
    }>
  }
  assignmentStats: {
    total: number
    completionRate: number
    recent: Array<{
      intern: { name: string; type: string }
      project: { name: string }
      createdAt: string
    }>
  }
}

export function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats')
        if (!response.ok) throw new Error('Failed to fetch stats')
        const data = await response.json()
        setStats(data)
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <div>Loading...</div>
  if (!stats) return null

  const calculatePercentageChange = (current: number, previous: number): string => {
    if (previous === 0) return '+100%'
    const percentageChange = ((current - previous) / previous) * 100
    const sign = percentageChange >= 0 ? '+' : ''
    return `${sign}${percentageChange.toFixed(1)}%`
  }

  // Transform the data for the stats cards
  const statsCards = [
    {
      title: "Total Interns",
      value: stats.internStats.total.toString(),
      change: calculatePercentageChange(stats.internStats.total, stats.internStats.previousTotal),
      icon: Users,
    },
    {
      title: "Active Projects",
      value: stats.projectStats.byStatus.find(s => s.status === 'ACTIVE')?._count.toString() || "0",
      change: "+4%", // You might want to calculate this based on historical data
      icon: Briefcase,
    },
    {
      title: "Completed Projects",
      value: stats.projectStats.byStatus.find(s => s.status === 'COMPLETED')?._count.toString() || "0",
      change: "+8%", // You might want to calculate this based on historical data
      icon: CheckCircle,
    },
    {
      title: "Completion Rate",
      value: `${stats.assignmentStats.completionRate}%`,
      change: stats.assignmentStats.completionRate > 50 ? "+2%" : "-2%",
      icon: AlertCircle,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon
          const isPositive = stat.change.startsWith("+")

          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"} flex items-center`}>
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from interns and projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {stats.assignmentStats.recent.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {activity.intern.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="text-muted-foreground">{activity.intern.name}</span> was assigned to{" "}
                      <span className="font-semibold">{activity.project.name}</span>
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-between" variant="outline" asChild>
              <Link href="/admin/interns">
                View All Interns
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button className="w-full justify-between" variant="outline" asChild>
              <Link href="/admin/projects">
                Manage Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button className="w-full justify-between" variant="outline" asChild>
              <Link href="/admin/project-assignments">
                Review Assignments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button className="w-full justify-between" variant="outline" asChild>
              <Link href="/admin/reports">
                Generate Reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Briefcase, CheckCircle, AlertCircle, ArrowRight, ArrowUpRight, Clock } from "lucide-react"
import { AvatarPlaceholder } from "@/components/ui/avatar-placeholder"

// Mock data - replace with real data in production
const stats = [
  {
    title: "Total Interns",
    value: "2,340",
    change: "+12%",
    icon: Users,
  },
  {
    title: "Active Projects",
    value: "45",
    change: "+4%",
    icon: Briefcase,
  },
  {
    title: "Completed Projects",
    value: "128",
    change: "+8%",
    icon: CheckCircle,
  },
  {
    title: "Pending Assignments",
    value: "12",
    change: "-2%",
    icon: AlertCircle,
  },
]

const recentActivity = [
  {
    user: "Sarah Chen",
    action: "was assigned to",
    project: "AI Chatbot Development",
    time: "2 minutes ago",
  },
  {
    user: "Michael Johnson",
    action: "completed",
    project: "Data Analytics Dashboard",
    time: "1 hour ago",
  },
  {
    user: "Emily Rodriguez",
    action: "started",
    project: "Mobile App Development",
    time: "3 hours ago",
  },
]

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
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
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="text-muted-foreground">{activity.user}</span> {activity.action}{" "}
                      <span className="font-semibold">{activity.project}</span>
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {activity.time}
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
            <Button className="w-full justify-between" variant="outline">
              View All Interns
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              Manage Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              Review Assignments
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              Generate Reports
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


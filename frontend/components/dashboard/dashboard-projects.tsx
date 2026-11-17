import React from "react"
import { Clock, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"

const projectData = [
  {
    id: 1,
    title: "Projects in Motion",
    description: "Sample Project",
    status: "Active",
    statusTheme: "default",
    tasksCompleted: 2,
    totalTasks: 4,
    targetDate: null,
  },
  {
    id: 2,
    title: "Another Project",
    description: "Another Sample Project",
    status: "Planning",
    statusTheme: "outline",
    tasksCompleted: 1,
    totalTasks: 3,
    targetDate: "2023-12-31",
  },
  {
    id: 3,
    title: "Third Project",
    description: "Third Sample Project",
    status: "Active",
    statusTheme: "default",
    tasksCompleted: 2,
    totalTasks: 3,
    targetDate: null,
  },
]

const DashboardProjects = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {projectData.map((project) => {
        const progress =
          project.totalTasks > 0
            ? Math.round((project.tasksCompleted / project.totalTasks) * 100)
            : 0

        return (
          <Link href={"#"} key={project.id} className="block">
            <Card className="h-full border transition-all duration-300 hover:-translate-y-2 hover:border-primary">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>

                <CardDescription className="text-sm text-muted-foreground">
                  {project.description}
                </CardDescription>

                <CardAction>
                  <Badge variant={project.statusTheme}>{project.status}</Badge>
                </CardAction>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-sm text-muted-foreground">
                    {project.tasksCompleted} out of {project.totalTasks} tasks
                    completed
                  </Label>

                  <p className="text-sm font-medium">{progress}%</p>
                </div>

                <Progress
                  className="mt-2"
                  aria-label={`${project.title} progress`}
                  value={progress}
                />

                <div className="mt-4 flex items-center justify-between">
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    {project.targetDate
                      ? new Date(
                          `${project.targetDate}T00:00:00`
                        ).toLocaleDateString()
                      : "No Target Date"}
                  </p>

                  <ArrowUpRight className="size-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

export default DashboardProjects

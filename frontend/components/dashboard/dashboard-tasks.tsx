"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type TaskStatus = "Done" | "In progress"

type Task = {
  id: number
  title: string
  project: string
  status: TaskStatus
  href: string
}
const tasks: Task[] = [
  {
    id: 1,
    title: "Explore the visual direction",
    project: "Website refresh",
    status: "Done",
    href: "#",
  },
  {
    id: 2,
    title: "Map the onboarding journey",
    project: "Customer experience",
    status: "Done",
    href: "#",
  },
  {
    id: 3,
    title: "Define the first milestone",
    project: "Springboard v1.0",
    status: "Done",
    href: "#",
  },
  {
    id: 4,
    title: "Refine the homepage story",
    project: "Website refresh",
    status: "In progress",
    href: "#",
  },
  {
    id: 5,
    title: "Review the launch checklist",
    project: "Website refresh",
    status: "In progress",
    href: "#",
  },
  {
    id: 6,
    title: "Collect feedback from the team",
    project: "Customer experience",
    status: "In progress",
    href: "#",
  },
]

const DashboardTasks = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {tasks.map((task, index) => {
        const isDone = task.status === "Done"

        return (
          <Link
            key={task.id}
            href={task.href}
            className={cn(
              "group flex min-h-[68px] items-center gap-3 px-4 py-3 sm:px-5",
              "transition-colors duration-200",
              index % 2 === 1 ? "bg-muted/50" : "bg-card",
              "hover:bg-accent",
              index !== tasks.length - 1 && "border-b border-border"
            )}
          >
            {/* Status indicator */}
            <span
              className={cn(
                "size-2 shrink-0 rounded-full border-2",
                isDone ? "border-muted-foreground" : "border-primary"
              )}
            />

            {/* Task information */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {task.title}
              </p>

              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {task.project}
              </p>
            </div>

            {/* Status badge */}
            <Badge
              variant="secondary"
              className={cn(
                "shrink-0 rounded-md border-0 px-2.5 py-1 text-[10px] font-medium shadow-none",
                isDone
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary/10 text-primary"
              )}
            >
              {task.status}
            </Badge>

            {/* Arrow */}
            <ArrowUpRight
              className={cn(
                "size-4 shrink-0 text-muted-foreground",
                "transition-all duration-200",
                "group-hover:-translate-y-0.5",
                "group-hover:translate-x-0.5",
                "group-hover:text-primary"
              )}
            />
          </Link>
        )
      })}
    </div>
  )
}

export default DashboardTasks

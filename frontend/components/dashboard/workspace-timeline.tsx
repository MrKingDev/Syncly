import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
const timelineData = [
  {
    user: "John Doe",
    action: "created a new task",
    description: "John created a new task for the marketing campaign.",
    timestamp: "Oct. 22, 10:00 AM EST",
  },
  {
    user: "Jane Smith",
    action: "updated a task",
    description: "Jane updated the status of the design task.",
    timestamp: "2024-06-01 11:30 AM",
  },
  {
    user: "Alice Johnson",
    action: "commented on a task",
    description: "Alice left a comment on the development task.",
    timestamp: "2024-06-01 12:00 PM",
  },
]
const WorkspaceTimeline = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Around the Workspace</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Timeline content goes here */}

        <div className="flex flex-col">
          {timelineData.map(
            ({ user, action, description, timestamp }, index) => {
              const isFirst = index === 0
              const isLast = index === timelineData.length - 1

              return (
                <div key={index} className="flex items-stretch gap-4">
                  {/* Timeline Indicator */}
                  <div className="relative w-3 shrink-0">
                    {/* Line above dot */}
                    {!isFirst && (
                      <span className="absolute top-0 left-1/2 h-[10px] w-px -translate-x-1/2 bg-border" />
                    )}

                    {/* Line below dot */}
                    {!isLast && (
                      <span className="absolute top-[10px] bottom-0 left-1/2 w-px -translate-x-1/2 bg-border" />
                    )}

                    {/* Timeline Dot */}
                    <span className="absolute top-[5px] left-1/2 z-10 size-2.5 -translate-x-1/2 rounded-full border-2 border-red-600 bg-card" />
                  </div>

                  {/* Timeline Content */}
                  <div className={`min-w-0 flex-1 ${!isLast ? "pb-6" : ""}`}>
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">
                        {user}
                      </span>{" "}
                      <span className="text-muted-foreground">{action}</span>
                    </p>

                    <p className="mt-1 text-sm">{description}</p>

                    <p className="mt-2 text-xs text-muted-foreground/70">
                      {timestamp}
                    </p>
                  </div>
                </div>
              )
            }
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default WorkspaceTimeline

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
    timestamp: "Oct. 21, 10:00 PM EST",
  },
  {
    user: "Alice Johnson",
    action: "commented on a task",
    description: "Alice left a comment on the development task.",
    timestamp: "Oct. 20, 12:00 AM EST",
  },
  {
    user: "Obaloluwa Adeyemi",
    action: "commented on a task",
    description: "Obaloluwa left a comment on the development task.",
    timestamp: "Oct. 19, 4:50 AM EST",
  },
]
const WorkspaceTimeline = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Around the Workspace</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {timelineData.map(
            ({ user, action, description, timestamp }, index) => {
              const isFirst = index === 0
              const isLast = index === timelineData.length - 1

              // Newest = bright red, oldest = dark red
              const ageProgress = index / Math.max(timelineData.length - 1, 1)

              const lightness = 50 - ageProgress * 30

              const circleColor = `hsl(0 80% ${lightness}%)`

              return (
                <div key={index} className="flex items-stretch gap-4">
                  {/* Timeline Indicator */}
                  <div className="relative w-3 shrink-0">
                    {/* Connecting Line Above */}
                    {!isFirst && (
                      <span className="absolute top-0 left-1/2 h-[10px] w-px -translate-x-1/2 bg-border" />
                    )}

                    {/* Connecting Line Below */}
                    {!isLast && (
                      <span className="absolute top-[10px] bottom-0 left-1/2 w-px -translate-x-1/2 bg-border" />
                    )}

                    {/* Circle */}
                    <span
                      className="absolute top-[5px] left-1/2 z-10 size-2.5 -translate-x-1/2 rounded-full border-2 bg-card transition-colors duration-300"
                      style={{
                        borderColor: circleColor,
                      }}
                    />
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

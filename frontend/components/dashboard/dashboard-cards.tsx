import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleDashed, UsersRound, ListChecks, Layers } from "lucide-react"

const cardInfoData = [
  {
    title: "Total Tasks",
    value: 10,
    note: "8 projects in this workspace",
    Icon: Layers,
  },
  {
    title: "Completed",
    value: 100,
    note: "33% of all tasks",
    Icon: ListChecks,
  },
  {
    title: "In Progress",
    value: 1000,
    note: "Good things are taking shape",
    Icon: CircleDashed,
  },
  {
    title: "Team Members",
    value: 5,
    note: "4 overdue tasks need attention",
    Icon: UsersRound,
  },
]

const DashboardCards = () => {
  return (
    <>
      {cardInfoData.map(({ title, value, note, Icon }) => (
        <Card key={title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value ?? "—"}</div>
            <p className="text-xs text-muted-foreground">{note}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default DashboardCards

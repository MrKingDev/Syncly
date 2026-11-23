import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

// Icons
import {
  FileText,
  FileBadge,
  FileBox,
  FileBracesCorner,
  ArrowUpRight,
} from "lucide-react"

// Data
const docsData = [
  {
    id: 1,
    title: "Document 1",
    updateData: "Nov. 17th, 2026. 2:30 PM",
    icon: FileText,
  },
  {
    id: 2,
    title: "Document 2",
    updateData: "Nov. 16th, 2026. 1:45 PM",
    icon: FileBadge,
  },
  {
    id: 3,
    title: "Document 3",
    updateData: "Nov. 16th, 2026. 1:45 PM",
    icon: FileBox,
  },
  {
    id: 4,
    title: "Document 4",
    updateData: "Nov. 16th, 2026. 1:45 PM",
    icon: FileBracesCorner,
  },
]

const DashboardDocs = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {docsData.map((doc) => {
        const Icon = doc.icon

        return (
          <Link href={"#"} key={doc.id} className="block">
            <Card
              key={doc.id}
              className="group py-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary"
            >
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5 text-muted-foreground" />
                  </div>

                  <div className="flex min-w-0 flex-col gap-1">
                    <p className="truncate text-sm font-medium">{doc.title}</p>

                    <p className="text-xs text-muted-foreground">
                      Updated {doc.updateData}
                    </p>
                  </div>
                </div>

                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

export default DashboardDocs

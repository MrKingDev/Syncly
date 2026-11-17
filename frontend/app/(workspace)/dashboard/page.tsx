import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { PageTransition } from "@/components/page-transition"
import Link from "next/link"

// Icons
import { Plus, ArrowUpRight } from "lucide-react"

// UI
import { Button } from "@/components/ui/button"

// Components
import DashboardCards from "@/components/dashboard/dashboard-cards"
import DashboardProgress from "@/components/dashboard/dashboard-progress"
import WorkspaceTimeline from "@/components/dashboard/workspace-timeline"
import DashboardProjects from "@/components/dashboard/dashboard-projects"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  return (
    <PageTransition>
      <main className="flex-1 space-y-4 p-8 pt-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            Good to see you, {session.user.name}
          </h1>
          <Button className="py-4">
            <Plus />
            {"Create Task"}
          </Button>
        </div>

        {/* Info Cards */}
        <section className="my-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCards />
        </section>

        {/* Projects */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Projects in Motion</h2>
            <Link href="/projects" className="ml-auto px-0">
              <Button variant="link">
                View All <ArrowUpRight />
              </Button>
            </Link>
          </div>
          <DashboardProjects />
        </section>

        {/* Task List */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recently updated tasks</h2>
            <Button variant="link" className="ml-auto px-0">
              View All <ArrowUpRight />
            </Button>
          </div>
          <div>Place Task List</div>
        </section>

        {/* Documents */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Documents</h2>
            <Button variant="link" className="ml-auto px-0">
              View All <ArrowUpRight />
            </Button>
          </div>
          <div>Place Document List</div>
        </section>
      </main>

      <aside className="ml-4 flex w-80 flex-col gap-4">
        {/* Progress */}
        <section>
          <DashboardProgress />
        </section>

        {/* Timeline */}
        <section>
          <WorkspaceTimeline />
        </section>
      </aside>
    </PageTransition>
  )
}

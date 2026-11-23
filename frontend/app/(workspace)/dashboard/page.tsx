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
import DashboardDocs from "@/components/dashboard/dashboard-docs"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  return (
    <PageTransition>
      <main className="min-w-0 flex-1 space-y-6 p-8 pt-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-bold">
            Good to see you, {session.user.name}
          </h1>

          <Button>
            <Plus />
            Create Task
          </Button>
        </div>

        {/* Info Cards - Full Width */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCards />
        </section>

        {/* Main Content + Aside */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Left: Main Content */}
          <div className="min-w-0 space-y-6">
            {/* Projects */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Projects in Motion</h2>

                <Button variant="link" asChild>
                  <Link href="/projects">
                    View All <ArrowUpRight />
                  </Link>
                </Button>
              </div>

              <DashboardProjects />
            </section>

            {/* Task List */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  Recently updated tasks
                </h2>

                <Button variant="link">
                  View All <ArrowUpRight />
                </Button>
              </div>

              <div>Place Task List</div>
            </section>

            {/* Documents */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Documents</h2>

                <Button variant="link">
                  <Link href="/documents">
                    View All <ArrowUpRight />
                  </Link>
                </Button>
              </div>

              <DashboardDocs />
            </section>
          </div>

          {/* Right: Aside */}
          <aside className="flex min-w-0 flex-col gap-4">
            {/* Progress */}
            <section>
              <DashboardProgress />
            </section>

            {/* Timeline */}
            <section>
              <WorkspaceTimeline />
            </section>
          </aside>
        </div>
      </main>
    </PageTransition>
  )
}

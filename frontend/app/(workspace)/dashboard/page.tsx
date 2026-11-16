import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { PageTransition } from "@/components/page-transition"

// Icons
import { Plus } from "lucide-react"

// UI
import { Button } from "@/components/ui/button"

// Components
import DashboardCards from "@/components/dashboard/dashboard-cards"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  return (
    <PageTransition>
      <main>
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
          <h2 className="text-2xl font-semibold">Projects in Motion</h2>
          <div>Place Project Cards</div>
        </section>

        <aside>
          {/* Progress */}
          <section>
            <h2 className="text-2xl font-semibold">Work at a glance</h2>
            <div>Place Progress Info</div>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="text-2xl font-semibold">Around the workspace</h2>
            <div>Place Timeline Info</div>
          </section>
        </aside>

        {/* Task List */}
        <section>
          <h2 className="text-2xl font-semibold">Recently updated tasks</h2>
          <div>Place Task List</div>
        </section>

        {/* Documents */}
        <section>
          <h2 className="text-2xl font-semibold">Documents</h2>
          <div>Place Document List</div>
        </section>
      </main>
    </PageTransition>
  )
}

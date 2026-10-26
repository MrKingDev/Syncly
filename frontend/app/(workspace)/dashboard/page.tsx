
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PageTransition } from "@/components/page-transition"

// Icons
import { Plus } from 'lucide-react';

// UI
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <PageTransition>
    <main>
      <div>
        <h2>Good to see you, {session.user.name} </h2>
        <Button className="py-6"><Plus/>{"Create Workspace"}</Button>
      </div>
    </main>
    </PageTransition>
  );
}

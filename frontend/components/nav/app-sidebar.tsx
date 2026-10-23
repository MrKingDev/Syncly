import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"


import {NavUser} from "@/components/nav/nav-user"

// Icons
import { Orbit, Columns3, Folders, ListTodo, LayoutDashboard, Command, AudioWaveform, GalleryVerticalEnd, FileText, UserRoundGroup, Plus, Settings } from 'lucide-react';
import { NavMain } from "@/components/nav/nav-main";
import { WorkspaceSwitcher } from "@/components/nav/workspace-switcher"

const userIMG = {img: "https://avatars.githubusercontent.com/u/12345678?v=4"}
// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  links: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "My Tasks",
      url: "#",
      icon: ListTodo,
    },
    {
      title: "Projects",
      url: "#",
      icon: Folders,
    },
    {
      title: "Task Board",
      url: "#",
      icon: Columns3,
    },
    {
      title: "Documents",
      url: "#",
      icon: FileText,
    },
    {
      title: "Members",
      url: "#",
      icon: UserRoundGroup,
    },
  ],
}


export default async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
       <SidebarHeader className="gap-3">
  {/* Logo */}
  <Link
    href="#"
    aria-label="Syncly Dashboard"
    className="
      flex w-full items-center gap-3
      rounded-lg px-2 py-1.5
      group-data-[collapsible=icon]:justify-center
      group-data-[collapsible=icon]:gap-0
      group-data-[collapsible=icon]:px-0
    "
  >
    <span className="flex size-8 shrink-0 rotate-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
      <Orbit className="size-5 -rotate-6" strokeWidth={2.4} />
    </span>

    <span className="whitespace-nowrap text-xl font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
      Syncly<span className="text-primary">.</span>
    </span>
  </Link>

  <Separator />

  {/* Workspace Switcher */}
  <WorkspaceSwitcher
    teams={data.teams.map(({ logo: Logo, ...team }) => ({
      ...team,
      logo: <Logo />,
    }))}
  />
</SidebarHeader>
  {/* Content */}
      <SidebarContent>
        <NavMain
  items={data.links.map(({ icon: Icon, ...item }) => ({
    ...item,
    icon: Icon ? <Icon /> : null,
  }))}
/>
<Button className="mx-4"><Plus/>{"Create Workspace"}</Button>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter>
<Button variant="outline"><Settings/>Workspace Settings</Button>
  <Separator />

    <NavUser user={{ name: session.user.name, email: session.user.email, avatar: userIMG.img ?? ""}} />
  </SidebarFooter>
    </Sidebar>
  )
}
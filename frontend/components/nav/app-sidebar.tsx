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
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"
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
  workspace: [
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
      url: "/my-tasks",
      icon: ListTodo,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Folders,
    },
    {
      title: "Task Board",
      url: "/tasks",
      icon: Columns3,
    },
    {
      title: "Documents",
      url: "/documents",
      icon: FileText,
    },
    {
      title: "Members",
      url: "/members",
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
  href="/dashboard"
  className="
    flex w-full flex-row flex-nowrap items-center
    justify-start gap-2 overflow-hidden
    rounded-lg px-2 py-1
    transition-[gap,padding] duration-300 ease-in-out
    group-data-[collapsible=icon]:gap-0
    group-data-[collapsible=icon]:px-0
  "
>
  {/* Logo Icon */}
  <span
    className="
      flex size-8 shrink-0 items-center justify-center
      rounded-lg bg-primary text-primary-foreground
    "
  >
    <Orbit className="size-5" strokeWidth={2.4} />
  </span>

  {/* Logo Text */}
  <span
    className="
      block max-w-40 min-w-0 overflow-hidden
      whitespace-nowrap text-xl font-semibold
      leading-none tracking-tight opacity-100
      transition-[max-width,opacity] duration-300 ease-in-out
      group-data-[collapsible=icon]:max-w-0
      group-data-[collapsible=icon]:opacity-0
    "
  >
    Syncly<span className="text-primary">.</span>
  </span>
</Link>

  <Separator />

  {/* Workspace Switcher */}
  <WorkspaceSwitcher
    teams={data.workspace.map(({ logo: Logo, ...team }) => ({
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
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter>
        <Link href="#" >
        <TooltipTrigger key="right">
        <Button
    variant="default"
    aria-label="Create Workspace"
    className="
      flex w-full min-w-0 items-center mb-4 gap-2
      overflow-hidden px-3
      transition-[width,padding,gap] duration-200 ease-linear
      group-data-[collapsible=icon]:!size-8
      group-data-[collapsible=icon]:justify-center
      group-data-[collapsible=icon]:!gap-0
      group-data-[collapsible=icon]:!p-0
    "
  >
    <Plus className="size-4 shrink-0" />

    <span className="truncate whitespace-nowrap group-data-[collapsible=icon]:hidden">
      Create Workspace
    </span>
  </Button>
  <Tooltip placement="right">
            <p>Create Workspace</p>
          </Tooltip>
  </TooltipTrigger>
        </Link>

  <Separator />

        <NavUser user={{ name: session.user.name, email: session.user.email, avatar: userIMG.img ?? "" }} />
      </SidebarFooter>
    </Sidebar>
  )
}
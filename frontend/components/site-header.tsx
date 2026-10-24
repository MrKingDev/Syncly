"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

import HeaderSearch from "@/components/header-search"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
} from "lucide-react"

const workspaceData = {
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
}

export function SiteHeader() {
    const pathname = usePathname() // Get the current pathname

    // Get the last segment of the current URL
  const currentPage =
    pathname.split("/").filter(Boolean).pop() || "Dashboard"

  // Format page name
  const pageTitle = currentPage
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

    // Current Workspace
    const activeWorkspace = workspaceData.workspace[0]

    const workspaceName =
    activeWorkspace?.name ?? "Workspace"

    const WorkspaceIcon =
    activeWorkspace?.logo ?? GalleryVerticalEnd

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center gap-2"
        >
          <Link
            href="/dashboard"
            className="flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground transition-color duration-300 hover:text-foreground"
          >
            <WorkspaceIcon className="size-4 shrink-0" />
            {workspaceName}
          </Link>

          <span className="text-muted-foreground/50">
            /
          </span>

          <h1 className="truncate text-sm font-semibold">
            {pageTitle}
          </h1>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <HeaderSearch />
        </div>
      </div>
    </header>
  )
}

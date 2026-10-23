
"use client"

import * as React from "react"
import type { ReactNode } from "react"

import {
  ChevronsUpDown,
  Plus,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

type Workspace = {
  name: string
  logo: ReactNode
  plan: string
}

interface WorkspaceSwitcherProps {
  teams: Workspace[]
}

export function WorkspaceSwitcher({
  teams,
}: WorkspaceSwitcherProps) {
  const { isMobile } = useSidebar()

  const [activeIndex, setActiveIndex] = React.useState(0)

  const activeTeam = teams[activeIndex] ?? teams[0]

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenuTrigger>
          <SidebarMenuButton
            size="lg"
            className="flex w-full flex-row items-center gap-2 data-pressed:bg-sidebar-accent data-pressed:text-sidebar-accent-foreground"
          >
            {/* Active Workspace Logo */}
            <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground [&>svg]:size-4">
              {activeTeam.logo}
            </div>

            {/* Workspace Information */}
            <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {activeTeam.name}
              </span>

              <span className="truncate text-xs text-muted-foreground">
                {activeTeam.plan}
              </span>
            </div>

            <ChevronsUpDown className="ml-auto size-4 shrink-0" />
          </SidebarMenuButton>

          {/* Workspace Dropdown */}
          <DropdownMenu
            className="w-(--trigger-width) min-w-56 rounded-lg"
            placement={isMobile ? "bottom start" : "right top"}
            offset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Workspaces
              </DropdownMenuLabel>

              {/* Workspace List */}
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={`${team.name}-${index}`}
                  textValue={team.name}
                  onAction={() => setActiveIndex(index)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-md border [&>svg]:size-3.5">
                    {team.logo}
                  </div>

                  <span className="min-w-0 flex-1 truncate">
                    {team.name}
                  </span>

                  <DropdownMenuShortcut>
                    {index + 1}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Add Workspace */}
            <DropdownMenuGroup>
              <DropdownMenuItem
                textValue="Add workspace"
                className="gap-2 p-2"
              >
                <div className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>

                <span className="font-medium text-muted-foreground">
                  Add workspace
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenu>
        </DropdownMenuTrigger>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

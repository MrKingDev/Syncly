
"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type NavItem = {
  title: string
  url: string
  icon?: ReactNode
}

interface NavMainProps {
  items: NavItem[]
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Your Workspace</SidebarGroupLabel>

      <SidebarMenu className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive =
            item.url !== "#" &&
            (pathname === item.url ||
              (item.url !== "/" &&
                pathname.startsWith(`${item.url}/`)))

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive}
              >
                <Link
                  href={item.url}
                  className="flex w-full flex-row items-center gap-3"
                >
                  {item.icon && (
                    <span className="flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
                      {item.icon}
                    </span>
                  )}

                  <span className="min-w-0 flex-1 truncate text-sm">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

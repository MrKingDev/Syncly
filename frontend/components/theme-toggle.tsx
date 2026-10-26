"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@wrksz/themes/client"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenuTrigger>
      <Button
        variant="outline"
        size="icon"
        className="relative transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95 motion-reduce:transition-none"
        aria-label="Toggle theme"
      >
        {/* Sun Icon */}
        <Sun className="absolute size-5 scale-100 rotate-0 opacity-100 transition-[transform,opacity] duration-500 ease-in-out motion-reduce:transition-none dark:scale-0 dark:-rotate-90 dark:opacity-0" />

        {/* Moon Icon */}
        <Moon className="absolute size-5 scale-0 rotate-90 opacity-0 transition-[transform,opacity] duration-500 ease-in-out motion-reduce:transition-none dark:scale-100 dark:rotate-0 dark:opacity-100" />

        <span className="sr-only">Toggle theme</span>
      </Button>

      <DropdownMenu placement="bottom end">
        <DropdownMenuItem onAction={() => setTheme("light")}>
          <Sun className="size-4" />
          Light
        </DropdownMenuItem>

        <DropdownMenuItem onAction={() => setTheme("dark")}>
          <Moon className="size-4" />
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem onAction={() => setTheme("system")}>
          <Monitor className="size-4" />
          System
        </DropdownMenuItem>
      </DropdownMenu>
    </DropdownMenuTrigger>
  )
}

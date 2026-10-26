import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "@wrksz/themes/next"
import { ThemeHotkey } from "@/components/theme-hotkey"

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange="background-color 0s, color 0s, border-color 0s"
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }

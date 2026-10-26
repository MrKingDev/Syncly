import React from "react"
import { ThemeToggle } from "@/components/theme-toggle"

const Settings = () => {
  return (
    <>
      <h1 className="text-center text-2xl font-bold">Settings</h1>

      {/* Theme */}
      <section className="mt-6 flex flex-col items-center gap-2">
        <h2 className="text-lg font-semibold">Theme</h2>
        <ThemeToggle />
      </section>
    </>
  )
}

export default Settings

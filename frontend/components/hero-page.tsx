import HalftoneBackground from "@/components/kokonutui/halftone-background"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <HalftoneBackground loupe={true}>
      <div className="flex min-h-full flex-col text-foreground">
        {/* HEADER */}
        <header className="flex items-center justify-between px-8 py-6">
          <nav className="just flex items-center gap-6">
            <Link href="#">LOGO</Link>
            <ul className="flex items-center gap-6">
              <li>
                <Link href="#">Link 1</Link>
              </li>
              <li>
                <Link href="#">Link 2</Link>
              </li>
              <li>
                <Link href="#">Link 3</Link>
              </li>
            </ul>
            <Button>Sign Up</Button>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Big ideas need a little space
          </h1>

          <p className="max-w-md text-lg">
            Organize your projects, collaborate with your team, and get things
            done.
          </p>
        </main>

        {/* FOOTER */}
        <footer className="px-8 py-6 text-center">Footer</footer>
      </div>
    </HalftoneBackground>
  )
}

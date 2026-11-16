import Link from "next/link"

const WorkspaceFooter = () => {
  return (
    <footer className="mt-auto w-full border-t border-border px-4 py-4 text-sm text-muted-foreground">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>Make room for good work.</p>

        <nav className="flex items-center gap-4">
          <Link href="#" className="transition-colors hover:text-foreground">
            Support
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default WorkspaceFooter

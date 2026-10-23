"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

// Icons
import { FaApple, FaGoogle, FaGithub } from "react-icons/fa"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const form = new FormData(e.currentTarget)

    try {
      const { error } = await authClient.signIn.email({
        email: String(form.get("email")),
        password: String(form.get("password")),
      })

      if (error) {
        setError(error.message ?? "Login failed")
        return
      }

      router.replace("/dashboard")
      router.refresh()
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent>
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your TeamSpace account
                </p>
              </div>
              <Field>
                {/* Email Field */}
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  autoComplete="email"
                />
              </Field>
              {/* Password Field */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                />

                {error && (
                  <p role="alert" className="text-red-500">
                    {error}
                  </p>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button">
                  <FaApple />
                  <span className="sr-only">Sign in with Apple</span>
                </Button>
                <Button variant="outline" type="button">
                  <FaGoogle />
                  <span className="sr-only">Sign in with Google</span>
                </Button>
                <Button variant="outline" type="button">
                  <FaGithub />
                  <span className="sr-only">Sign in with GitHub</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link href="/signup">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  )
}

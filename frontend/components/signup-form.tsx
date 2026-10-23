"use client"
import { cn } from "cn"
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

export function SignupForm({
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
    const password = String(form.get("password") ?? "")
    const confirmPassword = String(form.get("confirm-password") ?? "")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const { error } = await authClient.signUp.email({
        name: String(form.get("name")),
        email: String(form.get("email")),
        password: String(form.get("password")),
      })

      if (error) {
        setError(error.message ?? "Signup failed")
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
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <Field>
                {/* Full Name */}
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                />
                <FieldDescription>
                  Please enter your full name.
                </FieldDescription>
              </Field>
              {/* Email Field */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  autoComplete="email"
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
              </Field>
              {/* Password Fields */}
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      minLength={8}
                      autoComplete="new-password"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      minLength={8}
                      autoComplete="new-password"
                      required
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>

                {error && (
                  <p role="alert" className="text-red-500">
                    {error}
                  </p>
                )}
              </Field>
              {/* Submit Button */}
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              {/* Sign up Socials */}
              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button">
                  <FaApple />
                  <span className="sr-only">Sign up with Apple</span>
                </Button>
                <Button variant="outline" type="button">
                  <FaGoogle />
                  <span className="sr-only">Sign up with Google</span>
                </Button>
                <Button variant="outline" type="button">
                  <FaGithub />
                  <span className="sr-only">Sign up with GitHub</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/login">Login</Link>
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

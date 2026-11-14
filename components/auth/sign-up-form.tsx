"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import GoogleLogo from "@/app/images/google.png"
import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { authClient } from "@/app/lib/auth-client"
import { useRouter } from "next/navigation"

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />
}

interface Form {
  name?: string
  email?: string
  password?: string
  role?: Role
}

const ROLES = [
  {
    value: "seeker",
    label: "Seeker",
    description: "Find and apply to jobs",
  },
  {
    value: "recruiter",
    label: "Recruiter",
    description: "Post jobs and hire",
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage the platform",
  },
] as const

type Role = (typeof ROLES)[number]["value"]

export function SignUpForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [role, setRole] = React.useState<Role>("seeker")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const form = event.currentTarget
      const formData = new FormData(form)
      const user = Object.fromEntries(formData.entries()) as Form
      // TODO: Wire auth functionality here (authClient.signUp.email({ name, email, password })).
      const { data, error } = await authClient.signUp.email({
        name: user.name as string,
        email: user.email as string,
        password: user.password as string,
        role: role,
      })

      if (error) {
        console.log(error)
      } else {
        console.log("Signed up Successfully.")
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsSubmitting(false)
      router.push("/")
    }
  }

  return (
    <AuthShell
      title="Create your account"
      description="Join HireLoop and land your next role — faster."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-[#6772f8] transition-colors hover:text-[#8a94fa]"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Field>
          <Label htmlFor="name" className="text-xs font-medium text-white/70">
            Full name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className="h-11 rounded-xl border-white/10 bg-white/[0.04] px-3.5 text-sm text-white placeholder:text-white/40 md:text-sm"
          />
        </Field>

        <Field>
          <Label htmlFor="email" className="text-xs font-medium text-white/70">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="name@example.com"
            className="h-11 rounded-xl border-white/10 bg-white/[0.04] px-3.5 text-sm text-white placeholder:text-white/40 md:text-sm"
          />
        </Field>

        <Field>
          <Label
            htmlFor="password"
            className="text-xs font-medium text-white/70"
          >
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Min. 8 characters"
            className="h-11 rounded-xl border-white/10 bg-white/[0.04] px-3.5 text-sm text-white placeholder:text-white/40 md:text-sm"
          />
        </Field>

        <Field>
          <Label className="text-xs font-medium text-white/70">I am a</Label>
          <input type="hidden" name="role" value={role} />
          <div
            role="radiogroup"
            aria-label="Account role"
            className="grid grid-cols-1 gap-2 sm:grid-cols-3"
          >
            {ROLES.map((option) => {
              const selected = role === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setRole(option.value)}
                  className={cn(
                    "flex flex-col items-start gap-0.5 rounded-xl border px-3.5 py-2.5 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6772f8]/40",
                    selected
                      ? "border-[#6772f8] bg-[#6772f8]/15"
                      : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.06]"
                  )}
                >
                  <span className="flex w-full items-center justify-between text-sm font-medium text-white">
                    {option.label}
                    <span
                      aria-hidden
                      className={cn(
                        "size-3.5 rounded-full border transition-colors",
                        selected
                          ? "border-[#6772f8] bg-[#6772f8]"
                          : "border-white/30"
                      )}
                    />
                  </span>
                  <span className="text-xs text-white/40">
                    {option.description}
                  </span>
                </button>
              )
            })}
          </div>
        </Field>

        <p className="text-xs leading-relaxed text-white/40">
          By creating an account, you agree to our{" "}
          <Link
            href="#"
            className="text-white/60 underline-offset-2 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="text-white/60 underline-offset-2 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 h-11 w-full rounded-full bg-[#6772f8] text-sm font-medium text-white transition-colors outline-none hover:bg-[#5b66f0] focus-visible:ring-2 focus-visible:ring-[#6772f8]/40 disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>

        <div className="flex items-center gap-3 py-1">
          <Separator className="flex-1 bg-white/10" />
          <span className="text-xs text-white/40">or</span>
          <Separator className="flex-1 bg-white/10" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-11 w-full rounded-full border-white/15 bg-transparent text-sm font-medium text-white/90 transition-colors hover:bg-white/[0.06] dark:bg-transparent dark:text-white/90"
        >
          <Image src={GoogleLogo} alt="" className="size-4.5 rounded-full" />
          Sign up with Google
        </Button>
      </form>
    </AuthShell>
  )
}

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

function GoogleButton({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="h-11 w-full rounded-full border-white/15 bg-transparent text-sm font-medium text-white/90 transition-colors hover:bg-white/[0.06] dark:bg-transparent dark:text-white/90"
    >
      <Image src={GoogleLogo} alt="" className="size-4.5 rounded-full" />
      {label}
    </Button>
  )
}

export function SignInForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: Wire auth functionality here (authClient.signIn.email({ email, password })).
    setIsSubmitting(true)
   try { const formData = new FormData(event.currentTarget)
    const user = Object.fromEntries((formData.entries()))
    const { data, error } = await authClient.signIn.email({
      email: user.email as string,
      password: user.password as string,
      rememberMe: true, 
    })
    if (error){
      console.log(error)
    } else {
      console.log("Signed In Successfully")
    }} catch (err){
      console.log(err)
    } finally {
      setIsSubmitting(false)
      router.push("/")
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to your HireLoop account to continue your job search."
      footer={
        <>
          New to HireLoop?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-[#6772f8] transition-colors hover:text-[#8a94fa]"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-xs font-medium text-white/70"
            >
              Password
            </Label>
            <Link
              href="#"
              className="text-xs text-white/50 transition-colors hover:text-white"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="h-11 rounded-xl border-white/10 bg-white/[0.04] px-3.5 text-sm text-white placeholder:text-white/40 md:text-sm"
          />
        </Field>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-11 w-full rounded-full bg-[#6772f8] text-sm font-medium text-white transition-colors outline-none hover:bg-[#5b66f0] focus-visible:ring-2 focus-visible:ring-[#6772f8]/40 disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>

        <div className="flex items-center gap-3 py-1">
          <Separator className="flex-1 bg-white/10" />
          <span className="text-xs text-white/40">or</span>
          <Separator className="flex-1 bg-white/10" />
        </div>

        <GoogleButton label="Continue with Google" />
      </form>
    </AuthShell>
  )
}

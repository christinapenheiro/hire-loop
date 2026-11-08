"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import Logo from "@/app/images/logo.png"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

function AuthShell({
  title,
  description,
  children,
  footer,
}: React.ComponentProps<typeof Card> & {
  title: string
  description: React.ReactNode
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#0b0b0e] px-4 py-10">
      <div
        aria-hidden
        className="hero-stars pointer-events-none absolute inset-0 opacity-60"
      />
      <Link href="/" className="relative z-10 mb-6">
        <Image src={Logo} alt="HireLoop" className="h-7 w-auto" priority />
      </Link>

      <Card
        className={cn(
          "relative z-10 w-full max-w-[420px] rounded-2xl bg-[#131316] py-6 ring-white/[0.08]"
        )}
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-white/55">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">{children}</CardContent>
      </Card>

      <div className="relative z-10 mt-5 max-w-[420px] text-center text-sm text-white/55">
        {footer}
      </div>
    </main>
  )
}

export { AuthShell }

"use client"

import * as React from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

import Logo from "@/app/images/logo.png"

const NAV_LINKS = [
  { label: "Browse Jobs", href: "#" },
  { label: "Company", href: "#" },
  { label: "Pricing", href: "#" },
]

function NavLink({ className, ...props }: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "rounded-lg font-medium text-white/80 transition-colors hover:text-white",
        className
      )}
      {...props}
    />
  )
}

function GetStartedButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[#6772f8] px-5 text-sm font-medium text-white transition-colors outline-none hover:bg-[#5b66f0] focus-visible:ring-2 focus-visible:ring-[#6772f8]/40",
        className
      )}
      {...props}
    />
  )
}

export function SiteNavbar() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/[0.06] bg-[#131316] shadow-lg shadow-black/40">
        <div className="flex h-14 items-center justify-between px-4 sm:px-5 md:h-16">
          <a href="#" className="flex shrink-0 items-center">
            <Image
              src={Logo}
              alt="HireLoop"
              className="h-6 w-auto md:h-7"
              priority
            />
          </a>

          {/* Desktop */}
          <div className="hidden items-center md:flex">
            <div className="flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  className="text-[13px]"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <span className="mx-4 h-5 w-px bg-white/15 lg:mx-5" />
            <div className="flex items-center gap-5 lg:gap-6">
              <NavLink href="#" className="text-[13px]">
                Sign In
              </NavLink>
              <GetStartedButton href="#">Get Started</GetStartedButton>
            </div>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((prev) => !prev)}
            className="grid size-9 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white md:hidden"
          >
            <HugeiconsIcon
              icon={open ? Cancel01Icon : Menu01Icon}
              className="size-5"
            />
          </button>
        </div>

        {/* Mobile panel */}
        {open && (
          <div
            id="site-mobile-nav"
            className="flex animate-in flex-col gap-1 border-t border-white/[0.06] px-4 pt-3 pb-4 duration-200 fade-in slide-in-from-top-2 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm hover:bg-white/[0.06]"
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              href="#"
              onClick={() => setOpen(false)}
              className="mt-1 px-3 py-2.5 text-sm hover:bg-white/[0.06]"
            >
              Sign In
            </NavLink>
            <GetStartedButton
              href="#"
              onClick={() => setOpen(false)}
              className="mt-3 h-10 w-full"
            >
              Get Started
            </GetStartedButton>
          </div>
        )}
      </nav>
    </header>
  )
}

"use client"

import { usePathname } from "next/navigation"

import { useSession } from "@/app/lib/auth-client"
import { NAV_CONFIG, ROLE_TITLES } from "@/components/app-sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const role =
    session?.user?.role && session.user.role in NAV_CONFIG
      ? (session.user.role as keyof typeof NAV_CONFIG)
      : "seeker"

  const section = NAV_CONFIG[role].find((item) => item.url === pathname)
  const title = section ? ` / ${section.title}` : ""

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-white/[0.06] bg-[#0b0b0e] px-4">
      <SidebarTrigger className="text-white/60 hover:bg-white/[0.06] hover:text-white" />
      <p className="text-sm text-white/55">
        {ROLE_TITLES[role]}
        {title}
      </p>
    </header>
  )
}

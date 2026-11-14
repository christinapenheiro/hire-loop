"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BanknoteIcon,
  Bookmark01Icon,
  Building04Icon,
  CreditCardIcon,
  DashboardSquare01Icon,
  File01Icon,
  Settings01Icon,
  UserMultipleIcon,
  WorkIcon,
} from "@hugeicons/core-free-icons"

import Logo from "@/app/images/logo.png"
import { useSession } from "@/app/lib/auth-client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

type DashboardRole = "seeker" | "recruiter" | "admin"

type NavItem = {
  title: string
  url: string
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"]
}

export const ROLE_TITLES: Record<DashboardRole, string> = {
  seeker: "Seeker Dashboard",
  recruiter: "Recruiter",
  admin: "Admin Console",
}

export const NAV_CONFIG: Record<DashboardRole, NavItem[]> = {
  seeker: [
    {
      title: "Dashboard",
      url: "/dashboard/seeker",
      icon: DashboardSquare01Icon,
    },
    { title: "Jobs", url: "/dashboard/seeker/jobs", icon: WorkIcon },
    {
      title: "Saved Jobs",
      url: "/dashboard/seeker/saved",
      icon: Bookmark01Icon,
    },
    {
      title: "Applications",
      url: "/dashboard/seeker/applications",
      icon: File01Icon,
    },
    {
      title: "Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCardIcon,
    },
    {
      title: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings01Icon,
    },
  ],
  recruiter: [
    {
      title: "Dashboard",
      url: "/dashboard/recruiter",
      icon: DashboardSquare01Icon,
    },
    {
      title: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: WorkIcon,
    },
    {
      title: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: File01Icon,
    },
    {
      title: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings01Icon,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: DashboardSquare01Icon,
    },
    { title: "Users", url: "/dashboard/admin/users", icon: UserMultipleIcon },
    {
      title: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building04Icon,
    },
    { title: "Jobs", url: "/dashboard/admin/jobs", icon: WorkIcon },
    {
      title: "Payments",
      url: "/dashboard/admin/payments",
      icon: BanknoteIcon,
    },
    {
      title: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings01Icon,
    },
  ],
}

function SidebarUserCard({
  name,
  image,
  role,
}: {
  name?: string
  image?: string | null
  role: DashboardRole
}) {
  const initials = (name ?? "?")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/[0.05] p-2.5 ring-1 ring-white/[0.06]">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="size-9 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#6772f8]/20 text-xs font-semibold text-[#8a94fa]">
          {initials}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">
          {name ?? "Guest"}
        </p>
        <p className="text-xs text-white/45 first-letter:uppercase">{role}</p>
        {role === "recruiter" && (
          <span className="mt-1 inline-flex rounded-full bg-[#6772f8]/20 px-2 py-0.5 text-[11px] font-medium text-[#8a94fa]">
            Premium account
          </span>
        )}
      </div>
    </div>
  )
}

export default function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const role: DashboardRole =
    session?.user?.role && session.user.role in NAV_CONFIG
      ? (session.user.role as DashboardRole)
      : "seeker"

  const items = NAV_CONFIG[role]
  const user = session?.user

  return (
    <Sidebar>
      <SidebarHeader className="gap-1 px-4 pt-4 pb-2">
        <p className="text-xs text-white/40">{ROLE_TITLES[role]}</p>
        <Link href="/" className="w-fit">
          <Image src={Logo} alt="HireLoop" className="h-7 w-auto" priority />
        </Link>
      </SidebarHeader>

      {role === "recruiter" && (
        <SidebarHeader className="px-3 pt-1 pb-2">
          <SidebarUserCard name={user?.name} image={user?.image} role={role} />
        </SidebarHeader>
      )}

      <SidebarContent className="px-2 py-2">
        <SidebarGroup className="py-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title} className="relative">
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-0.5 left-0 w-[3px] rounded-full bg-[#6772f8]",
                        !isActive && "opacity-0"
                      )}
                    />
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={isActive}
                      className={cn(
                        "h-9 rounded-lg text-sm text-white/60 hover:bg-white/[0.06] hover:text-white data-active:bg-white/[0.08] data-active:text-white",
                        isActive && "font-medium"
                      )}
                    >
                      <HugeiconsIcon
                        icon={item.icon}
                        size={16}
                        strokeWidth={1.8}
                      />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {role !== "recruiter" && (
        <SidebarFooter className="p-3">
          <SidebarUserCard name={user?.name} image={user?.image} role={role} />
        </SidebarFooter>
      )}
    </Sidebar>
  )
}

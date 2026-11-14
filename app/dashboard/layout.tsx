import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="[--sidebar-accent-foreground:#fff] [--sidebar-accent:rgba(255,255,255,0.07)] [--sidebar-border:rgba(255,255,255,0.08)] [--sidebar-foreground:#f4f4f5] [--sidebar-ring:#6772f8] [--sidebar:#0e0e11]">
      <AppSidebar />
      <SidebarInset className="bg-[#0b0b0e]">
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
export default DashboardLayout

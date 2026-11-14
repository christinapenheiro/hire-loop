export function DashboardPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-white/[0.02] py-20 text-center ring-1 ring-white/[0.06]">
      <h1 className="text-lg font-semibold text-white">{title}</h1>
      <p className="text-sm text-white/45">This section is coming soon.</p>
    </div>
  )
}

"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Bookmark02Icon,
  Briefcase02Icon,
  Building02Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  DollarSignIcon,
  GlobalSearchIcon,
  PinLocation01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons"

import type { JobPosting, JobSort, WorkArrangement } from "@/lib/types"
import { cn } from "@/lib/utils"

const ARRANGEMENTS = [
  { value: "on-site", label: "On-site", icon: Building02Icon },
  { value: "hybrid", label: "Hybrid", icon: PinLocation01Icon },
  { value: "remote", label: "Remote", icon: GlobalSearchIcon },
] as const satisfies ReadonlyArray<{
  value: WorkArrangement
  label: string
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"]
}>

const PAGE_SIZE = 6

function arrangementMeta(value: string | undefined) {
  return ARRANGEMENTS.find((option) => option.value === value?.toLowerCase())
}

function Pill({
  icon,
  children,
}: {
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"]
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex max-w-56 items-center gap-1.5 rounded-md bg-white/[0.05] px-2 py-1 text-[11px] text-white/60">
      <HugeiconsIcon icon={icon} className="size-3 shrink-0 text-white/40" />
      <span className="truncate">{children}</span>
    </span>
  )
}

function JobCard({
  job,
  saved,
  onToggleSave,
}: {
  job: JobPosting
  saved: boolean
  onToggleSave: () => void
}) {
  const meta = arrangementMeta(job.arrangement)
  const openings = job.openings ? Number(job.openings) : NaN

  return (
    <article className="rounded-xl border border-white/[0.08] bg-[#101013] p-4 transition-colors hover:border-white/20 sm:p-5">
      <div className="flex items-start gap-3.5">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#6772f8]/15 text-[#8a94fa]">
          <HugeiconsIcon icon={Briefcase02Icon} className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-white">
            {job.title ?? "Untitled role"}
          </h3>
          <p className="mt-0.5 text-xs text-white/45">
            {job.department ?? "General"}
            {Number.isFinite(openings) && (
              <>
                {" • "}
                {openings} {openings === 1 ? "opening" : "openings"}
              </>
            )}
          </p>

          {job.summary && (
            <p className="mt-2 line-clamp-2 text-xs/relaxed text-white/40">
              {job.summary}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {job.salary && <Pill icon={DollarSignIcon}>{job.salary}</Pill>}
            {meta && <Pill icon={meta.icon}>{meta.label}</Pill>}
            {job.hours && <Pill icon={ClockIcon}>{job.hours}</Pill>}
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleSave}
          aria-pressed={saved}
          aria-label={saved ? "Remove bookmark" : "Save job"}
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6772f8]/40",
            saved
              ? "text-[#8a94fa]"
              : "text-white/35 hover:bg-white/[0.06] hover:text-white/70"
          )}
        >
          <HugeiconsIcon icon={Bookmark02Icon} className="size-4" />
        </button>
      </div>
    </article>
  )
}

function pageNumbers(current: number, total: number): Array<number | "…"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const wanted = new Set(
    [1, total, current - 1, current, current + 1].filter(
      (page) => page >= 1 && page <= total
    )
  )
  const result: Array<number | "…"> = []
  let previous = 0
  for (const page of [...wanted].sort((a, b) => a - b)) {
    if (page - previous > 1) result.push("…")
    result.push(page)
    previous = page
  }
  return result
}

export function BrowseJobs({ jobs }: { jobs: JobPosting[] }) {
  const [query, setQuery] = React.useState("")
  const [arrangements, setArrangements] = React.useState<Set<WorkArrangement>>(
    () => new Set()
  )
  const [sort, setSort] = React.useState<JobSort>("recent")
  const [page, setPage] = React.useState(1)
  const [saved, setSaved] = React.useState<Set<number>>(() => new Set())

  const searched = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return jobs
    return jobs.filter((job) =>
      [job.title, job.department, job.summary]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q))
    )
  }, [jobs, query])

  const counts = React.useMemo(() => {
    const map = new Map<WorkArrangement, number>()
    for (const job of searched) {
      const meta = arrangementMeta(job.arrangement)
      if (meta) map.set(meta.value, (map.get(meta.value) ?? 0) + 1)
    }
    return map
  }, [searched])

  const filtered = React.useMemo(() => {
    let result = searched
    if (arrangements.size > 0) {
      result = result.filter((job) =>
        arrangements.has(
          (job.arrangement?.toLowerCase() ?? "") as WorkArrangement
        )
      )
    }
    if (sort === "title") {
      result = [...result].sort((a, b) =>
        (a.title ?? "").localeCompare(b.title ?? "")
      )
    }
    return result
  }, [searched, arrangements, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  function toggleArrangement(value: WorkArrangement) {
    setArrangements((current) => {
      const next = new Set(current)
      if (next.has(value)) {
        next.delete(value)
      } else {
        next.add(value)
      }
      return next
    })
    setPage(1)
  }

  function toggleSaved(index: number) {
    setSaved((current) => {
      const next = new Set(current)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8">
      {/* search bar */}
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#101013] p-2 pl-4"
      >
        <HugeiconsIcon
          icon={Search01Icon}
          className="size-4 shrink-0 text-white/35"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setPage(1)
          }}
          placeholder="Search by job title, keywords..."
          className="h-9 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
        />
        <button
          type="submit"
          className="h-9 shrink-0 rounded-lg bg-white px-4 text-xs font-semibold text-[#0b0b0e] transition-colors outline-none hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-[#6772f8]/40"
        >
          Search Jobs
        </button>
      </form>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[220px_1fr]">
        {/* filters sidebar */}
        <aside className="self-start rounded-xl border border-white/[0.08] bg-[#101013] p-4 lg:sticky lg:top-4">
          <h2 className="text-sm font-semibold text-white">Filters</h2>
          <h3 className="mt-4 text-xs font-medium text-white/60">
            Work arrangement
          </h3>
          <ul className="mt-2 space-y-1">
            {ARRANGEMENTS.map((option) => {
              const checked = arrangements.has(option.value)
              const count = counts.get(option.value) ?? 0
              return (
                <li key={option.value}>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1 text-xs text-white/70 transition-colors hover:bg-white/[0.04]">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleArrangement(option.value)}
                      className="size-3.5 accent-[#6772f8]"
                    />
                    <span className={cn("flex-1", checked && "text-white")}>
                      {option.label}
                    </span>
                    <span className="text-white/35">{count}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* results */}
        <section className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-white">
              Found{" "}
              <span className="text-[#8a94fa]">
                {filtered.length.toLocaleString()}
              </span>{" "}
              Professional {filtered.length === 1 ? "Job" : "Jobs"}
            </p>
            <label className="flex items-center gap-2 text-xs text-white/45">
              Sort by:
              <select
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value as JobSort)
                  setPage(1)
                }}
                className="h-8 rounded-lg border border-white/[0.08] bg-[#101013] px-2 text-xs text-white outline-none focus-visible:ring-2 focus-visible:ring-[#6772f8]/40"
              >
                <option value="recent">Most Recent</option>
                <option value="title">Title: A–Z</option>
              </select>
            </label>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-xl border border-white/[0.08] bg-[#101013] px-6 py-16 text-center">
              <p className="text-sm font-medium text-white/70">No jobs found</p>
              <p className="mt-1 text-xs text-white/40">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {visible.map((job, index) => (
                <li key={`${job.title ?? "job"}-${index}`}>
                  <JobCard
                    job={job}
                    saved={saved.has(index)}
                    onToggleSave={() => toggleSaved(index)}
                  />
                </li>
              ))}
            </ul>
          )}

          {filtered.length > PAGE_SIZE && (
            <nav
              aria-label="Pagination"
              className="flex items-center justify-center gap-1.5 pt-2"
            >
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className="grid size-7 place-items-center rounded-md border border-white/[0.08] text-white/60 transition-colors outline-none hover:bg-white/[0.06] disabled:pointer-events-none disabled:opacity-40"
              >
                <HugeiconsIcon icon={ChevronLeftIcon} className="size-3.5" />
              </button>
              {pageNumbers(currentPage, totalPages).map((item, i) =>
                item === "…" ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-1 text-xs text-white/35"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    aria-current={item === currentPage ? "page" : undefined}
                    onClick={() => setPage(item)}
                    className={cn(
                      "grid size-7 place-items-center rounded-md border text-xs transition-colors outline-none",
                      item === currentPage
                        ? "border-transparent bg-[#6772f8] font-medium text-white"
                        : "border-white/[0.08] text-white/60 hover:bg-white/[0.06]"
                    )}
                  >
                    {item}
                  </button>
                )
              )}
              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
                className="grid size-7 place-items-center rounded-md border border-white/[0.08] text-white/60 transition-colors outline-none hover:bg-white/[0.06] disabled:pointer-events-none disabled:opacity-40"
              >
                <HugeiconsIcon icon={ChevronRightIcon} className="size-3.5" />
              </button>
            </nav>
          )}
        </section>
      </div>
    </div>
  )
}

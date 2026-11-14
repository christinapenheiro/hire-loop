"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { JobPosting, WorkArrangement } from "@/lib/types"
import { cn } from "@/lib/utils"
import { createJob } from "@/lib/actions/jobs"

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />
}

const WORK_ARRANGEMENTS = [
  {
    value: "on-site",
    label: "On-site",
    description: "Work from the office",
  },
  {
    value: "hybrid",
    label: "Hybrid",
    description: "Mix of office and remote",
  },
  {
    value: "remote",
    label: "Remote",
    description: "Fully remote role",
  },
] as const satisfies ReadonlyArray<{
  value: WorkArrangement
  label: string
  description: string
}>

const inputClassName =
  "h-11 rounded-xl border-white/10 bg-white/[0.04] px-3.5 text-sm text-white placeholder:text-white/40 md:text-sm"

export function JobApplicationForm() {
  const [arrangement, setArrangement] =
    React.useState<WorkArrangement>("on-site")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState<JobPosting | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData(event.currentTarget)
      const posting = Object.fromEntries(formData.entries()) as JobPosting
      // TODO: Wire this up to the jobs API once it exists.
      console.log("Job application submitted:", posting)
      const data = await createJob(posting)
      console.log(data)
      if (data) {
        setSubmitted(posting)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-14 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-[#6772f8]/15 text-lg text-[#8a94fa]">
          ✓
        </span>
        <h2 className="text-base font-semibold text-white">Opening posted</h2>
        <p className="max-w-sm text-sm leading-relaxed text-white/45">
          &ldquo;{submitted.title}&rdquo; in {submitted.department} is now live
          with {submitted.openings}{" "}
          {submitted.openings === "1" ? "opening" : "openings"}.
        </p>
        <Button
          type="button"
          onClick={() => setSubmitted(null)}
          className="mt-2 h-11 rounded-full bg-[#6772f8] px-6 text-sm font-medium text-white transition-colors outline-none hover:bg-[#5b66f0] focus-visible:ring-2 focus-visible:ring-[#6772f8]/40"
        >
          Post another opening
        </Button>
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field>
          <Label htmlFor="title" className="text-xs font-medium text-white/70">
            Job title
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Senior Frontend Engineer"
            className={inputClassName}
          />
        </Field>

        <Field>
          <Label
            htmlFor="department"
            className="text-xs font-medium text-white/70"
          >
            Department
          </Label>
          <Input
            id="department"
            name="department"
            type="text"
            required
            placeholder="Engineering"
            className={inputClassName}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field>
          <Label
            htmlFor="openings"
            className="text-xs font-medium text-white/70"
          >
            Number of openings
          </Label>
          <Input
            id="openings"
            name="openings"
            type="number"
            required
            min={1}
            step={1}
            defaultValue={1}
            className={inputClassName}
          />
        </Field>

        <Field>
          <Label htmlFor="hours" className="text-xs font-medium text-white/70">
            Working hours
          </Label>
          <Input
            id="hours"
            name="hours"
            type="text"
            required
            placeholder="Mon–Fri, 9:00 AM – 6:00 PM"
            className={inputClassName}
          />
        </Field>
      </div>

      <Field>
        <Label className="text-xs font-medium text-white/70">
          Work arrangement
        </Label>
        <input type="hidden" name="arrangement" value={arrangement} />
        <div
          role="radiogroup"
          aria-label="Work arrangement"
          className="grid grid-cols-1 gap-2 sm:grid-cols-3"
        >
          {WORK_ARRANGEMENTS.map((option) => {
            const selected = arrangement === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setArrangement(option.value)}
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

      <Field>
        <Label htmlFor="salary" className="text-xs font-medium text-white/70">
          Salary <span className="font-normal text-white/40">(optional)</span>
        </Label>
        <Input
          id="salary"
          name="salary"
          type="text"
          placeholder="e.g. $90,000 – $120,000 per year"
          className={inputClassName}
        />
      </Field>

      <Field>
        <Label htmlFor="summary" className="text-xs font-medium text-white/70">
          Job summary
        </Label>
        <Textarea
          id="summary"
          name="summary"
          required
          rows={5}
          placeholder="Describe the role, key responsibilities, and what a great candidate looks like..."
          className="min-h-28 rounded-xl border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 md:text-sm"
        />
      </Field>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 h-11 w-full rounded-full bg-[#6772f8] text-sm font-medium text-white transition-colors outline-none hover:bg-[#5b66f0] focus-visible:ring-2 focus-visible:ring-[#6772f8]/40 disabled:opacity-60"
      >
        {isSubmitting ? "Posting opening..." : "Post Job Opening"}
      </Button>
    </form>
  )
}

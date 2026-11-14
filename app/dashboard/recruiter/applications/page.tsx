import type { Metadata } from "next"

import { JobApplicationForm } from "@/components/recruiter/job-application-form"

export const metadata: Metadata = {
  title: "Applications — HireLoop",
}

export default function RecruiterApplicationsPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold text-white">New Job Opening</h1>
        <p className="text-sm text-white/45">
          Fill in the details below to post a job and start receiving
          applications.
        </p>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">
        <JobApplicationForm />
      </div>
    </div>
  )
}

import type { Metadata } from "next"

import { BrowseJobs } from "@/components/browse-jobs/browse-jobs"
import type { JobPosting } from "@/lib/types"
import { getJobs } from "@/lib/api/jobs"

export const metadata: Metadata = {
  title: "Browse Jobs — HireLoop",
}

export default async function BrowseJobsPage() {
  let jobs: JobPosting[] = []
  try {
    const data = await getJobs()
    jobs = Array.isArray(data) ? data : []
  } catch (err) {
    console.error("Failed to load jobs:", err)
  }

  return <BrowseJobs jobs={jobs} />
}

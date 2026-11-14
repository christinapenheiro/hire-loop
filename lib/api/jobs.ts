import type { JobPosting } from "@/lib/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export const getJobs = async (): Promise<JobPosting[]> => {
  const res = await fetch(`${BASE_URL}/jobs`, { cache: "no-store" })
  return res.json()
}

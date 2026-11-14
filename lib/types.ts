/**
 * Central type declarations for HireLoop.
 * Import shared types from here instead of declaring them locally.
 */

export interface JobPosting {
  title?: string
  department?: string
  openings?: string
  arrangement?: string
  hours?: string
  salary?: string
  summary?: string
}

export type WorkArrangement = "on-site" | "hybrid" | "remote"

export type JobSort = "recent" | "title"

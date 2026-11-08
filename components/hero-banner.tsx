"use client"

import * as React from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ChartColumnIcon,
  Location01Icon,
  Search01Icon,
  ShoppingBag01Icon,
  StarIcon,
  UserSearch02Icon,
} from "@hugeicons/core-free-icons"

import Globe from "@/app/images/globe.png"

const TRENDING_POSITIONS = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const STATS = [
  { icon: ShoppingBag01Icon, value: "50K", label: "Active Jobs" },
  { icon: ChartColumnIcon, value: "12K", label: "Companies" },
  { icon: UserSearch02Icon, value: "2M", label: "Job Seekers" },
  { icon: StarIcon, value: "97%", label: "Satisfaction Rate" },
]

function HeroBadge() {
  return (
    <div className="flex items-center">
      {/* decorative lines extending from both sides of the pill */}
      <span
        aria-hidden
        className="h-px w-16 bg-gradient-to-r from-transparent to-white/25 sm:w-24"
      />
      <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#17171b] py-1.5 pr-4 pl-1.5 sm:pr-5">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/[0.04] text-sm">
          💼
        </span>
        <span className="text-sm font-semibold text-white">50,000+</span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-red-400/80 uppercase">
          New jobs this month
        </span>
      </span>
      <span
        aria-hidden
        className="h-px w-16 bg-gradient-to-r from-white/25 to-transparent sm:w-24"
      />
    </div>
  )
}

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0e] pt-10 sm:pt-14">
      {/* starfield covering the whole hero */}
      <div
        aria-hidden
        className="hero-stars pointer-events-none absolute inset-0"
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-4 text-center">
        <HeroBadge />

        <h1 className="mt-5 text-[34px] font-semibold tracking-tight text-balance text-white sm:text-4xl md:text-5xl">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-pretty text-white/60 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* search bar */}
        <form
          className="mt-7 flex h-auto w-full max-w-xl flex-col gap-1 rounded-2xl border border-white/[0.08] bg-[#17171d] p-2 shadow-xl shadow-black/30 sm:h-14 sm:flex-row sm:items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl px-2.5">
            <HugeiconsIcon
              icon={Search01Icon}
              className="size-4 shrink-0 text-white/50"
            />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="h-9 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            />
          </label>
          <span
            aria-hidden
            className="hidden h-6 w-px shrink-0 bg-white/10 sm:block"
          />
          <label className="flex min-w-0 items-center gap-2.5 rounded-xl px-2.5 sm:flex-[0.9]">
            <HugeiconsIcon
              icon={Location01Icon}
              className="size-4 shrink-0 text-white/50"
            />
            <input
              type="text"
              placeholder="Location or Remote"
              className="h-9 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            />
          </label>
          <button
            type="submit"
            aria-label="Search jobs"
            className="grid size-9 shrink-0 place-items-center self-end rounded-xl bg-[#6772f8] text-white transition-colors outline-none hover:bg-[#5b66f0] focus-visible:ring-2 focus-visible:ring-[#6772f8]/40 sm:self-auto"
          >
            <HugeiconsIcon icon={Search01Icon} className="size-4" />
          </button>
        </form>

        {/* trending positions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <span className="text-xs text-white/45">Trending Position</span>
          {TRENDING_POSITIONS.map((position) => (
            <a
              key={position}
              href="#"
              className="rounded-lg border border-white/10 bg-[#141418] px-3 py-1.5 text-xs text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              {position}
            </a>
          ))}
        </div>
      </div>

      {/* globe band: planet cut so its crest is just above the stats cards */}
      <div className="relative mt-4 h-[240px] overflow-hidden sm:h-[300px] md:h-[440px] lg:h-[560px]">
        <Image
          src={Globe}
          alt=""
          aria-hidden
          className="absolute bottom-[-260px] left-1/2 w-[680px] max-w-none -translate-x-1/2 sm:bottom-[-410px] sm:w-[1000px] md:bottom-[-522px] md:w-[1200px] lg:bottom-[-642px] lg:w-[1440px]"
        />
        <p className="pointer-events-none absolute inset-x-0 bottom-[28px] text-center text-[22px] leading-snug font-normal text-white sm:bottom-[32px] sm:text-2xl md:bottom-[36px] md:text-[34px] lg:bottom-[46px] lg:text-[44px]">
          Assisting over 15,000 job seekers
          <br />
          <span className="text-white/60">find their dream positions.</span>
        </p>
      </div>

      {/* stats cards */}
      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 pb-10 sm:px-6 sm:pb-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/[0.06] bg-gradient-to-b from-[#191920] to-[#121216] p-4 sm:p-5"
            >
              <HugeiconsIcon
                icon={stat.icon}
                className="size-5 text-white/85"
              />
              <p className="mt-8 text-[32px] font-semibold tracking-tight text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

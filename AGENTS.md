<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop (hire-loop)

Small Next.js 16 + shadcn/ui app (App Router, React 19, Tailwind v4). Only feature work so far is authentication; everything else is template scaffold.

## Commands

- `npm run dev` — dev server; also re-writes the `nextjs-agent-rules` block in this file
- `npm run lint` — `eslint` (no file args, uses `eslint.config.mjs` defaults)
- `npm run typecheck` — `tsc --noEmit`; run this before finishing changes, there is no CI to catch type errors
- `npm run format` — prettier only on `**/*.{ts,tsx}`; run after editing to sort Tailwind classes (class sorting on `cn`/`cva` is handled by `prettier-plugin-tailwindcss`)
- No test script exists; don't look for one

## shadcn / styling

- `components.json` uses style `base-mira`: components are built on **Base UI** (`@base-ui/react`), not Radix. Icons use **Hugeicons** (`@hugeicons/react` + `@hugeicons/core-free-icons`). Don't paste Radix-based shadcn snippets or use `lucide-react`.
- Add components with `npx shadcn@latest add <component>` — it writes to `components/ui/`.
- Tailwind v4 is CSS-first: all design tokens live in `app/globals.css` (`@theme inline` + `:root`/`.dark` variables). There is no tailwind config file; change themes/colors there.
- Removed (2026-11-08): the template's `@import "shadcn/tailwind.css"` in `globals.css` — it only resolves with shadcn@4+ and this project pins 1.0.0 (CLI-only, no CSS). A comment in `globals.css` marks the spot; re-add it if shadcn is upgraded.
- `package.json` pins `shadcn ^1.0.0` and `eslint-config-next ^15.5.29`, **older than** Next 16. These downgrades are currently uncommitted in git; treat them as intentional and don't auto-bump.

## Auth (better-auth + MongoDB)

- Server config: `app/lib/auth.ts` — MongoDB adapter, email/password + Google social provider
- Client: `app/lib/auth-client.ts` exports `signIn`, `signUp`, `useSession`
- API handler: catch-all route `app/api/auth/[...all]`
- `app/lib/auth.ts` hardcodes `mongodb://localhost:27017/database` (not env-driven) — auth routes error out unless a local MongoDB is running. `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` come from `.env`.
- `.env` is Git-ignored (see `.gitignore` `env*` line) and does NOT exist in the CLI clone by default — copying missing secrets into `.env` is expected; never commit it.

## Conventions

- Path alias: `@/*` maps to the repo root (`@/components/ui/button`, etc.)
- Prettier: no semicolons, double quotes, LF line endings, 80 cols, `es5` trailing commas
- RSC-first: pages default to Server Components; add `"use client"` only for interactive components (auth hooks, theme toggle, etc.)

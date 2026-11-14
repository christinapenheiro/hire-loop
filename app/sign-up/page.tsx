import type { Metadata } from "next"

import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up — HireLoop",
}

export default function Page() {
  return <SignUpForm />
}

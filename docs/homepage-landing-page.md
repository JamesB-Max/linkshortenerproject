# Homepage Landing Page — Implementation Instructions

> **File to modify:** `app/page.tsx`
> **Do NOT modify:** `app/layout.tsx`
> **Architectural references:** `docs/clerk-routing-modals.md`, `docs/shadcn-ui-only.md`

---

## 1. Shadcn Components to Install

Only one additional Shadcn component is needed beyond the already-installed `button`:

### `card`

**Why:** The Features section displays four feature cards. Each card uses `<Card>`, `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, and `<CardContent>` to wrap an icon, a feature name, and a short description. Building this from scratch would violate `shadcn-ui-only.md`, which prohibits custom visual components.

**Install command:**

```bash
npx shadcn@latest add card
```

This adds the following components to `components/ui/`:

- `card.tsx` — exports `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`

No other Shadcn components are required. The `button` component is already installed and covers all CTA interactions.

---

## 2. Features to Highlight on the Landing Page

Display exactly four feature cards in the Features section. Use the following copy and icons:

| # | Feature Name | User-Facing Description | Lucide Icon |
|---|---|---|---|
| 1 | **Shorten URLs Instantly** | Paste any long URL and get a clean, shareable short link in seconds. No setup required. | `Link2` |
| 2 | **Click Analytics & Tracking** | See exactly how many times each link has been clicked. Understand your audience at a glance. | `BarChart2` |
| 3 | **Manage All Your Links** | View, edit, and organise every link you've created from one simple dashboard. | `LayoutDashboard` |
| 4 | **Fast & Secure** | Every redirect is served at the edge for maximum speed, with HTTPS enforced on every link. | `ShieldCheck` |

---

## 3. Landing Page Structure & Sections

The page is composed of three vertically stacked sections inside a single `<main>` element.

### Hero Section

- **Headline:** Large, bold text — "Shorten. Share. Track."
- **Subheadline:** One sentence explaining the product value proposition.
- **Two CTA buttons, side by side:**
  - **Primary:** "Get Started Free" — `<SignUpButton mode="modal">` wrapping `<Button>` (default variant)
  - **Secondary:** "Sign In" — `<SignInButton mode="modal">` wrapping `<Button variant="outline">`

> Both buttons **must** use `mode="modal"` per `clerk-routing-modals.md`. Never link to a dedicated `/sign-in` or `/sign-up` page.

### Features Section

- Section heading: "Everything you need to manage your links"
- Four `<Card>` components arranged in a responsive CSS Grid:
  - 1 column on mobile (`grid-cols-1`)
  - 2 columns on medium screens (`md:grid-cols-2`)
  - 4 columns on large screens (`lg:grid-cols-4`)
- Each card contains:
  - A Lucide icon (rendered at `size={28}` with a `text-primary` class)
  - `<CardTitle>` — feature name
  - `<CardDescription>` — 1–2 sentence description

### CTA Section

- A bottom strip with a centred headline: "Ready to get started?"
- A supporting line of copy beneath it.
- A single "Get Started Free" `<SignUpButton mode="modal">` button wrapping `<Button size="lg">`.

---

## 4. Exact Implementation Steps

Follow these steps in order:

**Step 1 — Install the `card` Shadcn component**

```bash
npx shadcn@latest add card
```

Verify that `components/ui/card.tsx` now exists before continuing.

**Step 2 — Open `app/page.tsx`**

This is the only file you will edit.

**Step 3 — Add all required imports**

At the top of `app/page.tsx`, you need the following imports:

```ts
// Next.js
import { redirect } from "next/navigation";

// Clerk — server-side auth
import { auth } from "@clerk/nextjs/server";

// Clerk — client-facing modal trigger components
import { SignInButton, SignUpButton } from "@clerk/nextjs";

// Shadcn UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Lucide icons
import { BarChart2, LayoutDashboard, Link2, ShieldCheck } from "lucide-react";
```

**Step 4 — Keep the existing auth guard**

Do not remove or modify the following block. It must remain at the top of the component body:

```ts
const { userId } = await auth();

if (userId) {
  redirect("/dashboard");
}
```

**Step 5 — Replace the `<main>` JSX**

Delete the existing placeholder `<main>` block and replace it with the full three-section layout defined in Section 5 below.

**Step 6 — Verify**

- Run `npm run dev` and open `http://localhost:3000`.
- Confirm that unauthenticated visitors see the hero, features, and CTA sections.
- Click "Get Started Free" and "Sign In" — both should open Clerk modals, not navigate to a new page.
- Sign in with a test account — you should be immediately redirected to `/dashboard`.

---

## 5. Complete Final Code

Replace the entire contents of `app/page.tsx` with the following:

```tsx
import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart2, LayoutDashboard, Link2, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Shorten URLs Instantly",
    description:
      "Paste any long URL and get a clean, shareable short link in seconds. No setup required.",
  },
  {
    icon: BarChart2,
    title: "Click Analytics & Tracking",
    description:
      "See exactly how many times each link has been clicked. Understand your audience at a glance.",
  },
  {
    icon: LayoutDashboard,
    title: "Manage All Your Links",
    description:
      "View, edit, and organise every link you've created from one simple dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Fast & Secure",
    description:
      "Every redirect is served at the edge for maximum speed, with HTTPS enforced on every link.",
  },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Shorten. Share. Track.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Create short, memorable links in seconds and gain instant insight into
          every click — all from one clean dashboard.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <SignUpButton mode="modal">
            <Button size="lg">Get Started Free</Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/40 px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            Everything you need to manage your links
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="flex flex-col">
                <CardHeader>
                  <Icon size={28} className="mb-2 text-primary" />
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="border-t px-8 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to get started?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Join today — it's free, and your first short link is just a click
          away.
        </p>
        <div className="mt-8">
          <SignUpButton mode="modal">
            <Button size="lg">Get Started Free</Button>
          </SignUpButton>
        </div>
      </section>
    </main>
  );
}
```

---

## 6. Constraints Checklist

Before marking this feature as complete, confirm all of the following:

- [x] Authenticated users redirect to `/dashboard` via the `auth()` guard at the top of the component — per `clerk-routing-modals.md`
- [x] All CTA buttons (`SignUpButton`, `SignInButton`) use `mode="modal"` — no navigation to dedicated auth pages — per `clerk-routing-modals.md`
- [x] Only Shadcn UI components are used for all visual elements (`Button`, `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`) — per `shadcn-ui-only.md`
- [x] No custom components are created from scratch; layout is composed entirely from Shadcn components and Tailwind utility classes — per `shadcn-ui-only.md`
- [x] `app/layout.tsx` is NOT modified — the global header, `ClerkProvider`, `ThemeProvider`, and nav buttons remain unchanged

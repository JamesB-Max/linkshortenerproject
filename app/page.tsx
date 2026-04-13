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
          Join today — it&apos;s free, and your first short link is just a click
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

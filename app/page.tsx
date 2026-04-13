import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome to Link Shortener</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in or sign up to start managing your links.
        </p>
      </div>
    </main>
  );
}

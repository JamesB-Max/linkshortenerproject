import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  await auth.protect();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </div>
  );
}

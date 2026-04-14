import { auth } from "@clerk/nextjs/server";
import { getUserLinks } from "@/data/links";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { CreateLinkModal } from "./create-link-modal";
import { EditLinkModal } from "./edit-link-modal";
import { DeleteLinkModal } from "./delete-link-modal";

export default async function DashboardPage() {
  const { userId } = await auth.protect();
  const links = await getUserLinks(userId);

  return (
    <main className="p-8 max-w-6xl mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Links</h1>
          <p className="text-muted-foreground mt-2">Manage and track your shortened URLs.</p>
        </div>
        <CreateLinkModal />
      </div>

      {links.length === 0 ? (
        <Card className="text-center p-12">
          <CardHeader>
            <CardTitle>No links yet</CardTitle>
            <CardDescription>You haven't created any shortened links yet.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Card key={link.id}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-medium">{link.shortCode}</CardTitle>
                <div className="flex items-center gap-2">
                  <EditLinkModal linkId={link.id} initialOriginalUrl={link.originalUrl} initialShortCode={link.shortCode} />
                  <DeleteLinkModal linkId={link.id} />
                  <Link2 className="h-4 w-4 text-muted-foreground ml-2" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none truncate" title={link.originalUrl}>
                    {link.originalUrl}
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground pt-2">
                    <span>{link.clicks} clicks</span>
                    <span>{new Date(link.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}

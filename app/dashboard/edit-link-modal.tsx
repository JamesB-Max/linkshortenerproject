"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editLinkAction } from "@/app/actions/links";
import { Pencil } from "lucide-react";

export function EditLinkModal({
  linkId,
  initialOriginalUrl,
  initialShortCode,
}: {
  linkId: number;
  initialOriginalUrl: string;
  initialShortCode: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      const result = await editLinkAction(linkId, formData);
      if (!result?.success) {
        setError(result?.error || "Something went wrong.");
      } else {
        setOpen(false);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Short Link</DialogTitle>
          <DialogDescription>
            Update your shortened link details.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={`originalUrl-${linkId}`} className="text-right">
                Target URL
              </Label>
              <Input
                id={`originalUrl-${linkId}`}
                name="originalUrl"
                defaultValue={initialOriginalUrl}
                required
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={`customShortCode-${linkId}`} className="text-right">
                Custom Code
              </Label>
              <Input
                id={`customShortCode-${linkId}`}
                name="customShortCode"
                defaultValue={initialShortCode}
                className="col-span-3"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center col-span-4">{error}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

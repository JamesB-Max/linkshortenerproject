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
import { Plus } from "lucide-react";
import { createLinkAction } from "@/app/actions/links";

export function CreateLinkModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      const result = await createLinkAction(formData);
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
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Short Link</DialogTitle>
          <DialogDescription>
            Enter your long URL to generate a shortened link. You can also specify a custom short code.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="originalUrl" className="text-right">
                Target URL
              </Label>
              <Input
                id="originalUrl"
                name="originalUrl"
                placeholder="https://example.com/very/long/path"
                required
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customShortCode" className="text-right">
                Custom Code
              </Label>
              <Input
                id="customShortCode"
                name="customShortCode"
                placeholder="Optional custom alias"
                className="col-span-3"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center col-span-4">{error}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Create Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
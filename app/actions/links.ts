"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createShortLink, updateShortLink, deleteShortLink } from "@/data/links";

export async function createLinkAction(formData: FormData) {
  try {
    const { userId } = await auth.protect();
    
    const originalUrl = formData.get("originalUrl") as string;
    if (!originalUrl) {
      return { success: false, error: "Original URL is required" };
    }

    // Basic validation that it's a URL
    try {
      new URL(originalUrl);
    } catch (error) {
      return { success: false, error: "Invalid URL provided" };
    }

    const customShortCode = formData.get("customShortCode") as string | undefined;

    await createShortLink(originalUrl, userId, customShortCode || undefined);
    
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Error in createLinkAction:", error);
    if (error.code === "23505" || error.message?.includes("duplicate")) {
      return { success: false, error: "Short code is already in use" };
    }
    return { success: false, error: "Something went wrong" };
  }
}

export async function editLinkAction(id: number, formData: FormData) {
  try {
    const { userId } = await auth.protect();
    
    const originalUrl = formData.get("originalUrl") as string;
    if (!originalUrl) {
      return { success: false, error: "Original URL is required" };
    }

    try {
      new URL(originalUrl);
    } catch (error) {
      return { success: false, error: "Invalid URL provided" };
    }

    const shortCode = formData.get("customShortCode") as string | undefined;

    await updateShortLink(id, userId, {
      originalUrl,
      ...(shortCode && { shortCode })
    });
    
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Error in editLinkAction:", error);
    if (error.code === "23505" || error.message?.includes("duplicate")) {
      return { success: false, error: "Short code is already in use" };
    }
    return { success: false, error: "Something went wrong" };
  }
}

export async function deleteLinkAction(id: number) {
  try {
    const { userId } = await auth.protect();
    await deleteShortLink(id, userId);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteLinkAction:", error);
    return { success: false, error: "Something went wrong" };
  }
}


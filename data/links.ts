import { eq, and, sql } from "drizzle-orm";
import { db } from "@/db";
import { linksTable } from "@/db/schema";
import { nanoid } from "nanoid";

export async function getUserLinks(userId: string) {
  try {
    const links = await db.select().from(linksTable).where(eq(linksTable.userId, userId));
    return links;
  } catch (error) {
    console.error("Error fetching user links:", error);
    throw new Error("Failed to fetch user links.");
  }
}

export async function createLinkRecord(data: typeof linksTable.$inferInsert) {
  try {
    const [link] = await db.insert(linksTable).values(data).returning();
    return link;
  } catch (error) {
    console.error("Error creating link record:", error);
    throw new Error("Failed to create user link.");
  }
}

export async function createShortLink(originalUrl: string, userId: string, customShortCode?: string) {
  const shortCode = customShortCode || nanoid(7);
  
  return createLinkRecord({
    originalUrl,
    shortCode,
    userId,
  });
}

export async function updateShortLink(id: number, userId: string, data: Partial<typeof linksTable.$inferInsert>) {
  try {
    const [link] = await db
      .update(linksTable)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(linksTable.id, id), eq(linksTable.userId, userId)))
      .returning();
    return link;
  } catch (error) {
    console.error("Error updating link:", error);
    throw new Error("Failed to update user link.");
  }
}

export async function deleteShortLink(id: number, userId: string) {
  try {
    const [deleted] = await db
      .delete(linksTable)
      .where(and(eq(linksTable.id, id), eq(linksTable.userId, userId)))
      .returning();
    return deleted;
  } catch (error) {
    console.error("Error deleting link:", error);
    throw new Error("Failed to delete user link.");
  }
}

export async function getLinkByShortCode(shortCode: string) {
  try {
    const [link] = await db
      .select()
      .from(linksTable)
      .where(eq(linksTable.shortCode, shortCode));
    return link;
  } catch (error) {
    console.error("Error fetching link by short code:", error);
    throw new Error("Failed to fetch link.");
  }
}

export async function incrementLinkClicks(id: number) {
  try {
    await db
      .update(linksTable)
      .set({ clicks: sql`${linksTable.clicks} + 1` })
      .where(eq(linksTable.id, id));
  } catch (error) {
    console.error("Error incrementing link clicks:", error);
    // Don't throw here to avoid failing the redirect if stats fail
  }
}

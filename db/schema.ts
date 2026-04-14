import { integer, pgTable, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const linksTable = pgTable("links", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  originalUrl: varchar().notNull(),
  shortCode: varchar({ length: 50 }).notNull().unique(),
  userId: varchar().notNull(), // Clerk user ID
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  clicks: integer().default(0).notNull(),
  isActive: boolean().default(true).notNull(),
});

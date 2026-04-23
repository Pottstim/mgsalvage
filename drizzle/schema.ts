import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  leadType: varchar("leadType", { length: 64 }).notNull(),
  // Common fields
  name: varchar("name", { length: 255 }),
  phone: varchar("phone", { length: 32 }).notNull(),
  email: varchar("email", { length: 320 }),
  city: varchar("city", { length: 128 }),
  notes: text("notes"),
  // Consumer fields
  vehicleYear: varchar("vehicleYear", { length: 8 }),
  vehicleMake: varchar("vehicleMake", { length: 64 }),
  vehicleModel: varchar("vehicleModel", { length: 64 }),
  vehicleCondition: varchar("vehicleCondition", { length: 32 }),
  titleStatus: varchar("titleStatus", { length: 32 }),
  // B2B fields
  businessName: varchar("businessName", { length: 255 }),
  contactName: varchar("contactName", { length: 255 }),
  businessType: varchar("businessType", { length: 64 }),
  vehicleCount: varchar("vehicleCount", { length: 32 }),
  vehicleTypes: text("vehicleTypes"),
  pickupTiming: varchar("pickupTiming", { length: 64 }),
  // Urgent fields
  vehicleAccessibility: text("vehicleAccessibility"),
  needPickupToday: varchar("needPickupToday", { length: 8 }),
  // Meta
  source: varchar("source", { length: 128 }),
  status: varchar("status", { length: 32 }).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  category: varchar("category", { length: 120 }).notNull(),
  price: integer("price").notNull(),
  mrp: integer("mrp").notNull(),
  rating: varchar("rating", { length: 10 }).notNull().default("4.8"),
  ratingCount: varchar("rating_count", { length: 20 }).notNull().default("1.2K"),
  image: text("image").notNull(),
  shortDesc: text("short_desc").notNull().default(""),
  description: text("description").notNull().default(""),
  benefits: jsonb("benefits").$type<string[]>().notNull().default([]),
  sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
  badge: varchar("badge", { length: 60 }),
  isPopular: boolean("is_popular").notNull().default(false),
  isBestSeller: boolean("is_best_seller").notNull().default(false),
  isTrusted: boolean("is_trusted").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  author: varchar("author", { length: 120 }).notNull(),
  rating: integer("rating").notNull().default(5),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  specialty: varchar("specialty", { length: 160 }).notNull(),
  specialtyKey: varchar("specialty_key", { length: 80 }).notNull().default("general"),
  rating: varchar("rating", { length: 10 }).notNull().default("4.8"),
  reviewCount: integer("review_count").notNull().default(100),
  experience: varchar("experience", { length: 60 }).notNull().default("10+ years experience"),
  image: text("image").notNull(),
  available: boolean("available").notNull().default(true),
  fee: integer("fee").notNull().default(499),
  about: text("about").notNull().default(""),
  languages: varchar("languages", { length: 160 }).notNull().default("English, Hindi"),
  qualifications: varchar("qualifications", { length: 200 }).notNull().default("MBBS, MD"),
  slots: jsonb("slots").$type<string[]>().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  title: varchar("title", { length: 220 }).notNull(),
  category: varchar("category", { length: 120 }).notNull(),
  topicKey: varchar("topic_key", { length: 80 }).notNull().default("all"),
  excerpt: text("excerpt").notNull().default(""),
  image: text("image").notNull(),
  readTime: varchar("read_time", { length: 40 }).notNull().default("5 min read"),
  publishedOn: varchar("published_on", { length: 40 }).notNull().default("Aug 12, 2025"),
  surface: varchar("surface", { length: 40 }).notNull().default("journal"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const shopCategories = pgTable("shop_categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  image: text("image").notNull().default(""),
  icon: varchar("icon", { length: 40 }).notNull().default("leaf"),
  surface: varchar("surface", { length: 40 }).notNull().default("home"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull().default(""),
  body: text("body").notNull(),
  rating: integer("rating").notNull().default(5),
  avatar: text("avatar").notNull().default(""),
  surface: varchar("surface", { length: 40 }).notNull().default("home"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 64 }).notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  doctorId: integer("doctor_id"),
  doctorName: varchar("doctor_name", { length: 160 }).notNull().default("NLC Expert Doctor"),
  patientName: varchar("patient_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  appointmentDate: varchar("appointment_date", { length: 60 }).notNull(),
  slot: varchar("slot", { length: 40 }).notNull(),
  reason: text("reason").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  subject: varchar("subject", { length: 200 }).notNull().default(""),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Doctor = typeof doctors.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type ShopCategory = typeof shopCategories.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;

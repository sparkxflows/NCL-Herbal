import type { Article, Doctor, ShopCategory, Testimonial } from "@/db/schema";
import type { ProductWithReviews } from "./data";
import type { UIArticle, UICategory, UIDoctor, UIProduct, UITestimonial } from "./types";

export const toUIProduct = (p: ProductWithReviews): UIProduct => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  category: p.category,
  price: p.price,
  mrp: p.mrp,
  rating: p.rating,
  ratingCount: p.ratingCount,
  image: p.image,
  shortDesc: p.shortDesc,
  description: p.description,
  benefits: p.benefits ?? [],
  sizes: p.sizes ?? [],
  badge: p.badge ?? null,
  reviews: p.reviews,
});

export const toUIDoctor = (d: Doctor): UIDoctor => ({
  id: d.id,
  slug: d.slug,
  name: d.name,
  specialty: d.specialty,
  specialtyKey: d.specialtyKey,
  rating: d.rating,
  reviewCount: d.reviewCount,
  experience: d.experience,
  image: d.image,
  available: d.available,
  fee: d.fee,
  about: d.about,
  languages: d.languages,
  qualifications: d.qualifications,
  slots: d.slots ?? [],
});

export const toUIArticle = (a: Article): UIArticle => ({
  id: a.id,
  slug: a.slug,
  title: a.title,
  category: a.category,
  topicKey: a.topicKey,
  excerpt: a.excerpt,
  image: a.image,
  readTime: a.readTime,
  publishedOn: a.publishedOn,
});

export const toUICategory = (c: ShopCategory): UICategory => ({
  id: c.id,
  slug: c.slug,
  name: c.name,
  image: c.image,
});

export const toUITestimonial = (t: Testimonial): UITestimonial => ({
  id: t.id,
  name: t.name,
  body: t.body,
  rating: t.rating,
  avatar: t.avatar,
});

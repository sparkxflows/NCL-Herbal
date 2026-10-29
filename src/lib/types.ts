export type UIReview = {
  id: number;
  author: string;
  rating: number;
  body: string;
};

export type UIProduct = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  rating: string;
  ratingCount: string;
  image: string;
  shortDesc: string;
  description: string;
  benefits: string[];
  sizes: string[];
  badge: string | null;
  reviews: UIReview[];
};

export type UIDoctor = {
  id: number;
  slug: string;
  name: string;
  specialty: string;
  specialtyKey: string;
  rating: string;
  reviewCount: number;
  experience: string;
  image: string;
  available: boolean;
  fee: number;
  about: string;
  languages: string;
  qualifications: string;
  slots: string[];
};

export type UIArticle = {
  id: number;
  slug: string;
  title: string;
  category: string;
  topicKey: string;
  excerpt: string;
  image: string;
  readTime: string;
  publishedOn: string;
};

export type UICategory = {
  id: number;
  slug: string;
  name: string;
  image: string;
};

export type UITestimonial = {
  id: number;
  name: string;
  body: string;
  rating: number;
  avatar: string;
};

export type CartLine = {
  id: number;
  quantity: number;
  productId: number;
  name: string;
  slug: string;
  price: number;
  mrp: number;
  image: string;
  category: string;
};

export const rupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;

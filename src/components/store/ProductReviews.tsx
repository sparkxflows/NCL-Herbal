"use client";

import { useState } from "react";
import { CheckCircle2, MessageSquarePlus, Star, ThumbsUp, User } from "lucide-react";
import Stars from "@/components/ui/Stars";
import { useStore } from "./StoreProvider";
import type { UIReview } from "@/lib/types";

export default function ProductReviews({
  productId,
  productSlug,
  productName,
  initialReviews,
  initialRating,
  initialCount,
}: {
  productId: number;
  productSlug: string;
  productName: string;
  initialReviews: UIReview[];
  initialRating: string;
  initialCount: string;
}) {
  const { pushToast } = useStore();
  const [reviews, setReviews] = useState<UIReview[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !body.trim()) {
      pushToast("Please enter your name and feedback.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          slug: productSlug,
          author: author.trim(),
          rating,
          body: body.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to submit review");

      const newReview: UIReview = {
        id: data.review?.id ?? Date.now(),
        author: author.trim(),
        rating,
        body: body.trim(),
      };

      setReviews([newReview, ...reviews]);
      setAuthor("");
      setBody("");
      setRating(5);
      setShowForm(false);
      pushToast("Thank you! Your review has been added.");
    } catch (err) {
      pushToast((err as Error).message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length).toFixed(1)
      : initialRating;

  return (
    <div className="mt-8 border-t border-[#e2ece0] pt-8">
      {/* Header & Stats bar */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-display text-2xl font-extrabold text-[#16241d]">Customer Reviews</h3>
            <span className="rounded-full bg-[#0d5c37]/10 px-3 py-0.5 text-xs font-bold text-[#0d5c37]">
              {reviews.length} Verified
            </span>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Stars value={Number(avgRating)} size={17} />
              <span className="text-lg font-black text-[#16241d]">{avgRating}</span>
              <span className="text-xs text-[#5e6f66]">out of 5</span>
            </div>
            <span className="text-[#a4b5a8]">•</span>
            <span className="text-xs font-semibold text-[#0d5c37]">100% Real Patient Feedback</span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          type="button"
          className="btn btn-primary inline-flex items-center gap-2 self-start rounded-xl px-5 py-2.5 text-xs font-bold shadow-sm sm:self-auto"
        >
          <MessageSquarePlus size={16} />
          {showForm ? "Cancel Review" : "Write a Review"}
        </button>
      </div>

      {/* Interactive Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 animate-fade-in rounded-2xl border border-[#cfe2ce] bg-[#f8fbf7] p-5 sm:p-6 shadow-xs"
        >
          <h4 className="font-display text-base font-bold text-[#16241d]">
            Write a Review for {productName}
          </h4>
          <p className="mt-1 text-xs text-[#5e6f66]">
            Share your experience with other patients and wellness seekers.
          </p>

          <div className="mt-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#405447]">
              Your Overall Rating
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-120 focus:outline-none"
                  aria-label={`Rate ${star} star`}
                >
                  <Star
                    size={24}
                    className={`${
                      (hoverRating || rating) >= star
                        ? "fill-[#f5a623] text-[#f5a623]"
                        : "fill-transparent text-[#c1d3c0]"
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-[#0d5c37]">
                {rating === 5 ? "Excellent (5/5)" : rating === 4 ? "Very Good (4/5)" : `${rating} Stars`}
              </span>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#405447]">
                Your Full Name *
              </label>
              <input
                required
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Ramesh Kumar (Hisar)"
                className="mt-1.5 w-full rounded-xl border border-[#cfe2ce] bg-white px-3.5 py-2.5 text-sm text-[#16241d] outline-none ring-[#0d5c37] transition focus:ring-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#405447]">
              Detailed Review *
            </label>
            <textarea
              required
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell us about the results, how long you used this formulation, and how it helped your health..."
              className="mt-1.5 w-full rounded-xl border border-[#cfe2ce] bg-white p-3.5 text-sm text-[#16241d] outline-none ring-[#0d5c37] transition focus:ring-2"
            />
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-[#5e6f66] hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary rounded-xl px-6 py-2.5 text-xs font-bold shadow-sm disabled:opacity-70"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="mt-6 flex flex-col gap-3.5">
        {reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#cfe2ce] p-8 text-center text-[#5e6f66]">
            <p className="font-semibold">No reviews yet for this product.</p>
            <p className="mt-1 text-xs">Be the first to share your experience!</p>
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl border border-[#e5efe4] bg-white p-4.5 sm:p-5 shadow-2xs transition-all hover:border-[#0d5c37]/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eaf4ea] text-xs font-bold text-[#0d5c37]">
                    {rev.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#16241d]">{rev.author}</span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#eaf4ea] px-1.5 py-0.5 text-[10px] font-semibold text-[#0d5c37]">
                        <CheckCircle2 size={11} /> Verified Buyer
                      </span>
                    </div>
                    <div className="mt-1">
                      <Stars value={rev.rating} size={12} />
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[13.5px] leading-relaxed text-[#3a4d41]">{rev.body}</p>

              <div className="mt-3.5 flex items-center gap-4 text-[11px] text-[#73887a]">
                <span>100% Ayurvedic Formulation</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#0d5c37]">
                  <ThumbsUp size={12} /> Helpful
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


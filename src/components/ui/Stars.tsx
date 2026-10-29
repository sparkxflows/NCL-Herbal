import { Star } from "lucide-react";

export default function Stars({ value, size = 13 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-[1px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(value) ? "fill-[#f5a623] text-[#f5a623]" : "fill-[#dfe6e0] text-[#dfe6e0]"}
        />
      ))}
    </span>
  );
}

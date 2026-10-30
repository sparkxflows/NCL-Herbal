import Link from "next/link";

export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  if (variant === "light") {
    return (
      <Link
        href="/"
        aria-label="NLC Herbal home"
        className={`group inline-flex items-center ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/footer-logo.png"
          alt="NLC Herbal"
          className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
    );
  }

  return (
    <Link href="/" aria-label="NLC Herbal home" className={`group inline-flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.png"
        alt="NLC Herbal"
        className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
}

type P = { size?: number; className?: string };

export function FacebookIcon({ size = 15, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6A22 22 0 0 0 14.3 3.5c-2.4 0-4 1.45-4 4.12V9.9H7.6V13h2.7v8h3.2Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 15, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ size = 15, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10.2 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 15, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6.94 8.5H4V20h2.94V8.5ZM5.47 3.9A1.72 1.72 0 1 0 5.5 7.35 1.72 1.72 0 0 0 5.47 3.9ZM20 13.9c0-3.2-1.71-4.69-4-4.69a3.45 3.45 0 0 0-3.12 1.72h-.04V8.5H10V20h2.94v-5.7c0-1.5.29-2.95 2.15-2.95s1.87 1.72 1.87 3.05V20H20v-6.1Z" />
    </svg>
  );
}

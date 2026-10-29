interface IconProps {
  size?: number;
  className?: string;
}

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function InstagramIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTubeIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5c0-.3.2-.5.5-.5H15z" />
    </svg>
  );
}

export function ArabicBackgroundPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Arabic geometric patterns optimized for performance */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#D4AF37", stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: "#FFD700", stopOpacity: 0.05 }} />
        </linearGradient>
      </defs>

      {/* Top right corner Islamic geometric pattern */}
      <g opacity="0.08" fill="url(#goldGradient)">
        <circle cx="1000" cy="100" r="200" />
        <circle cx="1100" cy="150" r="100" />
        <rect x="850" y="50" width="150" height="150" transform="rotate(45 925 125)" />
      </g>

      {/* Bottom left corner Arabic decorative elements */}
      <g opacity="0.06" stroke="#D4AF37" strokeWidth="1.5" fill="none">
        <path d="M 50 700 Q 100 680 150 700 T 250 700" />
        <path d="M 50 730 Q 100 710 150 730 T 250 730" />
        <circle cx="80" cy="650" r="30" />
        <circle cx="200" cy="650" r="30" />
      </g>

      {/* Center decorative line */}
      <line x1="100" y1="400" x2="1100" y2="400" stroke="#D4AF37" strokeWidth="1" opacity="0.05" />
    </svg>
  );
}

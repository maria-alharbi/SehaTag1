// Custom SehaTag logo: medical cross (+) with NFC signal waves.
export default function Logo({ size = 48, animated = false, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="SehaTag"
      className={className}
    >
      <defs>
        <linearGradient id="sh-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00A97A" />
          <stop offset="1" stopColor="#006B50" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#sh-grad)" />
      <rect x="22" y="28" width="8" height="20" rx="2" fill="#fff" />
      <rect x="16" y="33" width="20" height="10" rx="2" fill="#fff" />
      <g fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
        <path d="M28.6 23.2A15 15 0 0 1 41 38" className={animated ? 'wave w1' : ''} />
        <path d="M30.2 14.4A24 24 0 0 1 50 38" opacity=".8" className={animated ? 'wave w2' : ''} />
        <path d="M31.7 5.5A33 33 0 0 1 59 38" opacity=".55" className={animated ? 'wave w3' : ''} />
      </g>
    </svg>
  )
}

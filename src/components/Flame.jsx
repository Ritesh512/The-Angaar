export default function Flame({ className = '', size = 56 }) {
  return (
    <svg
      className={`flame ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fg" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFB300" />
          <stop offset=".5" stopColor="#FF9800" />
          <stop offset="1" stopColor="#FF5722" />
        </linearGradient>
      </defs>
      <path
        d="M32 4c2 10-8 14-8 24 0 4 2 7 5 8-1-4 1-8 5-11 0 6 6 8 6 15 0 6-4 10-9 10-8 0-14-6-14-15C17 22 28 16 32 4Z"
        fill="url(#fg)"
      />
      <path
        d="M32 60c-5 0-9-3-9-8 0-4 4-6 5-10 3 2 4 4 4 6 2-1 3-3 3-5 3 3 6 5 6 9 0 5-4 8-9 8Z"
        fill="#FFB300"
        opacity=".85"
      />
    </svg>
  )
}

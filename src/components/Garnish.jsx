export default function Garnish({ kind, size }) {
  const common = { width: size, height: size, 'aria-hidden': true }
  switch (kind) {
    case 'onion':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="26" stroke="#c77dff" strokeWidth="5" opacity=".85" />
          <circle cx="32" cy="32" r="17" stroke="#e0aaff" strokeWidth="3" opacity=".7" />
          <circle cx="32" cy="32" r="9" stroke="#f3d9ff" strokeWidth="2" opacity=".6" />
        </svg>
      )
    case 'lemon':
      return (
        <svg {...common} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#FFB300" />
          <circle cx="32" cy="32" r="23" fill="#fff3b0" />
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d="M32 32 L32 12 A20 20 0 0 1 46 18 Z"
              fill="#ffd23f"
              transform={`rotate(${i * 45} 32 32)`}
            />
          ))}
        </svg>
      )
    case 'mint':
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <path d="M8 56C8 28 28 8 56 8c0 28-20 48-48 48Z" fill="#2e9e5b" />
          <path d="M10 54C22 40 36 26 54 10" stroke="#9be7b4" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'ember':
    default:
      return (
        <span
          className="block rounded-full"
          style={{
            width: size,
            height: size,
            background: 'radial-gradient(circle, #FFB300 0%, #FF5722 60%, transparent 70%)',
            boxShadow: '0 0 18px 4px rgba(255,87,34,.7)',
          }}
          aria-hidden="true"
        />
      )
  }
}

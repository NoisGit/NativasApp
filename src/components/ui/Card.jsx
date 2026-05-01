export function Card ({ children, className = '' }) {
  return (
    <div className={`rounded-3xl border border-nativas-border bg-nativas-night-soft/80 p-6 shadow-nativas-glow backdrop-blur ${className}`}>
      {children}
    </div>
  )
}

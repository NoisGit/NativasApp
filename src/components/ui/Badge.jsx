export function Badge ({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-nativas-turquoise/30 bg-nativas-turquoise/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-nativas-turquoise ${className}`}>
      {children}
    </span>
  )
}

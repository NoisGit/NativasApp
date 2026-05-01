export function Section ({ children, className = '', id }) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      {children}
    </section>
  )
}

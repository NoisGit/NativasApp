const variants = {
  primary: 'bg-nativas-turquoise text-nativas-night hover:bg-nativas-aqua focus-visible:ring-nativas-turquoise',
  secondary: 'border border-nativas-turquoise/60 bg-white/5 text-white hover:bg-nativas-turquoise/10 focus-visible:ring-nativas-turquoise',
  ghost: 'text-nativas-mist hover:text-white hover:bg-white/5 focus-visible:ring-white/40'
}

export function Button ({ children, className = '', variant = 'primary', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-nativas-night ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

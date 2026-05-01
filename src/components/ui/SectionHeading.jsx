export function SectionHeading ({ eyebrow, title, description, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && (
        <p className='mb-4 text-sm font-bold uppercase tracking-[0.28em] text-nativas-turquoise'>
          {eyebrow}
        </p>
      )}
      <h2 className='text-3xl font-black tracking-tight text-white sm:text-5xl'>
        {title}
      </h2>
      {description && (
        <p className='mt-5 text-base leading-8 text-nativas-mist sm:text-lg'>
          {description}
        </p>
      )}
    </div>
  )
}

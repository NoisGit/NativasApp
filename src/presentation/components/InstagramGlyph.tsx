interface InstagramGlyphProps {
  size?: number
}

export function InstagramGlyph ({ size = 18 }: InstagramGlyphProps) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true' focusable='false'>
      <rect x='3' y='3' width='18' height='18' rx='5' stroke='currentColor' strokeWidth='2' />
      <circle cx='12' cy='12' r='4' stroke='currentColor' strokeWidth='2' />
      <circle cx='17.5' cy='6.5' r='1.25' fill='currentColor' />
    </svg>
  )
}

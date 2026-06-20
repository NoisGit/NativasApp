import { CalendarDays } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { es } from 'react-day-picker/locale'
import { siteConfig } from '../../shared/config/siteConfig'

interface BirthDatePickerProps {
  id: string
  name: string
  value: string
  invalid: boolean
  describedBy: string
  onChange: (value: string) => void
}

function toDateInputValue (date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function fromDateInputValue (value: string): Date | undefined {
  if (!value) return undefined
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? undefined : date
}

function formatReadableDate (value: string): string {
  const date = fromDateInputValue(value)
  if (!date) return 'Selecciona fecha'
  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

export function getMaximumBirthDate (today = new Date()): Date {
  return new Date(today.getFullYear() - siteConfig.minimumAge, today.getMonth(), today.getDate())
}

export function BirthDatePicker ({ id, name, value, invalid, describedBy, onChange }: BirthDatePickerProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const selectedDate = useMemo(() => fromDateInputValue(value), [value])
  const maxDate = useMemo(() => getMaximumBirthDate(), [])
  const startMonth = useMemo(() => new Date(1950, 0, 1), [])
  const defaultMonth = selectedDate || maxDate

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className='date-picker' ref={rootRef}>
      <button
        id={id}
        name={name}
        className={`date-picker__button ${value ? '' : 'is-empty'}`}
        type='button'
        aria-haspopup='dialog'
        aria-expanded={open}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => setOpen((current) => !current)}
        ref={buttonRef}
      >
        <span>{formatReadableDate(value)}</span>
        <CalendarDays size={18} aria-hidden='true' />
      </button>

      {open && (
        <div className='date-picker__popover' role='dialog' aria-label='Seleccionar fecha de nacimiento'>
          <DayPicker
            mode='single'
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) return
              onChange(toDateInputValue(date))
              setOpen(false)
              buttonRef.current?.focus()
            }}
            defaultMonth={defaultMonth}
            startMonth={startMonth}
            endMonth={maxDate}
            captionLayout='dropdown'
            navLayout='around'
            locale={es}
            weekStartsOn={1}
            disabled={{ after: maxDate }}
            modifiersClassNames={{
              selected: 'rdp-day_selected',
              today: 'rdp-day_today',
              disabled: 'rdp-day_disabled'
            }}
          />
        </div>
      )}
    </div>
  )
}

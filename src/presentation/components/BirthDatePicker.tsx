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

function isRealDate (year: number, month: number, day: number): boolean {
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

export function fromDateInputValue (value: string): Date | undefined {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return undefined
  const [, yearValue, monthValue, dayValue] = match
  const year = Number(yearValue)
  const month = Number(monthValue)
  const day = Number(dayValue)
  if (!isRealDate(year, month, day)) return undefined
  return new Date(year, month - 1, day)
}

export function formatVisibleBirthDate (value: string): string {
  const date = fromDateInputValue(value)
  if (!date) return ''
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}/${month}/${date.getFullYear()}`
}

function formatInputDraft (value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  const day = digits.slice(0, 2)
  const month = digits.slice(2, 4)
  const year = digits.slice(4, 8)
  if (digits.length > 4) return `${day}/${month}/${year}`
  if (digits.length > 2) return `${day}/${month}`
  return day
}

export function parseVisibleBirthDate (value: string): string | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value)
  if (!match) return null
  const [, dayValue, monthValue, yearValue] = match
  const day = Number(dayValue)
  const month = Number(monthValue)
  const year = Number(yearValue)
  if (!isRealDate(year, month, day)) return null
  return `${yearValue}-${monthValue}-${dayValue}`
}

export function getMaximumBirthDate (today = new Date()): Date {
  return new Date(today.getFullYear() - siteConfig.minimumAge, today.getMonth(), today.getDate())
}

export function BirthDatePicker ({ id, name, value, invalid, describedBy, onChange }: BirthDatePickerProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(() => formatVisibleBirthDate(value))
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const skipNextEmptySyncRef = useRef(false)
  const selectedDate = useMemo(() => fromDateInputValue(value), [value])
  const maxDate = useMemo(() => getMaximumBirthDate(), [])
  const startMonth = useMemo(() => new Date(1950, 0, 1), [])
  const defaultMonth = selectedDate && selectedDate <= maxDate ? selectedDate : maxDate

  useEffect(() => {
    if (!value && skipNextEmptySyncRef.current) {
      skipNextEmptySyncRef.current = false
      return
    }
    setDraft(formatVisibleBirthDate(value))
  }, [value])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        inputRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const updateFromDraft = (nextDraft: string) => {
    const formatted = formatInputDraft(nextDraft)
    setDraft(formatted)

    if (!formatted) {
      onChange('')
      return
    }

    const isoDate = parseVisibleBirthDate(formatted)
    if (!isoDate) {
      skipNextEmptySyncRef.current = true
      onChange('')
      return
    }

    onChange(isoDate)
  }

  return (
    <div className='date-picker' ref={rootRef}>
      <div className={`date-picker__control ${invalid ? 'is-invalid' : ''}`}>
        <input
          id={id}
          name={name}
          ref={inputRef}
          type='text'
          inputMode='numeric'
          autoComplete='bday'
          value={draft}
          maxLength={10}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={(event) => updateFromDraft(event.target.value)}
          onFocus={() => setOpen(false)}
        />
        <button
          className='date-picker__button'
          type='button'
          aria-label='Abrir calendario de fecha de nacimiento'
          aria-haspopup='dialog'
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          ref={buttonRef}
        >
          <CalendarDays size={18} aria-hidden='true' />
        </button>
      </div>

      {open && (
        <div className='date-picker__popover' role='dialog' aria-label='Seleccionar fecha de nacimiento'>
          <DayPicker
            mode='single'
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) return
              const nextValue = toDateInputValue(date)
              onChange(nextValue)
              setDraft(formatVisibleBirthDate(nextValue))
              setOpen(false)
              inputRef.current?.focus()
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

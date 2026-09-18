import { useEffect, useState } from "react"

export const TYPEWRITER_TYPE_DELAY = 80
export const TYPEWRITER_ERASE_DELAY = 40
export const TYPEWRITER_HOLD_DELAY = 2000
export const TYPEWRITER_GAP_DELAY = 600

interface UseTypewriterPlaceholderProps {
  /** Must be referentially stable; a new array restarts the animation */
  phrases: string[]
  fallback: string
  isEnabled: boolean
  /** Wraps only the animated text, never the fallback */
  prefix?: string
  suffix?: string
}

/** Types, holds, and erases each phrase in turn, looping forever */
export const useTypewriterPlaceholder = ({
  phrases,
  fallback,
  isEnabled,
  prefix = "",
  suffix = "",
}: UseTypewriterPlaceholderProps): string => {
  const [placeholder, setPlaceholder] = useState(fallback)

  useEffect(() => {
    // matchMedia is absent in jsdom
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches

    if (!isEnabled || prefersReducedMotion || phrases.length === 0) {
      setPlaceholder(fallback)
      return
    }

    let timeoutId: ReturnType<typeof setTimeout>
    let phraseIndex = 0

    const display = (text: string) => {
      setPlaceholder(`${prefix}${text}${suffix}`)
    }

    const type = (length: number) => {
      const phrase = phrases[phraseIndex]
      display(phrase.slice(0, length))

      if (length < phrase.length) {
        timeoutId = setTimeout(() => type(length + 1), TYPEWRITER_TYPE_DELAY)
        return
      }

      timeoutId = setTimeout(
        () => erase(phrase.length - 1),
        TYPEWRITER_HOLD_DELAY,
      )
    }

    const erase = (length: number) => {
      const phrase = phrases[phraseIndex]
      display(phrase.slice(0, length))

      if (length > 0) {
        timeoutId = setTimeout(() => erase(length - 1), TYPEWRITER_ERASE_DELAY)
        return
      }

      phraseIndex = (phraseIndex + 1) % phrases.length
      timeoutId = setTimeout(() => type(1), TYPEWRITER_GAP_DELAY)
    }

    type(1)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isEnabled, phrases, fallback, prefix, suffix])

  return placeholder
}

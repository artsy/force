import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { useEffect, useState } from "react"

const TYPE_DELAY = 55
const DELETE_DELAY = 30
/** How long a finished phrase stays before it's deleted */
const HOLD_DELAY = 1800
/** A beat of empty input before the next phrase starts */
const RESTART_DELAY = 400

interface UseTypewriterPlaceholderProps {
  phrases: string[]
  /** Typing stops and the current phrase completes when this goes false */
  isEnabled: boolean
}

/**
 * Types example queries out one character at a time, cycling through them.
 * Returns the whole phrase — no animation — when disabled or when the viewer
 * asked for reduced motion.
 */
export const useTypewriterPlaceholder = ({
  phrases,
  isEnabled,
}: UseTypewriterPlaceholderProps): string => {
  const prefersReducedMotion = __internal__useMatchMedia(
    "(prefers-reduced-motion: reduce)",
  )

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [typedLength, setTypedLength] = useState(1)
  const [isDeleting, setIsDeleting] = useState(false)

  const phrase = phrases[phraseIndex] ?? ""
  const isAnimating = isEnabled && !prefersReducedMotion && phrases.length > 0

  useEffect(() => {
    if (!isAnimating) return

    const isFullyTyped = typedLength >= phrase.length

    const getDelay = (): number => {
      if (!isDeleting) return isFullyTyped ? HOLD_DELAY : TYPE_DELAY

      return typedLength <= 0 ? RESTART_DELAY : DELETE_DELAY
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (isFullyTyped) {
          setIsDeleting(true)
          return
        }

        setTypedLength(typedLength + 1)
        return
      }

      if (typedLength <= 0) {
        setIsDeleting(false)
        setPhraseIndex((phraseIndex + 1) % phrases.length)
        setTypedLength(1)
        return
      }

      setTypedLength(typedLength - 1)
    }, getDelay())

    return () => clearTimeout(timeout)
  }, [
    isAnimating,
    phrase,
    phrases.length,
    phraseIndex,
    typedLength,
    isDeleting,
  ])

  // Settle on the whole phrase rather than freezing mid-word
  if (!isAnimating) return phrase

  return phrase.slice(0, typedLength)
}

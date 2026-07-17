import GavelIcon from "@artsy/icons/GavelIcon"
import { Box, Button, Flex, Stack, THEME } from "@artsy/palette"
import { HammerPriceGuessRow } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceGuessRow"
import type { SubmittedGuess } from "Apps/Games/Routes/HammerPrice/Hooks/useHammerPriceGame"
import { formatDigitsWithSeparators } from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import type { DigitFeedback } from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"
import {
  HAMMER_PRICE_GUESS_CURRENCY,
  HAMMER_PRICE_MAX_GUESSES,
} from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export interface HammerPriceGuessBoardProps {
  guesses: SubmittedGuess[]
  /** The grid width for this puzzle */
  digitCount: number
  /** The row currently accepting input, or null when the game is over */
  activeRowIndex: number | null
  /** The row currently playing its flipboard reveal, or -1 when none */
  revealingRowIndex: number
  /** Disables input, e.g. while a reveal is animating */
  disabled: boolean
  onSubmit: (digits: string) => void
  /** Called by the revealing row once its cells have all flipped */
  onRevealComplete: () => void
}

interface OverlayRect {
  top: number
  left: number
  width: number
  height: number
}

/**
 * The guessing surface. Rather than a separate text field, the active row of
 * the grid *is* the input: a single, persistent, focusable field is positioned
 * as a transparent overlay on top of the active row and the typed digits render
 * into the cells. A chevron submit button appears at the end of the row once
 * every digit is entered; that button or Enter submits, so nothing is submitted
 * mid-edit.
 *
 * The field is deliberately kept mounted (and never `disabled`) as the active
 * row advances from guess to guess — it only unmounts once `activeRowIndex`
 * becomes null (the puzzle is solved or the last row is used). This keeps focus
 * on the same DOM node across guesses so the mobile soft keyboard stays open
 * until the game is over, rather than retracting on every submit.
 */
export const HammerPriceGuessBoard: React.FC<
  React.PropsWithChildren<HammerPriceGuessBoardProps>
> = ({
  guesses,
  digitCount,
  activeRowIndex,
  revealingRowIndex,
  disabled,
  onSubmit,
  onRevealComplete,
}) => {
  const [currentEntry, setCurrentEntry] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [overlayRect, setOverlayRect] = useState<OverlayRect | null>(null)

  const boardRef = useRef<HTMLDivElement>(null)
  const activeRowRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const previousActiveRowIndex = useRef(activeRowIndex)

  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  const isComplete = currentEntry.length === digitCount

  // Position the invisible input over the active row. Because a single field is
  // reused across guesses, this repositions it (via absolute offsets) as the
  // active row advances instead of remounting it, so focus is never lost.
  const measureOverlay = useCallback(() => {
    if (activeRowIndex === null) {
      setOverlayRect(null)

      return
    }

    const board = boardRef.current
    const row = activeRowRef.current

    if (!board || !row) {
      return
    }

    const boardBox = board.getBoundingClientRect()
    const rowBox = row.getBoundingClientRect()

    setOverlayRect({
      top: rowBox.top - boardBox.top,
      left: rowBox.left - boardBox.left,
      width: rowBox.width,
      height: rowBox.height,
    })
  }, [activeRowIndex])

  useIsomorphicLayoutEffect(() => {
    measureOverlay()
  }, [measureOverlay, digitCount])

  useEffect(() => {
    window.addEventListener("resize", measureOverlay)

    return () => {
      window.removeEventListener("resize", measureOverlay)
    }
  }, [measureOverlay])

  // Autofocus the active row on load, and refocus it once it becomes
  // interactive again after a reveal. preventScroll keeps the artwork in view.
  useEffect(() => {
    if (disabled || activeRowIndex === null) {
      return
    }

    inputRef.current?.focus({ preventScroll: true })
  }, [disabled, activeRowIndex])

  // On mobile, follow the active row as it advances so it stays clear of the
  // soft keyboard. Because a single field is reused across guesses, focus never
  // moves on submit, so the browser won't scroll to the new row on its own. We
  // only scroll when the row actually changes — not on the initial mount or a
  // restored game — to avoid pulling the artwork out of view on load.
  useEffect(() => {
    const changed = activeRowIndex !== previousActiveRowIndex.current
    previousActiveRowIndex.current = activeRowIndex

    if (!isMobile || activeRowIndex === null || !changed) {
      return
    }

    activeRowRef.current?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    })
  }, [isMobile, activeRowIndex])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return
    }

    const digits = event.currentTarget.value
      .replace(/\D/g, "")
      .slice(0, digitCount)

    setCurrentEntry(digits)
  }

  const handleSubmit = () => {
    if (disabled || !isComplete) {
      return
    }

    onSubmit(currentEntry)
    setCurrentEntry("")
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Stack gap={1}>
      <Box ref={boardRef} position="relative">
        <Stack
          as="ol"
          gap={0.5}
          p={0}
          style={{ listStyle: "none" }}
          aria-label={`Guesses, ${guesses.length} of ${HAMMER_PRICE_MAX_GUESSES} used`}
        >
          {Array.from({ length: HAMMER_PRICE_MAX_GUESSES }, (_, index) => {
            const submitted = guesses[index]

            if (submitted) {
              return (
                <Box key={index} as="li" style={{ listStyle: "none" }}>
                  <HammerPriceGuessRow
                    digitCount={digitCount}
                    currency={HAMMER_PRICE_GUESS_CURRENCY}
                    digits={submitted.digits}
                    feedback={submitted.feedback}
                    reveal={index === revealingRowIndex}
                    onRevealComplete={onRevealComplete}
                    label={`Guess ${index + 1}: ${formatDigitsWithSeparators({
                      digits: submitted.digits,
                    })}. ${summarizeFeedback(submitted.feedback)}`}
                  />
                </Box>
              )
            }

            if (index === activeRowIndex) {
              return (
                <Flex
                  key={index}
                  as="li"
                  alignItems="center"
                  gap={1}
                  style={{ listStyle: "none" }}
                >
                  <Box ref={activeRowRef}>
                    <HammerPriceGuessRow
                      digitCount={digitCount}
                      currency={HAMMER_PRICE_GUESS_CURRENCY}
                      digits={currentEntry}
                      isActive
                      isFocused={isFocused}
                      label={`Guess ${index + 1}, in progress`}
                    />
                  </Box>

                  {isComplete && (
                    <Button
                      size="small"
                      variant="primaryBlack"
                      onClick={handleSubmit}
                      onMouseDown={event => {
                        // Don't let the button steal focus from the input, so
                        // the mobile keyboard stays open through the submit.
                        event.preventDefault()
                      }}
                      disabled={disabled}
                      aria-label="Submit guess"
                      pl={1}
                      pr={1}
                    >
                      <GavelIcon fill="mono0" />
                    </Button>
                  )}
                </Flex>
              )
            }

            return (
              <Box key={index} as="li" style={{ listStyle: "none" }}>
                <HammerPriceGuessRow
                  digitCount={digitCount}
                  currency={HAMMER_PRICE_GUESS_CURRENCY}
                  digits=""
                  label={`Guess ${index + 1}, empty`}
                />
              </Box>
            )
          })}
        </Stack>

        {activeRowIndex !== null && overlayRect && (
          <input
            ref={inputRef}
            aria-label={`Your guess in US dollars, ${digitCount} digits`}
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            value={currentEntry}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            // Use readOnly rather than disabled while a reveal animates:
            // disabling the field blurs it and retracts the mobile keyboard,
            // whereas readOnly keeps focus (and the keyboard) intact.
            readOnly={disabled}
            style={{
              position: "absolute",
              top: overlayRect.top,
              left: overlayRect.left,
              width: overlayRect.width,
              height: overlayRect.height,
              margin: 0,
              padding: 0,
              border: 0,
              background: "transparent",
              color: "transparent",
              caretColor: "transparent",
              cursor: "text",
              // Keep the field in the a11y tree and focusable while invisible
              opacity: 0,
            }}
          />
        )}
      </Box>
    </Stack>
  )
}

const summarizeFeedback = (feedback: DigitFeedback[]): string => {
  const count = (status: DigitFeedback) => {
    return feedback.filter(item => item === status).length
  }

  return `${count("exact")} correct, ${count("close")} close, ${count(
    "miss",
  )} incorrect.`
}

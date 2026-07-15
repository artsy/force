import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Box, Button, Flex, Stack } from "@artsy/palette"
import { HammerPriceGuessRow } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceGuessRow"
import type { SubmittedGuess } from "Apps/Games/Routes/HammerPrice/Hooks/useHammerPriceGame"
import { formatDigitsWithSeparators } from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import type { DigitFeedback } from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"
import {
  HAMMER_PRICE_DIGIT_COUNT,
  HAMMER_PRICE_GUESS_CURRENCY,
  HAMMER_PRICE_MAX_GUESSES,
} from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import { useEffect, useRef, useState } from "react"

export interface HammerPriceGuessBoardProps {
  guesses: SubmittedGuess[]
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

/**
 * The guessing surface. Rather than a separate text field, the active row of
 * the grid *is* the input: a transparent, focusable field overlays it and the
 * typed digits render into the cells. A chevron submit button appears at the
 * end of the row once every digit is entered; that button or Enter submits,
 * so nothing is submitted mid-edit.
 */
export const HammerPriceGuessBoard: React.FC<
  React.PropsWithChildren<HammerPriceGuessBoardProps>
> = ({
  guesses,
  activeRowIndex,
  revealingRowIndex,
  disabled,
  onSubmit,
  onRevealComplete,
}) => {
  const [currentEntry, setCurrentEntry] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isComplete = currentEntry.length === HAMMER_PRICE_DIGIT_COUNT

  // Autofocus the active row on load, and refocus it once it becomes
  // interactive again after a reveal. preventScroll keeps the artwork in view.
  useEffect(() => {
    if (disabled || activeRowIndex === null) {
      return
    }

    inputRef.current?.focus({ preventScroll: true })
  }, [disabled, activeRowIndex])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const digits = event.currentTarget.value
      .replace(/\D/g, "")
      .slice(0, HAMMER_PRICE_DIGIT_COUNT)

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
                  digitCount={HAMMER_PRICE_DIGIT_COUNT}
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
                <Box position="relative">
                  <HammerPriceGuessRow
                    digitCount={HAMMER_PRICE_DIGIT_COUNT}
                    currency={HAMMER_PRICE_GUESS_CURRENCY}
                    digits={currentEntry}
                    isActive
                    isFocused={isFocused}
                    label={`Guess ${index + 1}, in progress`}
                  />

                  <input
                    ref={inputRef}
                    aria-label={`Your guess in US dollars, ${HAMMER_PRICE_DIGIT_COUNT} digits`}
                    inputMode="numeric"
                    autoComplete="off"
                    spellCheck={false}
                    value={currentEntry}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
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
                </Box>

                {isComplete && (
                  <Button
                    size="small"
                    variant="primaryBlack"
                    onClick={handleSubmit}
                    disabled={disabled}
                    aria-label="Submit guess"
                  >
                    <ChevronRightIcon fill="mono0" />
                  </Button>
                )}
              </Flex>
            )
          }

          return (
            <Box key={index} as="li" style={{ listStyle: "none" }}>
              <HammerPriceGuessRow
                digitCount={HAMMER_PRICE_DIGIT_COUNT}
                currency={HAMMER_PRICE_GUESS_CURRENCY}
                digits=""
                label={`Guess ${index + 1}, empty`}
              />
            </Box>
          )
        })}
      </Stack>
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

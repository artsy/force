import { Stack } from "@artsy/palette"
import { HammerPriceGuessRow } from "Apps/Games/Routes/HammerPrice/Components/HammerPriceGuessRow"
import type { SubmittedGuess } from "Apps/Games/Routes/HammerPrice/Hooks/useHammerPriceGame"
import {
  HAMMER_PRICE_MAX_GUESSES,
  type HammerPricePuzzle,
} from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import { formatDigitsWithSeparators } from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import type { DigitFeedback } from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"

export interface HammerPriceGuessGridProps {
  puzzle: HammerPricePuzzle
  guesses: SubmittedGuess[]
  /** The in-progress entry mirrored into the active row */
  currentEntry: string
  isPlaying: boolean
}

export const HammerPriceGuessGrid: React.FC<
  React.PropsWithChildren<HammerPriceGuessGridProps>
> = ({ puzzle, guesses, currentEntry, isPlaying }) => {
  const { digitCount, currency } = puzzle

  const activeRowIndex = isPlaying ? guesses.length : -1

  const getRowProps = (index: number) => {
    const submitted = guesses[index]

    if (submitted) {
      return {
        digits: submitted.digits,
        feedback: submitted.feedback,
        label: `Guess ${index + 1}: ${formatDigitsWithSeparators({
          digits: submitted.digits,
        })}. ${summarizeFeedback(submitted.feedback)}`,
      }
    }

    if (index === activeRowIndex) {
      return {
        digits: currentEntry,
        label: `Guess ${index + 1}, in progress`,
      }
    }

    return { digits: "", label: `Guess ${index + 1}, empty` }
  }

  return (
    <Stack
      as="ol"
      gap={0.5}
      p={0}
      style={{ listStyle: "none" }}
      aria-label={`Guesses, ${guesses.length} of ${HAMMER_PRICE_MAX_GUESSES} used`}
    >
      {Array.from({ length: HAMMER_PRICE_MAX_GUESSES }, (_, index) => {
        return (
          <HammerPriceGuessRow
            key={index}
            digitCount={digitCount}
            currency={currency}
            {...getRowProps(index)}
          />
        )
      })}
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

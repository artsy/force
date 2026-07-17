import { HAMMER_PRICE_MAX_GUESSES } from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import type { DigitFeedback } from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"

const FEEDBACK_DESCRIPTIONS: Record<DigitFeedback, string> = {
  exact: "correct",
  close: "close",
  miss: "incorrect",
}

export interface DescribeGuessFeedbackParams {
  digits: string
  feedback: DigitFeedback[]
  guessNumber: number
}

/**
 * Screen-reader announcement for a submitted guess, describing the feedback
 * for each digit position.
 */
export const describeGuessFeedback = ({
  digits,
  feedback,
  guessNumber,
}: DescribeGuessFeedbackParams): string => {
  const positions = feedback
    .map((status, index) => {
      return `Digit ${index + 1} is ${digits[index]}: ${FEEDBACK_DESCRIPTIONS[status]}.`
    })
    .join(" ")

  return `Guess ${guessNumber} of ${HAMMER_PRICE_MAX_GUESSES} submitted. ${positions}`
}

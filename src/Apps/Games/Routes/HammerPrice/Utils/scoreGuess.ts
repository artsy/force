export type DigitFeedback = "exact" | "close" | "miss"

/**
 * How far a guessed digit may be from the target digit (numerically) and
 * still count as “close.”
 */
export const CLOSE_DISTANCE = 2

export interface ScoreGuessParams {
  /** Fixed-width digit string, e.g. "0985000" (leading zeroes allowed) */
  guess: string
  /** Fixed-width digit string of the same length as `guess` */
  target: string
}

/**
 * Scores a guess against the target hammer price, digit by digit.
 *
 * Feedback is based only on the numerical distance between the guessed and
 * correct digit at the same position — there is no Wordle-style
 * “digit exists elsewhere” logic:
 *
 * - `exact`: the guessed digit equals the target digit
 * - `close`: the guessed digit is within CLOSE_DISTANCE of the target digit
 * - `miss`: anything further away
 */
export const scoreGuess = ({
  guess,
  target,
}: ScoreGuessParams): DigitFeedback[] => {
  if (guess.length !== target.length) {
    throw new Error(
      `scoreGuess: guess (${guess.length}) and target (${target.length}) must be the same length`,
    )
  }

  if (!/^\d*$/.test(guess) || !/^\d*$/.test(target)) {
    throw new Error("scoreGuess: guess and target must contain only digits")
  }

  return guess.split("").map((digit, index) => {
    const distance = Math.abs(Number(digit) - Number(target[index]))

    if (distance === 0) {
      return "exact"
    }

    if (distance <= CLOSE_DISTANCE) {
      return "close"
    }

    return "miss"
  })
}

export const isWinningFeedback = (feedback: DigitFeedback[]): boolean => {
  return feedback.length > 0 && feedback.every(status => status === "exact")
}

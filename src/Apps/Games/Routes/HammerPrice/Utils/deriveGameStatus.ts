import {
  HAMMER_PRICE_MAX_GUESSES,
  type HammerPricePuzzle,
} from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import { priceToDigits } from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import {
  isWinningFeedback,
  scoreGuess,
} from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"

export type HammerPriceGameStatus = "notStarted" | "inProgress" | "won" | "lost"

export interface DeriveGameStatusParams {
  puzzle: HammerPricePuzzle
  /** Submitted guesses as fixed-width digit strings, in order */
  guesses: string[]
}

export const deriveGameStatus = ({
  puzzle,
  guesses,
}: DeriveGameStatusParams): HammerPriceGameStatus => {
  if (guesses.length === 0) {
    return "notStarted"
  }

  const target = priceToDigits({
    price: puzzle.priceRealized,
    digitCount: puzzle.digitCount,
  })

  const isWon = guesses.some(guess => {
    return isWinningFeedback(scoreGuess({ guess, target }))
  })

  if (isWon) {
    return "won"
  }

  if (guesses.length >= HAMMER_PRICE_MAX_GUESSES) {
    return "lost"
  }

  return "inProgress"
}

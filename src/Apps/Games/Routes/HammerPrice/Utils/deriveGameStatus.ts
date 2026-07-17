import { HAMMER_PRICE_MAX_GUESSES } from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import {
  isWinningFeedback,
  scoreGuess,
} from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"

export type HammerPriceGameStatus = "notStarted" | "inProgress" | "won" | "lost"

export interface DeriveGameStatusParams {
  /** The fixed-width digit string guesses are scored against */
  targetDigits: string
  /** Submitted guesses as fixed-width digit strings, in order */
  guesses: string[]
}

export const deriveGameStatus = ({
  targetDigits,
  guesses,
}: DeriveGameStatusParams): HammerPriceGameStatus => {
  if (guesses.length === 0) {
    return "notStarted"
  }

  // Guesses come from localStorage; ignore any whose width no longer matches
  // the target (e.g. the realized price was corrected upstream).
  const isWon = guesses.some(guess => {
    return (
      guess.length === targetDigits.length &&
      isWinningFeedback(scoreGuess({ guess, target: targetDigits }))
    )
  })

  if (isWon) {
    return "won"
  }

  if (guesses.length >= HAMMER_PRICE_MAX_GUESSES) {
    return "lost"
  }

  return "inProgress"
}

import {
  HAMMER_PRICE_MAX_GUESSES,
  type HammerPricePuzzle,
} from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import {
  deriveGameStatus,
  type HammerPriceGameStatus,
} from "Apps/Games/Routes/HammerPrice/Utils/deriveGameStatus"
import {
  type GameProgressStore,
  hammerPriceProgressStore,
} from "Apps/Games/Routes/HammerPrice/Utils/gameProgressStore"
import { priceToDigits } from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import {
  type DigitFeedback,
  scoreGuess,
} from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"
import { useEffect, useMemo, useState } from "react"

export interface SubmittedGuess {
  digits: string
  feedback: DigitFeedback[]
}

export interface UseHammerPriceGameParams {
  puzzle: HammerPricePuzzle
  store?: GameProgressStore
}

export interface UseHammerPriceGame {
  guesses: SubmittedGuess[]
  status: HammerPriceGameStatus
  guessesRemaining: number
  targetDigits: string
  /** True once persisted progress has been restored (client-side only) */
  isRestored: boolean
  /**
   * Submits a complete guess; returns the scored guess, or null when the
   * guess is invalid or the game is already over.
   */
  submitGuess: (digits: string) => SubmittedGuess | null
}

export const useHammerPriceGame = ({
  puzzle,
  store = hammerPriceProgressStore,
}: UseHammerPriceGameParams): UseHammerPriceGame => {
  const [guesses, setGuesses] = useState<string[]>([])
  const [isRestored, setIsRestored] = useState(false)

  const targetDigits = useMemo(() => {
    return priceToDigits({
      price: puzzle.priceRealized,
      digitCount: puzzle.digitCount,
    })
  }, [puzzle.priceRealized, puzzle.digitCount])

  // Restore persisted progress after mount (localStorage is unavailable
  // during server-side rendering).
  useEffect(() => {
    const progress = store.getProgress(puzzle.id)

    const restored = (progress?.guesses ?? [])
      .filter(guess => {
        return guess.length === puzzle.digitCount && /^\d+$/.test(guess)
      })
      .slice(0, HAMMER_PRICE_MAX_GUESSES)

    setGuesses(restored)
    setIsRestored(true)
  }, [puzzle.id, puzzle.digitCount, store])

  const submittedGuesses: SubmittedGuess[] = useMemo(() => {
    return guesses.map(digits => {
      return {
        digits,
        feedback: scoreGuess({ guess: digits, target: targetDigits }),
      }
    })
  }, [guesses, targetDigits])

  const status = deriveGameStatus({ puzzle, guesses })

  const submitGuess = (digits: string): SubmittedGuess | null => {
    if (status === "won" || status === "lost") {
      return null
    }

    if (digits.length !== puzzle.digitCount || !/^\d+$/.test(digits)) {
      return null
    }

    const next = [...guesses, digits]

    setGuesses(next)

    store.saveProgress({
      puzzleId: puzzle.id,
      guesses: next,
      updatedAt: new Date().toISOString(),
    })

    return {
      digits,
      feedback: scoreGuess({ guess: digits, target: targetDigits }),
    }
  }

  return {
    guesses: submittedGuesses,
    status,
    guessesRemaining: HAMMER_PRICE_MAX_GUESSES - guesses.length,
    targetDigits,
    isRestored,
    submitGuess,
  }
}

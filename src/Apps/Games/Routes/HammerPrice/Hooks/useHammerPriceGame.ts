import {
  HAMMER_PRICE_DIGIT_COUNT,
  HAMMER_PRICE_MAX_GUESSES,
} from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import {
  deriveGameStatus,
  type HammerPriceGameStatus,
} from "Apps/Games/Routes/HammerPrice/Utils/deriveGameStatus"
import {
  type GameProgressStore,
  hammerPriceProgressStore,
} from "Apps/Games/Routes/HammerPrice/Utils/gameProgressStore"
import { realizedPriceToTargetDigits } from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import {
  type DigitFeedback,
  scoreGuess,
} from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"
import type { useHammerPriceGame_auctionResult$key } from "__generated__/useHammerPriceGame_auctionResult.graphql"
import { useEffect, useMemo, useState } from "react"
import { graphql, useFragment } from "react-relay"

export interface SubmittedGuess {
  digits: string
  feedback: DigitFeedback[]
}

export interface UseHammerPriceGameParams {
  auctionResult: useHammerPriceGame_auctionResult$key
  store?: GameProgressStore
}

export interface UseHammerPriceGame {
  guesses: SubmittedGuess[]
  status: HammerPriceGameStatus
  guessesRemaining: number
  /** Null when the lot has no realized price to guess (e.g. bought in) */
  targetDigits: string | null
  /** The grid width for this puzzle */
  digitCount: number
  isPlayable: boolean
  /** True once persisted progress has been restored (client-side only) */
  isRestored: boolean
  /**
   * Submits a complete guess; returns the scored guess, or null when the
   * guess is invalid or the game is already over.
   */
  submitGuess: (digits: string) => SubmittedGuess | null
}

export const useHammerPriceGame = ({
  auctionResult,
  store = hammerPriceProgressStore,
}: UseHammerPriceGameParams): UseHammerPriceGame => {
  const data = useFragment(FRAGMENT, auctionResult)

  const [guesses, setGuesses] = useState<string[]>([])
  const [isRestored, setIsRestored] = useState(false)

  const targetDigits = useMemo(() => {
    return realizedPriceToTargetDigits(data.priceRealized?.centsUSD)
  }, [data.priceRealized?.centsUSD])

  const digitCount = targetDigits?.length ?? HAMMER_PRICE_DIGIT_COUNT
  const isPlayable = targetDigits !== null

  // Restore persisted progress after mount (localStorage is unavailable
  // during server-side rendering).
  useEffect(() => {
    const progress = store.getProgress(data.internalID)

    const restored = (progress?.guesses ?? [])
      .filter(guess => {
        return guess.length === digitCount && /^\d+$/.test(guess)
      })
      .slice(0, HAMMER_PRICE_MAX_GUESSES)

    setGuesses(restored)
    setIsRestored(true)
  }, [data.internalID, digitCount, store])

  const submittedGuesses: SubmittedGuess[] = useMemo(() => {
    if (!targetDigits) {
      return []
    }

    return guesses.map(digits => {
      return {
        digits,
        feedback: scoreGuess({ guess: digits, target: targetDigits }),
      }
    })
  }, [guesses, targetDigits])

  const status: HammerPriceGameStatus = targetDigits
    ? deriveGameStatus({ targetDigits, guesses })
    : "notStarted"

  const submitGuess = (digits: string): SubmittedGuess | null => {
    if (!targetDigits || status === "won" || status === "lost") {
      return null
    }

    if (digits.length !== digitCount || !/^\d+$/.test(digits)) {
      return null
    }

    const next = [...guesses, digits]

    setGuesses(next)

    store.saveProgress({
      auctionResultId: data.internalID,
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
    digitCount,
    isPlayable,
    isRestored,
    submitGuess,
  }
}

const FRAGMENT = graphql`
  fragment useHammerPriceGame_auctionResult on AuctionResult {
    internalID
    priceRealized {
      centsUSD
    }
  }
`

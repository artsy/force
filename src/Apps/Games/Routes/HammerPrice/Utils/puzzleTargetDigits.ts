import {
  HAMMER_PRICE_DIGIT_COUNT,
  type HammerPricePuzzle,
} from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import { priceToDigits } from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"

/**
 * The fixed-width digit string a puzzle’s guesses are scored against — the
 * USD realized price zero-padded to the standard width.
 */
export const puzzleTargetDigits = (puzzle: HammerPricePuzzle): string => {
  return priceToDigits({
    price: puzzle.priceRealizedUSD,
    digitCount: HAMMER_PRICE_DIGIT_COUNT,
  })
}

/**
 * Configuration for all available Hammer Price puzzles.
 *
 * A puzzle is just an auction result ID. Everything else — the answer
 * (realized price), artist, title, images — is fetched from Metaphysics at
 * runtime, which also means any auction result ID entered at
 * /games/hammer-price/puzzles/:auctionResultId works as a puzzle whether or
 * not it is listed here. The order below determines the puzzle number.
 */

export const HAMMER_PRICE_MAX_GUESSES = 6

/**
 * The minimum grid width. Guesses are zero-padded on the left so the grid
 * reads as “00,000,000”; lots that realized more than $99,999,999 widen the
 * grid to fit their price.
 */
export const HAMMER_PRICE_DIGIT_COUNT = 8

/**
 * All guesses are made in USD. Auctions happen in many currencies, but a
 * single guessing currency keeps puzzles comparable and avoids asking
 * players to reason about unfamiliar denominations. The sale’s native
 * price is still shown once the game is over.
 */
export const HAMMER_PRICE_GUESS_CURRENCY = "USD"

/** Auction result internalIDs, in display order */
export const HAMMER_PRICE_PUZZLES: string[] = [
  "7318095",
  "7292702",
  "41823",
  "7167897",
  "4159662",
  "7123592",
  "277160",
  "391646",
  "5410641",
  "6556998",
  "503667",
  "587153",
  "392092",
  "2614035",
  "399715",
  "7231067",
  "67193",
  "6653694",
  "2821422",
  "287461",
  "508682",
]

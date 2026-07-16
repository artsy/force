/**
 * Configuration for all currently available Hammer Price puzzles.
 *
 * A puzzle is just an auction result ID plus the date it is the daily puzzle.
 * Everything else — the answer (realized price), artist, title, images —
 * is fetched from Metaphysics at runtime, which also means any auction
 * result ID entered at /games/hammer-price/puzzles/:auctionResultId works
 * as a puzzle whether or not it is listed here.
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

export interface HammerPricePuzzle {
  /** internalID of the auction result in Metaphysics; the full record lives at /auction-result/:auctionResultId */
  auctionResultId: string
  /** YYYY-MM-DD — the day this puzzle is the daily puzzle */
  date: string
  isActive: boolean
}

export const HAMMER_PRICE_PUZZLES: HammerPricePuzzle[] = [
  { auctionResultId: "41823", date: "2026-07-07", isActive: true },
  { auctionResultId: "4159662", date: "2026-07-08", isActive: true },
  { auctionResultId: "5410641", date: "2026-07-09", isActive: true },
  { auctionResultId: "503667", date: "2026-07-10", isActive: true },
  { auctionResultId: "587153", date: "2026-07-11", isActive: true },
  { auctionResultId: "2614035", date: "2026-07-12", isActive: true },
  { auctionResultId: "7231067", date: "2026-07-13", isActive: true },
  { auctionResultId: "7318095", date: "2026-07-14", isActive: true },
]

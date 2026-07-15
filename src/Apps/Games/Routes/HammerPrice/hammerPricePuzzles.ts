/**
 * Configuration for all currently available Hammer Price puzzles.
 *
 * Puzzles are defined here — never hardcoded inside components — so that this
 * source can later be swapped for a server-backed feed without touching the
 * game UI. The target price is intentionally *only* stored here: the game’s
 * GraphQL fragments never request `priceRealized`, `estimate`, or any other
 * field that would reveal the answer (see selectGameSafeLotFields).
 */

export const HAMMER_PRICE_MAX_GUESSES = 6

/**
 * Every puzzle is guessed and displayed at this fixed width, zero-padded on
 * the left, so the grid always reads as “00,000,000” regardless of the
 * answer’s magnitude. A price that does not fit is rejected at build time by
 * priceToDigits.
 */
export const HAMMER_PRICE_DIGIT_COUNT = 8

/**
 * All guesses are made in USD. Auctions happen in many currencies, but a
 * single guessing currency keeps every puzzle the same width and avoids
 * asking players to reason about unfamiliar denominations. The sale’s native
 * price is still shown once the game is over.
 */
export const HAMMER_PRICE_GUESS_CURRENCY = "USD"

export interface HammerPricePuzzleOverrides {
  artistName?: string
  title?: string
  dateText?: string
  mediumText?: string
  dimensionText?: string
  organization?: string
  saleTitle?: string
  saleDate?: string
  lotNumber?: string
  /** Replaces the auction result’s own image during play */
  imageUrl?: string
}

export interface HammerPricePuzzle {
  id: string
  slug: string
  /** internalID of the auction result in Metaphysics; the full record lives at /auction-result/:auctionResultId */
  auctionResultId: string
  /** YYYY-MM-DD — the day this puzzle is the daily puzzle */
  date: string
  /**
   * The answer: the realized price converted to USD, as an integer. This is
   * what the player guesses.
   */
  priceRealizedUSD: number
  /** The realized price in the sale’s native currency, as an integer (for the reveal) */
  priceRealized: number
  /** ISO 4217 code of the sale’s native currency (for the reveal) */
  currency: string
  isActive: boolean
  /** Display info for browsing and sharing, which render without a GraphQL query */
  artistName: string
  title: string
  /** Optional presentation overrides applied on top of the fetched auction record */
  overrides?: HammerPricePuzzleOverrides
  /** Optional attribution or source information shown with the record */
  attribution?: string
}

export const HAMMER_PRICE_PUZZLES: HammerPricePuzzle[] = [
  {
    id: "hp-2026-07-07",
    slug: "seth-price-vintage-bomber",
    auctionResultId: "41823",
    date: "2026-07-07",
    priceRealizedUSD: 785000,
    priceRealized: 785000,
    currency: "USD",
    isActive: true,
    artistName: "Seth Price",
    title: "Vintage Bomber",
    attribution: "Source: Artsy Price Database",
  },
  {
    id: "hp-2026-07-08",
    slug: "joseph-kosuth-five-words-in-yellow-neon",
    auctionResultId: "4159662",
    date: "2026-07-08",
    priceRealizedUSD: 337000,
    priceRealized: 337000,
    currency: "USD",
    isActive: true,
    artistName: "Joseph Kosuth",
    title: "Five Words In Yellow Neon",
    attribution: "Source: Artsy Price Database",
  },
  {
    id: "hp-2026-07-09",
    slug: "imi-knoebel-schief-und-schrag-3",
    auctionResultId: "5410641",
    date: "2026-07-09",
    priceRealizedUSD: 279563,
    priceRealized: 212500,
    currency: "GBP",
    isActive: true,
    artistName: "Imi Knoebel",
    title: "SCHIEF UND SCHRÄG 3",
    attribution: "Source: Artsy Price Database",
  },
  {
    id: "hp-2026-07-10",
    slug: "robert-morris-untitled-898",
    auctionResultId: "503667",
    date: "2026-07-10",
    priceRealizedUSD: 300000,
    priceRealized: 300000,
    currency: "USD",
    isActive: true,
    artistName: "Robert Morris",
    title: "Untitled",
    attribution: "Source: Artsy Price Database",
  },
  {
    id: "hp-2026-07-11",
    slug: "daniel-buren-peinture-aux-formes-indefinies",
    auctionResultId: "587153",
    date: "2026-07-11",
    priceRealizedUSD: 2175000,
    priceRealized: 2175000,
    currency: "USD",
    isActive: true,
    artistName: "Daniel Buren",
    title: "Peinture aux formes indéfinies",
    attribution: "Source: Artsy Price Database",
  },
  {
    id: "hp-2026-07-12",
    slug: "robert-smithson-alogon-number-3",
    auctionResultId: "2614035",
    date: "2026-07-12",
    priceRealizedUSD: 4297000,
    priceRealized: 4297000,
    currency: "USD",
    isActive: true,
    artistName: "Robert Smithson",
    title: "Alogon #3",
    attribution: "Source: Artsy Price Database",
  },
  {
    id: "hp-2026-07-13",
    slug: "roni-horn-untitled-the-yes-without-the-no",
    auctionResultId: "7231067",
    date: "2026-07-13",
    priceRealizedUSD: 1804500,
    priceRealized: 1804500,
    currency: "USD",
    isActive: true,
    artistName: "Roni Horn",
    title: "Untitled (“The yes without the no.”)",
    attribution: "Source: Artsy Price Database",
  },
  {
    id: "hp-2026-07-14",
    slug: "mark-rothko-no-15-two-greens-and-red-stripe",
    auctionResultId: "7318095",
    date: "2026-07-14",
    priceRealizedUSD: 98385000,
    priceRealized: 98385000,
    currency: "USD",
    isActive: true,
    artistName: "Mark Rothko",
    title: "No. 15 (Two Greens and Red Stripe)",
    attribution: "Source: Artsy Price Database",
  },
]

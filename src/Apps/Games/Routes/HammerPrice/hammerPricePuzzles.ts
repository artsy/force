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
   * The answer: the realized price as an integer in major units of
   * `currency`, e.g. 98385000 for US$98,385,000
   */
  priceRealized: number
  /** ISO 4217 code of the sale currency; guesses are made in this currency */
  currency: string
  /** Fixed guess width; leading zeroes are allowed and visible */
  digitCount: number
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
    priceRealized: 785000,
    currency: "USD",
    digitCount: 6,
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
    priceRealized: 337000,
    currency: "USD",
    digitCount: 6,
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
    priceRealized: 212500,
    currency: "GBP",
    digitCount: 6,
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
    priceRealized: 300000,
    currency: "USD",
    digitCount: 6,
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
    priceRealized: 2175000,
    currency: "USD",
    digitCount: 7,
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
    priceRealized: 4297000,
    currency: "USD",
    digitCount: 7,
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
    priceRealized: 1804500,
    currency: "USD",
    digitCount: 7,
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
    priceRealized: 98385000,
    currency: "USD",
    digitCount: 8,
    isActive: true,
    artistName: "Mark Rothko",
    title: "No. 15 (Two Greens and Red Stripe)",
    attribution: "Source: Artsy Price Database",
  },
]

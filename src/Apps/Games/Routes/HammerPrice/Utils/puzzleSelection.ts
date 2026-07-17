import { HAMMER_PRICE_PUZZLES } from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"

/** All puzzle auction result IDs, in display order */
export const getPuzzleIds = (
  puzzles: string[] = HAMMER_PRICE_PUZZLES,
): string[] => {
  return puzzles
}

/** The puzzle shown at /games/hammer-price, or null when none are configured */
export const getDefaultPuzzleId = (
  puzzles: string[] = HAMMER_PRICE_PUZZLES,
): string | null => {
  return puzzles[0] ?? null
}

export interface GetPuzzleNumberParams {
  auctionResultId: string
  puzzles?: string[]
}

/**
 * 1-based puzzle number in display order, used for titles and sharing. Null
 * for auction results that aren’t configured puzzles (ad-hoc play).
 */
export const getPuzzleNumber = ({
  auctionResultId,
  puzzles = HAMMER_PRICE_PUZZLES,
}: GetPuzzleNumberParams): number | null => {
  const index = puzzles.indexOf(auctionResultId)

  return index === -1 ? null : index + 1
}

import {
  HAMMER_PRICE_PUZZLES,
  type HammerPricePuzzle,
} from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"

/** Today’s date as YYYY-MM-DD in UTC; puzzles roll over at midnight UTC */
export const getTodayDateString = (): string => {
  return new Date().toISOString().slice(0, 10)
}

const byDateAscending = (
  a: HammerPricePuzzle,
  b: HammerPricePuzzle,
): number => {
  return a.date.localeCompare(b.date)
}

export const getActivePuzzles = (
  puzzles: HammerPricePuzzle[] = HAMMER_PRICE_PUZZLES,
): HammerPricePuzzle[] => {
  return puzzles.filter(puzzle => puzzle.isActive).sort(byDateAscending)
}

export interface GetDailyPuzzleParams {
  today: string
  puzzles?: HammerPricePuzzle[]
}

/**
 * The puzzle for `today`, or the most recent active puzzle when there is no
 * exact match (so the game keeps working between content updates).
 */
export const getDailyPuzzle = ({
  today,
  puzzles = HAMMER_PRICE_PUZZLES,
}: GetDailyPuzzleParams): HammerPricePuzzle | null => {
  const active = getActivePuzzles(puzzles)

  const exact = active.find(puzzle => puzzle.date === today)

  if (exact) {
    return exact
  }

  const past = active.filter(puzzle => puzzle.date <= today)

  return past[past.length - 1] ?? active[0] ?? null
}

export interface GetPuzzleBySlugParams {
  slug: string
  puzzles?: HammerPricePuzzle[]
}

export const getPuzzleBySlug = ({
  slug,
  puzzles = HAMMER_PRICE_PUZZLES,
}: GetPuzzleBySlugParams): HammerPricePuzzle | null => {
  return getActivePuzzles(puzzles).find(puzzle => puzzle.slug === slug) ?? null
}

export interface GetBrowsablePuzzlesParams {
  today: string
  puzzles?: HammerPricePuzzle[]
}

/**
 * Puzzles available for browsing: active and already published (future-dated
 * puzzles stay hidden), newest first.
 */
export const getBrowsablePuzzles = ({
  today,
  puzzles = HAMMER_PRICE_PUZZLES,
}: GetBrowsablePuzzlesParams): HammerPricePuzzle[] => {
  return getActivePuzzles(puzzles)
    .filter(puzzle => puzzle.date <= today)
    .reverse()
}

export interface GetPuzzleNumberParams {
  puzzle: HammerPricePuzzle
  puzzles?: HammerPricePuzzle[]
}

/** 1-based puzzle number in chronological order, used for titles and sharing */
export const getPuzzleNumber = ({
  puzzle,
  puzzles = HAMMER_PRICE_PUZZLES,
}: GetPuzzleNumberParams): number => {
  return getActivePuzzles(puzzles).findIndex(({ id }) => id === puzzle.id) + 1
}

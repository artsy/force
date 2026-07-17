import type { HammerPricePuzzle } from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"

export interface GameSafeLot {
  mediumText: string | null | undefined
  dimensionText: string | null | undefined
  formattedSaleDate: string | null | undefined
  organization: string | null | undefined
  location: string | null | undefined
  saleTitle: string | null | undefined
  lotNumber: string | null | undefined
}

export interface GameSafeLotField {
  label: string
  value: string | null
}

export interface SelectGameSafeLotFieldsParams {
  lot: GameSafeLot
  puzzle: HammerPricePuzzle
}

const presentable = (value: string | null | undefined): string | null => {
  const normalized = value?.replace(/\s+/g, " ").trim()

  return normalized || null
}

/**
 * The single decision point for which auction-record fields are shown while
 * a Hammer Price game is in progress.
 *
 * Relative to the full auction-result page, the following are deliberately
 * excluded because they reveal — or trivially bracket — the answer:
 *
 * - `priceRealized` (the answer itself)
 * - `estimate` (usually brackets the realized price)
 * - `performance` (derived from the realized price)
 * - `boughtIn` / `isUpcoming` sale-outcome state
 * - `comparableAuctionResults` (each row displays realized prices)
 *
 * These fields are not merely hidden: the game’s GraphQL fragments never
 * request them, so the answer is not present in the page payload either.
 * Puzzle `overrides` from the configuration take precedence over the
 * fetched record.
 */
export const selectGameSafeLotFields = ({
  lot,
  puzzle,
}: SelectGameSafeLotFieldsParams): GameSafeLotField[] => {
  const overrides = puzzle.overrides ?? {}

  return [
    {
      label: "Medium",
      value: presentable(overrides.mediumText ?? lot.mediumText),
    },
    {
      label: "Dimensions",
      value: presentable(overrides.dimensionText ?? lot.dimensionText),
    },
    {
      label: "Auction house",
      value: presentable(overrides.organization ?? lot.organization),
    },
    {
      label: "Sale name",
      value: presentable(overrides.saleTitle ?? lot.saleTitle),
    },
    { label: "Sale location", value: presentable(lot.location) },
    {
      label: "Sale date",
      value: presentable(overrides.saleDate ?? lot.formattedSaleDate),
    },
    { label: "Lot", value: presentable(overrides.lotNumber ?? lot.lotNumber) },
    { label: "Currency", value: puzzle.currency },
  ]
}

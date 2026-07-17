import type { HammerPriceLotDetails_auctionResult$data } from "__generated__/HammerPriceLotDetails_auctionResult.graphql"

export interface GameSafeLotField {
  label: string
  value: string | null
}

export interface SelectGameSafeLotFieldsParams {
  lot: HammerPriceLotDetails_auctionResult$data
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
 * Note: the lot details never *render* price data, but the page payload does
 * carry `priceRealized` for scoring and the end-of-game reveal (see
 * useHammerPriceGame / HammerPriceResultModal) — a determined player can
 * always read the answer from the network tab.
 */
export const selectGameSafeLotFields = ({
  lot,
}: SelectGameSafeLotFieldsParams): GameSafeLotField[] => {
  return [
    { label: "Medium", value: presentable(lot.mediumText) },
    { label: "Dimensions", value: presentable(lot.dimensionText) },
    { label: "Auction house", value: presentable(lot.organization) },
    { label: "Sale name", value: presentable(lot.saleTitle) },
    { label: "Sale location", value: presentable(lot.location) },
    { label: "Sale date", value: presentable(lot.formattedSaleDate) },
    { label: "Lot", value: presentable(lot.lotNumber) },
    { label: "Currency", value: presentable(lot.currency) },
  ]
}

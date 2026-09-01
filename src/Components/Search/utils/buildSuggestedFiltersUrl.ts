import { paramsToSnakeCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import qs from "qs"
import type { ParsedFilterQuery } from "./parseFilterQuery"

/**
 * Builds the term page URL for a parsed query, where the filters show up as
 * pills a wrong parse can be corrected in.
 *
 * The medium goes out as `additionalGeneIDs`, not `medium`: it's what the
 * page's Medium filter reads, so the pill shows as applied.
 */
export const buildSuggestedFiltersUrl = (parsed: ParsedFilterQuery): string => {
  const { medium, priceRange, attributionClass } = parsed.filters

  const params = {
    // Free text only: the term doubles as the artworks keyword, and searching
    // the filter words too returns nothing ("warhol prints under 5000" -> 0,
    // "warhol" plus the same filters -> ~1,500). With no free text the leading
    // label stands in, keeping the heading readable. A row always carries one
    // or the other, so there is deliberately no raw-query fallback here.
    term: parsed.keyword || parsed.labels[0],
    additionalGeneIDs: medium ? [medium] : undefined,
    attributionClass,
    priceRange,
  }

  // Default `arrayFormat`, matching the filter panel's own `buildUrl`
  const queryString = qs.stringify(paramsToSnakeCase(params), {
    skipNulls: true,
  })

  return `/search?${queryString}`
}

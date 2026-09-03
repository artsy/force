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
  const { medium, priceRange, attributionClass, artistNationalities } =
    parsed.filters

  // Every nationality label is the first of the values it stands for, so this
  // leaves the labels the term can safely repeat
  const nationalityLabels = new Set(artistNationalities ?? [])
  const standInLabel = parsed.labels.find(label => {
    return !nationalityLabels.has(label)
  })

  const params = {
    // Free text only: the term doubles as the artworks keyword, and searching
    // the filter words too returns nothing ("warhol prints under 5000" -> 0,
    // "warhol" plus the same filters -> ~1,500). With no free text a label
    // stands in, keeping the heading readable — never the nationality, whose
    // keyword costs far more than it names ("chinese photography" -> 63,
    // the same filters alone -> ~3,800). A row always carries a keyword or a
    // non-nationality filter, so there is deliberately no raw-query fallback.
    term: parsed.keyword || standInLabel || parsed.labels[0],
    additionalGeneIDs: medium ? [medium] : undefined,
    attributionClass,
    artistNationalities,
    priceRange,
  }

  // Default `arrayFormat`, matching the filter panel's own `buildUrl`
  const queryString = qs.stringify(paramsToSnakeCase(params), {
    skipNulls: true,
  })

  return `/search?${queryString}`
}

import type { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import type { ArtworkFilterSuggestion } from "./fetchArtworkFilterSuggestions"
import { compact } from "lodash"

// Maps a Metaphysics suggestion into ArtworkFilterContext keys. Only defined
// values are included, so applying it never clobbers unrelated filters.
// Note the two name differences vs the GraphQL shape: geneIDs -> additionalGeneIDs
// and inquireable -> inquireableOnly.
export const mapFilterSuggestion = (
  suggestion: ArtworkFilterSuggestion,
): Partial<ArtworkFilters> => {
  const mapped: Partial<ArtworkFilters> = {}

  if (suggestion.keyword) mapped.keyword = suggestion.keyword

  const filters = suggestion.filters
  if (!filters) return mapped

  const geneIDs = compact(filters.geneIDs)
  if (geneIDs.length) mapped.additionalGeneIDs = geneIDs

  const sizes = compact(filters.sizes)
  if (sizes.length) mapped.sizes = sizes

  const colors = compact(filters.colors)
  if (colors.length) mapped.colors = colors

  const attributionClass = compact(filters.attributionClass)
  if (attributionClass.length) mapped.attributionClass = attributionClass

  const artistNationalities = compact(filters.artistNationalities)
  if (artistNationalities.length)
    mapped.artistNationalities = artistNationalities

  const majorPeriods = compact(filters.majorPeriods)
  if (majorPeriods.length) mapped.majorPeriods = majorPeriods

  if (filters.priceRange) mapped.priceRange = filters.priceRange

  if (filters.framed) mapped.framed = true
  if (filters.signed) mapped.signed = true
  if (filters.forSale) mapped.forSale = true
  if (filters.acquireable) mapped.acquireable = true
  if (filters.offerable) mapped.offerable = true
  if (filters.atAuction) mapped.atAuction = true
  if (filters.inquireable) mapped.inquireableOnly = true

  return mapped
}

import type { ParsedFilterQuery } from "./parseFilterQuery"

/**
 * Whether a plain Enter should follow the parse instead of searching the raw
 * term.
 *
 * A single medium or rarity beside free text is the shape entity names take —
 * "paris photo", "the drawing center", "unique forms of continuity in space" —
 * and the raw term already serves those well ("warhol prints" -> ~8,200,
 * "paris photo" -> ~18,700). A price, a second filter, or a query that is
 * nothing but filter words doesn't read as a name, and there the raw term
 * returns nothing at all ("donald judd under 5000" -> 0).
 *
 * The row stays in the dropdown either way, so a narrower parse is still one
 * click away.
 */
export const shouldSubmitToFilters = (parsed: ParsedFilterQuery): boolean => {
  if (!parsed.keyword) return true
  if (parsed.filters.priceRange) return true

  return parsed.labels.length >= 2
}

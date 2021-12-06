import { themeProps } from "@artsy/palette"
import { __internal__useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"

export const getFilterLabelWithCounts = (
  filterFacetName: string,
  filterCounts: number = 0
) => {
  const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.xs)
  const counts = isMobile && filterCounts ? ` • ${filterCounts}` : ""

  return `${filterFacetName}${counts}`
}

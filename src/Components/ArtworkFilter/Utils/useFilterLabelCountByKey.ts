import { THEME } from "@artsy/palette"
import {
  type SelectedFiltersCountsLabels,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

export const useFilterLabelCountByKey = (key: SelectedFiltersCountsLabels) => {
  const { selectedFiltersCounts } = useArtworkFilterContext()
  const count = selectedFiltersCounts[key]
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  return isMobile && count ? ` • ${count}` : ""
}

import { THEME } from "@artsy/palette"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"

export const useFilterLabelCountByKey = (key: SelectedFiltersCountsLabels) => {
  const { selectedFiltersCounts } = useArtworkFilterContext()
  const count = selectedFiltersCounts[key]
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  return isMobile && count ? ` • ${count}` : ""
}

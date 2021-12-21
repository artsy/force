import { themeProps } from "@artsy/palette"
import { __internal__useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"

export const useFilterLabelCountByKey = (key: SelectedFiltersCountsLabels) => {
  const { selectedFiltersCounts } = useArtworkFilterContext()
  const count = selectedFiltersCounts[key]
  const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.xs)

  return isMobile && count ? ` • ${count}` : ""
}

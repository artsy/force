import { FC } from "react"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { DropdownProps } from "@artsy/palette"
import { FilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"

export interface ArtistSeriesFilterQuickProps
  extends Omit<DropdownProps, "dropdown" | "children"> {}

export const ArtistSeriesFilterQuick: FC<ArtistSeriesFilterQuickProps> = props => {
  const { aggregations } = useArtworkFilterContext()
  const aggregation = aggregations?.find(agg => agg.slice === "ARTIST_SERIES")
  const artistSeries = aggregation?.counts || []
  const isDisplayable = artistSeries.length > 0

  if (!isDisplayable) return null

  return (
    <FilterQuick
      label="Artist Series"
      name="artistSeriesIDs"
      slice="ARTIST_SERIES"
      options={[]}
      {...props}
    />
  )
}

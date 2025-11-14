import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { FilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"
import type { DropdownProps } from "@artsy/palette"
import type { FC } from "react"

export interface ArtistSeriesFilterQuickProps
  extends Omit<DropdownProps, "dropdown" | "children"> {}

export const ArtistSeriesFilterQuick: FC<
  React.PropsWithChildren<ArtistSeriesFilterQuickProps>
> = props => {
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

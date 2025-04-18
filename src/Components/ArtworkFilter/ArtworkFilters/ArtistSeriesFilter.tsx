import { SelectedFiltersCountsLabels } from "Components/ArtworkFilter/ArtworkFilterContext"
import type * as React from "react"
import { ResultsFilter } from "./ResultsFilter"

export interface ArtistSeriesFilterProps {
  expanded?: boolean
  label?: string
}

export const ArtistSeriesFilter: React.FC<
  React.PropsWithChildren<ArtistSeriesFilterProps>
> = ({ expanded, label = "Artist Series" }) => {
  return (
    <>
      <ResultsFilter
        expanded={expanded}
        facetName="artistSeriesIDs"
        filtersCountKey={SelectedFiltersCountsLabels.artistSeriesIDs}
        label={label}
        placeholder="Enter an artist series"
        slice="ARTIST_SERIES"
      />
    </>
  )
}

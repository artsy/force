import React from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { getFilterLabelWithCounts } from "../Utils/getFilterLabelWithCounts"
import { ResultsFilter } from "./ResultsFilter"

export interface ArtistNationalityFilterProps {
  expanded?: boolean
}

export const ArtistNationalityFilter: React.FC<ArtistNationalityFilterProps> = ({
  expanded,
}) => {
  const { selectedFiltersCounts } = useArtworkFilterContext()
  const label = getFilterLabelWithCounts(
    "Artist Nationality or Ethnicity",
    selectedFiltersCounts.artistNationalities
  )

  return (
    <ResultsFilter
      facetName="artistNationalities"
      slice="ARTIST_NATIONALITY"
      label={label}
      placeholder="Enter a nationality or ethnicity"
      expanded={expanded}
    />
  )
}

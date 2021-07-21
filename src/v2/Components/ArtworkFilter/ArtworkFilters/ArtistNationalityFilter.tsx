import React from "react"
import { ResultsFilter } from "./ResultsFilter"

export interface ArtistNationalityFilterProps {
  expanded?: boolean
}

export const ArtistNationalityFilter: React.FC<ArtistNationalityFilterProps> = ({
  expanded,
}) => {
  return (
    <ResultsFilter
      facetName="artistNationalities"
      slice="ARTIST_NATIONALITY"
      label="Artist Nationality or Ethnicity"
      placeholder="Enter a nationality or ethnicity"
      expanded={expanded}
    />
  )
}

import React from "react"
import { ResultsFilter } from "./ResultsFilter"

export const ArtistNationalityFilter: React.FC = () => {
  return (
    <ResultsFilter
      facetName="artistNationalities"
      slice="ARTIST_NATIONALITY"
      label="Artist nationality or ethnicity"
      placeholder="Enter a nationality"
      expanded
    />
  )
}

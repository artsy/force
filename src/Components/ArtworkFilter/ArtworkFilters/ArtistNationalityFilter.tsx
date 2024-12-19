import { SelectedFiltersCountsLabels } from "Components/ArtworkFilter/ArtworkFilterContext"
import type React from "react"
import { ResultsFilter } from "./ResultsFilter"

export interface ArtistNationalityFilterProps {
  expanded?: boolean
}

export const ArtistNationalityFilter: React.FC<
  React.PropsWithChildren<ArtistNationalityFilterProps>
> = ({ expanded }) => {
  return (
    <ResultsFilter
      expanded={expanded}
      facetName="artistNationalities"
      filtersCountKey={SelectedFiltersCountsLabels.artistNationalities}
      label="Artist Nationality or Ethnicity"
      placeholder="Enter a nationality or ethnicity"
      slice="ARTIST_NATIONALITY"
    />
  )
}

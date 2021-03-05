import { Checkbox, Flex, Toggle } from "@artsy/palette"
import { sortBy } from "lodash"
import React, { FC } from "react"

import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"
import { ShowMore } from "./ShowMore"
import { FacetAutosuggest } from "./FacetAutosuggest"

const ArtistNationalityOption: React.FC<{ name: string }> = ({ name }) => {
  const { currentlySelectedFilters, setFilter } = useArtworkFilterContext()

  const toggleNationalitySelection = (selected, slug) => {
    let nationalities = currentlySelectedFilters().artistNationalities.slice()
    if (selected) {
      nationalities.push(slug)
    } else {
      nationalities = nationalities.filter(item => item !== slug)
    }
    setFilter("artistNationalities", nationalities)
  }
  const selected = currentlySelectedFilters().artistNationalities.includes(name)
  const props = {
    onSelect: selected => {
      toggleNationalitySelection(selected, name)
    },
    selected,
    key: name,
  }

  return (
    <Checkbox {...props}>
      <OptionText>{name}</OptionText>
    </Checkbox>
  )
}

export const ArtistNationalityFilter: FC = () => {
  const { aggregations } = useArtworkFilterContext()
  const nationalities = aggregations.find(
    agg => agg.slice === "ARTIST_NATIONALITY"
  )

  if (!(nationalities && nationalities.counts)) {
    return null
  }

  const nationalitiesSorted = sortBy(nationalities.counts, ["count"]).reverse()

  return (
    <Toggle label="Artist nationality or ethnicity" expanded>
      <Flex flexDirection="column">
        <FacetAutosuggest
          facetName="artistNationalities"
          placeholder="Enter a nationality"
          facets={nationalities.counts}
        />
        <ShowMore>
          {nationalitiesSorted.map(({ name }) => {
            return <ArtistNationalityOption key={name} name={name} />
          })}
        </ShowMore>
      </Flex>
    </Toggle>
  )
}

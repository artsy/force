import { Checkbox, Flex, Toggle } from "@artsy/palette"
import { sortBy } from "lodash"
import React, { FC } from "react"

import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { FacetAutosuggest } from "./FacetAutosuggest"
import { OptionText } from "./OptionText"
import { ShowMore } from "./ShowMore"

const ArtworkLocationOption: React.FC<{ name: string }> = ({ name }) => {
  const { currentlySelectedFilters, setFilter } = useArtworkFilterContext()

  const toggleLocationSelection = (selected, slug) => {
    let locations = currentlySelectedFilters().locationCities.slice()
    if (selected) {
      locations.push(slug)
    } else {
      locations = locations.filter(item => item !== slug)
    }
    setFilter("locationCities", locations)
  }
  const selected = currentlySelectedFilters().locationCities.includes(name)
  const props = {
    onSelect: selected => {
      toggleLocationSelection(selected, name)
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

export const ArtworkLocationFilter: FC = () => {
  const { aggregations } = useArtworkFilterContext()
  const locations = aggregations.find(agg => agg.slice === "LOCATION_CITY")

  if (!(locations && locations.counts)) {
    return null
  }

  const locationsSorted = sortBy(locations.counts, ["count"]).reverse()

  return (
    <Toggle label="Artwork location" expanded>
      <Flex flexDirection="column">
        <FacetAutosuggest
          facetName="locationCities"
          placeholder="Enter a location"
          facets={locations.counts}
        />
        <ShowMore>
          {locationsSorted.map(({ name }) => {
            return <ArtworkLocationOption key={name} name={name} />
          })}
        </ShowMore>
      </Flex>
    </Toggle>
  )
}

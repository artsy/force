import { Checkbox, Flex, Text, Toggle } from "@artsy/palette"
import { sortBy } from "lodash"
import React, { FC, useState } from "react"
import styled from "styled-components"

import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

const ToggleLink = styled(Text)`
  cursor: pointer;
  text-decoration: underline;
`

const INITIAL_ITEMS_TO_SHOW = 6

export const ArtworkLocationFilter: FC = () => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  const locations = aggregations.find(agg => agg.slice === "LOCATION_CITY")

  const [expanded, setExpanded] = useState(
    filterContext.currentlySelectedFilters().locationCities.length > 0
  )

  if (!(locations && locations.counts)) {
    return null
  }

  const locationsSorted = sortBy(locations.counts, ["count"]).reverse()
  const initialLocations = locationsSorted.slice(0, INITIAL_ITEMS_TO_SHOW)
  const remainingLocations =
    locationsSorted.length > INITIAL_ITEMS_TO_SHOW
      ? locationsSorted.slice(INITIAL_ITEMS_TO_SHOW - locationsSorted.length)
      : []

  const toggle = () => setExpanded(!expanded)

  const toggleLocationSelection = (selected, slug) => {
    let locations = filterContext
      .currentlySelectedFilters()
      .locationCities.slice()
    if (selected) {
      locations.push(slug)
    } else {
      locations = locations.filter(item => item !== slug)
    }
    filterContext.setFilter("locationCities", locations)
  }

  const ExpandControl = () => (
    <ToggleLink mt={1} onClick={toggle}>
      Show {remainingLocations.length} more
    </ToggleLink>
  )

  const HideControl = () => (
    <ToggleLink mt={1} onClick={toggle}>
      Hide list
    </ToggleLink>
  )

  const renderLocations = locations => {
    return locations.map(({ value: slug, name }, index) => {
      const selected = filterContext
        .currentlySelectedFilters()
        .locationCities.includes(slug)
      const props = {
        key: index,
        onSelect: selected => {
          toggleLocationSelection(selected, slug)
        },
        selected,
      }

      return (
        <Checkbox {...props}>
          <OptionText>{name}</OptionText>
        </Checkbox>
      )
    })
  }

  return (
    <Toggle label="Artwork location" expanded>
      <Flex flexDirection="column">
        {renderLocations(initialLocations)}

        {!expanded && remainingLocations.length && <ExpandControl />}

        {expanded && (
          <>
            {renderLocations(remainingLocations)}
            <HideControl />
          </>
        )}
      </Flex>
    </Toggle>
  )
}

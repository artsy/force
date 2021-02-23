import { Checkbox, Flex, Toggle } from "@artsy/palette"
import { sortBy } from "lodash"
import React, { FC } from "react"

import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"
import { PartnerAutosuggest } from "./PartnerAutosuggest"
import { ShowMore } from "./ShowMore"

const INITIAL_PARTNERS_TO_SHOW = 6

const PartnerOption: React.FC<{ name: string }> = ({ name }) => {
  const { currentlySelectedFilters, setFilter } = useArtworkFilterContext()

  const toggleLocationSelection = (selected, slug) => {
    let locations = currentlySelectedFilters().locationCities.slice()
    if (selected) {
      locations.push(slug)
    } else {
      locations = locations.filter(item => item !== slug)
    }
    setFilter("partnerIDs", locations)
  }
  const selected = currentlySelectedFilters().partnerIDs.includes(name)
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

export const PartnersFilter: FC = () => {
  const { aggregations } = useArtworkFilterContext()
  const partners = aggregations.find(agg => agg.slice === "PARTNER")

  if (!(partners && partners.counts)) {
    return null
  }

  const partnersSorted = sortBy(partners.counts, ["count"]).reverse()

  return (
    <Toggle label="Galleries and institutions" expanded>
      <Flex flexDirection="column">
        <PartnerAutosuggest partners={partners.counts} />
        <ShowMore initial={INITIAL_PARTNERS_TO_SHOW}>
          {partnersSorted.map(({ name }) => {
            return <PartnerOption key={name} name={name} />
          })}
        </ShowMore>
      </Flex>
    </Toggle>
  )
}

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

const INITIAL_PARTNERS_TO_SHOW = 6

export const PartnersFilter: FC = () => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  const partners = aggregations.find(agg => agg.slice === "PARTNER")

  const [expanded, setExpanded] = useState(
    filterContext.currentlySelectedFilters().partnerIDs.length > 0
  )

  if (!(partners && partners.counts)) {
    return null
  }

  const partnersSorted = sortBy(partners.counts, ["count"])
  const initialPartnersGroup = partnersSorted.slice(0, INITIAL_PARTNERS_TO_SHOW)
  const remainingPartnersGroup =
    partnersSorted.length > INITIAL_PARTNERS_TO_SHOW
      ? partnersSorted.slice(INITIAL_PARTNERS_TO_SHOW - partnersSorted.length)
      : []

  const toggle = () => setExpanded(!expanded)

  const togglePartnerSelection = (selected, slug) => {
    let partnerIDs = filterContext.currentlySelectedFilters().partnerIDs.slice()
    if (selected) {
      partnerIDs.push(slug)
    } else {
      partnerIDs = partnerIDs.filter(item => item !== slug)
    }
    filterContext.setFilter("partnerIDs", partnerIDs)
  }

  const ExpandControl = () => (
    <ToggleLink mt={1} onClick={toggle}>
      Show {remainingPartnersGroup.length} more
    </ToggleLink>
  )

  const HideControl = () => (
    <ToggleLink mt={1} onClick={toggle}>
      Hide list
    </ToggleLink>
  )

  const renderPartnerGroup = artistGroup => {
    return artistGroup.map(({ value: slug, name }, index) => {
      const selected = filterContext
        .currentlySelectedFilters()
        .partnerIDs.includes(slug)
      const props = {
        key: index,
        onSelect: selected => {
          togglePartnerSelection(selected, slug)
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
    <Toggle label="Galleries and institutions" expanded>
      <Flex flexDirection="column">
        {renderPartnerGroup(initialPartnersGroup)}

        {!expanded && remainingPartnersGroup.length && <ExpandControl />}

        {expanded && (
          <>
            {renderPartnerGroup(remainingPartnersGroup)}
            <HideControl />
          </>
        )}
      </Flex>
    </Toggle>
  )
}

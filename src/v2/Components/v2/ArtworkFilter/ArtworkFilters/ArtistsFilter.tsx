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

export const ArtistsFilter: FC = () => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  const [expanded, setExpanded] = useState(false)

  const artists = aggregations.find(agg => agg.slice === "ARTIST")

  if (!(artists && artists.counts)) {
    return null
  }

  const artistsSorted = sortBy(artists.counts, ["name"])
  const initialArtistsGroup = artistsSorted.slice(0, 6)
  const remainingArtistsGroup =
    artistsSorted.length > 6
      ? artistsSorted.slice(6 - artistsSorted.length)
      : []

  const toggle = () => setExpanded(!expanded)

  const followedArtistCheckboxProps = {
    onSelect: value =>
      filterContext.setFilter("includeArtworksByFollowedArtists", value),
    selected: Boolean(
      filterContext.currentlySelectedFilters()[
        "includeArtworksByFollowedArtists"
      ]
    ),
  }

  const followedArtistArtworkCount = filterContext?.counts?.followedArtists ?? 0

  const toggleSelection = (selected, name) => {
    let artistIDs = filterContext.currentlySelectedFilters().artistIDs.slice()
    if (selected) {
      artistIDs.push(name)
    } else {
      artistIDs = artistIDs.filter(item => item !== name)
    }
    filterContext.setFilter("artistIDs", artistIDs)
  }

  const ExpandControl = () => (
    <ToggleLink mt={1} onClick={toggle}>
      Show {remainingArtistsGroup.length} more
    </ToggleLink>
  )

  const HideControl = () => (
    <ToggleLink mt={1} onClick={toggle}>
      Hide list
    </ToggleLink>
  )

  const renderArtistGroup = artistGroup => {
    return artistGroup.map(({ value: slug, name }, index) => {
      const selected = filterContext
        .currentlySelectedFilters()
        .artistIDs.includes(slug)
      const props = {
        key: index,
        onSelect: selected => {
          toggleSelection(selected, slug)
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
    <Toggle label="Artists" expanded>
      <Flex flexDirection="column">
        <Checkbox
          disabled={!followedArtistArtworkCount}
          {...followedArtistCheckboxProps}
        >
          <OptionText>
            Artists I Follow ({followedArtistArtworkCount})
          </OptionText>
        </Checkbox>

        {renderArtistGroup(initialArtistsGroup)}

        {!expanded && remainingArtistsGroup.length && <ExpandControl />}

        {expanded && renderArtistGroup(remainingArtistsGroup)}

        {expanded && <HideControl />}
      </Flex>
    </Toggle>
  )
}

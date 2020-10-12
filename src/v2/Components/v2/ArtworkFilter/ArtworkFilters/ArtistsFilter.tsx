import { Checkbox, Flex, Text, Toggle } from "@artsy/palette"
import { sortBy } from "lodash"
import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"

import { useArtworkFilterContext } from "../ArtworkFilterContext"
import {
  FollowedArtistList,
  fetchFollowedArtists,
} from "../Utils/fetchFollowedArtists"
import { OptionText } from "./OptionText"

const ToggleLink = styled(Text)`
  cursor: pointer;
  text-decoration: underline;
`

const INITIAL_ARTISTS_TO_SHOW = 6

interface ArtistsFilterProps {
  relayEnvironment?: any
  fairID?: string
  user?: User
}

export const ArtistsFilter: FC<ArtistsFilterProps> = ({
  fairID,
  relayEnvironment,
  user,
}) => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  const artists = aggregations.find(agg => agg.slice === "ARTIST")

  const [expanded, setExpanded] = useState(
    filterContext.currentlySelectedFilters().artistIDs.length > 0
  )
  const [followedArtists, setFollowedArtists] = useState<FollowedArtistList>([])
  const followedArtistSlugs = followedArtists.map(({ slug }) => slug)

  useEffect(() => {
    if (relayEnvironment && user) {
      fetchFollowedArtists({ relayEnvironment, fairID }).then(data => {
        setFollowedArtists(data)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!(artists && artists.counts)) {
    return null
  }

  const artistsSorted = sortBy(artists.counts, ["name"])
  const initialArtistsGroup = artistsSorted.slice(0, INITIAL_ARTISTS_TO_SHOW)
  const remainingArtistsGroup =
    artistsSorted.length > INITIAL_ARTISTS_TO_SHOW
      ? artistsSorted.slice(INITIAL_ARTISTS_TO_SHOW - artistsSorted.length)
      : []

  const toggle = () => setExpanded(!expanded)

  const isFollowedArtistCheckboxSelected =
    !!user &&
    filterContext.currentlySelectedFilters()["includeArtworksByFollowedArtists"]
  const followedArtistCheckboxProps = {
    onSelect: value =>
      filterContext.setFilter("includeArtworksByFollowedArtists", value),
    selected: isFollowedArtistCheckboxSelected,
  }
  const followedArtistArtworkCount = filterContext?.counts?.followedArtists ?? 0

  const toggleArtistSelection = (selected, slug) => {
    let artistIDs = filterContext.currentlySelectedFilters().artistIDs.slice()
    if (selected) {
      artistIDs.push(slug)
    } else {
      // When an artist is de-selected, if it is a followed artist _and_ that filter
      // is also checked, we want to de-select it as well, and move remaining followed
      // artists to the explicit `artistIDs` list.
      artistIDs = artistIDs.filter(item => item !== slug)
      if (followedArtistSlugs.includes(slug)) {
        filterContext.setFilter("includeArtworksByFollowedArtists", false)
        artistIDs = artistIDs.concat(followedArtistSlugs)
        artistIDs = artistIDs.filter(item => item !== slug)
      }
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
      const isFollowedArtist = followedArtistSlugs.includes(slug)
      const selected =
        filterContext.currentlySelectedFilters().artistIDs.includes(slug) ||
        (isFollowedArtistCheckboxSelected && isFollowedArtist)
      const props = {
        key: index,
        onSelect: selected => {
          toggleArtistSelection(selected, slug)
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
            Artists I follow ({followedArtistArtworkCount})
          </OptionText>
        </Checkbox>

        {renderArtistGroup(initialArtistsGroup)}

        {!expanded && remainingArtistsGroup.length && <ExpandControl />}

        {expanded && (
          <>
            {renderArtistGroup(remainingArtistsGroup)}
            <HideControl />
          </>
        )}
      </Flex>
    </Toggle>
  )
}

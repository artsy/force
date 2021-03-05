import { Checkbox, Flex, Toggle } from "@artsy/palette"
import { sortBy } from "lodash"
import React, { FC, useEffect, useState } from "react"

import { useArtworkFilterContext } from "../ArtworkFilterContext"
import {
  FollowedArtistList,
  fetchFollowedArtists,
} from "../Utils/fetchFollowedArtists"
import { OptionText } from "./OptionText"
import { ShowMore } from "./ShowMore"

interface ArtistsFilterProps {
  relayEnvironment?: any
  fairID?: string
  user?: User
}

const ArtistItem: React.FC<{
  slug: string
  name: string
  followedArtistSlugs: string[]
  isFollowedArtistCheckboxSelected: boolean
}> = ({
  slug,
  name,
  followedArtistSlugs,
  isFollowedArtistCheckboxSelected,
}) => {
  const { currentlySelectedFilters, setFilter } = useArtworkFilterContext()
  const toggleArtistSelection = (selected, slug) => {
    let artistIDs = currentlySelectedFilters().artistIDs.slice()
    if (selected) {
      artistIDs.push(slug)
    } else {
      // When an artist is de-selected, if it is a followed artist _and_ that filter
      // is also checked, we want to de-select it as well, and move remaining followed
      // artists to the explicit `artistIDs` list.
      artistIDs = artistIDs.filter(item => item !== slug)
      if (followedArtistSlugs.includes(slug)) {
        setFilter("includeArtworksByFollowedArtists", false)
        artistIDs = artistIDs.concat(followedArtistSlugs)
        artistIDs = artistIDs.filter(item => item !== slug)
      }
    }
    setFilter("artistIDs", artistIDs)
  }

  const isFollowedArtist = followedArtistSlugs.includes(slug)
  const selected =
    currentlySelectedFilters().artistIDs.includes(slug) ||
    (isFollowedArtistCheckboxSelected && isFollowedArtist)
  const props = {
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
}

export const ArtistsFilter: FC<ArtistsFilterProps> = ({
  fairID,
  relayEnvironment,
  user,
}) => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  const artists = aggregations.find(agg => agg.slice === "ARTIST")

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

  const isFollowedArtistCheckboxSelected =
    !!user &&
    filterContext.currentlySelectedFilters()["includeArtworksByFollowedArtists"]
  const followedArtistCheckboxProps = {
    onSelect: value =>
      filterContext.setFilter("includeArtworksByFollowedArtists", value),
    selected: isFollowedArtistCheckboxSelected,
  }
  const followedArtistArtworkCount = filterContext?.counts?.followedArtists ?? 0

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

        <ShowMore>
          {artistsSorted.map(({ value: slug, name }, index) => {
            return (
              <ArtistItem
                key={index}
                slug={slug}
                name={name}
                followedArtistSlugs={followedArtistSlugs}
                isFollowedArtistCheckboxSelected={
                  isFollowedArtistCheckboxSelected
                }
              />
            )
          })}
        </ShowMore>
      </Flex>
    </Toggle>
  )
}

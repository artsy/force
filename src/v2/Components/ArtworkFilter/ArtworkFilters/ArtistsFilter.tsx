import { FC, useEffect, useState } from "react"
import * as React from "react"
import { sortBy } from "lodash"
import { Checkbox, CheckboxProps, Flex, useThemeConfig } from "@artsy/palette"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "../ArtworkFilterContext"
import {
  FollowedArtistList,
  fetchFollowedArtists,
} from "../Utils/fetchFollowedArtists"
import { FilterExpandable } from "./FilterExpandable"
import { ShowMore } from "./ShowMore"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"
import { useSystemContext } from "v2/System"

export interface ArtistsFilterProps {
  expanded?: boolean
  relayEnvironment?: any
  fairID?: string
  user?: User
}

const ArtistItem: React.FC<
  {
    slug: string
    name: string
    followedArtistSlugs: string[]
    isFollowedArtistCheckboxSelected: boolean
  } & CheckboxProps
> = ({
  slug,
  name,
  followedArtistSlugs,
  isFollowedArtistCheckboxSelected,
  ...checkboxProps
}) => {
  const { setFilter } = useArtworkFilterContext()
  const { artistIDs = [] } = useCurrentlySelectedFilters()

  const toggleArtistSelection = (selected, slug) => {
    let updatedValues = artistIDs

    if (selected) {
      updatedValues = [...updatedValues, slug]
    } else {
      // When an artist is de-selected, if it is a followed artist _and_ that filter
      // is also checked, we want to de-select it as well, and move remaining followed
      // artists to the explicit `artistIDs` list.
      if (followedArtistSlugs.includes(slug)) {
        setFilter("includeArtworksByFollowedArtists", false)
        updatedValues = [...updatedValues, ...followedArtistSlugs]
      }

      updatedValues = updatedValues.filter(item => item !== slug)
    }
    setFilter("artistIDs", updatedValues)
  }

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })

  const isFollowedArtist = followedArtistSlugs.includes(slug)

  return (
    <Checkbox
      {...checkboxProps}
      selected={
        artistIDs.includes(slug) ||
        (isFollowedArtistCheckboxSelected && isFollowedArtist)
      }
      onSelect={selected => {
        return toggleArtistSelection(selected, slug)
      }}
      my={tokens.my}
    >
      {name}
    </Checkbox>
  )
}

export const ArtistsFilter: FC<ArtistsFilterProps> = ({ expanded, fairID }) => {
  const { relayEnvironment, user } = useSystemContext()
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  const artists = aggregations?.find(agg => agg.slice === "ARTIST")
  const {
    artistIDs = [],
    includeArtworksByFollowedArtists,
  } = useCurrentlySelectedFilters()

  const [followedArtists, setFollowedArtists] = useState<FollowedArtistList>([])
  const followedArtistSlugs = followedArtists.map(({ slug }) => slug)

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.artistIDs
  )
  const label = `Artists${filtersCount}`

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })

  useEffect(() => {
    if (artists?.counts && relayEnvironment && user) {
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
    !!user && includeArtworksByFollowedArtists
  const followedArtistArtworkCount = filterContext?.counts?.followedArtists ?? 0
  const hasSelection = artistIDs.length > 0 || isFollowedArtistCheckboxSelected

  return (
    <FilterExpandable label={label} expanded={hasSelection || expanded}>
      <Flex flexDirection="column">
        <Checkbox
          disabled={!followedArtistArtworkCount}
          selected={isFollowedArtistCheckboxSelected}
          onSelect={value =>
            filterContext.setFilter("includeArtworksByFollowedArtists", value)
          }
          my={tokens.my}
        >
          Artists I follow ({followedArtistArtworkCount})
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
                  isFollowedArtistCheckboxSelected ?? false
                }
                my={tokens.my}
              />
            )
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}

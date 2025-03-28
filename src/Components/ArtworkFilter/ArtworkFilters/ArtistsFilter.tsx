import { Checkbox, type CheckboxProps, Flex } from "@artsy/palette"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { fetchFollowedArtists } from "Components/ArtworkFilter/Utils/fetchFollowedArtists"
import { useFilterLabelCountByKey } from "Components/ArtworkFilter/Utils/useFilterLabelCountByKey"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { sortBy } from "lodash"
import { type FC, useEffect } from "react"
import type * as React from "react"
import { FilterExpandable } from "./FilterExpandable"
import { ShowMore } from "./ShowMore"

export interface ArtistsFilterProps {
  expanded?: boolean
  fairID?: string
  user?: User
}

const ArtistItem: React.FC<
  React.PropsWithChildren<
    {
      slug: string
      name: string
      followedArtistSlugs: string[]
      isFollowedArtistCheckboxSelected: boolean
    } & CheckboxProps
  >
> = ({
  slug,
  name,
  followedArtistSlugs,
  isFollowedArtistCheckboxSelected,
  ...rest
}) => {
  const { setFilter } = useArtworkFilterContext()
  const { artistIDs = [] } = useCurrentlySelectedFilters()

  const toggleArtistSelection = (selected: boolean, slug: string) => {
    let updatedValues = artistIDs

    if (selected) {
      updatedValues = [...updatedValues, slug]
    } else {
      updatedValues = updatedValues.filter(item => item !== slug)
    }

    setFilter("includeArtworksByFollowedArtists", false)
    setFilter("artistIDs", updatedValues)
  }

  const isFollowedArtist = followedArtistSlugs.includes(slug)

  return (
    <Checkbox
      {...rest}
      selected={
        artistIDs.includes(slug) ||
        (isFollowedArtistCheckboxSelected && isFollowedArtist)
      }
      onSelect={selected => {
        return toggleArtistSelection(selected, slug)
      }}
    >
      {name}
    </Checkbox>
  )
}

export const ArtistsFilter: FC<React.PropsWithChildren<ArtistsFilterProps>> = ({
  expanded,
  fairID,
}) => {
  const { relayEnvironment, user } = useSystemContext()

  const {
    aggregations,
    followedArtists = [],
    setFollowedArtists,
    ...filterContext
  } = useArtworkFilterContext()

  const artists = aggregations?.find(agg => agg.slice === "ARTIST")

  const { artistIDs = [], includeArtworksByFollowedArtists } =
    useCurrentlySelectedFilters()

  const followedArtistSlugs = followedArtists.map(({ slug }) => slug)

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.artistIDs,
  )
  const label = `Artists${filtersCount}`

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (artists?.counts && relayEnvironment && user) {
      fetchFollowedArtists({ relayEnvironment, fairID }).then(data => {
        setFollowedArtists?.(data)
      })
    }
  }, [])

  if (!(artists && artists.counts)) {
    return null
  }

  const artistsSorted = sortBy(artists.counts, ["name"])

  const isFollowedArtistCheckboxSelected =
    !!user && includeArtworksByFollowedArtists
  const hasSelection = artistIDs.length > 0 || isFollowedArtistCheckboxSelected

  return (
    <FilterExpandable label={label} expanded={hasSelection || expanded}>
      <Flex flexDirection="column" gap={2} mt={1}>
        <Checkbox
          data-testid="followedArtistsCheckbox"
          disabled={!user}
          selected={isFollowedArtistCheckboxSelected}
          onSelect={value => {
            filterContext.setFilter("includeArtworksByFollowedArtists", value)
            filterContext.setFilter("artistIDs", [])
          }}
        >
          Artists You Follow
        </Checkbox>

        {/* TODO: Remove external margin override */}
        <ShowMore mt={0}>
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
                disabled={
                  isFollowedArtistCheckboxSelected &&
                  followedArtistSlugs.includes(slug)
                }
              />
            )
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}

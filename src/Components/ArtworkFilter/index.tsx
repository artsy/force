import React, { useEffect, useRef, useState } from "react"
import { isEqual } from "lodash"
import useDeepCompareEffect from "use-deep-compare-effect"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
import { useTracking } from "react-tracking"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { Media } from "Utils/Responsive"
import { ArtworkFilterArtworkGridRefetchContainer as ArtworkFilterArtworkGrid } from "./ArtworkFilterArtworkGrid"
import {
  ArtworkFilterContextProvider,
  SharedArtworkFilterContextProps,
  useArtworkFilterContext,
} from "./ArtworkFilterContext"
import { ArtworkFilterMobileActionSheet } from "./ArtworkFilterMobileActionSheet"
import { ArtworkFilters } from "./ArtworkFilters"
import {
  Box,
  BoxProps,
  Button,
  Column,
  FilterIcon,
  Flex,
  FullBleed,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { ArtworkQueryFilter } from "./ArtworkQueryFilter"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import {
  commercialFilterParamsChanged,
  ActionType,
  ContextModule,
  ClickedChangePage,
} from "@artsy/cohesion"
import { allowedFilters } from "./Utils/allowedFilters"
import { Sticky } from "Components/Sticky"
import { ScrollRefContext } from "./ArtworkFilters/useScrollContext"
import { ArtworkSortFilter } from "./ArtworkFilters/ArtworkSortFilter"
import type RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"
import { getTotalSelectedFiltersCount } from "./Utils/getTotalSelectedFiltersCount"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { Jump } from "Utils/Hooks/useJump"

interface ArtworkFilterProps extends SharedArtworkFilterContextProps, BoxProps {
  Filters?: JSX.Element
  offset?: number
  // Input variables passed to FilterArtworkConnection `input` argument
  relayRefetchInputVariables?: object
  // Root-level variables passed to Relay query
  relayVariables?: object
  FilterPillsSection?: JSX.Element
  viewer
}

/**
 * Primary ArtworkFilter which is wrapped with a context and refetch container.
 *
 * If needing more granular control over the query being used, or the root query
 * doesn't `extend Viewer`, the BaseArtworkFilter can be imported below. See
 * `Apps/Collection` for an example, which queries Kaws for data.
 */
export const ArtworkFilter: React.FC<ArtworkFilterProps> = ({
  aggregations,
  counts,
  filters,
  onChange,
  onFilterClick,
  sortOptions,
  viewer,
  ZeroState,
  userPreferredMetric,
  ...rest
}) => {
  return (
    <ArtworkFilterContextProvider
      aggregations={aggregations}
      counts={counts}
      filters={filters}
      sortOptions={sortOptions}
      onFilterClick={onFilterClick}
      onChange={onChange}
      ZeroState={ZeroState}
      userPreferredMetric={userPreferredMetric}
    >
      <ArtworkFilterRefetchContainer viewer={viewer} {...rest} />
    </ArtworkFilterContextProvider>
  )
}

export const BaseArtworkFilter: React.FC<
  Omit<ArtworkFilterProps, keyof SharedArtworkFilterContextProps> & {
    relay: RelayRefetchProp
  }
> = ({
  children,
  Filters,
  offset,
  relay,
  relayRefetchInputVariables = {},
  relayVariables = {},
  viewer,
  FilterPillsSection,
  ...rest
}) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()
  const [isFetching, toggleFetching] = useState(false)
  const [showMobileActionSheet, toggleMobileActionSheet] = useState(false)
  const filterContext = useArtworkFilterContext()
  const previousFilters = usePrevious(filterContext.filters)
  const { user } = useSystemContext()
  const { isAuctionArtwork } = useArtworkGridContext()
  const appliedFiltersTotalCount = getTotalSelectedFiltersCount(
    filterContext.selectedFiltersCounts
  )
  const total = viewer.filtered_artworks?.counts?.total ?? 0
  const totalCountLabel = getTotalCountLabel({ total, isAuctionArtwork })

  /**
   * Check to see if the mobile action sheet is present and prevent scrolling
   */
  useEffect(() => {
    const setScrollable = doScroll => {
      document.body.style.overflowY = doScroll ? "visible" : "hidden"
    }
    if (showMobileActionSheet) {
      setScrollable(false)
    }
    return () => {
      setScrollable(true)
    }
  }, [showMobileActionSheet])

  /**
   * Check to see if the current filter is different from the previous filter
   * and trigger a reload.
   */
  useDeepCompareEffect(() => {
    Object.entries(filterContext.filters ?? {}).forEach(
      ([filterKey, currentFilter]) => {
        const previousFilter = previousFilters?.[filterKey]
        const filtersHaveUpdated = !isEqual(currentFilter, previousFilter)

        if (filtersHaveUpdated) {
          fetchResults()

          if (filterKey === "page") {
            const pageTrackingParams: ClickedChangePage = {
              action: ActionType.clickedChangePage,
              context_module: ContextModule.artworkGrid,
              context_page_owner_type: contextPageOwnerType!,
              context_page_owner_id: contextPageOwnerId,
              context_page_owner_slug: contextPageOwnerSlug,
              page_current: previousFilter,
              page_changed: currentFilter,
            }

            tracking.trackEvent(pageTrackingParams)
          } else {
            const onlyAllowedFilters = allowedFilters(filterContext.filters)

            tracking.trackEvent(
              commercialFilterParamsChanged({
                changed: JSON.stringify({
                  [filterKey]: filterContext.filters?.[filterKey],
                }),
                contextOwnerId: contextPageOwnerId,
                contextOwnerSlug: contextPageOwnerSlug,
                contextOwnerType: contextPageOwnerType!,
                current: JSON.stringify({
                  ...onlyAllowedFilters,
                  metric: filterContext?.filters?.metric,
                }),
              })
            )
          }
        }
      }
    )
  }, [filterContext.filters])

  function fetchResults() {
    toggleFetching(true)

    const refetchVariables = {
      input: {
        first: 30,
        ...relayRefetchInputVariables,
        ...allowedFilters(filterContext.filters),
        keyword: filterContext.filters!.term || filterContext.filters!.keyword,
      },
      ...relayVariables,
    }

    relay.refetch(refetchVariables, null, error => {
      if (error) {
        console.error(error)
      }

      toggleFetching(false)
    })
  }

  if (!viewer?.filtered_artworks) {
    return null
  }

  return (
    <Box {...rest}>
      <Jump id="artworkFilter" />

      {/* Mobile Artwork Filter */}
      <Media at="xs">
        <Box mb={1}>
          {showMobileActionSheet && (
            <ArtworkFilterMobileActionSheet
              onClose={() => toggleMobileActionSheet(false)}
            >
              <FiltersWithScrollIntoView
                Filters={Filters}
                user={user}
                relayEnvironment={relay.environment}
              />
            </ArtworkFilterMobileActionSheet>
          )}

          <Sticky>
            {({ stuck }) => {
              return (
                <FullBleed backgroundColor="white100">
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    py={1}
                    px={2}
                    {...(stuck
                      ? {
                          borderBottom: "1px solid",
                          borderColor: "black10",
                        }
                      : {})}
                  >
                    <Button
                      size="small"
                      onClick={() => toggleMobileActionSheet(true)}
                      mr={2}
                    >
                      <Flex justifyContent="space-between" alignItems="center">
                        <FilterIcon fill="white100" />
                        <Spacer x={0.5} />
                        Filter
                        {appliedFiltersTotalCount > 0
                          ? ` • ${appliedFiltersTotalCount}`
                          : ""}
                      </Flex>
                    </Button>

                    <ArtworkSortFilter />
                  </Flex>
                </FullBleed>
              )
            }}
          </Sticky>

          <Spacer y={2} />

          {FilterPillsSection}

          <Text variant="sm" fontWeight="bold">
            {totalCountLabel}
          </Text>

          <Spacer y={2} />

          <ArtworkFilterArtworkGrid
            filtered_artworks={viewer.filtered_artworks!}
            isLoading={isFetching}
            offset={offset}
            columnCount={[2, 2, 2, 3]}
          />
        </Box>
      </Media>

      {/* Desktop Artwork Filter */}
      <Media greaterThan="xs">
        <GridColumns mb={4} alignItems="center">
          <Column span={3}>
            <Text variant="xs">Filter by</Text>
          </Column>

          <Column span={6}>
            <Text variant="sm" fontWeight="bold">
              {totalCountLabel}
            </Text>
          </Column>

          <Column span={3}>
            <ArtworkSortFilter />
          </Column>
        </GridColumns>

        <GridColumns>
          <Column span={3}>
            {Filters ? (
              Filters
            ) : (
              <ArtworkFilters
                user={user}
                relayEnvironment={relay.environment}
              />
            )}
          </Column>

          <Column
            span={9}
            // Fix for issue in Firefox where contents overflow container.
            // Safe to remove once artwork masonry uses CSS grid.
            width="100%"
          >
            {FilterPillsSection}

            {children || (
              <ArtworkFilterArtworkGrid
                filtered_artworks={viewer.filtered_artworks!}
                isLoading={isFetching}
                offset={offset}
                columnCount={[2, 2, 2, 3]}
              />
            )}
          </Column>
        </GridColumns>
      </Media>
    </Box>
  )
}

export const ArtworkFilterRefetchContainer = createRefetchContainer(
  BaseArtworkFilter,
  {
    viewer: graphql`
      fragment ArtworkFilter_viewer on Viewer
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        filtered_artworks: artworksConnection(input: $input) {
          ...ArtworkFilterArtworkGrid_filtered_artworks
          counts {
            total(format: "0,0")
          }
          id
        }
      }
    `,
  },
  ArtworkQueryFilter
)

const FiltersWithScrollIntoView: React.FC<{
  Filters?: JSX.Element
  user?: User
  relayEnvironment?: RelayModernEnvironment
}> = ({ Filters, relayEnvironment, user }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  return (
    <Box
      ref={scrollRef as any}
      overflowY="scroll"
      height="100%"
      data-testid="FiltersWithScrollIntoView"
    >
      <ScrollRefContext.Provider value={{ scrollRef }}>
        {Filters ? (
          Filters
        ) : (
          <ArtworkFilters relayEnvironment={relayEnvironment} user={user} />
        )}
      </ScrollRefContext.Provider>
    </Box>
  )
}

export const getTotalCountLabel = ({
  total = "0",
  isAuctionArtwork,
}: {
  total: string
  isAuctionArtwork: boolean | undefined
}) => {
  const artworkType = isAuctionArtwork ? "Lot" : "Artwork"
  const totalCountLabel = `${total} ${
    total === "1" ? artworkType : `${artworkType}s`
  }:`
  return totalCountLabel
}

import {
  ActionType,
  ClickedChangePage,
  ContextModule,
  commercialFilterParamsChanged,
} from "@artsy/cohesion"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import FilterIcon from "@artsy/icons/FilterIcon"
import {
  Box,
  BoxProps,
  Button,
  Clickable,
  Column,
  Flex,
  FullBleed,
  GridColumns,
  HorizontalOverflow,
  Pill,
  Spacer,
  Text,
} from "@artsy/palette"
import { ArtworkFilterCreateAlert } from "Components/ArtworkFilter/ArtworkFilterCreateAlert"
import { ArtworkFilterDrawer } from "Components/ArtworkFilter/ArtworkFilterDrawer"
import { ArtworkFilterExpandableSort } from "Components/ArtworkFilter/ArtworkFilters/ArtworkFilterExpandableSort"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { ProgressiveOnboardingAlertSelectFilter } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertSelectFilter"
import { ActiveFilterPills } from "Components/SavedSearchAlert/Components/ActiveFilterPills"
import { Sticky } from "Components/Sticky"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { useSystemContext } from "System/useSystemContext"
import { Jump } from "Utils/Hooks/useJump"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { Media } from "Utils/Responsive"
import { isEqual } from "lodash"
import React, { useMemo, useState } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import useDeepCompareEffect from "use-deep-compare-effect"
import { ArtworkFilterArtworkGridRefetchContainer as ArtworkFilterArtworkGrid } from "./ArtworkFilterArtworkGrid"
import {
  ArtworkFilterContextProvider,
  SharedArtworkFilterContextProps,
  useArtworkFilterContext,
} from "./ArtworkFilterContext"
import { ArtworkFilterMobileOverlay } from "./ArtworkFilterMobileOverlay"
import { ArtworkFilters } from "./ArtworkFilters"
import { ArtworkSortFilter } from "./ArtworkFilters/ArtworkSortFilter"
import { ArtworkQueryFilter } from "./ArtworkQueryFilter"
import { allowedFilters } from "./Utils/allowedFilters"
import { getTotalSelectedFiltersCount } from "./Utils/getTotalSelectedFiltersCount"
import { ArtworkFilterActiveFilters } from "Components/ArtworkFilter/ArtworkFilterActiveFilters"
import { ArtworkFilterSort } from "Components/ArtworkFilter/ArtworkFilterSort"
import {
  ARTWORK_FILTERS_QUICK_FIELDS,
  ArtworkFiltersQuick,
} from "Components/ArtworkFilter/ArtworkFiltersQuick"
import { useRevisedArtworkFilters } from "Components/ArtworkFilter/useRevisedArtworkFilters"

interface ArtworkFilterProps extends SharedArtworkFilterContextProps, BoxProps {
  Filters?: JSX.Element
  offset?: number
  // Input variables passed to FilterArtworkConnection `input` argument
  relayRefetchInputVariables?: object
  // Root-level variables passed to Relay query
  relayVariables?: object
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
  ...rest
}) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const filterContext = useArtworkFilterContext()

  const previousFilters = usePrevious(filterContext.filters)

  const { user } = useSystemContext()

  const { isAuctionArtwork } = useArtworkGridContext()

  const appliedFiltersTotalCount = getTotalSelectedFiltersCount(
    filterContext.selectedFiltersCounts
  )

  const total = viewer.filtered_artworks?.counts?.total ?? 0
  const totalCountLabel = getTotalCountLabel({ total, isAuctionArtwork })

  const { enabled: isRevisedArtworkFiltersEnabled } = useRevisedArtworkFilters()

  // Count of all filters, sans `sort`
  const revisedArtworkFiltersCount = useMemo(() => {
    return Object.entries(filterContext.selectedFiltersCounts).reduce(
      (acc, [field, count]) => {
        if (field === "sort") return acc
        return acc + count
      },
      0
    )
  }, [filterContext.selectedFiltersCounts])

  // Count of only quick filters
  const quickArtworkFiltersCount = useMemo(() => {
    return Object.entries(filterContext.selectedFiltersCounts).reduce(
      (acc, [field, count]) => {
        if (!ARTWORK_FILTERS_QUICK_FIELDS.includes(field)) return acc
        return acc + count
      },
      0
    )
  }, [filterContext.selectedFiltersCounts])

  const extendedFiltersCount =
    revisedArtworkFiltersCount - quickArtworkFiltersCount

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
              context_page_owner_type: contextPageOwnerType,
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
                contextOwnerType: contextPageOwnerType,
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

  const fetchResults = () => {
    setIsLoading(true)

    const refetchVariables = {
      input: {
        first: 30,
        ...relayRefetchInputVariables,
        ...allowedFilters(filterContext.filters),
        keyword: filterContext.filters?.term || filterContext.filters?.keyword,
      },
      ...relayVariables,
    }

    relay.refetch(refetchVariables, null, error => {
      if (error) console.error(error)
      setIsLoading(false)
    })
  }

  if (!viewer?.filtered_artworks) {
    return null
  }

  return (
    <Box {...rest} key={viewer.internalID}>
      <Jump id="artworkFilter" />

      {/* Mobile Artwork Filter */}
      <Media at="xs">
        {isRevisedArtworkFiltersEnabled ? (
          // New mobile filters
          <>
            <Sticky>
              <FullBleed backgroundColor="white100">
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  p={2}
                  gap={2}
                  borderBottom="1px solid"
                  borderColor="black10"
                >
                  <ProgressiveOnboardingAlertSelectFilter placement="bottom-start">
                    <Clickable
                      onClick={handleOpen}
                      display="flex"
                      alignItems="center"
                      gap={0.5}
                    >
                      <FilterIcon />
                      <Text variant="xs">
                        Sort & Filter
                        {appliedFiltersTotalCount > 0 && (
                          <Box as="span" color="brand">
                            {" "}
                            • {appliedFiltersTotalCount}
                          </Box>
                        )}
                      </Text>
                    </Clickable>

                    {isOpen && (
                      <ArtworkFilterMobileOverlay onClose={handleClose}>
                        <ArtworkFilterExpandableSort />

                        <Spacer y={4} />

                        {Filters ? (
                          Filters
                        ) : (
                          <ArtworkFilters
                            user={user}
                            relayEnvironment={relay.environment}
                          />
                        )}
                      </ArtworkFilterMobileOverlay>
                    )}
                  </ProgressiveOnboardingAlertSelectFilter>

                  <ArtworkFilterCreateAlert
                    renderButton={props => {
                      return (
                        <Clickable
                          display="flex"
                          alignItems="center"
                          gap={0.5}
                          {...props}
                        >
                          <BellStrokeIcon />

                          <Text variant="xs">Create Alert</Text>
                        </Clickable>
                      )
                    }}
                  />
                </Flex>
              </FullBleed>
            </Sticky>

            <Spacer y={4} />
          </>
        ) : (
          // Old mobile filters
          <>
            <Sticky>
              {({ stuck }) => {
                return (
                  <FullBleed backgroundColor="white100">
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      py={1}
                      px={2}
                      gap={2}
                      {...(stuck
                        ? {
                            borderBottom: "1px solid",
                            borderColor: "black10",
                          }
                        : {})}
                    >
                      <ProgressiveOnboardingAlertSelectFilter placement="bottom-start">
                        <Button
                          size="small"
                          onClick={handleOpen}
                          Icon={FilterIcon}
                        >
                          Filter
                          {appliedFiltersTotalCount > 0
                            ? ` • ${appliedFiltersTotalCount}`
                            : ""}
                        </Button>

                        {isOpen && (
                          <ArtworkFilterMobileOverlay onClose={handleClose}>
                            <Box
                              overflowY="scroll"
                              height="100%"
                              data-testid="FiltersWithScrollIntoView"
                            >
                              {Filters ? (
                                Filters
                              ) : (
                                <ArtworkFilters
                                  relayEnvironment={relay.environment}
                                  user={user}
                                />
                              )}
                            </Box>
                          </ArtworkFilterMobileOverlay>
                        )}
                      </ProgressiveOnboardingAlertSelectFilter>

                      <ArtworkSortFilter />
                    </Flex>
                  </FullBleed>
                )
              }}
            </Sticky>

            <Spacer y={2} />

            <ActiveFilterPills />

            <Spacer y={1} />

            <ArtworkFilterCreateAlert
              renderButton={props => {
                return (
                  <Button
                    variant="secondaryBlack"
                    size="small"
                    Icon={BellStrokeIcon}
                    {...props}
                  >
                    Create Alert
                  </Button>
                )
              }}
            />

            <Spacer y={2} />
          </>
        )}

        <Text variant="sm" fontWeight="bold">
          {totalCountLabel}
        </Text>

        <Spacer y={2} />

        <ArtworkFilterArtworkGrid
          filtered_artworks={viewer.filtered_artworks}
          isLoading={isLoading}
          offset={offset}
          columnCount={[2, 2, 2, 3]}
        />
      </Media>

      {/* Desktop Artwork Filter */}
      <Media greaterThan="xs">
        {isRevisedArtworkFiltersEnabled ? (
          // New desktop filters
          <>
            <Flex alignItems="center" justifyContent="space-between" gap={2}>
              <HorizontalOverflow minWidth={0}>
                <Flex gap={1}>
                  <Flex gap={2}>
                    <ArtworkFilterCreateAlert
                      renderButton={props => {
                        return (
                          <Button
                            variant={
                              revisedArtworkFiltersCount > 0
                                ? "primaryBlack"
                                : "secondaryBlack"
                            }
                            size="small"
                            Icon={BellStrokeIcon}
                            {...props}
                          >
                            Create Alert
                          </Button>
                        )
                      }}
                    >
                      <Box width="1px" bg="black30" />
                    </ArtworkFilterCreateAlert>

                    <Pill Icon={FilterIcon} size="small" onClick={handleOpen}>
                      All Filters
                      {extendedFiltersCount > 0 && (
                        <Box as="span" color="brand">
                          {" "}
                          • {extendedFiltersCount}
                        </Box>
                      )}
                    </Pill>
                  </Flex>

                  <ArtworkFiltersQuick />
                </Flex>
              </HorizontalOverflow>

              <ArtworkFilterSort />

              <ArtworkFilterDrawer open={isOpen} onClose={handleClose}>
                {Filters ? (
                  Filters
                ) : (
                  <ArtworkFilters
                    user={user}
                    relayEnvironment={relay.environment}
                  />
                )}
              </ArtworkFilterDrawer>
            </Flex>

            <Spacer y={2} />

            <ArtworkFilterActiveFilters />

            <Spacer y={4} />

            <Text variant="xs" flexShrink={0}>
              {totalCountLabel}:
            </Text>

            <Spacer y={2} />

            {children || (
              <ArtworkFilterArtworkGrid
                filtered_artworks={viewer.filtered_artworks}
                isLoading={isLoading}
                offset={offset}
                columnCount={[2, 3, 3, 4]}
              />
            )}
          </>
        ) : (
          // Old desktop filters
          <GridColumns>
            <Column span={3}>
              <Text variant="xs">Filter by</Text>
            </Column>

            <Column span={6}>
              <Text variant="sm" fontWeight="bold">
                {totalCountLabel}:
              </Text>
            </Column>

            <Column span={3}>
              <ArtworkSortFilter />
            </Column>

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
              <Flex gap={1}>
                <ActiveFilterPills />

                <ArtworkFilterCreateAlert
                  renderButton={props => {
                    return (
                      <Button
                        variant="secondaryBlack"
                        size="small"
                        Icon={BellStrokeIcon}
                        {...props}
                      >
                        Create Alert
                      </Button>
                    )
                  }}
                />
              </Flex>

              <Spacer y={2} />

              {children || (
                <ArtworkFilterArtworkGrid
                  filtered_artworks={viewer.filtered_artworks}
                  isLoading={isLoading}
                  offset={offset}
                  columnCount={[2, 2, 2, 3]}
                />
              )}
            </Column>
          </GridColumns>
        )}
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
  }`

  return totalCountLabel
}

import {
  ActionType,
  type ClickedChangePage,
  type ClickedImmersiveView,
  ContextModule,
  type ImmersiveViewOptionViewed,
  commercialFilterParamsChanged,
} from "@artsy/cohesion"
import { useDismissibleContext } from "@artsy/dismissible"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import ExpandIcon from "@artsy/icons/ExpandIcon"
import FilterIcon from "@artsy/icons/FilterIcon"
import {
  Box,
  type BoxProps,
  Button,
  Clickable,
  Flex,
  FullBleed,
  HorizontalOverflow,
  Pill,
  Spacer,
  Text,
} from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { ArtworkFilterActiveFilters } from "Components/ArtworkFilter/ArtworkFilterActiveFilters"
import { ArtworkFilterCreateAlert } from "Components/ArtworkFilter/ArtworkFilterCreateAlert"
import { ArtworkFilterDrawer } from "Components/ArtworkFilter/ArtworkFilterDrawer"
import { ArtworkFilterSort } from "Components/ArtworkFilter/ArtworkFilterSort"
import { ArtworkFilterExpandableSort } from "Components/ArtworkFilter/ArtworkFilters/ArtworkFilterExpandableSort"
import {
  ARTWORK_FILTERS_QUICK_FIELDS,
  ArtworkFiltersQuick,
} from "Components/ArtworkFilter/ArtworkFiltersQuick"
import { ImmersiveView } from "Components/ArtworkFilter/ImmersiveView"
import type { ArtworkGridLayout } from "Components/ArtworkGrid/ArtworkGrid"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { ArtworkGridEmptyState } from "Components/ArtworkGrid/ArtworkGridEmptyState"
import {
  KEY as IMMERSIVE_KEY,
  ProgressiveOnboardingImmersiveView,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingImmersiveView"
import { Sticky } from "Components/Sticky"
import { useStickyBackdrop } from "Components/Sticky/useStickyBackdrop"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Jump, useJump } from "Utils/Hooks/useJump"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { Media } from "Utils/Responsive"
import { isEqual } from "lodash"
import type React from "react"
import { useEffect, useMemo, useState } from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"
import { useTracking } from "react-tracking"
import useDeepCompareEffect from "use-deep-compare-effect"
import { ArtworkFilterArtworkGridRefetchContainer } from "./ArtworkFilterArtworkGrid"
import {
  ArtworkFilterContextProvider,
  type SharedArtworkFilterContextProps,
  useArtworkFilterContext,
} from "./ArtworkFilterContext"
import { ArtworkFilterMobileOverlay } from "./ArtworkFilterMobileOverlay"
import { ArtworkFilters } from "./ArtworkFilters"
import { ArtworkQueryFilter } from "./ArtworkQueryFilter"
import { allowedFilters } from "./Utils/allowedFilters"
import { getTotalSelectedFiltersCount } from "./Utils/getTotalSelectedFiltersCount"

interface ArtworkFilterProps extends SharedArtworkFilterContextProps, BoxProps {
  Filters?: JSX.Element
  offset?: number
  // Input variables passed to FilterArtworkConnection `input` argument
  relayRefetchInputVariables?: object
  // Root-level variables passed to Relay query
  relayVariables?: object
  viewer
  featuredKeywords?: readonly string[] | null | undefined
  layout?: ArtworkGridLayout
}

/**
 * Primary ArtworkFilter which is wrapped with a context and refetch container.
 *
 * If needing more granular control over the query being used, or the root query
 * doesn't `extend Viewer`, the BaseArtworkFilter can be imported below. See
 * `Apps/Collection` for an example, which queries Kaws for data.
 */
export const ArtworkFilter: React.FC<
  React.PropsWithChildren<ArtworkFilterProps>
> = ({
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
  React.PropsWithChildren<
    Omit<ArtworkFilterProps, keyof SharedArtworkFilterContextProps> & {
      relay: RelayRefetchProp
    }
  >
> = ({
  children,
  Filters,
  offset,
  relay,
  relayRefetchInputVariables = {},
  relayVariables = {},
  viewer,
  featuredKeywords,
  layout,
  ...rest
}) => {
  const tracking = useTracking()

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [isImmersed, setIsImmersed] = useState(false)
  const enableImmersiveView = useFlag("onyx_enable-immersive-view")
  const { dismiss, isDismissed } = useDismissibleContext()

  const backdrop = useStickyBackdrop()

  const trackClickedImmersiveView = () => {
    const params: ClickedImmersiveView = {
      action: ActionType.clickedImmersiveView,
      context_module: ContextModule.artworkGrid,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
    }
    tracking.trackEvent(params)
  }

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
    filterContext.selectedFiltersCounts,
  )

  const total = viewer.filtered_artworks?.counts?.total ?? 0
  const totalCountLabel = getTotalCountLabel({ total, isAuctionArtwork })

  // Count of all filters, sans `sort`
  const revisedArtworkFiltersCount = useMemo(() => {
    return Object.entries(filterContext.selectedFiltersCounts || {}).reduce(
      (acc, [field, count]) => {
        if (field === "sort") return acc
        return acc + count
      },
      0,
    )
  }, [filterContext.selectedFiltersCounts])

  // Count of only quick filters
  const quickArtworkFiltersCount = useMemo(() => {
    return Object.entries(filterContext.selectedFiltersCounts || {}).reduce(
      (acc, [field, count]) => {
        if (!ARTWORK_FILTERS_QUICK_FIELDS.includes(field)) return acc
        return acc + count
      },
      0,
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
              }),
            )
          }
        }
      },
    )
  }, [filterContext.filters])

  useEffect(() => {
    if (!enableImmersiveView) return

    const params: ImmersiveViewOptionViewed = {
      action: ActionType.immersiveViewOptionViewed,
      context_module: ContextModule.artworkGrid,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
    }

    tracking.trackEvent(params)
  }, [enableImmersiveView, contextPageOwnerType, contextPageOwnerId, tracking])

  const { jumpTo } = useJump()

  const fetchResults = () => {
    setIsLoading(true)

    jumpTo("artworkFilter")

    const keyword =
      filterContext.filters?.term || filterContext.filters?.keyword

    const refetchVariables = {
      input: {
        first: 30,
        ...relayRefetchInputVariables,
        ...allowedFilters(filterContext.filters),
        keyword: keyword ? String(keyword) : undefined,
      },
      ...relayVariables,
    }

    relay.refetch(refetchVariables, null, error => {
      if (error) console.error(error)
      setIsLoading(false)
    })
  }

  return (
    <Box id="Sticky__ArtworkFilter" {...rest} key={viewer.internalID}>
      <Jump id="artworkFilter" />

      {/* Mobile Artwork Filter */}
      <Media at="xs">
        <Sticky bottomBoundary="#Sticky__ArtworkFilter">
          <FullBleed backgroundColor="mono0">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p={2}
              gap={2}
              borderBottom="1px solid"
              borderColor="mono10"
            >
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

                  {Filters ? Filters : <ArtworkFilters user={user} />}
                </ArtworkFilterMobileOverlay>
              )}
            </Flex>
          </FullBleed>
        </Sticky>

        <Spacer y={4} />

        <Text variant="sm" fontWeight="bold">
          {totalCountLabel}
        </Text>

        <Spacer y={2} />

        {viewer.filtered_artworks ? (
          <ArtworkFilterArtworkGridRefetchContainer
            filtered_artworks={viewer.filtered_artworks}
            isLoading={isLoading}
            offset={offset}
            columnCount={[2, 3]}
            layout={layout}
          />
        ) : (
          <ArtworkGridEmptyState onClearFilters={filterContext.resetFilters} />
        )}
      </Media>

      {/* Desktop Artwork Filter */}
      <Media greaterThan="xs">
        {/* Negative offset for positive sticky padding */}
        <Spacer y={-1} />

        <Sticky bottomBoundary="#Sticky__ArtworkFilter">
          {({ stuck, scrollDirection }) => {
            return (
              <FullBleed style={backdrop[scrollDirection]}>
                <AppContainer>
                  <HorizontalPadding>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      gap={2}
                      py={1}
                    >
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
                              <Box width="1px" bg="mono30" />
                            </ArtworkFilterCreateAlert>

                            <Pill
                              Icon={FilterIcon}
                              size="small"
                              onClick={handleOpen}
                            >
                              All Filters
                              {extendedFiltersCount > 0 && (
                                <Box as="span" color="brand">
                                  {" "}
                                  • {extendedFiltersCount}
                                </Box>
                              )}
                            </Pill>
                          </Flex>

                          <ArtworkFiltersQuick
                            featuredKeywords={featuredKeywords}
                            {...(stuck ? { offset: 20 } : {})}
                          />
                        </Flex>
                      </HorizontalOverflow>

                      <Flex gap={1}>
                        {enableImmersiveView && (
                          <ProgressiveOnboardingImmersiveView>
                            <Button
                              variant={"tertiary"}
                              size={"small"}
                              onClick={() => {
                                setIsImmersed(true)
                                trackClickedImmersiveView()
                                if (!isDismissed(IMMERSIVE_KEY).status) {
                                  dismiss(IMMERSIVE_KEY)
                                }
                              }}
                              disabled={Number(total) === 0}
                            >
                              <ExpandIcon mr={0.5} />
                              Immersive View
                            </Button>
                          </ProgressiveOnboardingImmersiveView>
                        )}

                        <ArtworkFilterSort {...(stuck ? { offset: 20 } : {})} />
                      </Flex>

                      <ArtworkFilterDrawer open={isOpen} onClose={handleClose}>
                        {Filters ? Filters : <ArtworkFilters user={user} />}
                      </ArtworkFilterDrawer>
                    </Flex>
                  </HorizontalPadding>
                </AppContainer>
              </FullBleed>
            )
          }}
        </Sticky>

        {isImmersed && viewer.filtered_artworks && (
          <ImmersiveView
            artworks={viewer.filtered_artworks}
            isPageLoading={isLoading}
            onClose={() => setIsImmersed(false)}
          />
        )}

        <Spacer y={2} />

        <ArtworkFilterActiveFilters />

        <Spacer y={4} />

        <Text variant="xs" flexShrink={0}>
          {totalCountLabel}:
        </Text>

        <Spacer y={2} />

        {children ||
          (viewer.filtered_artworks ? (
            <ArtworkFilterArtworkGridRefetchContainer
              filtered_artworks={viewer.filtered_artworks}
              isLoading={isLoading}
              offset={offset}
              columnCount={[2, 3, 4]}
              layout={layout}
            />
          ) : (
            <ArtworkGridEmptyState
              onClearFilters={filterContext.resetFilters}
            />
          ))}
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
          ...ImmersiveView_filtered_artworks
          counts {
            total(format: "0,0")
          }
          id
        }
      }
    `,
  },
  ArtworkQueryFilter,
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

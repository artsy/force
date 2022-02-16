import React, { useEffect, useMemo, useRef, useState } from "react"
import { isEqual } from "lodash"
import useDeepCompareEffect from "use-deep-compare-effect"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { usePrevious } from "v2/Utils/Hooks/usePrevious"
import { Media } from "v2/Utils/Responsive"
import { ArtworkQueryFilterQuery as ArtworkFilterQueryType } from "v2/__generated__/ArtworkQueryFilterQuery.graphql"
import { ArtworkFilterArtworkGridRefetchContainer as ArtworkFilterArtworkGrid } from "./ArtworkFilterArtworkGrid"
import {
  ArtworkFilterContextProvider,
  SharedArtworkFilterContextProps,
  initialArtworkFilterState,
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
  useThemeConfig,
} from "@artsy/palette"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ArtworkQueryFilter } from "./ArtworkQueryFilter"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
import {
  commercialFilterParamsChanged,
  ActionType,
  ContextModule,
  ClickedChangePage,
} from "@artsy/cohesion"
import {
  allowedFilters,
  getAllowedFiltersForSavedSearchInput,
} from "./Utils/allowedFilters"
import { Sticky } from "v2/Components/Sticky"
import { ScrollRefContext } from "./ArtworkFilters/useScrollContext"
import { ArtworkSortFilter } from "./ArtworkFilters/ArtworkSortFilter"
import type RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"
import { ArtworkGridFilterPills } from "./SavedSearch/Components/ArtworkGridFilterPills"
import { SavedSearchAttributes } from "./SavedSearch/types"
import { extractPills } from "../SavedSearchAlert/Utils/extractPills"
import { useFilterPillsContext } from "./SavedSearch/Utils/FilterPillsContext"
import { getTotalSelectedFiltersCount } from "./Utils/getTotalSelectedFiltersCount"

interface ArtworkFilterProps extends SharedArtworkFilterContextProps, BoxProps {
  enableCreateAlert?: boolean
  Filters?: JSX.Element
  offset?: number
  relayInputVariables?: object
  relayVariables?: object
  savedSearchProps?: SavedSearchAttributes
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
  savedSearchProps,
  sortOptions,
  viewer,
  ZeroState,
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
    >
      <ArtworkFilterRefetchContainer
        viewer={viewer}
        savedSearchProps={savedSearchProps}
        {...rest}
      />
    </ArtworkFilterContextProvider>
  )
}

export const BaseArtworkFilter: React.FC<
  Omit<ArtworkFilterProps, keyof SharedArtworkFilterContextProps> & {
    relay: RelayRefetchProp
  }
> = ({
  children,
  enableCreateAlert = false,
  Filters,
  offset,
  relay,
  relayInputVariables = {},
  relayVariables = {},
  savedSearchProps,
  viewer,
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
  const { pills = [], setPills } = useFilterPillsContext()
  const appliedFiltersTotalCount = getTotalSelectedFiltersCount(
    filterContext.selectedFiltersCounts
  )

  const filters = useMemo(
    () => getAllowedFiltersForSavedSearchInput(filterContext.filters ?? {}),
    [filterContext.filters]
  )

  const showCreateAlert = enableCreateAlert && !!pills.length

  useEffect(() => {
    const pills = extractPills(
      filters,
      filterContext.aggregations,
      savedSearchProps
    )

    setPills?.(pills)
  }, [savedSearchProps, filters, filterContext.aggregations, setPills])

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
                current: JSON.stringify(onlyAllowedFilters),
              })
            )
          }
        }
      }
    )
  }, [filterContext.filters])

  const tokens = useThemeConfig({
    v2: {
      version: "v2",
      mt: [0, 0.5],
      pr: [0, 2],
    },
    v3: {
      version: "v3",
      mt: undefined,
      pr: undefined,
    },
  })

  function fetchResults() {
    toggleFetching(true)

    const relayRefetchVariables = {
      first: 30,
      ...allowedFilters(filterContext.filters),
      keyword: filterContext.filters!.term,
      ...relayInputVariables,
    }

    const refetchVariables = {
      input: relayRefetchVariables,
      ...relayVariables,
    }

    relay.refetch(refetchVariables, null, error => {
      if (error) {
        console.error(error)
      }

      toggleFetching(false)
    })
  }

  return (
    <Box mt={tokens.mt} {...rest}>
      <Box id="jump--artworkFilter" />

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
                        <Spacer mr={0.5} />
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

          <Spacer mb={2} />

          {showCreateAlert && (
            <>
              <ArtworkGridFilterPills
                savedSearchAttributes={savedSearchProps}
              />
              <Spacer mt={4} />
            </>
          )}

          <Spacer mb={2} />

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
        {tokens.version === "v3" && (
          <Flex justifyContent="space-between" alignItems="flex-start" pb={4}>
            <Text variant="xs" textTransform="uppercase">
              Filter by
            </Text>

            <ArtworkSortFilter />
          </Flex>
        )}

        <GridColumns>
          <Column span={3} pr={tokens.pr}>
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
            {tokens.version === "v2" && (
              <Box mb={2} pt={2} borderTop="1px solid" borderTopColor="black10">
                <ArtworkSortFilter />
              </Box>
            )}

            {showCreateAlert && (
              <>
                <ArtworkGridFilterPills
                  savedSearchAttributes={savedSearchProps}
                />
                <Spacer mt={4} />
              </>
            )}

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
          id
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  ArtworkQueryFilter
)

/**
 * This QueryRenderer can be used to instantiate stand-alone embedded ArtworkFilters
 * that are not dependent on URLBar state.
 */
export const ArtworkFilterQueryRenderer = ({ keyword = "andy warhol" }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <ArtworkFilterContextProvider
      filters={{
        ...initialArtworkFilterState,
        keyword,
      }}
    >
      <SystemQueryRenderer<ArtworkFilterQueryType>
        environment={relayEnvironment}
        // FIXME: Passing a variable to `query` shouldn't error out in linter
        /* tslint:disable:relay-operation-generics */
        query={ArtworkQueryFilter}
        variables={{
          keyword,
        }}
        render={renderWithLoadProgress(ArtworkFilterRefetchContainer as any)} // FIXME: Find way to support union types here
      />
    </ArtworkFilterContextProvider>
  )
}

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

import React, { useEffect, useRef, useState } from "react"
import { isEqual } from "lodash"
import useDeepCompareEffect from "use-deep-compare-effect"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { usePrevious } from "v2/Utils/Hooks/usePrevious"
import { Media } from "v2/Utils/Responsive"
import { ArtworkFilter_viewer } from "v2/__generated__/ArtworkFilter_viewer.graphql"
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
  GridColumns,
  Spacer,
  Text,
  useThemeConfig,
} from "@artsy/palette"
import { ArtistArtworkFilter_artist } from "v2/__generated__/ArtistArtworkFilter_artist.graphql"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ArtworkQueryFilter } from "./ArtworkQueryFilter"
import { ArtistSeriesArtworksFilter_artistSeries } from "v2/__generated__/ArtistSeriesArtworksFilter_artistSeries.graphql"
import { FairArtworks_fair } from "v2/__generated__/FairArtworks_fair.graphql"
import { ShowArtworks_show } from "v2/__generated__/ShowArtworks_show.graphql"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
import {
  commercialFilterParamsChanged,
  ActionType,
  ContextModule,
  ClickedChangePage,
} from "@artsy/cohesion"
import { allowedFilters } from "./Utils/allowedFilters"
import { Sticky } from "v2/Components/Sticky"
import { ScrollRefContext } from "./ArtworkFilters/useScrollContext"
import { ArtworkSortFilter } from "./ArtworkFilters/ArtworkSortFilter"
import { GeneArtworkFilter_gene } from "v2/__generated__/GeneArtworkFilter_gene.graphql"
import type RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"
import { TagArtworkFilter_tag } from "v2/__generated__/TagArtworkFilter_tag.graphql"
import { Works_partner } from "v2/__generated__/Works_partner.graphql"
import { CollectionArtworksFilter_collection } from "v2/__generated__/CollectionArtworksFilter_collection.graphql"
import { FiltersPills } from "./SavedSearch/Components/FiltersPills"
import { SavedSearchAttributes } from "./SavedSearch/types"
import { ArtworkFilterAnchor } from "./ArtworkFilterAnchor"

/**
 * Primary ArtworkFilter which is wrapped with a context and refetch container.
 *
 * If needing more granular control over the query being used, or the root query
 * doesn't `extend Viewer`, the BaseArtworkFilter can be imported below. See
 * `Apps/Collection` for an example, which queries Kaws for data.
 */
export const ArtworkFilter: React.FC<
  BoxProps &
    SharedArtworkFilterContextProps & {
      viewer: any // FIXME: We need to support multiple types implementing different viewer interfaces
      savedSearchProps?: SavedSearchAttributes
    }
> = ({
  viewer,
  aggregations,
  counts,
  filters,
  sortOptions,
  onFilterClick,
  onChange,
  ZeroState,
  savedSearchProps,
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

const FiltersWithScrollIntoView: React.FC<{
  Filters?: JSX.Element
  user?: User
  relayEnvironment?: RelayModernEnvironment
}> = ({ Filters, relayEnvironment, user }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  return (
    <Box ref={scrollRef as any} overflowY="scroll" height="100%">
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

export const BaseArtworkFilter: React.FC<
  BoxProps & {
    relay: RelayRefetchProp
    relayVariables?: object
    viewer:
      | ArtworkFilter_viewer
      | ArtistArtworkFilter_artist
      | ArtistSeriesArtworksFilter_artistSeries
      | FairArtworks_fair
      | ShowArtworks_show
      | GeneArtworkFilter_gene
      | TagArtworkFilter_tag
      | Works_partner
      | CollectionArtworksFilter_collection
    Filters?: JSX.Element
    offset?: number
    savedSearchProps?: SavedSearchAttributes
    enableCreateAlert?: boolean
  }
> = ({
  relay,
  viewer,
  Filters,
  relayVariables = {},
  children,
  offset = 0,
  savedSearchProps,
  enableCreateAlert = false,
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

  const { filtered_artworks } = viewer
  const hasFilter = filtered_artworks && filtered_artworks.id

  const showCreateAlert = enableCreateAlert && filterContext.hasFilters

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

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  function fetchResults() {
    toggleFetching(true)

    const relayRefetchVariables = {
      first: 30,
      ...allowedFilters(filterContext.filters),
      keyword: filterContext.filters!.term,
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
      <ArtworkFilterAnchor />
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
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  py={1}
                  {...(stuck
                    ? {
                        px: 2,
                        borderBottom: "1px solid",
                        borderColor: "black10",
                      }
                    : {})}
                >
                  <Button
                    size="small"
                    onClick={() => toggleMobileActionSheet(true)}
                  >
                    <Flex justifyContent="space-between" alignItems="center">
                      <FilterIcon fill="white100" />
                      <Spacer mr={0.5} />
                      Filter
                    </Flex>
                  </Button>

                  <ArtworkSortFilter />
                </Flex>
              )
            }}
          </Sticky>

          <Spacer mb={2} />

          {savedSearchProps && enableCreateAlert && (
            <FiltersPills
              savedSearchAttributes={savedSearchProps}
              show={showCreateAlert}
            />
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

            {enableCreateAlert && savedSearchProps && (
              <FiltersPills
                savedSearchAttributes={savedSearchProps}
                show={showCreateAlert}
              />
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

import { isEqual } from "lodash"
import React, { useEffect, useState } from "react"
import useDeepCompareEffect from "use-deep-compare-effect"

import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"

import { useSystemContext } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { usePrevious } from "v2/Utils/Hooks/usePrevious"
import { Media } from "v2/Utils/Responsive"

import { ArtworkFilter_viewer } from "v2/__generated__/ArtworkFilter_viewer.graphql"
import { ArtworkQueryFilterQuery as ArtworkFilterQueryType } from "v2/__generated__/ArtworkQueryFilterQuery.graphql"

import { ArtworkFilterArtworkGridRefetchContainer as ArtworkFilterArtworkGrid } from "./ArtworkFilterArtworkGrid"
import { SortFilter } from "./ArtworkFilters/SortFilter"

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
  color,
  FilterIcon,
  Flex,
  Separator,
  Spacer,
} from "@artsy/palette"
import { ArtistArtworkFilter_artist } from "v2/__generated__/ArtistArtworkFilter_artist.graphql"
import { Collection_collection } from "v2/__generated__/Collection_collection.graphql"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { ArtworkQueryFilter } from "./ArtworkQueryFilter"
import { ArtistSeriesArtworksFilter_artistSeries } from "v2/__generated__/ArtistSeriesArtworksFilter_artistSeries.graphql"
import { FairArtworks_fair } from "v2/__generated__/FairArtworks_fair.graphql"
import { ShowArtworks_show } from "v2/__generated__/ShowArtworks_show.graphql"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"
import { commercialFilterParamsChanged } from "@artsy/cohesion"
import { allowedFilters } from "./Utils/allowedFilters"
import { BaseContainer, StickyContainer } from "v2/Components/StickyContainer"
import styled, { css } from "styled-components"

export const Container = styled(BaseContainer).attrs({
  py: 1,
  mx: -2,
  px: 2,
  borderBottom: "1px solid",
})`
  justify-content: space-between;
  align-items: center;

  ${({ stuck }) =>
    stuck
      ? css`
          border-bottom-color: ${color("black10")};
        `
      : css`
          border-bottom-color: transparent;
        `};
`

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
      <ArtworkFilterRefetchContainer viewer={viewer} {...rest} />
    </ArtworkFilterContextProvider>
  )
}

export const BaseArtworkFilter: React.FC<
  BoxProps & {
    relay: RelayRefetchProp
    relayVariables?: object
    viewer:
      | ArtworkFilter_viewer
      | Collection_collection
      | ArtistArtworkFilter_artist
      | ArtistSeriesArtworksFilter_artistSeries
      | FairArtworks_fair
      | ShowArtworks_show
    Filters?: React.FC
  }
> = ({ relay, viewer, Filters, relayVariables = {}, children, ...rest }) => {
  const { filtered_artworks } = viewer
  const hasFilter = filtered_artworks && filtered_artworks.id

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
    Object.entries(filterContext.filters).forEach(
      ([filterKey, currentFilter]) => {
        const previousFilter = previousFilters[filterKey]
        const filtersHaveUpdated = !isEqual(currentFilter, previousFilter)

        if (filtersHaveUpdated) {
          fetchResults()

          tracking.trackEvent(
            commercialFilterParamsChanged({
              changed: {
                [filterKey]: filterContext.filters[filterKey],
              },
              contextOwnerId: contextPageOwnerId,
              contextOwnerSlug: contextPageOwnerSlug,
              contextOwnerType: contextPageOwnerType,
              current: filterContext.filters,
            })
          )
        }
      }
    )
  }, [filterContext.filters])

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  function fetchResults() {
    toggleFetching(true)

    const relayRefetchVariables = {
      first: 30,
      ...allowedFilters(filterContext.filters),
      keyword: filterContext.filters.term,
    }

    relay.refetch(
      { input: relayRefetchVariables, ...relayVariables },
      null,
      error => {
        if (error) {
          console.error(error)
        }

        toggleFetching(false)
      }
    )
  }

  const ArtworkGrid = () => {
    return (
      <ArtworkFilterArtworkGrid
        filtered_artworks={viewer.filtered_artworks}
        isLoading={isFetching}
        columnCount={[2, 2, 2, 3]}
      />
    )
  }

  return (
    <Box mt={[0, 0.5]} {...rest}>
      <Box id="jump--artworkFilter" />

      {/*
        Mobile Artwork Filter
      */}
      <Media at="xs">
        <Box mb={1}>
          {showMobileActionSheet && (
            <ArtworkFilterMobileActionSheet
              onClose={() => toggleMobileActionSheet(false)}
            >
              {Filters ? <Filters /> : <ArtworkFilters />}
            </ArtworkFilterMobileActionSheet>
          )}

          <StickyContainer ContainerComponent={Container}>
            <Button size="small" onClick={() => toggleMobileActionSheet(true)}>
              <Flex justifyContent="space-between" alignItems="center">
                <FilterIcon fill="white100" />
                <Spacer mr={0.5} />
                Filter
              </Flex>
            </Button>

            <SortFilter />
          </StickyContainer>

          <Spacer mb={2} />

          <ArtworkGrid />
        </Box>
      </Media>

      {/*
        Desktop Artwork Filter
      */}
      <Media greaterThan="xs">
        <Flex>
          <Box width="25%" mr={2}>
            {Filters ? <Filters /> : <ArtworkFilters />}
          </Box>
          <Box width="75%">
            <Box mb={2}>
              <Box pb={2}>
                <Separator />
              </Box>
              <SortFilter />
            </Box>

            {children || <ArtworkGrid />}
          </Box>
        </Flex>
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
      <QueryRenderer<ArtworkFilterQueryType>
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

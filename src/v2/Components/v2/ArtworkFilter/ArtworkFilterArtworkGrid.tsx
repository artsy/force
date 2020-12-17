import { Box, Spacer } from "@artsy/palette"
import { isEmpty } from "lodash"
import React, { useEffect } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"

import { ArtworkFilterArtworkGrid_filtered_artworks } from "v2/__generated__/ArtworkFilterArtworkGrid_filtered_artworks.graphql"
import { useSystemContext, useTracking } from "v2/Artsy"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"
import { get } from "v2/Utils/get"
import { LoadingArea } from "../../LoadingArea"
import { Aggregations, useArtworkFilterContext } from "./ArtworkFilterContext"
import { ContextModule, clickedMainArtworkGrid } from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"

interface ArtworkFilterArtworkGridProps {
  columnCount: number[]
  filtered_artworks: ArtworkFilterArtworkGrid_filtered_artworks
  isLoading?: boolean
  relay: RelayProp
}

const ArtworkFilterArtworkGrid: React.FC<ArtworkFilterArtworkGridProps> = props => {
  const { user, mediator } = useSystemContext()
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerType,
    contextPageOwnerSlug,
    contextPageOwnerId,
  } = useAnalyticsContext()
  const context = useArtworkFilterContext()
  const aggregations = get(props, p => p.filtered_artworks.aggregations)

  /**
   * If aggregations have not been passed as props when instantiating the
   * <ArtworkFilter> component then populate.
   */
  useEffect(() => {
    if (isEmpty(context.aggregations) && aggregations.length) {
      context.setAggregations(aggregations as Aggregations)
    }
  }, [aggregations, context])

  const {
    columnCount,
    filtered_artworks: {
      pageCursors,
      pageInfo: { hasNextPage },
    },
  } = props

  /**
   * Load next page of artworks
   */
  function loadNext() {
    if (hasNextPage) {
      loadPage(context.filters.page + 1)
    }
  }

  /**
   * Refetch page of artworks based on cursor
   */
  function loadPage(page) {
    context.setFilter("page", page)
  }

  return (
    <>
      <LoadingArea isLoading={props.isLoading}>
        <ArtworkGrid
          artworks={props.filtered_artworks}
          columnCount={columnCount}
          contextModule={ContextModule.artworkGrid}
          preloadImageCount={6}
          itemMargin={40}
          user={user}
          mediator={mediator}
          onClearFilters={context.resetFilters}
          emptyStateComponent={context.ZeroState && <context.ZeroState />}
          onBrickClick={artwork => {
            trackEvent(
              clickedMainArtworkGrid({
                contextPageOwnerId,
                contextPageOwnerSlug,
                contextPageOwnerType,
                destinationPageOwnerId: artwork.internalID,
                destinationPageOwnerSlug: artwork.slug,
              })
            )
          }}
        />

        <Spacer mb={3} />

        <Box>
          <Pagination
            hasNextPage={hasNextPage}
            pageCursors={pageCursors}
            onClick={(_cursor, page) => loadPage(page)}
            onNext={() => loadNext()}
            scrollTo="#jump--artworkFilter"
          />
        </Box>
      </LoadingArea>
    </>
  )
}

export const ArtworkFilterArtworkGridRefetchContainer = createFragmentContainer(
  ArtworkFilterArtworkGrid,
  {
    filtered_artworks: graphql`
      fragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {
        id
        aggregations {
          slice
          counts {
            value
            name
            count
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
        pageCursors {
          ...Pagination_pageCursors
        }
        edges {
          node {
            id
          }
        }
        ...ArtworkGrid_artworks
      }
    `,
  }
)

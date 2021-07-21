import { Spacer, useThemeConfig } from "@artsy/palette"
import React from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { ArtworkFilterArtworkGrid_filtered_artworks } from "v2/__generated__/ArtworkFilterArtworkGrid_filtered_artworks.graphql"
import { useSystemContext, useTracking } from "v2/System"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"
import { LoadingArea } from "../LoadingArea"
import { useArtworkFilterContext } from "./ArtworkFilterContext"
import { ContextModule, clickedMainArtworkGrid } from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"

interface ArtworkFilterArtworkGridProps {
  columnCount: number[]
  filtered_artworks: ArtworkFilterArtworkGrid_filtered_artworks
  isLoading?: boolean
  offset?: number
  relay: RelayProp
}

const ArtworkFilterArtworkGrid: React.FC<ArtworkFilterArtworkGridProps> = props => {
  const { user } = useSystemContext()
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerType,
    contextPageOwnerSlug,
    contextPageOwnerId,
  } = useAnalyticsContext()
  const context = useArtworkFilterContext()

  const tokens = useThemeConfig({
    v2: { separator: <Spacer my={3} /> },
    v3: { separator: null },
  })

  const {
    columnCount,
    filtered_artworks: {
      pageCursors,
      pageInfo: { hasNextPage },
    },
    offset,
  } = props

  /**
   * Load next page of artworks
   */
  function loadNext() {
    if (hasNextPage) {
      // @ts-expect-error STRICT_NULL_CHECK
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
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      <LoadingArea isLoading={props.isLoading}>
        <ArtworkGrid
          artworks={props.filtered_artworks}
          columnCount={columnCount}
          contextModule={ContextModule.artworkGrid}
          itemMargin={40}
          user={user}
          onClearFilters={context.resetFilters}
          emptyStateComponent={context.ZeroState && <context.ZeroState />}
          onBrickClick={(artwork, artworkIndex) => {
            trackEvent(
              clickedMainArtworkGrid({
                // @ts-expect-error STRICT_NULL_CHECK
                contextPageOwnerType,
                contextPageOwnerSlug,
                contextPageOwnerId,
                destinationPageOwnerId: artwork.internalID,
                destinationPageOwnerSlug: artwork.slug,
                position: artworkIndex,
                // @ts-expect-error STRICT_NULL_CHECK
                sort: context.filters.sort,
              })
            )
          }}
        />

        {tokens.separator}

        <Pagination
          hasNextPage={hasNextPage}
          pageCursors={pageCursors}
          onClick={(_cursor, page) => loadPage(page)}
          onNext={() => loadNext()}
          scrollTo="#jump--artworkFilter"
          offset={offset}
        />
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

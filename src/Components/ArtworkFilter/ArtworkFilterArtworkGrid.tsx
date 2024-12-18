import * as React from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { ArtworkFilterArtworkGrid_filtered_artworks$data } from "__generated__/ArtworkFilterArtworkGrid_filtered_artworks.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import { useArtworkFilterContext } from "./ArtworkFilterContext"
import {
  ActionType,
  ClickedMainArtworkGrid,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { LoadingArea } from "Components/LoadingArea"

interface ArtworkFilterArtworkGridProps {
  columnCount: number[]
  filtered_artworks: ArtworkFilterArtworkGrid_filtered_artworks$data
  isLoading?: boolean
  offset?: number
  relay: RelayProp
}

const ArtworkFilterArtworkGrid: React.FC<
  React.PropsWithChildren<ArtworkFilterArtworkGridProps>
> = props => {
  const { user } = useSystemContext()
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerSlug, contextPageOwnerId } =
    useAnalyticsContext()
  const context = useArtworkFilterContext()

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
      loadPage((context?.filters?.page ?? 0) + 1)
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
      <LoadingArea isLoading={!!props.isLoading}>
        <ArtworkGrid
          artworks={props.filtered_artworks}
          columnCount={columnCount}
          contextModule={ContextModule.artworkGrid}
          itemMargin={40}
          user={user}
          onClearFilters={context.resetFilters}
          emptyStateComponent={context.ZeroState && <context.ZeroState />}
          onBrickClick={(artwork, artworkIndex) => {
            const event: ClickedMainArtworkGrid = {
              action: ActionType.clickedMainArtworkGrid,
              context_module: ContextModule.artworkGrid,
              context_page_owner_type: contextPageOwnerType,
              context_page_owner_slug: contextPageOwnerSlug,
              context_page_owner_id: contextPageOwnerId,
              destination_page_owner_id: artwork.internalID,
              destination_page_owner_slug: artwork.slug,
              destination_page_owner_type: OwnerType.artwork,
              position: artworkIndex,
              sort: context?.filters?.sort,
              type: "thumbnail",
            }
            trackEvent(event)
          }}
        />

        <Pagination
          hasNextPage={hasNextPage}
          pageCursors={pageCursors}
          onClick={(_cursor, page) => loadPage(page)}
          onNext={() => loadNext()}
          scrollTo="artworkFilter"
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
      fragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection
        @argumentDefinitions(
          includeBlurHash: { type: "Boolean!", defaultValue: true }
        ) {
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
        ...ArtworkGrid_artworks @arguments(includeBlurHash: $includeBlurHash)
      }
    `,
  }
)

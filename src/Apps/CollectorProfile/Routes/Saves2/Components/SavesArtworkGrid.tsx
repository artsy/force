import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SavesArtworkGrid_filtered_artworks$data } from "__generated__/SavesArtworkGrid_filtered_artworks.graphql"
import { useTracking } from "react-tracking"
import ArtworkGrid from "Components/ArtworkGrid"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import { ContextModule, clickedMainArtworkGrid } from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { LoadingArea } from "Components/LoadingArea"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"

interface SavesArtworkGridProps {
  artworks: SavesArtworkGrid_filtered_artworks$data
  isLoading?: boolean
}

/**
 * In the future we plan to use the `BaseArtworkFilter` and `ArtworkFilterArtworkGrid` components
 * when filter support is added.
 */
const SavesArtworkGrid: React.FC<SavesArtworkGridProps> = props => {
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerType,
    contextPageOwnerSlug,
    contextPageOwnerId,
  } = useAnalyticsContext()
  const context = useArtworkFilterContext()

  const { artworks } = props
  const {
    pageCursors,
    pageInfo: { hasNextPage },
  } = artworks

  /**
   * Load next page of artworks
   */
  function loadNext() {
    if (hasNextPage) {
      const prevPage = context?.filters?.page ?? 0
      loadPage(prevPage + 1)
    }
  }

  /**
   * Refetch page of artworks based on cursor
   */
  function loadPage(page) {
    context.setFilter("page", page)
  }

  // TODO: Pass `isLoading` prop
  return (
    <>
      <LoadingArea isLoading={!!props.isLoading}>
        <ArtworkGrid
          artworks={artworks}
          columnCount={[2, 2, 2, 3]}
          contextModule={ContextModule.artworkGrid}
          itemMargin={40}
          onClearFilters={context.resetFilters}
          emptyStateComponent={context.ZeroState && <context.ZeroState />}
          onBrickClick={(artwork, artworkIndex) => {
            // TODO: Clarify moments about analytics
            trackEvent(
              clickedMainArtworkGrid({
                contextPageOwnerType: contextPageOwnerType!,
                contextPageOwnerSlug,
                contextPageOwnerId,
                destinationPageOwnerId: artwork.internalID,
                destinationPageOwnerSlug: artwork.slug,
                position: artworkIndex,
                sort: context?.filters?.sort,
              })
            )
          }}
        />

        <Pagination
          hasNextPage={hasNextPage}
          pageCursors={pageCursors}
          onClick={(_cursor, page) => loadPage(page)}
          onNext={() => loadNext()}
          scrollTo="artworkFilter"
        />
      </LoadingArea>
    </>
  )
}

export const SavesArtworkGridFragmentContainer = createFragmentContainer(
  SavesArtworkGrid,
  {
    artworks: graphql`
      fragment SavesArtworkGrid_filtered_artworks on ArtworkConnection {
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

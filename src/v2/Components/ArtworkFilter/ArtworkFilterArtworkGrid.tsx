import { Box, Spacer, Spinner, useThemeConfig } from "@artsy/palette"
import * as React from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { ArtworkFilterArtworkGrid_filtered_artworks } from "v2/__generated__/ArtworkFilterArtworkGrid_filtered_artworks.graphql"
import { useSystemContext } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"
import { useArtworkFilterContext } from "./ArtworkFilterContext"
import { ContextModule, clickedMainArtworkGrid } from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
import { Sticky } from "../Sticky"
import { isEmpty } from "lodash"
import { ArtworkGridEmptyState } from "../ArtworkGrid/ArtworkGridEmptyState"
import { ZeroState } from "v2/Apps/Artist/Routes/WorksForSale/Components/ZeroState"
import { useRouter } from "v2/System/Router/useRouter"

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
  const { match } = useRouter()
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
      loadPage(context?.filters?.page! + 1)
    }
  }

  /**
   * Refetch page of artworks based on cursor
   */
  function loadPage(page) {
    context.setFilter("page", page)
  }

  const isArtistPage = match.location.pathname.includes("/artist/")

  const hasAppliedFilters = !isEmpty(context?.selectedFiltersCounts)

  return (
    <>
      <LoadingArea isLoading={props.isLoading}>
        <ArtworkGrid
          artworks={props.filtered_artworks}
          columnCount={columnCount}
          contextModule={ContextModule.artworkGrid}
          itemMargin={40}
          user={user}
          onClearFilters={context.resetFilters}
          emptyStateComponent={
            isArtistPage ? (
              !!hasAppliedFilters ? (
                <ArtworkGridEmptyState onClearFilters={context.resetFilters} />
              ) : (
                <ZeroState />
              )
            ) : (
              context.ZeroState && <context.ZeroState />
            )
          }
          onBrickClick={(artwork, artworkIndex) => {
            trackEvent(
              clickedMainArtworkGrid({
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                contextPageOwnerType,
                contextPageOwnerSlug,
                contextPageOwnerId,
                destinationPageOwnerId: artwork.internalID,
                destinationPageOwnerSlug: artwork.slug,
                position: artworkIndex,
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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

const LoadingArea: React.FC<{ isLoading?: boolean }> = ({
  isLoading,
  children,
}) => {
  return (
    <Box position="relative">
      {isLoading && (
        <Sticky>
          <Box height={300} width="100%" position="absolute">
            <Spinner />
          </Box>
        </Sticky>
      )}

      <Box opacity={isLoading ? 0.1 : 1}>{children}</Box>
    </Box>
  )
}

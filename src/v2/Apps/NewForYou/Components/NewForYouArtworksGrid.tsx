import { Text } from "@artsy/palette"
import React, { FC, useCallback, useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer } from "v2/Components/Pagination"
import createLogger from "v2/Utils/logger"
import { NewForYouArtworksGrid_viewer } from "v2/__generated__/NewForYouArtworksGrid_viewer.graphql"
import ArtworksGrid from "v2/Components/ArtworkGrid"

const logger = createLogger("NewForYouArtworksGrid.tsx")
interface NewForYouArtworksGridProps {
  viewer: NewForYouArtworksGrid_viewer
  relay: RelayRefetchProp
}

const PAGE_SIZE = 10

export const NewForYouArtworksGrid: FC<NewForYouArtworksGridProps> = ({
  viewer,
  relay,
}) => {
  const { pageInfo, pageCursors } = viewer.artworksForUser!
  const { hasNextPage, endCursor } = pageInfo
  const [loading, setLoading] = useState(false)

  const loadAfter = useCallback(
    (cursor: string) => {
      setLoading(true)
      relay.refetch(
        {
          after: cursor,
          before: null,
          first: PAGE_SIZE,
          last: null,
        },
        null,
        error => {
          if (error) {
            logger.error(error)
          }
          setLoading(false)
        }
      )
    },
    [relay]
  )

  const loadNext = useCallback(() => {
    if (hasNextPage && endCursor) {
      loadAfter(endCursor)
    }
  }, [hasNextPage, endCursor, loadAfter])

  return (
    <>
      {viewer.artworksForUser ? (
        <ArtworksGrid
          artworks={viewer.artworksForUser}
          columnCount={[2, 3]}
          itemMargin={40}
          loading={loading}
        />
      ) : (
        <Text variant="lg" mt={4} color="black60">
          Nothing yet.
        </Text>
      )}

      <PaginationFragmentContainer
        hasNextPage={hasNextPage}
        onClick={loadAfter}
        onNext={loadNext}
        pageCursors={pageCursors}
      />
    </>
  )
}

export const NewForYouArtworksGridRefetchContainer = createRefetchContainer(
  NewForYouArtworksGrid,
  {
    viewer: graphql`
      fragment NewForYouArtworksGrid_viewer on Viewer
        @argumentDefinitions(
          after: { type: "String" }
          before: { type: "String" }
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
        ) {
        artworksForUser(
          first: $first
          last: $last
          after: $after
          before: $before
          includeBackfill: true
        ) {
          ...ArtworkGrid_artworks
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
        }
      }
    `,
  },
  graphql`
    query NewForYouArtworksGridQuery(
      $after: String
      $before: String
      $first: Int!
      $last: Int
    ) {
      viewer {
        ...NewForYouArtworksGrid_viewer
          @arguments(first: $first, last: $last, after: $after, before: $before)
      }
    }
  `
)

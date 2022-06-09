import { Text } from "@artsy/palette"
import React, { FC } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { PaginationFragmentContainer } from "v2/Components/Pagination"
import { NewForYouArtworksGrid_viewer } from "v2/__generated__/NewForYouArtworksGrid_viewer.graphql"

interface NewForYouArtworksGridProps {
  viewer: NewForYouArtworksGrid_viewer
  relay: RelayRefetchProp
}

const PAGE_SIZE = 10

export const NewForYouArtworksGrid: FC<NewForYouArtworksGridProps> = ({
  viewer,
  relay,
}) => {
  const { hasNextPage, endCursor } = viewer.artworksForUser?.pageInfo ?? {}
  const [loading, setLoading] = React.useState(false)

  const loadAfter = (cursor: string) => {
    setLoading(true)
    relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        before: null,
        last: null,
      },
      null,
      (error: Error) => {
        if (error) {
          console.log(error)
        }
        setLoading(false)
      }
    )
  }
  const loadNext = () => {
    if (hasNextPage && endCursor) {
      loadAfter(endCursor)
    }
  }

  return (
    <>
      {viewer.artworksForUser ? (
        <>
          <ArtworkGrid artworks={viewer.artworksForUser} loading={loading} />
          <PaginationFragmentContainer
            hasNextPage={!!hasNextPage}
            onClick={loadAfter}
            onNext={loadNext}
            pageCursors={viewer.artworksForUser.pageCursors}
          />
        </>
      ) : (
        <Text variant="lg" mt={4} color="black60">
          Nothing yet.
        </Text>
      )}
    </>
  )
}

export const NewForYouArtworkGridRefetchContainer = createRefetchContainer(
  NewForYouArtworksGrid,
  {
    viewer: graphql`
      fragment NewForYouArtworksGrid_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        artworksForUser(
          first: $first
          last: $last
          after: $after
          before: $before
          includeBackfill: true
        ) {
          ...ArtworkGrid_artworks
          pageCursors {
            ...Pagination_pageCursors
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
  },
  graphql`
    query NewForYouArtworksGridRefetchQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
    ) {
      viewer {
        ...NewForYouArtworksGrid_viewer
          @arguments(first: $first, last: $last, after: $after, before: $before)
      }
    }
  `
)

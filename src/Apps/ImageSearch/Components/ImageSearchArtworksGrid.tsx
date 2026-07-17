import { Stack } from "@artsy/palette"
import { IMAGE_SEARCH_SECTION_ID } from "Apps/ImageSearch/ImageSearchApp"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { EmptyState } from "Components/EmptyState"
import { LoadingArea } from "Components/LoadingArea"
import { PaginationFragmentContainer } from "Components/Pagination"
import { useRouter } from "System/Hooks/useRouter"
import { useJump } from "Utils/Hooks/useJump"
import type { ImageSearchArtworksGrid_viewer$data } from "__generated__/ImageSearchArtworksGrid_viewer.graphql"
import { type FC, useState } from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"

const PAGE_SIZE = 30

interface ImageSearchArtworksGridProps {
  viewer: ImageSearchArtworksGrid_viewer$data
  relay: RelayRefetchProp
}

export const ImageSearchArtworksGrid: FC<
  React.PropsWithChildren<ImageSearchArtworksGridProps>
> = ({ viewer, relay }) => {
  const { match } = useRouter()
  const { jumpTo } = useJump()

  const [isLoading, setIsLoading] = useState(false)

  const connection = viewer.artworksByImageConnection

  const s3Key = match.location.query.s3Key
  const s3Bucket = match.location.query.s3Bucket

  const loadPage = (cursor: string | null | undefined) => {
    setIsLoading(true)

    relay.refetch(
      { first: PAGE_SIZE, after: cursor, s3Key, s3Bucket },
      null,
      error => {
        if (error) {
          console.error("ImageSearchArtworksGrid: refetch failed", error)
        }

        setIsLoading(false)
        jumpTo(IMAGE_SEARCH_SECTION_ID, { offset: 20 })
      },
    )
  }

  if (!connection || (connection.totalCount ?? 0) === 0) {
    return (
      <EmptyState
        title="No results found."
        description="Try searching with a different image."
      />
    )
  }

  return (
    <Stack gap={4}>
      <LoadingArea isLoading={isLoading}>
        <ArtworkGrid artworks={connection} columnCount={[2, 3, 4]} />
      </LoadingArea>

      <PaginationFragmentContainer
        hasNextPage={!!connection.pageInfo.hasNextPage}
        pageCursors={connection.pageCursors}
        onClick={cursor => {
          loadPage(cursor)
        }}
        onNext={() => {
          loadPage(connection.pageInfo.endCursor)
        }}
        scrollTo={IMAGE_SEARCH_SECTION_ID}
        offset={20}
      />
    </Stack>
  )
}

export const ImageSearchArtworksGridRefetchContainer = createRefetchContainer(
  ImageSearchArtworksGrid,
  {
    viewer: graphql`
      fragment ImageSearchArtworksGrid_viewer on Viewer
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 30 }
        after: { type: "String" }
        s3Key: { type: "String!" }
        s3Bucket: { type: "String!" }
      ) {
        artworksByImageConnection(
          first: $first
          after: $after
          s3Key: $s3Key
          s3Bucket: $s3Bucket
        ) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          ...ArtworkGrid_artworks
        }
      }
    `,
  },
  graphql`
    query ImageSearchArtworksGridRefetchQuery(
      $first: Int
      $after: String
      $s3Key: String!
      $s3Bucket: String!
    ) {
      viewer {
        ...ImageSearchArtworksGrid_viewer
          @arguments(
            first: $first
            after: $after
            s3Key: $s3Key
            s3Bucket: $s3Bucket
          )
      }
    }
  `,
)

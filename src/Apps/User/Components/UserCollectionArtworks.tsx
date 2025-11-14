import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid/ArtworkGrid"
import { Masonry } from "Components/Masonry"
import { PaginationFragmentContainer } from "Components/Pagination"
import { extractNodes } from "Utils/extractNodes"
import { Message, PaginationSkeleton, Spacer, Stack } from "@artsy/palette"
import type { UserCollectionArtworksQuery } from "__generated__/UserCollectionArtworksQuery.graphql"
import { type FC, Fragment, useState } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

interface UserCollectionArtworksProps {
  id: string
  userID: string
}

export const UserCollectionArtworks: FC<
  React.PropsWithChildren<UserCollectionArtworksProps>
> = ({ id, userID }) => {
  const [page, setPage] = useState(1)

  const { collection } = useLazyLoadQuery<UserCollectionArtworksQuery>(QUERY, {
    id,
    page,
    size: 30,
    sort: "POSITION_DESC",
    userID,
  })

  const artworks = extractNodes(collection?.artworksConnection)

  return (
    <Stack gap={4}>
      {artworks.length > 0 ? (
        <Masonry columnCount={[2, 3, 4]}>
          {artworks.map(artwork => {
            return (
              <Fragment key={artwork.id}>
                <ArtworkGridItemFragmentContainer
                  artwork={artwork}
                  {...(artwork.published
                    ? {}
                    : {
                        showHoverDetails: false,
                        showSaveButton: false,
                        disableRouterLinking: true,
                      })}
                />

                <Spacer y={2} />
              </Fragment>
            )
          })}
        </Masonry>
      ) : (
        <Message>There aren’t any works in this list yet.</Message>
      )}

      <PaginationFragmentContainer
        getHref={() => ""}
        hasNextPage={!!collection?.artworksConnection?.pageInfo.hasNextPage}
        offset={20}
        onClick={(_, nextPage) => {
          setPage(nextPage)
        }}
        onNext={() => {
          setPage(page + 1)
        }}
        pageCursors={collection?.artworksConnection?.pageCursors}
        scrollTo="UserCollectionRoute"
      />
    </Stack>
  )
}

const QUERY = graphql`
  query UserCollectionArtworksQuery(
    $id: String!
    $page: Int
    $sort: CollectionArtworkSorts
    $size: Int
    $userID: String!
  ) {
    collection(id: $id, userID: $userID) {
      internalID
      artworksConnection(first: $size, page: $page, sort: $sort) {
        pageInfo {
          hasNextPage
        }
        pageCursors {
          ...Pagination_pageCursors
        }
        edges {
          node {
            ...GridItem_artwork
            id
            published
          }
        }
      }
    }
  }
`

export const UserCollectionArtworksPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Stack gap={4}>
      <ArtworkGridPlaceholder amount={30} columnCount={[2, 3, 4]} />

      <PaginationSkeleton />
    </Stack>
  )
}

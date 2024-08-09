import { FC, Fragment } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import {
  CollectionArtworkSorts,
  SavesArtworksGridQuery,
} from "__generated__/SavesArtworksGridQuery.graphql"
import { CustomRangeSegment } from "Components/PriceRange/constants"
import { Masonry } from "Components/Masonry"
import { extractNodes } from "Utils/extractNodes"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { Message, PaginationSkeleton, Spacer, Stack } from "@artsy/palette"
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid/ArtworkGrid"
import { PaginationFragmentContainer } from "Components/Pagination"

interface SavesArtworksGridProps {
  id: string
  onPage: (page: number) => void
  page: number
  priceMax: CustomRangeSegment
  priceMin: CustomRangeSegment
  sort: CollectionArtworkSorts
}

export const SavesArtworksGrid: FC<SavesArtworksGridProps> = ({
  id,
  onPage,
  page,
  priceMax,
  priceMin,
  sort,
}) => {
  const { me } = useLazyLoadQuery<SavesArtworksGridQuery>(QUERY, {
    id,
    page,
    priceMax: priceMax === "*" ? undefined : priceMax,
    priceMin: priceMin === "*" ? undefined : priceMin,
    size: 30,
    sort,
  })

  const artworks = extractNodes(me?.collection?.artworksConnection)

  return (
    <Stack gap={4}>
      {artworks.length > 0 ? (
        <Masonry columnCount={[2, 3, 4]}>
          {artworks.map(artwork => {
            return (
              <Fragment key={artwork.id}>
                <ArtworkGridItemFragmentContainer artwork={artwork} />

                <Spacer y={2} />
              </Fragment>
            )
          })}
        </Masonry>
      ) : (
        <Message>Nothing found.</Message>
      )}

      <PaginationFragmentContainer
        getHref={() => ""}
        hasNextPage={!!me?.collection?.artworksConnection?.pageInfo.hasNextPage}
        offset={20}
        onClick={(_, nextPage) => {
          onPage(nextPage)
        }}
        onNext={onPage}
        pageCursors={me?.collection?.artworksConnection?.pageCursors}
        scrollTo="SavesArtworks"
      />
    </Stack>
  )
}

const QUERY = graphql`
  query SavesArtworksGridQuery(
    $id: String!
    $page: Int
    $sort: CollectionArtworkSorts
    $size: Int
    $forSale: Boolean
    $priceMax: Int
    $priceMin: Int
  ) {
    me {
      collection(id: $id) {
        internalID
        artworksConnection(
          first: $size
          page: $page
          sort: $sort
          forSale: $forSale
          priceMax: $priceMax
          priceMin: $priceMin
        ) {
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
            }
          }
        }
      }
    }
  }
`

export const SavesArtworksGridPlaceholder: FC = () => {
  return (
    <Stack gap={4}>
      <ArtworkGridPlaceholder amount={30} columnCount={[2, 3, 4]} />

      <PaginationSkeleton />
    </Stack>
  )
}

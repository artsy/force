import { PaginationSkeleton, Spacer, Stack } from "@artsy/palette"
import {
  DEFAULT_FILTERS,
  SAVES_ARTWORKS_SECTION_ID,
} from "Apps/CollectorProfile/Routes/Saves/Components/SavesArtworks"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid/ArtworkGrid"
import { EmptyState } from "Components/EmptyState"
import { Masonry } from "Components/Masonry"
import { PaginationFragmentContainer } from "Components/Pagination"
import type { CustomRangeSegment } from "Components/PriceRange/constants"
import { extractNodes } from "Utils/extractNodes"
import type {
  CollectionArtworkSorts,
  SavesArtworksGridQuery,
} from "__generated__/SavesArtworksGridQuery.graphql"
import { isEqual } from "lodash"
import { type FC, Fragment, useMemo } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

interface SavesArtworksGridProps {
  id: string
  onClearFilters: () => void
  onPage: (page: number) => void
  page: number
  priceMax: CustomRangeSegment
  priceMin: CustomRangeSegment
  sort: CollectionArtworkSorts
}

export const SavesArtworksGrid: FC<
  React.PropsWithChildren<SavesArtworksGridProps>
> = ({ id, onClearFilters, onPage, page, priceMax, priceMin, sort }) => {
  const { me } = useLazyLoadQuery<SavesArtworksGridQuery>(QUERY, {
    id,
    page,
    priceMax: priceMax === "*" ? undefined : priceMax,
    priceMin: priceMin === "*" ? undefined : priceMin,
    size: 30,
    sort,
  })

  const artworks = extractNodes(me?.collection?.artworksConnection)
  const isDefaultFilters = useMemo(
    () =>
      isEqual(DEFAULT_FILTERS, {
        page,
        priceMax,
        priceMin,
      }),
    [page, priceMax, priceMin],
  )

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
        <SavesArtworksGridEmptyState
          onClearFilters={isDefaultFilters ? undefined : onClearFilters}
        />
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
        scrollTo={SAVES_ARTWORKS_SECTION_ID}
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

export const SavesArtworksGridPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Stack gap={4}>
      <ArtworkGridPlaceholder amount={30} columnCount={[2, 3, 4]} />

      <PaginationSkeleton />
    </Stack>
  )
}

interface SavesArtworksGridEmptyStateProps {
  onClearFilters?: () => void
}

export const SavesArtworksGridEmptyState: FC<
  React.PropsWithChildren<SavesArtworksGridEmptyStateProps>
> = ({ onClearFilters }) => {
  return (
    <>
      {onClearFilters ? (
        <EmptyState
          title="There aren’t any works available that meet the following criteria at this time."
          description="Change your filter criteria to view more works."
          action={{
            label: "Clear all filters",
            onClick: onClearFilters,
          }}
        />
      ) : (
        <EmptyState
          title="Nothing yet."
          description="Save works to your collection to view them here."
        />
      )}
    </>
  )
}

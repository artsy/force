import { ContextModule, OwnerType } from "@artsy/cohesion"
import { Text } from "@artsy/palette"
import ArtworkGrid, {
  type ArtworkGridLayout,
} from "Components/ArtworkGrid/ArtworkGrid"
import { InfiniteScrollSentinel } from "Components/InfiniteScrollSentinel"
import { ArtworkItemImpression } from "Components/RailImpression/ArtworkItemImpression"
import { useRouter } from "System/Hooks/useRouter"
import type { InspiredByYourSavesArtworksGrid_me$key } from "__generated__/InspiredByYourSavesArtworksGrid_me.graphql"
import type { FC } from "react"
import { graphql, usePaginationFragment } from "react-relay"

const PAGE_SIZE = 30

interface InspiredByYourSavesArtworksGridProps {
  me: InspiredByYourSavesArtworksGrid_me$key
}

export const InspiredByYourSavesArtworksGrid: FC<
  React.PropsWithChildren<InspiredByYourSavesArtworksGridProps>
> = ({ me }) => {
  const { match } = useRouter()
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    FRAGMENT,
    me,
  )

  const layout = (
    match?.location?.query?.layout ?? "masonry"
  ).toUpperCase() as ArtworkGridLayout

  const handleNext = () => {
    if (!hasNext || isLoadingNext) {
      return
    }

    loadNext(PAGE_SIZE)
  }

  if (
    !data.basedOnUserSaves ||
    (data.basedOnUserSaves?.totalCount ?? 0) === 0
  ) {
    return (
      <Text variant="lg-display" mt={4} color="mono60">
        Nothing yet.
      </Text>
    )
  }

  return (
    <>
      <ArtworkGrid
        artworks={data.basedOnUserSaves}
        columnCount={[2, 3, 4]}
        layout={layout}
        renderItemWrapper={({ artwork, artworkIndex, children }) => {
          return (
            <ArtworkItemImpression
              artworkID={artwork.internalID}
              contextModule={ContextModule.artworkGrid}
              contextScreen={OwnerType.basedOnYourRecentSaves}
              position={artworkIndex}
              width="100%"
            >
              {children}
            </ArtworkItemImpression>
          )
        }}
      />

      {hasNext && <InfiniteScrollSentinel onNext={handleNext} />}
    </>
  )
}

const FRAGMENT = graphql`
  fragment InspiredByYourSavesArtworksGrid_me on Me
  @argumentDefinitions(first: { type: "Int" }, after: { type: "String" })
  @refetchable(queryName: "InspiredByYourSavesArtworksGridPaginationQuery") {
    basedOnUserSaves(first: $first, after: $after)
      @connection(key: "InspiredByYourSavesArtworksGrid_basedOnUserSaves") {
      totalCount
      edges {
        node {
          id
        }
      }
      ...ArtworkGrid_artworks
    }
  }
`

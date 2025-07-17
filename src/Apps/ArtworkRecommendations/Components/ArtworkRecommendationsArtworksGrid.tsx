import { Text } from "@artsy/palette"
import ArtworkGrid, {
  ArtworkGridLayout,
} from "Components/ArtworkGrid/ArtworkGrid"
import { InfiniteScrollSentinel } from "Components/InfiniteScrollSentinel"
import { useRouter } from "System/Hooks/useRouter"
import type { ArtworkRecommendationsArtworksGrid_me$key } from "__generated__/ArtworkRecommendationsArtworksGrid_me.graphql"
import type { FC } from "react"
import { graphql, usePaginationFragment } from "react-relay"

interface ArtworkRecommendationsArtworksGridProps {
  me: ArtworkRecommendationsArtworksGrid_me$key
}

export const ArtworkRecommendationsArtworksGrid: FC<
  React.PropsWithChildren<ArtworkRecommendationsArtworksGridProps>
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

    loadNext(10)
  }

  if (
    !data.artworkRecommendations ||
    (data.artworkRecommendations?.totalCount ?? 0) === 0
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
        artworks={data.artworkRecommendations}
        columnCount={[2, 3, 4]}
        layout={layout}
      />

      {hasNext && <InfiniteScrollSentinel onNext={handleNext} />}
    </>
  )
}

const FRAGMENT = graphql`
  fragment ArtworkRecommendationsArtworksGrid_me on Me
  @argumentDefinitions(first: { type: "Int" }, after: { type: "String" })
  @refetchable(queryName: "ArtworkRecommendationsArtworksGridPaginationQuery") {
    artworkRecommendations(first: $first, after: $after)
      @connection(
        key: "ArtworkRecommendationsArtworksGrid_artworkRecommendations"
      ) {
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

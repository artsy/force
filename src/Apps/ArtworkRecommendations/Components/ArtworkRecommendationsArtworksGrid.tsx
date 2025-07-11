import { Text } from "@artsy/palette"
import ArtworkGrid, {
  ArtworkGridLayout,
} from "Components/ArtworkGrid/ArtworkGrid"
import { useRouter } from "System/Hooks/useRouter"
import type { ArtworkRecommendationsArtworksGrid_me$data } from "__generated__/ArtworkRecommendationsArtworksGrid_me.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtworkRecommendationsArtworksGridProps {
  me: ArtworkRecommendationsArtworksGrid_me$data
}

export const ArtworkRecommendationsArtworksGrid: FC<
  React.PropsWithChildren<ArtworkRecommendationsArtworksGridProps>
> = ({ me }) => {
  const { match } = useRouter()

  const layout = (
    match?.location?.query?.layout ?? "masonry"
  ).toUpperCase() as ArtworkGridLayout

  return (
    <>
      {me.artworkRecommendations &&
      (me.artworkRecommendations.totalCount ?? 0) > 0 ? (
        <ArtworkGrid
          artworks={me.artworkRecommendations}
          columnCount={[2, 3, 4]}
          layout={layout}
        />
      ) : (
        <Text variant="lg-display" mt={4} color="mono60">
          Nothing yet.
        </Text>
      )}
    </>
  )
}

export const ArtworkRecommendationsArtworksGridFragmentContainer =
  createFragmentContainer(ArtworkRecommendationsArtworksGrid, {
    me: graphql`
      fragment ArtworkRecommendationsArtworksGrid_me on Me
      @argumentDefinitions(first: { type: "Int" }) {
        artworkRecommendations(first: $first) {
          totalCount
          ...ArtworkGrid_artworks
        }
      }
    `,
  })

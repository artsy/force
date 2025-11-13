import ArtworkGrid, {
  type ArtworkGridLayout,
} from "Components/ArtworkGrid/ArtworkGrid"
import { useRouter } from "System/Hooks/useRouter"
import { Text } from "@artsy/palette"
import type { NewForYouArtworksGrid_viewer$data } from "__generated__/NewForYouArtworksGrid_viewer.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface NewForYouArtworksGridProps {
  viewer: NewForYouArtworksGrid_viewer$data
}

export const NewForYouArtworksGrid: FC<
  React.PropsWithChildren<NewForYouArtworksGridProps>
> = ({ viewer }) => {
  const { match } = useRouter()

  const layout = (
    match?.location?.query?.layout ?? "masonry"
  ).toUpperCase() as ArtworkGridLayout

  return (
    <>
      {viewer.artworksForUser &&
      (viewer.artworksForUser.totalCount ?? 0) > 0 ? (
        <ArtworkGrid
          artworks={viewer.artworksForUser}
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

export const NewForYouArtworksGridFragmentContainer = createFragmentContainer(
  NewForYouArtworksGrid,
  {
    viewer: graphql`
      fragment NewForYouArtworksGrid_viewer on Viewer
      @argumentDefinitions(
        first: { type: "Int" }
        includeBackfill: { type: "Boolean!" }
        version: { type: "String" }
        maxWorksPerArtist: { type: "Int" }
      ) {
        artworksForUser(
          first: $first
          includeBackfill: $includeBackfill
          version: $version
          maxWorksPerArtist: $maxWorksPerArtist
        ) {
          totalCount
          ...ArtworkGrid_artworks
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
  }
)

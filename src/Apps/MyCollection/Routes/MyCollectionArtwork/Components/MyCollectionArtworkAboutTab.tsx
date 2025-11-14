import { MyCollectionArtworkDetails } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDetails"
import { ArtistCurrentArticlesRailQueryRenderer } from "Components/ArtistCurrentArticlesRail"
import { Box, Spacer } from "@artsy/palette"
import type { MyCollectionArtworkAboutTab_artwork$key } from "__generated__/MyCollectionArtworkAboutTab_artwork.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface MyCollectionArtworkAboutTabProps {
  artwork: MyCollectionArtworkAboutTab_artwork$key
}

export const MyCollectionArtworkAboutTab: FC<
  React.PropsWithChildren<MyCollectionArtworkAboutTabProps>
> = props => {
  const artwork = useFragment(FRAGMENT, props.artwork)

  return (
    <Box pt={[1, 0]}>
      <MyCollectionArtworkDetails artwork={artwork} />

      <Spacer x={6} y={6} />

      <ArtistCurrentArticlesRailQueryRenderer
        slug={artwork?.artist?.slug ?? ""}
        artworkId={artwork.internalID}
      />
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment MyCollectionArtworkAboutTab_artwork on Artwork {
    ...MyCollectionArtworkDetails_artwork

    artist(shallow: true) {
      slug
      targetSupply {
        priority
      }
    }
    internalID
  }
`

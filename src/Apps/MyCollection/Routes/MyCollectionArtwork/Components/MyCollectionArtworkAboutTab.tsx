import { Box, Spacer } from "@artsy/palette"
import { MyCollectionArtworkDetails } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDetails"
import { ArtistCurrentArticlesRailQueryRenderer } from "Components/ArtistCurrentArticlesRail"
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

  const submission = artwork.consignmentSubmission
  const isP1Artist = artwork.artist?.targetSupply?.priority === "TRUE"
  const showSubmitForSaleButton = isP1Artist && !submission

  return (
    <Box pt={[1, 0]}>
      <MyCollectionArtworkDetails artwork={artwork} />

      {!showSubmitForSaleButton && <Spacer x={6} y={6} />}

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
    consignmentSubmission {
      internalID
    }
    internalID
  }
`

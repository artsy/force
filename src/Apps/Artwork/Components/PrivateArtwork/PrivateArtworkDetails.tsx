import { Box, FullBleed, Spacer } from "@artsy/palette"
import { PrivateArtworkAboutWork } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkAboutWork"
import { PrivateArtworkMetadata } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkMetadata"
import { Media } from "Utils/Responsive"
import type { PrivateArtworkDetails_artwork$key } from "__generated__/PrivateArtworkDetails_artwork.graphql"
import { graphql, useFragment } from "react-relay"
import { PrivateArtworkAboutArtist } from "./PrivateArtworkAboutArtist"

interface PrivateArtworkDetailsProps {
  artwork: PrivateArtworkDetails_artwork$key
}

export const PrivateArtworkDetails: React.FC<
  React.PropsWithChildren<PrivateArtworkDetailsProps>
> = ({ artwork }) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkDetails_artwork on Artwork {
        ...PrivateArtworkAboutWork_artwork
        ...PrivateArtworkAboutArtist_artwork
        ...PrivateArtworkMetadata_artwork
      }
    `,
    artwork,
  )

  return (
    <Box>
      <PrivateArtworkAboutWork artwork={data} />

      <Spacer y={4} />

      <PrivateArtworkMetadata artwork={data} />

      <Spacer y={4} />

      <Media greaterThanOrEqual="sm">
        <PrivateArtworkAboutArtist artwork={data} />
      </Media>
      <Media lessThan="sm">
        <FullBleed>
          <PrivateArtworkAboutArtist artwork={data} />
        </FullBleed>
      </Media>
    </Box>
  )
}

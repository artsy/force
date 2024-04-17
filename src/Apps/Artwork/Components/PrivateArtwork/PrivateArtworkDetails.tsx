import { Box, Spacer } from "@artsy/palette"
import { PrivateArtworkDetails_artwork$key } from "__generated__/PrivateArtworkDetails_artwork.graphql"
import { PrivateArtworkAboutArtist } from "./PrivateArtworkAboutArtist"
import { PrivateArtworkAboutWork } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkAboutWork"
import { graphql, useFragment } from "react-relay"
import { PrivateArtworkMetadata } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkMetadata"

interface PrivateArtworkDetailsProps {
  artwork: PrivateArtworkDetails_artwork$key
}

export const PrivateArtworkDetails: React.FC<PrivateArtworkDetailsProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkDetails_artwork on Artwork {
        ...PrivateArtworkAboutWork_artwork
        ...PrivateArtworkAboutArtist_artwork
        ...PrivateArtworkMetadata_artwork
      }
    `,
    artwork
  )

  return (
    <Box>
      <PrivateArtworkAboutWork artwork={data} />

      <Spacer y={4} />

      <PrivateArtworkMetadata artwork={data} />

      <Spacer y={4} />

      <PrivateArtworkAboutArtist artwork={data} />
    </Box>
  )
}

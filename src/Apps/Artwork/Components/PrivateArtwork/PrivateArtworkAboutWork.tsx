import { Box, HTML, ReadMore, Spacer, Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { PrivateArtworkAboutWork_artwork$key } from "__generated__/PrivateArtworkAboutWork_artwork.graphql"

interface PrivateArtworkAboutWorkProps {
  artwork: PrivateArtworkAboutWork_artwork$key
}

export const PrivateArtworkAboutWork: React.FC<PrivateArtworkAboutWorkProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkAboutWork_artwork on Artwork {
        additionalInformation
      }
    `,
    artwork
  )

  // FIXME: Remove (typechecker)

  return (
    <Box textAlign="center">
      <Text variant="sm" textTransform="uppercase">
        About this work
      </Text>

      {data.additionalInformation && (
        <>
          <Spacer y={2} />
          <HTML variant="lg">
            <ReadMore
              inlineReadMoreLink={false}
              content={`${data.additionalInformation}`}
              maxChars={200}
            />
          </HTML>
        </>
      )}
    </Box>
  )
}

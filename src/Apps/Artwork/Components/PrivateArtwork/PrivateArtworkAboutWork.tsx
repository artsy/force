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
        additionalInformationHTML: additionalInformation(format: HTML)
      }
    `,
    artwork
  )

  if (!data.additionalInformationHTML) {
    return null
  }

  return (
    <Box>
      <Text variant="md" color="black100">
        About This Work
      </Text>

      {data.additionalInformationHTML && (
        <>
          <Spacer y={2} />

          <HTML variant="lg">
            <ReadMore
              inlineReadMoreLink={false}
              content={`${data.additionalInformationHTML}`}
              maxChars={200}
            />
          </HTML>
        </>
      )}
    </Box>
  )
}

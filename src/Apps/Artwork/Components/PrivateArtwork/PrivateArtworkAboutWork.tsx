import { Box, HTML, ReadMore, Spacer, Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { PrivateArtworkAboutWork_artwork$key } from "__generated__/PrivateArtworkAboutWork_artwork.graphql"
import { useTracking } from "react-tracking"
import { ActionType, ClickedOnReadMore } from "@artsy/cohesion"

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
  const { trackEvent } = useTracking()

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
              onReadMoreClicked={() => {
                const payload: ClickedOnReadMore = {
                  action: ActionType.clickedOnReadMore,
                  context_module: "About the work",
                  subject: "Read more",
                  type: "Link",
                }

                trackEvent(payload)
              }}
            />
          </HTML>
        </>
      )}
    </Box>
  )
}

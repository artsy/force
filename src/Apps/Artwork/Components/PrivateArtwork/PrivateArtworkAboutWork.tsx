import { ActionType, type ClickedOnReadMore } from "@artsy/cohesion"
import { Box, HTML, ReadMore, Spacer, Text } from "@artsy/palette"
import type { PrivateArtworkAboutWork_artwork$key } from "__generated__/PrivateArtworkAboutWork_artwork.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface PrivateArtworkAboutWorkProps {
  artwork: PrivateArtworkAboutWork_artwork$key
}

export const PrivateArtworkAboutWork: React.FC<
  React.PropsWithChildren<PrivateArtworkAboutWorkProps>
> = ({ artwork }) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkAboutWork_artwork on Artwork {
        additionalInformationHTML: additionalInformation(format: HTML)
      }
    `,
    artwork,
  )
  const { trackEvent } = useTracking()

  if (!data.additionalInformationHTML) {
    return null
  }

  return (
    <Box>
      <Text variant="md" color="mono100">
        About This Work
      </Text>

      {data.additionalInformationHTML && (
        <>
          <Spacer y={2} />

          <HTML variant="lg">
            <ReadMore
              content={`${data.additionalInformationHTML}`}
              maxLines={3}
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

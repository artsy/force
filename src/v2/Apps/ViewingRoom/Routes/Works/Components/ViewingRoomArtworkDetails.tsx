import React from "react"
import { Box, Button, Sans, Serif } from "@artsy/palette"
import { ViewingRoomArtworkDetails_artwork } from "v2/__generated__/ViewingRoomArtworkDetails_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { AnalyticsSchema, useTracking } from "v2/Artsy"

interface ViewingRoomArtworkDetailsProps {
  artwork: ViewingRoomArtworkDetails_artwork
}

export const ViewingRoomArtworkDetails: React.FC<ViewingRoomArtworkDetailsProps> = ({
  artwork: {
    artistNames,
    title,
    date,
    href,
    additionalInformation,
    saleMessage,
  },
}) => {
  const tracking = useTracking()

  return (
    <Box maxWidth={["100%", 470]} m="auto">
      <Box>
        <Sans size="3t">{artistNames}</Sans>
      </Box>

      <Box style={{ textOverflow: "ellipsis" }}>
        <Sans size="3t" color="black60">
          {[title, date].filter(s => s).join(", ")}
        </Sans>
      </Box>

      {saleMessage && (
        <Box>
          <Sans size="3t" color="black60">
            {saleMessage}
          </Sans>
        </Box>
      )}

      <RouterLink
        to={href}
        onClick={() => {
          tracking.trackEvent({
            action_type: AnalyticsSchema.ActionType.ClickedBuyViewingGroup,
            context_module:
              AnalyticsSchema.ContextModule.ViewingRoomArtworkRail,
            destination_path: href,
            subject: AnalyticsSchema.Subject.Rail,
          })
        }}
      >
        <Button width="100%" size="large" my={2}>
          Buy
        </Button>
      </RouterLink>

      {additionalInformation && (
        <Serif size={["4", "5"]}>{additionalInformation}</Serif>
      )}
    </Box>
  )
}

export const ViewingRoomArtworkDetailsFragmentContainer = createFragmentContainer(
  ViewingRoomArtworkDetails,
  {
    artwork: graphql`
      fragment ViewingRoomArtworkDetails_artwork on Artwork {
        id
        additionalInformation
        artistNames
        title
        date
        href
        saleMessage
      }
    `,
  }
)

import * as React from "react"
import { Button, GridColumns, Column, Text } from "@artsy/palette"
import { ViewingRoomArtworkDetails_artwork$data } from "__generated__/ViewingRoomArtworkDetails_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"

interface ViewingRoomArtworkDetailsProps {
  artwork: ViewingRoomArtworkDetails_artwork$data
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
  const { trackEvent } = useTracking()

  return (
    <>
      <Text variant="sm-display">{artistNames}</Text>

      <Text variant="sm-display" color="black60" overflowEllipsis>
        {[title, date].filter(s => s).join(", ")}
      </Text>

      {saleMessage && (
        <Text variant="sm-display" color="black60">
          {saleMessage}
        </Text>
      )}

      <GridColumns>
        <Column span={4}>
          <Button
            width="100%"
            // @ts-ignore
            as={RouterLink}
            to={href}
            my={2}
            onClick={() => {
              trackEvent({
                action_type:
                  DeprecatedAnalyticsSchema.ActionType.ClickedBuyViewingGroup,
                context_module:
                  DeprecatedAnalyticsSchema.ContextModule
                    .ViewingRoomArtworkRail,
                subject: DeprecatedAnalyticsSchema.Subject.Rail,
                destination_path: href!,
              })
            }}
          >
            Buy
          </Button>
        </Column>
      </GridColumns>

      {additionalInformation && (
        <Text variant="md" mt={4}>
          {additionalInformation}
        </Text>
      )}
    </>
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

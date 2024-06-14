import * as React from "react"
import { Button, GridColumns, Column, Text } from "@artsy/palette"
import { ViewingRoomArtworkDetails_artwork$data } from "__generated__/ViewingRoomArtworkDetails_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { DetailsFragmentContainer } from "Components/Artwork/Details"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"

interface ViewingRoomArtworkDetailsProps {
  artwork: ViewingRoomArtworkDetails_artwork$data
}

export const ViewingRoomArtworkDetails: React.FC<ViewingRoomArtworkDetailsProps> = ({
  artwork,
  artwork: { href, additionalInformation },
}) => {
  const { trackEvent } = useTracking()

  return (
    <ManageArtworkForSavesProvider>
      <DetailsFragmentContainer
        includeLinks={true}
        artwork={artwork}
        hideSaleInfo={false}
        hidePartnerName={true}
        hideArtistName={false}
        isHovered={false}
        showHighDemandIcon={false}
        showHoverDetails={false}
        showSaveButton={true}
      />

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
    </ManageArtworkForSavesProvider>
  )
}

export const ViewingRoomArtworkDetailsFragmentContainer = createFragmentContainer(
  ViewingRoomArtworkDetails,
  {
    artwork: graphql`
      fragment ViewingRoomArtworkDetails_artwork on Artwork {
        ...Details_artwork
        id
        additionalInformation
        href
      }
    `,
  }
)

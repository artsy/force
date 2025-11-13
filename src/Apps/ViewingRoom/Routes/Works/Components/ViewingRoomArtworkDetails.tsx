import { DetailsFragmentContainer } from "Components/Artwork/Details/Details"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { RouterLink } from "System/Components/RouterLink"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Button, Column, GridColumns, HTML } from "@artsy/palette"
import type { ViewingRoomArtworkDetails_artwork$data } from "__generated__/ViewingRoomArtworkDetails_artwork.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface ViewingRoomArtworkDetailsProps {
  artwork: ViewingRoomArtworkDetails_artwork$data
}

export const ViewingRoomArtworkDetails: React.FC<
  React.PropsWithChildren<ViewingRoomArtworkDetailsProps>
> = ({ artwork, artwork: { href, additionalInformation } }) => {
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
            // @ts-expect-error
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
                destination_path: href || "",
              })
            }}
          >
            Buy
          </Button>
        </Column>
      </GridColumns>

      {additionalInformation && (
        <HTML variant="md" mt={4}>
          <div dangerouslySetInnerHTML={{ __html: additionalInformation }} />
        </HTML>
      )}
    </ManageArtworkForSavesProvider>
  )
}

export const ViewingRoomArtworkDetailsFragmentContainer =
  createFragmentContainer(ViewingRoomArtworkDetails, {
    artwork: graphql`
      fragment ViewingRoomArtworkDetails_artwork on Artwork {
        ...Details_artwork
        id
        additionalInformation(format: HTML)
        href
      }
    `,
  })

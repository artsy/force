import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistConsignSellArt_artist$data } from "__generated__/ArtistConsignSellArt_artist.graphql"
import { Button, Spacer, Text } from "@artsy/palette"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Components/RouterLink"
import { SectionContainer } from "./SectionContainer"
import { getConsignSubmissionUrl } from "./Utils/getConsignSubmissionUrl"

interface ArtistConsignSellArtProps {
  artist: ArtistConsignSellArt_artist$data
}

const ArtistConsignSellArt: React.FC<ArtistConsignSellArtProps> = ({
  artist,
}) => {
  const tracking = useTracking()

  return (
    <SectionContainer bg="black10">
      <Text as="h2" variant="xl">
        Sell Art
        <br />
        From Your Collection
      </Text>

      <Spacer y={2} />

      <Text variant="sm-display">
        With Artsy's expert guidance, selling is simple
      </Text>

      <Spacer y={4} />

      <Button
        // @ts-ignore
        as={RouterLink}
        to={getConsignSubmissionUrl({
          contextPath: artist.href!,
          subject: DeprecatedAnalyticsSchema.Subject.RequestPriceEstimate,
        })}
        onClick={() => {
          tracking.trackEvent({
            action_type: DeprecatedAnalyticsSchema.ActionType.Click,
            context_module:
              DeprecatedAnalyticsSchema.ContextModule.SellArtFromYourCollection,
            flow: DeprecatedAnalyticsSchema.Flow.Consignments,
            subject: DeprecatedAnalyticsSchema.Subject.RequestPriceEstimate,
          })
        }}
      >
        Request a price estimate
      </Button>
    </SectionContainer>
  )
}

export const ArtistConsignSellArtFragmentContainer = createFragmentContainer(
  ArtistConsignSellArt,
  {
    artist: graphql`
      fragment ArtistConsignSellArt_artist on Artist {
        href
      }
    `,
  }
)

import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistConsignSellArt_artist } from "v2/__generated__/ArtistConsignSellArt_artist.graphql"
import { Button, Spacer, Text } from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { SectionContainer } from "./SectionContainer"
import { getConsignSubmissionUrl } from "./Utils/getConsignSubmissionUrl"

interface ArtistConsignSellArtProps {
  artist: ArtistConsignSellArt_artist
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

      <Spacer mt={2} />

      <Text variant="sm-display">
        With Artsy's expert guidance, selling is simple
      </Text>

      <Spacer mt={4} />

      <Button
        // @ts-ignore
        as={RouterLink}
        to={getConsignSubmissionUrl({
          contextPath: artist.href!,
          subject: AnalyticsSchema.Subject.RequestPriceEstimate,
        })}
        onClick={() => {
          tracking.trackEvent({
            action_type: AnalyticsSchema.ActionType.Click,
            context_module:
              AnalyticsSchema.ContextModule.SellArtFromYourCollection,
            flow: AnalyticsSchema.Flow.Consignments,
            subject: AnalyticsSchema.Subject.RequestPriceEstimate,
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

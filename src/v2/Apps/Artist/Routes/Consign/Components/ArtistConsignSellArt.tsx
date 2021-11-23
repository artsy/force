import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtistConsignSellArt_artist } from "v2/__generated__/ArtistConsignSellArt_artist.graphql"

import { Box, Button, Sans, Serif } from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { LightPurpleColor, SectionContainer } from "./SectionContainer"
import { getConsignSubmissionUrl } from "./Utils/getConsignSubmissionUrl"

interface ArtistConsignSellArtProps {
  artist: ArtistConsignSellArt_artist
}

const ArtistConsignSellArt: React.FC<ArtistConsignSellArtProps> = ({
  artist,
}) => {
  const tracking = useTracking()

  return (
    <SectionContainer background={LightPurpleColor}>
      <Box textAlign="center">
        <Box>
          <Serif element="h2" size={["10", "12"]}>
            Sell Art <br />
            From Your Collection
          </Serif>
        </Box>

        <Box mt={3} mb={4}>
          <Sans size="4t">With Artsy's expert guidance, selling is simple</Sans>
        </Box>

        <Box>
          <RouterLink
            to={getConsignSubmissionUrl({
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              contextPath: artist.href,
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
            <Button>Request a price estimate</Button>
          </RouterLink>
        </Box>
      </Box>
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

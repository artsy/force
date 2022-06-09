import { Button, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"
import { ArtistConsignMarketTrends_artist } from "v2/__generated__/ArtistConsignMarketTrends_artist.graphql"

interface ArtistConsignMarketTrendsProps {
  artist: ArtistConsignMarketTrends_artist
}

export const ArtistConsignMarketTrends: React.FC<ArtistConsignMarketTrendsProps> = props => {
  const tracking = useTracking()

  const {
    artist: {
      href,
      targetSupply: {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        microfunnel: {
          metadata: { highestRealized, str, realized },
        },
      },
    },
  } = props

  return (
    <SectionContainer bg="black100">
      <Subheader textColor="white100">Market trends</Subheader>

      <Spacer mt={4} />

      <GridColumns>
        <Statistic
          top="Highest realized price"
          middle="All time"
          bottom={highestRealized}
        />

        <Statistic
          top="Sell through rate"
          middle="Last 12 months"
          bottom={str}
        />

        <Statistic
          top="Realized price over estimate"
          middle="Last 12 months"
          bottom={realized}
        />
      </GridColumns>

      <Spacer mt={4} />

      <Button
        variant="primaryWhite"
        // @ts-ignore
        as={RouterLink}
        to={`${href}/auction-results`}
        onClick={() => {
          tracking.trackEvent({
            action_type: AnalyticsSchema.ActionType.Click,
            subject: AnalyticsSchema.Subject.ExploreAuctionResults,
          })
        }}
      >
        Explore auction results
      </Button>
    </SectionContainer>
  )
}

const Statistic: React.FC<{ top: string; middle: string; bottom: string }> = ({
  top,
  middle,
  bottom,
}) => {
  return (
    <Column span={4} textAlign="center">
      <Text variant="lg-display" color="white100">
        {top}
      </Text>

      <Text variant="sm-display" color="black10">
        {middle}
      </Text>

      <Text variant="xl" color="white100" mt={1}>
        {bottom}
      </Text>
    </Column>
  )
}

export const ArtistConsignMarketTrendsFragmentContainer = createFragmentContainer(
  ArtistConsignMarketTrends,
  {
    artist: graphql`
      fragment ArtistConsignMarketTrends_artist on Artist {
        href
        targetSupply {
          microfunnel {
            metadata {
              highestRealized
              str
              realized
            }
          }
        }
      }
    `,
  }
)

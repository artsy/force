import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Button, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { ArtistConsignMarketTrends_artist$data } from "__generated__/ArtistConsignMarketTrends_artist.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"

interface ArtistConsignMarketTrendsProps {
  artist: ArtistConsignMarketTrends_artist$data
}

export const ArtistConsignMarketTrends: React.FC<
  React.PropsWithChildren<ArtistConsignMarketTrendsProps>
> = props => {
  const tracking = useTracking()

  const {
    artist: { href, targetSupply },
  } = props

  const highestRealized =
    targetSupply?.microfunnel?.metadata?.highestRealized || ""
  const str = targetSupply?.microfunnel?.metadata?.str || ""
  const realized = targetSupply?.microfunnel?.metadata?.realized || ""

  return (
    <SectionContainer bg="black100">
      <Subheader textColor="white100">Market trends</Subheader>

      <Spacer y={4} />

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

      <Spacer y={4} />

      <Button
        variant="primaryWhite"
        // @ts-ignore
        as={RouterLink}
        to={`${href}/auction-results`}
        onClick={() => {
          tracking.trackEvent({
            action_type: DeprecatedAnalyticsSchema.ActionType.Click,
            subject: DeprecatedAnalyticsSchema.Subject.ExploreAuctionResults,
          })
        }}
      >
        Explore auction results
      </Button>
    </SectionContainer>
  )
}

const Statistic: React.FC<
  React.PropsWithChildren<{ top: string; middle: string; bottom: string }>
> = ({ top, middle, bottom }) => {
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

export const ArtistConsignMarketTrendsFragmentContainer =
  createFragmentContainer(ArtistConsignMarketTrends, {
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
  })

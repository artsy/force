import * as React from "react"
import { Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"
import { ArtistConsignPageViews_artist } from "v2/__generated__/ArtistConsignPageViews_artist.graphql"

interface ArtistConsignPageViewsProps {
  artist: ArtistConsignPageViews_artist
}

export const ArtistConsignPageViews: React.FC<ArtistConsignPageViewsProps> = props => {
  const {
    artist: {
      name,
      targetSupply: {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        microfunnel: {
          metadata: { roundedViews, roundedUniqueVisitors },
        },
      },
    },
  } = props

  return (
    <SectionContainer bg="black10" textAlign="center">
      <Subheader>
        {name} works have received more than {roundedViews} views on Artsy this
        month
      </Subheader>

      <Spacer my={1} />

      <Text variant="lg-display">
        Over {roundedUniqueVisitors} Artsy collectors are looking for works by
        this artist
      </Text>
    </SectionContainer>
  )
}

export const ArtistConsignPageViewsFragmentContainer = createFragmentContainer(
  ArtistConsignPageViews,
  {
    artist: graphql`
      fragment ArtistConsignPageViews_artist on Artist {
        name
        targetSupply {
          microfunnel {
            metadata {
              roundedViews
              roundedUniqueVisitors
            }
          }
        }
      }
    `,
  }
)

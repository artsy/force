import { Spacer, Text } from "@artsy/palette"
import type { ArtistConsignPageViews_artist$data } from "__generated__/ArtistConsignPageViews_artist.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"

interface ArtistConsignPageViewsProps {
  artist: ArtistConsignPageViews_artist$data
}

export const ArtistConsignPageViews: React.FC<
  React.PropsWithChildren<ArtistConsignPageViewsProps>
> = props => {
  const {
    artist: { name, targetSupply },
  } = props

  const roundedViews = targetSupply?.microfunnel?.metadata?.roundedViews || "0"
  const roundedUniqueVisitors =
    targetSupply?.microfunnel?.metadata?.roundedUniqueVisitors || "0"

  return (
    <SectionContainer bg="black10" textAlign="center">
      <Subheader>
        {name} works have received more than {roundedViews} views on Artsy this
        month
      </Subheader>

      <Spacer y={1} />

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
  },
)

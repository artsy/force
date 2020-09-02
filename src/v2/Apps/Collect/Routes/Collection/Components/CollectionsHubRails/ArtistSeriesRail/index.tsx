import { Box, Serif, color } from "@artsy/palette"
import { ArtistSeriesRail_collectionGroup } from "v2/__generated__/ArtistSeriesRail_collectionGroup.graphql"
import { Carousel } from "v2/Components/Carousel"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ArtistSeriesRailContainer as ArtistSeriesEntity } from "./ArtistSeriesEntity"
import { CollectionContextTrackingArgs } from "v2/Apps/Collect/Routes/Collection"

export interface ArtistSeriesRailProps {
  collectionGroup: ArtistSeriesRail_collectionGroup
  trackingData: CollectionContextTrackingArgs
}
export const ArtistSeriesRail: React.FC<ArtistSeriesRailProps> = ({
  collectionGroup,
  trackingData,
}) => {
  const { members, name } = collectionGroup

  return (
    <Content mt={2} py={3}>
      <Serif size="5" mb={1}>
        {name}
      </Serif>

      <Carousel>
        {members.map((slide, slideIndex) => {
          return (
            <ArtistSeriesEntity
              key={slide.slug || slideIndex}
              member={slide}
              itemNumber={slideIndex}
              trackingData={trackingData}
            />
          )
        })}
      </Carousel>
    </Content>
  )
}

const Content = styled(Box)`
  border-top: 1px solid ${color("black10")};
`

export const ArtistSeriesRailContainer = createFragmentContainer(
  ArtistSeriesRail as React.FC<ArtistSeriesRailProps>,
  {
    collectionGroup: graphql`
      fragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {
        groupType
        name
        members {
          slug
          ...ArtistSeriesEntity_member
        }
      }
    `,
  }
)

import { Box, Text, color } from "@artsy/palette"
import { ArtistSeriesRail_collectionGroup } from "v2/__generated__/ArtistSeriesRail_collectionGroup.graphql"
import { Carousel } from "v2/Components/Carousel"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ArtistSeriesRailContainer as ArtistSeriesEntity } from "./ArtistSeriesEntity"

export interface ArtistSeriesRailProps {
  collectionGroup: ArtistSeriesRail_collectionGroup
}
export const ArtistSeriesRail: React.FC<ArtistSeriesRailProps> = ({
  collectionGroup: { members, name },
}) => {
  return (
    <Content mt={2} py={3}>
      <Text variant="subtitle" pb={2}>
        {name}
      </Text>

      <Carousel>
        {members.map((slide, slideIndex) => {
          return (
            <ArtistSeriesEntity
              key={slide.slug || slideIndex}
              member={slide}
              itemNumber={slideIndex}
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

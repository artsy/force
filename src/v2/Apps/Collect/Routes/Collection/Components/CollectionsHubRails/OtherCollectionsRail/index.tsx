import { Box, Serif, color } from "@artsy/palette"
import { OtherCollectionsRail_collectionGroup } from "v2/__generated__/OtherCollectionsRail_collectionGroup.graphql"
import { Carousel } from "v2/Components/Carousel"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { OtherCollectionsRailsContainer as OtherCollectionEntity } from "./OtherCollectionEntity"
import { CollectionContextTrackingArgs } from "v2/Apps/Collect/Routes/Collection"

interface OtherCollectionsRailProps {
  collectionGroup: OtherCollectionsRail_collectionGroup
  trackingData: CollectionContextTrackingArgs
}
export const OtherCollectionsRail: React.FC<OtherCollectionsRailProps> = ({
  collectionGroup,
  trackingData,
}) => {
  const { name, members } = collectionGroup

  return (
    <Container mb={4}>
      <Serif size="5" mt={3} mb={2}>
        {name}
      </Serif>

      <Carousel>
        {members.map((slide, index) => {
          return (
            <OtherCollectionEntity
              key={index}
              member={slide}
              itemNumber={index}
              trackingData={trackingData}
            />
          )
        })}
      </Carousel>
    </Container>
  )
}

const Container = styled(Box)`
  border-top: 1px solid ${color("black10")};
`

export const OtherCollectionsRailsContainer = createFragmentContainer(
  OtherCollectionsRail as React.FC<OtherCollectionsRailProps>,
  {
    collectionGroup: graphql`
      fragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {
        groupType
        name
        members {
          ...OtherCollectionEntity_member
        }
      }
    `,
  }
)

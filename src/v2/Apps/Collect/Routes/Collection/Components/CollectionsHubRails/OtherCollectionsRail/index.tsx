import { Box, Text, color } from "@artsy/palette"
import { OtherCollectionsRail_collectionGroup } from "v2/__generated__/OtherCollectionsRail_collectionGroup.graphql"
import { Carousel } from "v2/Components/Carousel"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { OtherCollectionsRailsContainer as OtherCollectionEntity } from "./OtherCollectionEntity"

interface OtherCollectionsRailProps {
  collectionGroup: OtherCollectionsRail_collectionGroup
}
export const OtherCollectionsRail: React.FC<OtherCollectionsRailProps> = ({
  collectionGroup: { name, members },
}) => {
  return (
    <Container mb={4}>
      <Text variant="subtitle" pt={3} pb={2}>
        {name}
      </Text>

      <Carousel>
        {members.map((slide, index) => {
          return (
            <OtherCollectionEntity
              key={index}
              member={slide}
              itemNumber={index}
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

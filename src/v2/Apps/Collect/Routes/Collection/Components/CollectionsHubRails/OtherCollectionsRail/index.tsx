import { Text, Shelf } from "@artsy/palette"
import { OtherCollectionsRail_collectionGroup } from "v2/__generated__/OtherCollectionsRail_collectionGroup.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { OtherCollectionsRailsContainer as OtherCollectionEntity } from "./OtherCollectionEntity"

interface OtherCollectionsRailProps {
  collectionGroup: OtherCollectionsRail_collectionGroup
}
export const OtherCollectionsRail: React.FC<OtherCollectionsRailProps> = ({
  collectionGroup: { name, members },
}) => {
  return (
    <>
      <Text variant="lg" mb={4}>
        {name}
      </Text>

      <Shelf>
        {members.map((slide, index) => {
          return (
            <OtherCollectionEntity
              key={index}
              member={slide}
              itemNumber={index}
            />
          )
        })}
      </Shelf>
    </>
  )
}

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

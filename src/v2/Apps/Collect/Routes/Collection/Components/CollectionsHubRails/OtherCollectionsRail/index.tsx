import { OtherCollectionsRail_collectionGroup$data } from "v2/__generated__/OtherCollectionsRail_collectionGroup.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { OtherCollectionsRailsContainer as OtherCollectionEntity } from "./OtherCollectionEntity"
import { Rail } from "v2/Components/Rail"

interface OtherCollectionsRailProps {
  collectionGroup: OtherCollectionsRail_collectionGroup$data
}
export const OtherCollectionsRail: React.FC<OtherCollectionsRailProps> = ({
  collectionGroup: { name, members },
}) => {
  return (
    <Rail
      title={name}
      getItems={() => {
        return members.map((slide, index) => {
          return (
            <OtherCollectionEntity
              key={index}
              member={slide}
              itemNumber={index}
            />
          )
        })
      }}
    />
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

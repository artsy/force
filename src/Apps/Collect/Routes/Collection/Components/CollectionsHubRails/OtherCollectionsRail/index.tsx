import { Rail } from "Components/Rail/Rail"
import type { OtherCollectionsRail_collectionGroup$data } from "__generated__/OtherCollectionsRail_collectionGroup.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { OtherCollectionsRailsContainer as OtherCollectionEntity } from "./OtherCollectionEntity"

interface OtherCollectionsRailProps {
  collectionGroup: OtherCollectionsRail_collectionGroup$data
}
export const OtherCollectionsRail: React.FC<
  React.PropsWithChildren<OtherCollectionsRailProps>
> = ({ collectionGroup: { name, members } }) => {
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
  OtherCollectionsRail as React.FC<
    React.PropsWithChildren<OtherCollectionsRailProps>
  >,
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
  },
)

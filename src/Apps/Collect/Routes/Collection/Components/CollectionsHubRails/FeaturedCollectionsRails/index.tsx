import { FeaturedCollectionRailEntityFragmentContainer } from "Apps/Collect/Routes/Collection/Components/CollectionsHubRails/FeaturedCollectionsRails/FeaturedCollectionRailEntity"
import { Rail } from "Components/Rail/Rail"
import type { FeaturedCollectionsRails_collectionGroup$data } from "__generated__/FeaturedCollectionsRails_collectionGroup.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  collectionGroup: FeaturedCollectionsRails_collectionGroup$data
}

export const FeaturedCollectionsRails: React.FC<
  React.PropsWithChildren<Props>
> = ({ collectionGroup: { members, name } }) => {
  return (
    <Rail
      title={name}
      alignItems="flex-start"
      getItems={() => {
        return members.map((member, index) => {
          return (
            <FeaturedCollectionRailEntityFragmentContainer
              key={member.internalID}
              member={member}
              index={index}
            />
          )
        })
      }}
    />
  )
}

export const FeaturedCollectionsRailsContainer = createFragmentContainer(
  FeaturedCollectionsRails as React.FC<React.PropsWithChildren<Props>>,
  {
    collectionGroup: graphql`
      fragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {
        groupType
        name
        members {
          ...FeaturedCollectionRailEntity_member
          internalID
        }
      }
    `,
  }
)

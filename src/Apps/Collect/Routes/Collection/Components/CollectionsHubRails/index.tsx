import { Join, Spacer } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CollectionsHubRails_linkedCollections$data } from "__generated__/CollectionsHubRails_linkedCollections.graphql"
import { ArtistSeriesRailContainer as ArtistSeriesRail } from "./ArtistSeriesRail"
import { FeaturedCollectionsRailsContainer as FeaturedCollectionsRails } from "./FeaturedCollectionsRails"
import { OtherCollectionsRailsContainer as OtherCollectionsRail } from "./OtherCollectionsRail"

interface CollectionsHubRailsProps {
  linkedCollections: CollectionsHubRails_linkedCollections$data
}

export const CollectionsHubRails: React.FC<CollectionsHubRailsProps> = ({
  linkedCollections,
}) => {
  return (
    <Join separator={<Spacer y={6} />}>
      {linkedCollections.map((collectionGroup, index) => {
        switch (collectionGroup.groupType) {
          case "ArtistSeries":
            return (
              <ArtistSeriesRail key={index} collectionGroup={collectionGroup} />
            )
          case "FeaturedCollections":
            return (
              <FeaturedCollectionsRails
                key={index}
                collectionGroup={collectionGroup}
              />
            )
          case "OtherCollections":
            return (
              <OtherCollectionsRail
                key={index}
                collectionGroup={collectionGroup}
              />
            )
          default:
            return null
        }
      })}
    </Join>
  )
}

export const CollectionsHubRailsContainer = createFragmentContainer(
  CollectionsHubRails,
  {
    linkedCollections: graphql`
      fragment CollectionsHubRails_linkedCollections on MarketingCollectionGroup
        @relay(plural: true) {
        groupType
        ...FeaturedCollectionsRails_collectionGroup
        ...OtherCollectionsRail_collectionGroup
        ...ArtistSeriesRail_collectionGroup
      }
    `,
  }
)

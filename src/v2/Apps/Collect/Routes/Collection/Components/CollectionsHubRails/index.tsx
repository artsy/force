import { CollectionsHubRails_linkedCollections } from "v2/__generated__/CollectionsHubRails_linkedCollections.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesRailContainer as ArtistSeriesRail } from "./ArtistSeriesRail"
import { FeaturedCollectionsRailsContainer as FeaturedCollectionsRails } from "./FeaturedCollectionsRails"
import { OtherCollectionsRailsContainer as OtherCollectionsRail } from "./OtherCollectionsRail"

const railForGroupType = collectionGroup => {
  const { groupType } = collectionGroup
  switch (groupType) {
    case "ArtistSeries":
      return <ArtistSeriesRail collectionGroup={collectionGroup} />
    case "FeaturedCollections":
      return <FeaturedCollectionsRails collectionGroup={collectionGroup} />
    case "OtherCollections":
      return <OtherCollectionsRail collectionGroup={collectionGroup} />
    default:
      return null
  }
}

interface Props {
  linkedCollections: CollectionsHubRails_linkedCollections
}

export const CollectionsHubRails = ({ linkedCollections }: Props) => {
  return (
    <>
      {linkedCollections.map((collectionGroup, index) => (
        <div key={index}>{railForGroupType(collectionGroup)}</div>
      ))}
    </>
  )
}

export const CollectionsHubRailsContainer = createFragmentContainer(
  CollectionsHubRails as React.FC<Props>,
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

import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Join, Spacer } from "@artsy/palette"
import type { CollectionsHubRails_linkedCollections$data } from "__generated__/CollectionsHubRails_linkedCollections.graphql"
import type { CollectionsHubRailsQuery } from "__generated__/CollectionsHubRailsQuery.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesRailContainer as ArtistSeriesRail } from "./ArtistSeriesRail"
import { FeaturedCollectionsRailsContainer as FeaturedCollectionsRails } from "./FeaturedCollectionsRails"
import { OtherCollectionsRailsContainer as OtherCollectionsRail } from "./OtherCollectionsRail"

interface CollectionsHubRailsProps {
  linkedCollections: CollectionsHubRails_linkedCollections$data
}

export const CollectionsHubRails: React.FC<
  React.PropsWithChildren<CollectionsHubRailsProps>
> = ({ linkedCollections }) => {
  const showCollectionHubs = linkedCollections.length > 0

  if (!showCollectionHubs) {
    return null
  }

  return (
    <>
      <Spacer y={6} />

      <Join separator={<Spacer y={6} />}>
        {linkedCollections.map((collectionGroup, index) => {
          switch (collectionGroup.groupType) {
            case "ArtistSeries":
              return (
                <ArtistSeriesRail
                  key={index}
                  collectionGroup={collectionGroup}
                />
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
    </>
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

export const CollectionsHubRailsQueryRenderer: React.FC<
  React.PropsWithChildren<{
    slug: string
  }>
> = ({ slug }) => {
  return (
    <SystemQueryRenderer<CollectionsHubRailsQuery>
      query={graphql`
        query CollectionsHubRailsQuery($slug: String!) {
          marketingCollection(slug: $slug) {
            linkedCollections {
              ...CollectionsHubRails_linkedCollections
            }
          }
        }
      `}
      variables={{
        slug,
      }}
      render={({ error, props }) => {
        if (error) {
          console.error(
            "[CollectionFeaturedArtists]: Error fetching featured artists",
            error
          )
          return null
        }

        if (!props || !props.marketingCollection) {
          return null
        }

        if (!props.marketingCollection) {
          return null
        }

        return (
          <CollectionsHubRailsContainer
            linkedCollections={props.marketingCollection.linkedCollections}
          />
        )
      }}
    />
  )
}

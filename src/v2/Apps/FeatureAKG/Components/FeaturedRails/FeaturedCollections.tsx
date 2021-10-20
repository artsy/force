import { FeaturedCollections_collections } from "v2/__generated__/FeaturedCollections_collections.graphql"
import {
  FeaturedRail,
  FeaturedRailCarousel,
  RailMetadata,
} from "v2/Apps/FeatureAKG/Components/FeaturedRails"
import { AnalyticsSchema } from "v2/System"
import { compact } from "lodash"
import * as React from "react";
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"

interface FeaturedCollectionsRailProps {
  collections: FeaturedCollections_collections
  railMetadata: RailMetadata
}

const FeaturedCollectionsRail: React.FC<FeaturedCollectionsRailProps> = props => {
  const { title, subtitle, items } = props.railMetadata
  const { collections } = props

  const itemsForCarousel = collections.map(collection => {
    const matchingCollectionFromSpreadsheet = items.find(
      item => item.id === collection.slug
    )

    if (matchingCollectionFromSpreadsheet) {
      return {
        ...collection,
        imageSrc: matchingCollectionFromSpreadsheet.image_src,
        subtitle: "Collection",
        href: `/collection/${collection.slug}`,
      }
    } else {
      return null
    }
  })

  // This will happen if we have IDs in our spreadsheet that don't match
  // data we fetch for.
  if (compact(itemsForCarousel).length > 0) {
    return (
      <FeaturedRail title={title} subtitle={subtitle}>
        <FeaturedRailCarousel
          itemsForCarousel={compact(itemsForCarousel)}
          contextModule={AnalyticsSchema.ContextModule.BrowseCollections}
        />
      </FeaturedRail>
    )
  } else {
    return null
  }
}

export const FeaturedCollectionsRailFragmentContainer = createFragmentContainer(
  FeaturedCollectionsRail,
  {
    collections: graphql`
      fragment FeaturedCollections_collections on MarketingCollection
        @relay(plural: true) {
        slug
        title
      }
    `,
  }
)

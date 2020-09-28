import { Box, Serif, Spacer } from "@artsy/palette"
import { RelatedCollectionsRail_collections } from "v2/__generated__/RelatedCollectionsRail_collections.graphql"
import { useTracking } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { Carousel } from "v2/Components/Carousel"
import { once } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Waypoint from "react-waypoint"
import { RelatedCollectionEntityFragmentContainer as RelatedCollectionEntity } from "./RelatedCollectionEntity"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"

interface RelatedCollectionsRailProps {
  collections: RelatedCollectionsRail_collections
  title?: string
  lazyLoadImages?: boolean
}

export const RelatedCollectionsRail: React.FC<RelatedCollectionsRailProps> = props => {
  const { trackEvent } = useTracking()
  const { collections } = props
  const { title, lazyLoadImages } = props
  const collectionsWithArtworks = collections.filter(collection =>
    Boolean(collection.artworksConnection)
  )
  const { contextPageOwnerId, contextPageOwnerSlug } = useAnalyticsContext()

  const trackImpression = () => {
    // FIXME: old schema
    trackEvent({
      action_type: Schema.ActionType.Impression,
      context_module: Schema.ContextModule.CollectionsRail,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      context_page_owner_type: Schema.OwnerType.Collection,
    })
  }

  if (collectionsWithArtworks.length > 3) {
    return (
      <Box>
        <Waypoint onEnter={once(trackImpression)} />
        <Serif size="8" color="black100">
          More like {title}
        </Serif>
        <Spacer pb={4} />

        <Carousel arrowHeight={125}>
          {collectionsWithArtworks.map((slide, i) => {
            return (
              <RelatedCollectionEntity
                key={i}
                lazyLoad={lazyLoadImages}
                collection={slide}
                slideIndex={i}
              />
            )
          })}
        </Carousel>
      </Box>
    )
  } else {
    return null
  }
}

export const RelatedCollectionsRailFragmentContainer = createFragmentContainer(
  RelatedCollectionsRail as React.FC<RelatedCollectionsRailProps>,
  {
    collections: graphql`
      fragment RelatedCollectionsRail_collections on MarketingCollection
        @relay(plural: true) {
        ...RelatedCollectionEntity_collection
        # We need this so we can filter out collections w/o artworks that would
        # otherwise break the carousel.
        artworksConnection(
          first: 3
          aggregations: [TOTAL]
          sort: "-decayed_merch"
        ) {
          edges {
            node {
              id
            }
          }
        }
      }
    `,
  }
)

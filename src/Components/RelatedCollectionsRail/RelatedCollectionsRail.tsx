import { RelatedCollectionsRail_collections$data } from "__generated__/RelatedCollectionsRail_collections.graphql"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { once } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Waypoint from "react-waypoint"
import { RelatedCollectionEntityFragmentContainer as RelatedCollectionEntity } from "./RelatedCollectionEntity"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { Rail } from "Components/Rail"
import { useTracking } from "react-tracking"

interface RelatedCollectionsRailProps {
  collections: RelatedCollectionsRail_collections$data
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
      action_type: DeprecatedSchema.ActionType.Impression,
      context_module: DeprecatedSchema.ContextModule.CollectionsRail,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      context_page_owner_type: DeprecatedSchema.OwnerType.Collection,
    })
  }

  if (collectionsWithArtworks.length > 3) {
    return (
      <>
        {/* FIXME: Must remove this dependency */}
        <Waypoint onEnter={once(trackImpression)} />

        <Rail
          title={`More like ${title}`}
          showProgress={false}
          getItems={() => {
            return collectionsWithArtworks.map((slide, i) => {
              return (
                <RelatedCollectionEntity
                  key={i}
                  lazyLoad={lazyLoadImages}
                  collection={slide}
                  slideIndex={i}
                />
              )
            })
          }}
        />
      </>
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

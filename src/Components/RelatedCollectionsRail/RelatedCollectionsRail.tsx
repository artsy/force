import { RelatedCollectionsRail_collections$data } from "__generated__/RelatedCollectionsRail_collections.graphql"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RelatedCollectionEntityFragmentContainer as RelatedCollectionEntity } from "./RelatedCollectionEntity"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { Rail } from "Components/Rail/Rail"
import { useTracking } from "react-tracking"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { RelatedCollectionsRailQuery } from "__generated__/RelatedCollectionsRailQuery.graphql"

interface RelatedCollectionsRailProps {
  collections: RelatedCollectionsRail_collections$data
  title?: string
  lazyLoadImages?: boolean
}

export const RelatedCollectionsRail: React.FC<RelatedCollectionsRailProps> = ({
  title,
  lazyLoadImages,
  collections,
}) => {
  const { trackEvent } = useTracking()

  const collectionsWithArtworks = collections.filter(collection =>
    Boolean(collection.artworksConnection)
  )
  const { contextPageOwnerId, contextPageOwnerSlug } = useAnalyticsContext()

  const { ref } = useIntersectionObserver({
    once: true,
    onIntersection: () => {
      // FIXME: old schema
      trackEvent({
        action_type: DeprecatedSchema.ActionType.Impression,
        context_module: DeprecatedSchema.ContextModule.CollectionsRail,
        context_page_owner_id: contextPageOwnerId,
        context_page_owner_slug: contextPageOwnerSlug,
        context_page_owner_type: DeprecatedSchema.OwnerType.Collection,
      })
    },
  })

  if (collectionsWithArtworks.length > 3) {
    return (
      <>
        <span ref={ref as any} />

        <Rail
          title={`More like ${title}`}
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
  }

  return null
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

export const RelatedCollectionsRailQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  // TODO: Placeholder
  return (
    <SystemQueryRenderer<RelatedCollectionsRailQuery>
      lazyLoad
      environment={relayEnvironment}
      variables={{ slug }}
      query={graphql`
        query RelatedCollectionsRailQuery($slug: String!) {
          marketingCollection(slug: $slug) {
            title
            relatedCollections(size: 16) {
              ...RelatedCollectionsRail_collections
            }
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }
        if (!props) {
          return null
        }
        if (props.marketingCollection) {
          return (
            <RelatedCollectionsRailFragmentContainer
              collections={props.marketingCollection.relatedCollections}
              title={props.marketingCollection.title}
              lazyLoadImages
            />
          )
        }
      }}
    />
  )
}

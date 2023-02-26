import { Spacer } from "@artsy/palette"
import { Collection_collection$data } from "__generated__/Collection_collection.graphql"
import { SeoProductsForArtworks } from "Apps/Collect/Components/SeoProductsForArtworks"
import { SeoProductsForCollections } from "Apps/Collect/Components/SeoProductsForCollections"
import { CollectionFilterFragmentContainer as CollectionHeader } from "Apps/Collect/Routes/Collection/Components/Header"
import { SystemContextProps, withSystemContext } from "System/SystemContext"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { RelatedCollectionsRailFragmentContainer as RelatedCollectionsRail } from "Components/RelatedCollectionsRail/RelatedCollectionsRail"
import { BreadCrumbList } from "Components/Seo/BreadCrumbList"
import * as React from "react"
import { RelayRefetchProp, graphql, createFragmentContainer } from "react-relay"
import { truncate } from "lodash"
import { CollectionsHubRailsContainer as CollectionsHubRails } from "./Components/CollectionsHubRails"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import {
  AnalyticsContext,
  AnalyticsContextProps,
  useAnalyticsContext,
} from "System/Analytics/AnalyticsContext"
import { TrackingProp } from "react-tracking"
import { ErrorPage } from "Components/ErrorPage"
import { CollectionArtworksFilterRefetchContainer } from "./Components/CollectionArtworksFilter"
import {
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { MetaTags } from "Components/MetaTags"
import { getENV } from "Utils/getENV"

interface CollectionAppProps extends SystemContextProps, AnalyticsContextProps {
  collection: Collection_collection$data
  relay: RelayRefetchProp
  tracking: TrackingProp
}

export const CollectionApp: React.FC<CollectionAppProps> = props => {
  const { collection } = props

  if (!collection) return <ErrorPage code={404} />

  const {
    title,
    slug,
    headerImage,
    description,
    descriptionMarkdown,
    fallbackHeaderImage,
    artworksConnection,
    descending_artworks,
    ascending_artworks,
  } = collection
  const collectionHref = `${getENV("APP_URL")}/collection/${slug}`

  const metadataDescription = descriptionMarkdown
    ? `Buy, bid, and inquire on ${title} on Artsy. ${truncate(
        descriptionMarkdown,
        { length: 158 }
      )}`
    : `Buy, bid, and inquire on ${title} on Artsy.`

  const showCollectionHubs = collection.linkedCollections.length > 0

  const socialImage =
    headerImage ||
    (fallbackHeaderImage?.edges &&
      fallbackHeaderImage?.edges[0]?.node?.image?.url)

  return (
    <>
      <MetaTags
        description={metadataDescription}
        imageURL={socialImage}
        pathname={`collection/${slug}`}
        title={`${title} - For Sale on Artsy`}
      />

      <BreadCrumbList
        items={[
          { name: "Collections", path: "/collections" },
          { name: title, path: `/collection/${slug}` },
        ]}
      />

      {artworksConnection && (
        <SeoProductsForArtworks artworks={artworksConnection} />
      )}

      {artworksConnection && (
        <SeoProductsForCollections
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          descending_artworks={descending_artworks}
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          ascending_artworks={ascending_artworks}
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          collectionDescription={description}
          collectionURL={collectionHref}
          collectionName={title}
        />
      )}

      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <CollectionHeader collection={collection} artworks={artworksConnection} />

      <FrameWithRecentlyViewed>
        {showCollectionHubs && (
          <>
            <Spacer y={6} />

            <CollectionsHubRails
              linkedCollections={collection.linkedCollections}
            />
          </>
        )}

        <Spacer y={6} />

        <CollectionArtworksFilterRefetchContainer
          collection={collection}
          aggregations={
            collection.artworksConnection
              ?.aggregations as SharedArtworkFilterContextProps["aggregations"]
          }
          counts={collection.artworksConnection?.counts as Counts}
        />

        {/* HOTFIX FIXME: This rail was causing an error if included in SSR render
              pass and so it was deferred to the client.

              See: https://github.com/artsy/force/pull/6137
          */}
        {collection.linkedCollections.length === 0 &&
          typeof window !== "undefined" && (
            <LazyLoadComponent threshold={1000}>
              <Spacer y={6} />

              <RelatedCollectionsRail
                collections={collection.relatedCollections}
                title={collection.title}
                lazyLoadImages
              />
            </LazyLoadComponent>
          )}
      </FrameWithRecentlyViewed>
    </>
  )
}

const TrackingWrappedCollectionApp: React.FC<CollectionAppProps> = props => {
  const {
    collection: { id },
  } = props
  const { contextPageOwnerSlug, contextPageOwnerType } = useAnalyticsContext()
  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: id,
        contextPageOwnerSlug,
        contextPageOwnerType,
      }}
    >
      <CollectionApp {...props} />
    </AnalyticsContext.Provider>
  )
}

export const CollectionFragmentContainer = createFragmentContainer(
  withSystemContext(TrackingWrappedCollectionApp),
  {
    collection: graphql`
      fragment Collection_collection on MarketingCollection
        @argumentDefinitions(
          aggregations: { type: "[ArtworkAggregation]" }
          input: { type: "FilterArtworksInput" }
          shouldFetchCounts: { type: "Boolean!", defaultValue: false }
        ) {
        ...Header_collection
        description
        # TODO: Description should implement markdown which accepts a format argument
        descriptionMarkdown
        headerImage
        slug
        id
        title
        relatedCollections(size: 16) {
          ...RelatedCollectionsRail_collections
        }
        linkedCollections {
          ...CollectionsHubRails_linkedCollections
        }
        fallbackHeaderImage: artworksConnection(
          includeMediumFilterInAggregation: true
          first: 1
          sort: "-decayed_merch"
        ) {
          edges {
            node {
              image {
                url
              }
            }
          }
        }
        artworksConnection(
          aggregations: $aggregations
          includeMediumFilterInAggregation: true
          first: 20
          sort: "-decayed_merch"
        ) {
          ...Header_artworks
          ...SeoProductsForArtworks_artworks
          counts @include(if: $shouldFetchCounts) {
            followedArtists
          }
          aggregations {
            slice
            counts {
              value
              name
              count
            }
          }
        }

        #These two things are going to get highest price and lowest price of the artwork on the collection page.
        descending_artworks: artworksConnection(
          includeMediumFilterInAggregation: true
          first: 1
          sort: "sold,-has_price,-prices"
        ) {
          ...SeoProductsForCollections_descending_artworks
        }

        ascending_artworks: artworksConnection(
          includeMediumFilterInAggregation: true
          first: 1
          sort: "sold,-has_price,prices"
        ) {
          ...SeoProductsForCollections_ascending_artworks
        }

        ...CollectionArtworksFilter_collection @arguments(input: $input)
      }
    `,
  }
)

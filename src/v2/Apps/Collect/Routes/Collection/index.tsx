import { Spacer } from "@artsy/palette"
import { Collection_collection } from "v2/__generated__/Collection_collection.graphql"
import { SeoProductsForArtworks } from "v2/Apps/Collect/Components/SeoProductsForArtworks"
import { SeoProductsForCollections } from "v2/Apps/Collect/Components/SeoProductsForCollections"
import { CollectionFilterFragmentContainer as CollectionHeader } from "v2/Apps/Collect/Routes/Collection/Components/Header"
import { SystemContextProps, withSystemContext } from "v2/System/SystemContext"
import { FrameWithRecentlyViewed } from "v2/Components/FrameWithRecentlyViewed"
import { RelatedCollectionsRailFragmentContainer as RelatedCollectionsRail } from "v2/Components/RelatedCollectionsRail/RelatedCollectionsRail"
import { BreadCrumbList } from "v2/Components/Seo"
import { Match } from "found"
import React from "react"
import { Link, Meta, Title } from "react-head"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import truncate from "trunc-html"
import { CollectionsHubRailsContainer as CollectionsHubRails } from "./Components/CollectionsHubRails"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import {
  AnalyticsContext,
  AnalyticsContextProps,
  useAnalyticsContext,
} from "v2/System/Analytics/AnalyticsContext"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { TrackingProp } from "react-tracking"
import { ErrorPage } from "v2/Components/ErrorPage"
import { usePathnameComplete } from "v2/Utils/Hooks/usePathnameComplete"

interface CollectionAppProps extends SystemContextProps, AnalyticsContextProps {
  collection: Collection_collection
  match: Match
  relay: RelayRefetchProp
  tracking: TrackingProp
}

export const CollectionApp: React.FC<CollectionAppProps> = props => {
  const {
    collection,
    match: { location },
    relay,
  } = props

  const { pathname } = usePathnameComplete()

  if (!collection) return <ErrorPage code={404} />

  const {
    title,
    slug,
    headerImage,
    description,
    fallbackHeaderImage,
    artworksConnection,
    descending_artworks,
    ascending_artworks,
  } = collection
  const collectionHref = `${sd.APP_URL}/collection/${slug}`

  const metadataDescription = description
    ? `Buy, bid, and inquire on ${title} on Artsy. ` +
      truncate(description, 158).text
    : `Buy, bid, and inquire on ${title} on Artsy.`

  const showCollectionHubs = collection.linkedCollections.length > 0

  const socialImage =
    headerImage ||
    (fallbackHeaderImage?.edges &&
      fallbackHeaderImage?.edges[0]?.node?.image?.resized?.url)

  return (
    <>
      <Title>{`${title} - For Sale on Artsy`}</Title>
      <Meta name="description" content={metadataDescription} />
      <Meta property="og:url" content={collectionHref} />
      <Meta property="og:image" content={socialImage} />
      <Meta property="og:description" content={metadataDescription} />
      <Meta property="twitter:description" content={metadataDescription} />
      <Link rel="canonical" href={collectionHref} />
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
          // @ts-expect-error STRICT_NULL_CHECK
          descending_artworks={descending_artworks}
          // @ts-expect-error STRICT_NULL_CHECK
          ascending_artworks={ascending_artworks}
          // @ts-expect-error STRICT_NULL_CHECK
          collectionDescription={description}
          collectionURL={collectionHref}
          collectionName={title}
        />
      )}

      {/* @ts-expect-error STRICT_NULL_CHECK */}
      <CollectionHeader collection={collection} artworks={artworksConnection} />

      <FrameWithRecentlyViewed>
        {showCollectionHubs && (
          <>
            <Spacer mt={6} />

            <CollectionsHubRails
              linkedCollections={collection.linkedCollections}
            />
          </>
        )}

        <Spacer mt={6} />

        <ArtworkFilterContextProvider
          // Reset state of filter context without calling reset; which would
          // affect analytics.
          key={pathname}
          filters={location.query}
          sortOptions={[
            { text: "Default", value: "-decayed_merch" },
            {
              text: "Price (desc.)",
              value: "sold,-has_price,-prices",
            },
            {
              text: "Price (asc.)",
              value: "sold,-has_price,prices",
            },
            {
              text: "Recently updated",
              value: "-partner_updated_at",
            },
            { text: "Recently added", value: "-published_at" },
            { text: "Artwork year (desc.)", value: "-year" },
            { text: "Artwork year (asc.)", value: "year" },
          ]}
          counts={artworksConnection?.counts as Counts}
          aggregations={
            artworksConnection?.aggregations as SharedArtworkFilterContextProps["aggregations"]
          }
          onChange={updateUrl}
        >
          <BaseArtworkFilter
            relay={relay}
            viewer={collection}
            relayVariables={{
              slug: collection.slug,
              aggregations: ["TOTAL"],
            }}
          />
        </ArtworkFilterContextProvider>

        {/* HOTFIX FIXME: This rail was causing an error if included in SSR render
              pass and so it was deferred to the client.

              See: https://github.com/artsy/force/pull/6137
          */}
        {collection.linkedCollections.length === 0 &&
          typeof window !== "undefined" && (
            <LazyLoadComponent threshold={1000}>
              <Spacer mt={6} />

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

export const CollectionRefetchContainer = createRefetchContainer(
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
        headerImage
        slug
        id
        title
        query {
          artist_id: artistID
          gene_id: geneID
        }
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
                resized(width: 600) {
                  url
                }
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
        filtered_artworks: artworksConnection(input: $input) {
          id
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query CollectionQuery(
      $input: FilterArtworksInput
      $slug: String!
      $aggregations: [ArtworkAggregation]
    ) {
      collection: marketingCollection(slug: $slug) @principalField {
        ...Collection_collection
          @arguments(input: $input, aggregations: $aggregations)
      }
    }
  `
)

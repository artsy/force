import { Box, Separator, breakpoints } from "@artsy/palette"
import { Collection_collection } from "v2/__generated__/Collection_collection.graphql"
import { SeoProductsForArtworks } from "v2/Apps/Collect/Components/SeoProductsForArtworks"
import { SeoProductsForCollections } from "v2/Apps/Collect/Components/SeoProductsForCollections"
import { CollectionFilterFragmentContainer as CollectionHeader } from "v2/Apps/Collect/Routes/Collection/Components/Header"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { SystemContextProps, withSystemContext } from "v2/Artsy/SystemContext"
import { FrameWithRecentlyViewed } from "v2/Components/FrameWithRecentlyViewed"
import { RelatedCollectionsRailFragmentContainer as RelatedCollectionsRail } from "v2/Components/RelatedCollectionsRail/RelatedCollectionsRail"
import { BreadCrumbList } from "v2/Components/Seo"
import { Match } from "found"
import React from "react"
import { Link, Meta, Title } from "react-head"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import truncate from "trunc-html"
import { CollectionAppQuery } from "./CollectionAppQuery"
import { CollectionsHubRailsContainer as CollectionsHubRails } from "./Components/CollectionsHubRails"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import {
  AnalyticsContext,
  AnalyticsContextProps,
  useAnalyticsContext,
} from "v2/Artsy/Analytics/AnalyticsContext"

import { BaseArtworkFilter } from "v2/Components/v2/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  SharedArtworkFilterContextProps,
} from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { TrackingProp } from "react-tracking"
import { ErrorPage } from "v2/Components/ErrorPage"

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
      fallbackHeaderImage?.edges[0]?.node?.image?.resized.url)

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
          descending_artworks={descending_artworks}
          ascending_artworks={ascending_artworks}
          collectionDescription={description}
          collectionURL={collectionHref}
          collectionName={title}
        />
      )}
      <AppContainer maxWidth="100%">
        <CollectionHeader
          collection={collection}
          artworks={artworksConnection}
        />

        <Box maxWidth={breakpoints.xl} mx="auto" width="100%">
          <FrameWithRecentlyViewed>
            {showCollectionHubs && (
              <CollectionsHubRails
                linkedCollections={collection.linkedCollections}
              />
            )}
            <Box>
              <ArtworkFilterContextProvider
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
                aggregations={
                  artworksConnection !== null
                    ? (artworksConnection?.aggregations as SharedArtworkFilterContextProps["aggregations"])
                    : null
                }
                onChange={updateUrl}
              >
                <BaseArtworkFilter
                  relay={relay}
                  viewer={collection}
                  relayVariables={{
                    first: 30,
                    slug: collection.slug,
                  }}
                />
              </ArtworkFilterContextProvider>
            </Box>
            {/* HOTFIX FIXME: This rail was causing an error if included in SSR render
              pass and so it was deferred to the client.

              See: https://github.com/artsy/force/pull/6137
          */}
            {collection.linkedCollections.length === 0 &&
              typeof window !== "undefined" && (
                <LazyLoadComponent threshold={1000}>
                  <Separator mt={6} mb={3} />
                  <Box mt="3">
                    <RelatedCollectionsRail
                      collections={collection.relatedCollections}
                      title={collection.title}
                      lazyLoadImages
                    />
                  </Box>
                </LazyLoadComponent>
              )}
          </FrameWithRecentlyViewed>
        </Box>
      </AppContainer>
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
          acquireable: { type: "Boolean" }
          aggregations: { type: "[ArtworkAggregation]" }
          attributionClass: { type: "[String]" }
          atAuction: { type: "Boolean" }
          color: { type: "String" }
          forSale: { type: "Boolean" }
          additionalGeneIDs: { type: "[String]" }
          height: { type: "String" }
          inquireableOnly: { type: "Boolean" }
          majorPeriods: { type: "[String]" }
          medium: { type: "String", defaultValue: "*" }
          offerable: { type: "Boolean" }
          page: { type: "Int" }
          priceRange: { type: "String" }
          sizes: { type: "[ArtworkSizes]" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          width: { type: "String" }
          first: { type: "Int" }
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
          aggregations: $aggregations
          includeMediumFilterInAggregation: true
          size: 1
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
          size: 20
          first: 20
          sort: "-decayed_merch"
        ) {
          ...Header_artworks
          ...SeoProductsForArtworks_artworks
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
          aggregations: $aggregations
          includeMediumFilterInAggregation: true
          first: 1
          size: 1
          sort: "sold,-has_price,-prices"
        ) {
          ...SeoProductsForCollections_descending_artworks
        }

        ascending_artworks: artworksConnection(
          aggregations: $aggregations
          includeMediumFilterInAggregation: true
          first: 1
          size: 1
          sort: "sold,-has_price,prices"
        ) {
          ...SeoProductsForCollections_ascending_artworks
        }

        filtered_artworks: artworksConnection(
          acquireable: $acquireable
          aggregations: $aggregations
          attributionClass: $attributionClass
          atAuction: $atAuction
          color: $color
          forSale: $forSale
          additionalGeneIDs: $additionalGeneIDs
          height: $height
          inquireableOnly: $inquireableOnly
          majorPeriods: $majorPeriods
          medium: $medium
          offerable: $offerable
          page: $page
          priceRange: $priceRange
          sizes: $sizes
          first: $first
          sort: $sort
          width: $width
        ) {
          id
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  CollectionAppQuery
)

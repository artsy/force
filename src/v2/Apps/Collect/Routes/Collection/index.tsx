import { Box, Separator, breakpoints } from "@artsy/palette"
import { Collection_collection } from "v2/__generated__/Collection_collection.graphql"
import { SeoProductsForArtworks } from "v2/Apps/Collect/Components/SeoProductsForArtworks"
import { SeoProductsForCollections } from "v2/Apps/Collect/Components/SeoProductsForCollections"
import { CollectionFilterFragmentContainer as CollectionHeader } from "v2/Apps/Collect/Routes/Collection/Components/Header"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { SystemContextProps, withSystemContext } from "v2/Artsy/SystemContext"
import { FrameWithRecentlyViewed } from "v2/Components/FrameWithRecentlyViewed"
import { RelatedCollectionsRailFragmentContainer as RelatedCollectionsRail } from "v2/Components/RelatedCollectionsRail/RelatedCollectionsRail"
import { BreadCrumbList } from "v2/Components/Seo"
import { Match } from "found"
import { HttpError } from "found"
import React, { Component } from "react"
import { Link, Meta, Title } from "react-head"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import truncate from "trunc-html"
import { CollectionAppQuery } from "./CollectionAppQuery"
import { CollectionsHubRailsContainer as CollectionsHubRails } from "./Components/CollectionsHubRails"

import { BaseArtworkFilter } from "v2/Components/v2/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  SharedArtworkFilterContextProps,
} from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { TrackingProp } from "react-tracking"

interface CollectionAppProps extends SystemContextProps {
  collection: Collection_collection
  match: Match
  relay: RelayRefetchProp
  tracking: TrackingProp
}

@track<CollectionAppProps>(props => ({
  context_module: Schema.ContextModule.CollectionDescription,
  context_page_owner_slug: props.collection && props.collection.slug,
  context_page_owner_id: props.collection && props.collection.slug,
}))
export class CollectionApp extends Component<CollectionAppProps> {
  collectionNotFound = collection => {
    if (!collection) {
      throw new HttpError(404)
    }
  }

  UNSAFE_componentWillMount() {
    this.collectionNotFound(this.props.collection)
  }

  render() {
    const {
      collection,
      match: { location },
      relay,
    } = this.props
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
            { path: "/collections", name: "Collections" },
            { path: `/collection/${slug}`, name: title },
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
                    { value: "-decayed_merch", text: "Default" },
                    { value: "sold,-has_price,-prices", text: "Price (desc.)" },
                    { value: "sold,-has_price,prices", text: "Price (asc.)" },
                    { value: "-partner_updated_at", text: "Recently updated" },
                    { value: "-published_at", text: "Recently added" },
                    { value: "-year", text: "Artwork year (desc.)" },
                    { value: "year", text: "Artwork year (asc.)" },
                  ]}
                  aggregations={
                    artworksConnection.aggregations as SharedArtworkFilterContextProps["aggregations"]
                  }
                  onChange={updateUrl}
                >
                  <BaseArtworkFilter
                    relay={relay}
                    viewer={collection}
                    relayVariables={{
                      slug: collection.slug,
                      first: 30,
                    }}
                  />
                </ArtworkFilterContextProvider>
              </Box>

              {collection.linkedCollections.length === 0 && (
                <>
                  <Separator mt={6} mb={3} />
                  <Box mt="3">
                    <RelatedCollectionsRail
                      collections={collection.relatedCollections}
                      title={collection.title}
                      lazyLoadImages
                    />
                  </Box>
                </>
              )}
            </FrameWithRecentlyViewed>
          </Box>
        </AppContainer>
      </>
    )
  }
}

export const CollectionRefetchContainer = createRefetchContainer(
  withSystemContext(CollectionApp),
  {
    collection: graphql`
      fragment Collection_collection on MarketingCollection
        @argumentDefinitions(
          acquireable: { type: "Boolean" }
          aggregations: { type: "[ArtworkAggregation]" }
          atAuction: { type: "Boolean" }
          color: { type: "String" }
          forSale: { type: "Boolean" }
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
          atAuction: $atAuction
          color: $color
          forSale: $forSale
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
          ...ArtworkFilterArtworkGrid2_filtered_artworks
        }
      }
    `,
  },
  CollectionAppQuery
)

// Top-level route needs to be exported for bundle splitting in the router
export default CollectionRefetchContainer

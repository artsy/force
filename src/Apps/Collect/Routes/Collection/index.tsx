import { Spacer } from "@artsy/palette"
import { Collection_collection$data } from "__generated__/Collection_collection.graphql"
import { CollectionFilterFragmentContainer as CollectionHeader } from "Apps/Collect/Routes/Collection/Components/Header"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { RelatedCollectionsRailQueryRenderer } from "Components/RelatedCollectionsRail/RelatedCollectionsRail"
import { BreadCrumbList } from "Components/Seo/BreadCrumbList"
import * as React from "react"
import { RelayRefetchProp, graphql, createFragmentContainer } from "react-relay"
import { truncate } from "lodash"
import { CollectionsHubRailsContainer as CollectionsHubRails } from "./Components/CollectionsHubRails"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { TrackingProp } from "react-tracking"
import { ErrorPage } from "Components/ErrorPage"
import { CollectionArtworksFilterRefetchContainer } from "./Components/CollectionArtworksFilter"
import {
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { MetaTags } from "Components/MetaTags"
import {
  SystemContextProps,
  withSystemContext,
} from "System/Contexts/SystemContext"

interface CollectionAppProps extends SystemContextProps {
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
    descriptionMarkdown,
    fallbackHeaderImage,
    artworksConnection,
  } = collection

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

        {collection.linkedCollections.length === 0 && (
          <>
            <Spacer y={6} />

            <RelatedCollectionsRailQueryRenderer slug={slug} />
          </>
        )}
      </FrameWithRecentlyViewed>
    </>
  )
}

const TrackingWrappedCollectionApp: React.FC<CollectionAppProps> = props => {
  const {
    collection: { id },
  } = props
  return (
    <Analytics contextPageOwnerId={id}>
      <CollectionApp {...props} />
    </Analytics>
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
        # TODO: Description should implement markdown which accepts a format argument
        descriptionMarkdown
        headerImage
        slug
        id
        title
        relatedCollections(size: 1) {
          internalID
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

        ...CollectionArtworksFilter_collection @arguments(input: $input)
      }
    `,
  }
)

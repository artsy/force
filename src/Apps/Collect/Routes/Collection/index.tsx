import { Spacer } from "@artsy/palette"
import StaticContainer from "found/StaticContainer"
import { Collection_collection$data } from "__generated__/Collection_collection.graphql"
import { CollectionArtworksQuery } from "__generated__/CollectionArtworksQuery.graphql"
import { CollectionHeaderFragmentContainer } from "Apps/Collect/Routes/Collection/Components/Header"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { RelatedCollectionsRailQueryRenderer } from "Components/RelatedCollectionsRail/RelatedCollectionsRail"
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
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { initializeVariablesWithFilterState } from "Apps/Collect/collectRoutes"
import { useRouter } from "System/Hooks/useRouter"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { CollectionFeaturedArtistsFragmentContainer } from "Apps/Collect/Routes/Collection/Components/Header/CollectionFeaturedArtists"

interface CollectionAppProps extends SystemContextProps {
  collection: Collection_collection$data
  relay: RelayRefetchProp
  tracking: TrackingProp
}

export const CollectionApp: React.FC<CollectionAppProps> = props => {
  const { collection } = props

  const { match } = useRouter()

  if (!collection) return <ErrorPage code={404} />

  const { title, slug, headerImage, descriptionMarkdown } = collection

  const metadataDescription = descriptionMarkdown
    ? `Buy, bid, and inquire on ${title} on Artsy. ${truncate(
        descriptionMarkdown,
        { length: 158 }
      )}`
    : `Buy, bid, and inquire on ${title} on Artsy.`

  const socialImage = headerImage

  const HIDE_SIGNAL_SLUGS = [
    "trending-now",
    "curators-picks-emerging-artists",
    "curators-picks-blue-chip-artists",
  ]

  const hideSignals = HIDE_SIGNAL_SLUGS.includes(collection.slug)

  return (
    <>
      <MetaTags
        description={metadataDescription}
        imageURL={socialImage}
        pathname={`collection/${slug}`}
        title={`${title} - For Sale on Artsy`}
      />

      <CollectionHeaderFragmentContainer collection={collection} />

      <ArtworkGridContextProvider hideSignals={hideSignals}>
        {/* TODO: Figure out why rerenders trigger refetches here, requiring
              the static container to freeze rendering during route transitions. */}
        <StaticContainer shouldUpdate={!!match.elements}>
          <SystemQueryRenderer<CollectionArtworksQuery>
            query={graphql`
              query CollectionArtworksQuery(
                $slug: String!
                $aggregations: [ArtworkAggregation]
                $input: FilterArtworksInput!
                $shouldFetchCounts: Boolean!
              ) {
                marketingCollection(slug: $slug) {
                  ...CollectionFeaturedArtists_collection
                  ...CollectionArtworksFilter_collection
                    @arguments(input: $input)

                  linkedCollections {
                    ...CollectionsHubRails_linkedCollections
                  }

                  artworksConnection(
                    aggregations: $aggregations
                    includeMediumFilterInAggregation: true
                    first: 20
                    sort: "-decayed_merch"
                  ) {
                    ...CollectionFeaturedArtists_artworks
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
                }
              }
            `}
            variables={initializeVariablesWithFilterState(match.params, match)}
            placeholder={<ArtworkFilterPlaceholder pt={6} />}
            render={({ error, props }) => {
              if (error) {
                console.error("[collection]: Error loading artwork grid", error)
                return null
              }

              if (!props || !props.marketingCollection) {
                return <ArtworkFilterPlaceholder pt={6} />
              }

              const showCollectionHubs =
                props.marketingCollection.linkedCollections.length > 0

              return (
                <>
                  {props.marketingCollection.artworksConnection && (
                    <CollectionFeaturedArtistsFragmentContainer
                      collection={props.marketingCollection}
                      artworks={props.marketingCollection.artworksConnection}
                    />
                  )}

                  <FrameWithRecentlyViewed>
                    {showCollectionHubs && (
                      <>
                        <Spacer y={6} />

                        <CollectionsHubRails
                          linkedCollections={
                            props.marketingCollection.linkedCollections
                          }
                        />
                      </>
                    )}

                    <Spacer y={6} />

                    <CollectionArtworksFilterRefetchContainer
                      collection={props.marketingCollection}
                      aggregations={
                        props.marketingCollection?.artworksConnection
                          ?.aggregations as SharedArtworkFilterContextProps["aggregations"]
                      }
                      counts={
                        props.marketingCollection.artworksConnection
                          ?.counts as Counts
                      }
                    />

                    {props.marketingCollection.linkedCollections.length ===
                      0 && (
                      <>
                        <Spacer y={6} />

                        <RelatedCollectionsRailQueryRenderer slug={slug} />
                      </>
                    )}
                  </FrameWithRecentlyViewed>
                </>
              )
            }}
          />
        </StaticContainer>
      </ArtworkGridContextProvider>
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
      fragment Collection_collection on MarketingCollection {
        ...Header_collection
        descriptionMarkdown
        headerImage
        slug
        id
        title
      }
    `,
  }
)

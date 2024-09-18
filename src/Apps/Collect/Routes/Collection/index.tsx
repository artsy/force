import { Spacer } from "@artsy/palette"
import { Collection_collection$data } from "__generated__/Collection_collection.graphql"
import { CollectionArtworksQuery } from "__generated__/CollectionArtworksQuery.graphql"
import { CollectionHeaderFragmentContainer } from "Apps/Collect/Routes/Collection/Components/Header"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { RelatedCollectionsRailQueryRenderer } from "Components/RelatedCollectionsRail/RelatedCollectionsRail"
import * as React from "react"
import { graphql, createFragmentContainer } from "react-relay"
import { truncate } from "lodash"
import { CollectionsHubRailsQueryRenderer } from "./Components/CollectionsHubRails"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { ErrorPage } from "Components/ErrorPage"
import { CollectionArtworksFilterRefetchContainer } from "./Components/CollectionArtworksFilter"
import {
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { MetaTags } from "Components/MetaTags"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { initializeVariablesWithFilterState } from "Apps/Collect/collectRoutes"
import { useRouter } from "System/Hooks/useRouter"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { CollectionFeaturedArtistsQueryRenderer } from "Apps/Collect/Routes/Collection/Components/Header/CollectionFeaturedArtists"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

interface CollectionAppProps {
  collection: Collection_collection$data
}

export const CollectionApp: React.FC<CollectionAppProps> = props => {
  const { collection } = props

  const context = useAnalyticsContext()

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
      <Analytics contextPageOwnerId={context.contextPageOwnerId as string}>
        <MetaTags
          description={metadataDescription}
          imageURL={socialImage}
          pathname={`collection/${slug}`}
          title={`${title} - For Sale on Artsy`}
        />

        <CollectionHeaderFragmentContainer collection={collection} />

        <>
          {collection.showFeaturedArtists && (
            <CollectionFeaturedArtistsQueryRenderer slug={slug} />
          )}

          <CollectionsHubRailsQueryRenderer slug={slug} />

          <FrameWithRecentlyViewed>
            <ArtworkGridContextProvider hideSignals={hideSignals}>
              {/* TODO: Figure out why rerenders trigger refetches here, requiring
              the static container to freeze rendering during route transitions. */}
              <SystemQueryRenderer<CollectionArtworksQuery>
                query={graphql`
                  query CollectionArtworksQuery(
                    $slug: String!
                    $aggregations: [ArtworkAggregation]
                    $input: FilterArtworksInput!
                    $shouldFetchCounts: Boolean!
                  ) {
                    marketingCollection(slug: $slug) {
                      ...CollectionArtworksFilter_collection
                        @arguments(input: $input)

                      artworksConnection(
                        aggregations: $aggregations
                        includeMediumFilterInAggregation: true
                        first: 20
                        sort: "-decayed_merch"
                      ) {
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
                variables={{
                  ...initializeVariablesWithFilterState(match.params, match),
                  slug,
                }}
                placeholder={<ArtworkFilterPlaceholder pt={6} />}
                render={({ error, props }) => {
                  if (error) {
                    console.error(
                      "[collection]: Error loading artwork grid",
                      error
                    )
                    return null
                  }

                  if (!props || !props.marketingCollection) {
                    return <ArtworkFilterPlaceholder pt={6} />
                  }

                  return (
                    <>
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

                      <RelatedCollectionsRailQueryRenderer slug={slug} />
                    </>
                  )
                }}
              />
            </ArtworkGridContextProvider>
          </FrameWithRecentlyViewed>
        </>
      </Analytics>
    </>
  )
}

export const CollectionFragmentContainer = createFragmentContainer(
  CollectionApp,
  {
    collection: graphql`
      fragment Collection_collection on MarketingCollection {
        ...Header_collection
        descriptionMarkdown
        headerImage
        slug
        title
        showFeaturedArtists
      }
    `,
  }
)

import { Image, Shelf, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AnalyticsSchema, Type, useSystemContext } from "v2/Artsy"
import { SystemQueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { Artist2IconicCollectionsRail_marketingCollections } from "v2/__generated__/Artist2IconicCollectionsRail_marketingCollections.graphql"
import currency from "currency.js"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { data as sd } from "sharify"
import { useTracking } from "react-tracking"
import { LoadingPlaceholder } from "./LoadingPlaceholder"

interface Artist2IconicCollectionsRailProps {
  marketingCollections: Artist2IconicCollectionsRail_marketingCollections
}

const Artist2IconicCollectionsRail: React.FC<Artist2IconicCollectionsRailProps> = ({
  marketingCollections,
}) => {
  const tracking = useTracking()

  if (marketingCollections.length === 0) {
    return null
  }

  return (
    <>
      <Text variant="lg" my={4}>
        Iconic Collections
      </Text>
      <Shelf>
        {marketingCollections.map((marketingCollection, index) => {
          const image =
            marketingCollection?.artworksConnection?.edges?.[0]?.node?.image
          const formattedTitle = marketingCollection.title.split(": ")[1]
          const formattedPrice = `From $${currency(
            marketingCollection.priceGuidance!,
            {
              separator: ",",
              precision: 0,
            }
          ).format()}`

          return (
            <RouterLink
              to={`/collection/${marketingCollection.slug}`}
              key={index}
              noUnderline
              onClick={() => {
                tracking.trackEvent({
                  action_type: AnalyticsSchema.ActionType.Click,
                  context_module: ContextModule.collectionRail,
                  context_page_owner_type: OwnerType.artist,
                  destination_path: `${sd.APP_URL}/collection/${marketingCollection.slug}`,
                  type: Type.Thumbnail,
                })
              }}
            >
              {image?.resized?.src && (
                <>
                  <Image
                    width={image.resized.width}
                    height={image.resized.height}
                    src={image.resized.src}
                    srcSet={image.resized.srcSet}
                    lazyLoad
                  />
                </>
              )}
              <Text variant="md">{formattedTitle}</Text>
              <Text variant="md" color="black60">
                {formattedPrice}
              </Text>
            </RouterLink>
          )
        })}
      </Shelf>
    </>
  )
}

export const Artist2IconicCollectionsRailFragmentContainer = createFragmentContainer(
  Artist2IconicCollectionsRail,
  {
    marketingCollections: graphql`
      fragment Artist2IconicCollectionsRail_marketingCollections on MarketingCollection
        @relay(plural: true) {
        headerImage
        thumbnail
        slug
        title
        priceGuidance
        artworksConnection(
          first: 1
          aggregations: [TOTAL]
          sort: "-decayed_merch"
        ) {
          edges {
            node {
              image {
                resized(width: 325, height: 230) {
                  width
                  height
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    `,
  }
)

export const Artist2IconicCollectionsRailQueryRenderer = props => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer
      environment={relayEnvironment}
      variables={{
        artistID: props.artistID, // Refers to `internalID`, not `slug`
        isFeaturedArtistContent: true,
        size: 16,
      }}
      query={graphql`
        query Artist2IconicCollectionsRailQuery(
          $isFeaturedArtistContent: Boolean
          $size: Int
          $artistID: String
        ) {
          marketingCollections(
            isFeaturedArtistContent: $isFeaturedArtistContent
            size: $size
            artistID: $artistID
          ) {
            ...Artist2IconicCollectionsRail_marketingCollections
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return <LoadingPlaceholder />
        }

        if (props.marketingCollections) {
          return (
            <Artist2IconicCollectionsRailFragmentContainer
              marketingCollections={props.marketingCollections}
            />
          )
        }
      }}
    />
  )
}

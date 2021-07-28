import { Image, Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AnalyticsSchema, Type, useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ArtistIconicCollectionsRail_marketingCollections } from "v2/__generated__/ArtistIconicCollectionsRail_marketingCollections.graphql"
import currency from "currency.js"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { data as sd } from "sharify"
import { useTracking } from "react-tracking"
import { LoadingPlaceholder } from "./LoadingPlaceholder"
import { resized } from "v2/Utils/resized"
import { scale } from "proportional-scale"

interface ArtistIconicCollectionsRailProps {
  marketingCollections: ArtistIconicCollectionsRail_marketingCollections
}

const ArtistIconicCollectionsRail: React.FC<ArtistIconicCollectionsRailProps> = ({
  marketingCollections,
}) => {
  const tracking = useTracking()

  const hasContent = marketingCollections.every(
    collection => collection?.artworksConnection?.edges?.length! > 0
  )

  // width: 325, height: 230

  if (marketingCollections.length === 0 || !hasContent) {
    return null
  }

  return (
    <>
      <Text variant="lg" my={4}>
        Iconic Collections
      </Text>

      <Shelf>
        {marketingCollections.map((marketingCollection, index) => {
          const image = resized(
            marketingCollection?.artworksConnection?.edges?.[0]?.node?.image
              ?.sourceUrl!,
            { width: 325, height: 230 }
          )

          const geometry = scale({
            width: marketingCollection?.artworksConnection?.edges?.[0]?.node
              ?.image?.width!,
            height: marketingCollection?.artworksConnection?.edges?.[0]?.node
              ?.image?.height!,
            maxWidth: 325,
            maxHeight: 230,
          })

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
              {image.src && (
                <>
                  <Image
                    width={geometry.width}
                    height={geometry.height}
                    src={image.src}
                    srcSet={image.srcSet}
                    lazyLoad
                  />
                </>
              )}
              <Spacer my={1} />
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

export const ArtistIconicCollectionsRailFragmentContainer = createFragmentContainer(
  ArtistIconicCollectionsRail,
  {
    marketingCollections: graphql`
      fragment ArtistIconicCollectionsRail_marketingCollections on MarketingCollection
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
                width
                height
                sourceUrl: url(version: ["larger", "large"])
              }
            }
          }
        }
      }
    `,
  }
)

export const ArtistIconicCollectionsRailQueryRenderer = props => {
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
        query ArtistIconicCollectionsRailQuery(
          $isFeaturedArtistContent: Boolean
          $size: Int
          $artistID: String
        ) {
          marketingCollections(
            isFeaturedArtistContent: $isFeaturedArtistContent
            size: $size
            artistID: $artistID
          ) {
            ...ArtistIconicCollectionsRail_marketingCollections
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
            <ArtistIconicCollectionsRailFragmentContainer
              marketingCollections={props.marketingCollections}
            />
          )
        }
      }}
    />
  )
}

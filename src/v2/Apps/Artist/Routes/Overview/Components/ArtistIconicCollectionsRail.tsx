import {
  Box,
  Image,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AnalyticsSchema, Type, useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ArtistIconicCollectionsRail_marketingCollections } from "v2/__generated__/ArtistIconicCollectionsRail_marketingCollections.graphql"
import currency from "currency.js"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ContextModule, OwnerType } from "@artsy/cohesion"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import { useTracking } from "react-tracking"
import { ArtistIconicCollectionsRailQuery } from "v2/__generated__/ArtistIconicCollectionsRailQuery.graphql"
import { Rail } from "v2/Components/Rail"

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

  if (marketingCollections.length === 0 || !hasContent) {
    return null
  }

  return (
    <Rail
      title="Iconic Collections"
      getItems={() => {
        return marketingCollections.map((marketingCollection, index) => {
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
              <Spacer my={1} />
              <Text variant="sm-display">{formattedTitle}</Text>
              <Text variant="sm-display" color="black60">
                {formattedPrice}
              </Text>
            </RouterLink>
          )
        })
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Iconic Collections"
      getItems={() => {
        return [...new Array(10)].map((_, i) => {
          return (
            <>
              <SkeletonBox width={325} height={230} />
              <SkeletonText variant="sm-display">Works on Paper</SkeletonText>
              <SkeletonText variant="sm-display">From $500</SkeletonText>
            </>
          )
        })
      }}
    />
  </Skeleton>
)

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

export const ArtistIconicCollectionsRailQueryRenderer = props => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="ArtistIconicCollectionsRailQueryRenderer">
      <SystemQueryRenderer<ArtistIconicCollectionsRailQuery>
        lazyLoad
        environment={relayEnvironment}
        variables={{
          internalID: props.internalID,
          isFeaturedArtistContent: true,
          size: 16,
        }}
        query={graphql`
          query ArtistIconicCollectionsRailQuery(
            $isFeaturedArtistContent: Boolean
            $size: Int
            $internalID: String
          ) {
            marketingCollections(
              isFeaturedArtistContent: $isFeaturedArtistContent
              size: $size
              artistID: $internalID
            ) {
              ...ArtistIconicCollectionsRail_marketingCollections
            }
          }
        `}
        placeholder={PLACEHOLDER}
        render={({ error, props }) => {
          if (error) {
            console.error(error)
            return null
          }

          if (!props) {
            return PLACEHOLDER
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
    </Box>
  )
}

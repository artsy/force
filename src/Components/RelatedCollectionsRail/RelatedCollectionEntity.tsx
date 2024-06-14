import { Box, Flex, Image, Text } from "@artsy/palette"
import { RelatedCollectionEntity_collection$data } from "__generated__/RelatedCollectionEntity_collection.graphql"
import { useTracking } from "react-tracking"
import currency from "currency.js"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule, clickedCollectionGroup } from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { RouterLink } from "System/Components/RouterLink"
import { cropped } from "Utils/resized"
import { extractNodes } from "Utils/extractNodes"

export interface RelatedCollectionEntityProps {
  collection: RelatedCollectionEntity_collection$data
  lazyLoad?: boolean
  slideIndex: number
}

export const RelatedCollectionEntity: React.FC<RelatedCollectionEntityProps> = ({
  lazyLoad,
  collection,
  slideIndex,
}) => {
  const {
    artworksConnection,
    headerImage,
    priceGuidance,
    id,
    slug,
    title,
  } = collection

  const artworks = extractNodes(artworksConnection)

  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const onLinkClick = () => {
    trackEvent(
      clickedCollectionGroup({
        contextModule: ContextModule.relatedCollectionsRail,
        contextPageOwnerId,
        contextPageOwnerSlug,
        contextPageOwnerType,
        destinationPageOwnerId: id,
        destinationPageOwnerSlug: slug,
        horizontalSlidePosition: slideIndex,
      })
    )
  }

  return (
    <Box>
      <RouterLink
        to={`/collection/${slug}`}
        onClick={onLinkClick}
        textDecoration="none"
      >
        <Flex alignItems="flex-end" mb={1}>
          {artworks.every(artwork => !!artwork.image) ? (
            artworks.map((artwork, index) => {
              if (!artwork.image) return null

              const { resized } = artwork.image

              if (!resized) return null

              return (
                <Box key={index} ml={index === 0 ? 0 : -2}>
                  <Image
                    src={resized.src}
                    srcSet={resized.srcSet}
                    width={resized.width}
                    height={resized.height}
                    alt=""
                    lazyLoad
                  />
                </Box>
              )
            })
          ) : (
            <Image
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              {...cropped(headerImage, { width: 325, height: 150 })}
              width={325}
              height={150}
              alt=""
              lazyLoad
            />
          )}
        </Flex>

        <Text variant="sm-display" overflowEllipsis maxWidth={375}>
          {title}
        </Text>

        <Text variant="xs" color="black100">
          {priceGuidance ? (
            <>
              From $
              {currency(priceGuidance, {
                separator: ",",
                precision: 0,
              }).format()}
            </>
          ) : (
            "—"
          )}
        </Text>
      </RouterLink>
    </Box>
  )
}

export const RelatedCollectionEntityFragmentContainer = createFragmentContainer(
  RelatedCollectionEntity,
  {
    collection: graphql`
      fragment RelatedCollectionEntity_collection on MarketingCollection {
        headerImage
        slug
        title
        id
        priceGuidance
        artworksConnection(
          first: 3
          aggregations: [TOTAL]
          sort: "-decayed_merch"
        ) {
          edges {
            node {
              artist {
                name
              }
              title
              image {
                resized(width: 150, height: 150) {
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

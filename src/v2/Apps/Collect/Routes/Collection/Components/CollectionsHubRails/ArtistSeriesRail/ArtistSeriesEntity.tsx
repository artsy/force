import { Box, Flex, Text, Image } from "@artsy/palette"
import { ArtistSeriesEntity_member } from "v2/__generated__/ArtistSeriesEntity_member.graphql"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import currency from "currency.js"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule, clickedArtistSeriesGroup } from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"
import { extractNodes } from "v2/Utils/extractNodes"
import { cropped } from "v2/Utils/resized"

export interface ArtistSeriesEntityProps {
  member: ArtistSeriesEntity_member
  itemNumber: number
}

export const ArtistSeriesEntity: React.FC<ArtistSeriesEntityProps> = ({
  member,
  itemNumber,
}) => {
  const {
    headerImage,
    artworksConnection,
    priceGuidance,
    slug,
    id,
    title,
  } = member

  const artworks = extractNodes(artworksConnection)

  const { trackEvent } = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const handleLinkClick = () => {
    trackEvent(
      clickedArtistSeriesGroup({
        contextModule: ContextModule.artistSeriesRail,
        contextPageOwnerId,
        contextPageOwnerSlug,
        // @ts-expect-error STRICT_NULL_CHECK
        contextPageOwnerType,
        destinationPageOwnerId: id,
        destinationPageOwnerSlug: slug,
        horizontalSlidePosition: itemNumber,
      })
    )
  }

  return (
    <>
      <RouterLink
        to={`/collection/${slug}`}
        onClick={handleLinkClick}
        noUnderline
      >
        <Flex alignItems="flex-end" mb={1}>
          {artworks.every(artwork => !!artwork.image) ? (
            artworks.map((artwork, index) => {
              if (!artwork.image) return null

              const { resized } = artwork.image

              return (
                <Box key={index} ml={index === 0 ? 0 : -2}>
                  <Image
                    // @ts-expect-error STRICT_NULL_CHECK
                    src={resized.src}
                    // @ts-expect-error STRICT_NULL_CHECK
                    srcSet={resized.srcSet}
                    // @ts-expect-error STRICT_NULL_CHECK
                    width={resized.width}
                    // @ts-expect-error STRICT_NULL_CHECK
                    height={resized.height}
                    // @ts-expect-error STRICT_NULL_CHECK
                    alt={artwork.title}
                    lazyLoad
                  />
                </Box>
              )
            })
          ) : (
            <Image
              // @ts-expect-error STRICT_NULL_CHECK
              {...cropped(headerImage, { width: 325, height: 150 })}
              width={325}
              height={150}
              alt=""
              lazyLoad
            />
          )}
        </Flex>

        <Text variant="md" overflowEllipsis maxWidth={375}>
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
    </>
  )
}

export const ArtistSeriesRailContainer = createFragmentContainer(
  ArtistSeriesEntity as React.FC<ArtistSeriesEntityProps>,
  {
    member: graphql`
      fragment ArtistSeriesEntity_member on MarketingCollection {
        id
        slug
        headerImage
        thumbnail
        title
        priceGuidance
        artworksConnection(
          first: 3
          aggregations: [TOTAL]
          sort: "-decayed_merch"
        ) {
          edges {
            node {
              internalID
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

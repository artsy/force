import { Box, Flex, Text, Image } from "@artsy/palette"
import { ArtistSeriesEntity_member } from "v2/__generated__/ArtistSeriesEntity_member.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"
import { RouterLink } from "v2/System/Router/RouterLink"
import currency from "currency.js"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule, clickedArtistSeriesGroup } from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
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
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
                    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                    src={resized.src}
                    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                    srcSet={resized.srcSet}
                    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                    width={resized.width}
                    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                    height={resized.height}
                    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                    alt={artwork.title}
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

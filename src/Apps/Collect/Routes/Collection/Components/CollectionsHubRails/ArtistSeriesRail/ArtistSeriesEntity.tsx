import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { extractNodes } from "Utils/extractNodes"
import { cropped } from "Utils/resized"
import {
  ActionType,
  type ClickedArtistSeriesGroup,
  ContextModule,
} from "@artsy/cohesion"
import { Box, Flex, Image, Text } from "@artsy/palette"
import type { ArtistSeriesEntity_member$data } from "__generated__/ArtistSeriesEntity_member.graphql"
import currency from "currency.js"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

export interface ArtistSeriesEntityProps {
  member: ArtistSeriesEntity_member$data
  itemNumber: number
}

export const ArtistSeriesEntity: React.FC<
  React.PropsWithChildren<ArtistSeriesEntityProps>
> = ({ member, itemNumber }) => {
  const { headerImage, artworksConnection, priceGuidance, slug, id, title } =
    member

  const artworks = extractNodes(artworksConnection)

  const { trackEvent } = useTracking()

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const handleLinkClick = () => {
    if (!contextPageOwnerType) return null

    const analyticsOptions: Partial<ClickedArtistSeriesGroup> = {
      context_module: ContextModule.artistSeriesRail,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      context_page_owner_type: contextPageOwnerType,
      destination_page_owner_id: id,
      destination_page_owner_slug: slug,
      horizontal_slide_position: itemNumber,
    }
    trackEvent(tracks.clickedArtistSeriesGroup(analyticsOptions))
  }

  return (
    <>
      <RouterLink
        to={`/collection/${slug}`}
        onClick={handleLinkClick}
        textDecoration="none"
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

        <Text variant="sm-display" overflowEllipsis maxWidth={375}>
          {title}
        </Text>

        <Text variant="xs" color="mono100">
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
  ArtistSeriesEntity as React.FC<
    React.PropsWithChildren<ArtistSeriesEntityProps>
  >,
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
              artist(shallow: true) {
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

const tracks = {
  clickedArtistSeriesGroup: (options): ClickedArtistSeriesGroup => ({
    action: ActionType.clickedArtistSeriesGroup,
    type: "thumbnail",
    ...options,
  }),
}

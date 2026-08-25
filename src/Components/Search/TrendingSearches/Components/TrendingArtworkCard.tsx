import { ContextModule } from "@artsy/cohesion"
import { Box, Image, Text } from "@artsy/palette"
import { SaveArtworkToListsButtonFragmentContainer } from "Components/Artwork/SaveButton/SaveArtworkToListsButton"
import { RouterLink } from "System/Components/RouterLink"
import { maxDimensionsByArea } from "Utils/resized"
import type { TrendingSearchesQuery } from "__generated__/TrendingSearchesQuery.graphql"
import type { FC, MouseEvent } from "react"

export type TrendingArtworkNode = NonNullable<
  NonNullable<
    NonNullable<
      TrendingSearchesQuery["response"]["searchDropdown"]["oneDay"]
    >["artworks"]
  >[number]["artwork"]
>

// ShelfArtwork's equal-area sizing, scaled down to this compact panel
const ARTWORK_IMAGE_ROW_HEIGHT = 200
const ARTWORK_IMAGE_AREA = 160 * 160
// Keep in sync with resized(width:) in TrendingSearches' query
const ARTWORK_CARD_MAX_WIDTH = 240
const ARTWORK_CARD_FALLBACK_WIDTH = Math.sqrt(ARTWORK_IMAGE_AREA)

export interface TrendingArtworkCardProps {
  artwork: TrendingArtworkNode
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

export const TrendingArtworkCard: FC<TrendingArtworkCardProps> = ({
  artwork,
  onClick,
}) => {
  const image = artwork.image?.resized
  const href = artwork.href ?? `/artwork/${artwork.slug}`

  if (!image?.src) {
    return null
  }

  const { width, aspectRatio } = getTrendingCardLayout(image)

  return (
    <Box width={width} maxWidth={ARTWORK_CARD_MAX_WIDTH} flexShrink={0}>
      <RouterLink to={href} onClick={onClick} display="block">
        {/* Mixed aspect ratios share a bottom baseline, like ShelfArtwork */}
        <Box
          height={ARTWORK_IMAGE_ROW_HEIGHT}
          display="flex"
          alignItems="flex-end"
          overflow="hidden"
        >
          <Box width="100%" style={{ aspectRatio }} bg="mono10">
            <Image
              src={image.src}
              srcSet={image.srcSet}
              width="100%"
              height="100%"
              alt={artwork.title ?? ""}
              lazyLoad
              style={{ display: "block", objectFit: "cover" }}
            />
          </Box>
        </Box>
      </RouterLink>

      <Box position="relative" mt={1}>
        <Box position="absolute" top={0} right={0}>
          {/* Requires a ManageArtworkForSavesProvider. It is mounted in the
              HOSTS (SearchBarInput / Mobile Overlay), not per-card like
              ShelfArtwork does: the save flow's list modal and toast action
              outlive the panel, which unmounts on blur as the modal opens. */}
          <SaveArtworkToListsButtonFragmentContainer
            artwork={artwork}
            contextModule={ContextModule.trendingArtworksRail}
          />
        </Box>

        <RouterLink
          to={href}
          onClick={onClick}
          display="block"
          textDecoration="none"
        >
          {/* Single-line text keeps card heights uniform across tabs */}
          <Text variant="sm-display" overflowEllipsis pr={4}>
            {artwork.artistNames}
          </Text>
          <Text variant="xs" color="mono60" overflowEllipsis>
            {artwork.title}
            {artwork.date ? `, ${artwork.date}` : ""}
          </Text>
          {artwork.partner?.name && (
            <Text variant="xs" color="mono60" overflowEllipsis>
              {artwork.partner.name}
            </Text>
          )}
          {artwork.saleMessage && (
            <Text variant="xs" fontWeight="bold" mt={0.5} overflowEllipsis>
              {artwork.saleMessage}
            </Text>
          )}
        </RouterLink>
      </Box>
    </Box>
  )
}

interface TrendingCardLayout {
  width: number
  aspectRatio: string
}

/** Missing or zero dimensions fall back to a neutral square. */
export const getTrendingCardLayout = (image: {
  width: number | null | undefined
  height: number | null | undefined
}): TrendingCardLayout => {
  if (!image.width || !image.height) {
    return { width: ARTWORK_CARD_FALLBACK_WIDTH, aspectRatio: "1 / 1" }
  }

  return {
    width: maxDimensionsByArea({
      area: ARTWORK_IMAGE_AREA,
      width: image.width,
      height: image.height,
    }).width,
    aspectRatio: `${image.width} / ${image.height}`,
  }
}

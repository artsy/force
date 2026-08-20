import { Box, Image, Text } from "@artsy/palette"
import styled from "styled-components"
import { ContextModule } from "@artsy/cohesion"
import { SaveButtonFragmentContainer } from "Components/Artwork/SaveButton/SaveButton"
import { RouterLink } from "System/Components/RouterLink"
import type { TrendingSearchesQuery } from "__generated__/TrendingSearchesQuery.graphql"
import type { FC, MouseEvent } from "react"

export type TrendingArtworkNode = NonNullable<
  NonNullable<
    TrendingSearchesQuery["response"]["searchDropdown"]["oneDay"]["artworks"]
  >[number]["artwork"]
>

export const ARTWORK_IMAGE_HEIGHT = 200
// Cards keep at least this width; the rail scrolls when space runs out.
export const ARTWORK_CARD_FLEX = "1 0 160px"

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

  return (
    <Box flex={ARTWORK_CARD_FLEX} minWidth={0}>
      <RouterLink to={href} onClick={onClick} display="block">
        <Box width="100%" height={ARTWORK_IMAGE_HEIGHT}>
          <CardImage
            src={image.src}
            srcSet={image.srcSet}
            width={image.width}
            height={image.height}
            alt={artwork.title ?? ""}
            // Native attribute, not Palette's lazyLoad prop: the prop swaps in
            // a wrapper Box that receives this styled component's className,
            // breaking the object-fit sizing on the actual img
            loading="lazy"
          />
        </Box>
      </RouterLink>

      <Box position="relative" mt={1}>
        <Box position="absolute" top={0} right={0}>
          <SaveButtonFragmentContainer
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
          <Text variant="sm-display" overflowEllipsis pr={4}>
            {artwork.artistNames}
          </Text>
          <Text variant="xs" color="mono60">
            {artwork.title}
            {artwork.date ? `, ${artwork.date}` : ""}
          </Text>
          {artwork.partner?.name && (
            <Text variant="xs" color="mono60" overflowEllipsis>
              {artwork.partner.name}
            </Text>
          )}
          {artwork.saleMessage && (
            <Text variant="xs" fontWeight="bold" mt={0.5}>
              {artwork.saleMessage}
            </Text>
          )}
        </RouterLink>
      </Box>
    </Box>
  )
}

// Bottom-left anchored so rows of mixed aspect ratios share a baseline
const CardImage = styled(Image)`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: bottom left;
`

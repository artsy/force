import { Box, Image, Text } from "@artsy/palette"
import { ContextModule } from "@artsy/cohesion"
import { SaveButtonFragmentContainer } from "Components/Artwork/SaveButton/SaveButton"
import { RouterLink } from "System/Components/RouterLink"
import type { TrendingSearchesQuery } from "__generated__/TrendingSearchesQuery.graphql"
import type { FC, MouseEvent } from "react"
import type { TrendingArtwork } from "Components/Search/TrendingSearches/trendingSearchesData"

export type HydratedArtwork = NonNullable<
  NonNullable<
    NonNullable<TrendingSearchesQuery["response"]["artworks"]>["edges"]
  >[number]
>["node"]

export const ARTWORK_IMAGE_HEIGHT = 200
// Cards keep at least this width; the rail scrolls when space runs out.
export const ARTWORK_CARD_FLEX = "1 0 160px"

export interface TrendingArtworkCardProps {
  item: TrendingArtwork
  hydrated?: HydratedArtwork
  onClick?: (event: MouseEvent<HTMLElement>) => void
}

export const TrendingArtworkCard: FC<TrendingArtworkCardProps> = ({
  item,
  hydrated,
  onClick,
}) => {
  const image = hydrated?.image?.resized
  const href = hydrated?.href ?? `/artwork/${item.slug}`

  if (!hydrated || !image?.src) {
    return null
  }

  return (
    <Box flex={ARTWORK_CARD_FLEX} minWidth={0}>
      <RouterLink to={href} onClick={onClick} display="block">
        <Box width="100%" height={ARTWORK_IMAGE_HEIGHT}>
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width={image.width}
            height={image.height}
            alt={hydrated.title ?? ""}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "bottom left",
            }}
          />
        </Box>
      </RouterLink>

      <Box position="relative" mt={1}>
        <Box position="absolute" top={0} right={0}>
          {/* TODO: Switch to ContextModule.trendingArtworksRail once the
              cohesion release containing it lands in Force — SaveButton's
              AuthContextModule union rejects unreleased values, and the auth
              flow must only ever receive schema-valid modules */}
          <SaveButtonFragmentContainer
            artwork={hydrated}
            contextModule={ContextModule.header}
          />
        </Box>

        <RouterLink
          to={href}
          onClick={onClick}
          display="block"
          textDecoration="none"
        >
          <Text variant="sm-display" overflowEllipsis pr={4}>
            {hydrated.artistNames ?? item.artistName}
          </Text>
          <Text variant="xs" color="mono60">
            {hydrated.title}
            {hydrated.date ? `, ${hydrated.date}` : ""}
          </Text>
          {hydrated.partner?.name && (
            <Text variant="xs" color="mono60" overflowEllipsis>
              {hydrated.partner.name}
            </Text>
          )}
          {hydrated.saleMessage && (
            <Text variant="xs" fontWeight="bold" mt={0.5}>
              {hydrated.saleMessage}
            </Text>
          )}
        </RouterLink>
      </Box>
    </Box>
  )
}

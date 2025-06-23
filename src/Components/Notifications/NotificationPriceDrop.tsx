import type { AuthContextModule } from "@artsy/cohesion"
import { Box, Button, Image } from "@artsy/palette"
import { ExclusiveAccessBadge } from "Components/Artwork/ExclusiveAccessBadge"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import Metadata from "Components/Artwork/Metadata"
import { CARD_MAX_WIDTH } from "Components/Notifications/constants"
import { RouterLink, type RouterLinkProps } from "System/Components/RouterLink"
import { resized } from "Utils/resized"
import type { NotificationArtwork_artwork$key } from "__generated__/NotificationArtwork_artwork.graphql"
import type * as React from "react"
import { graphql, useFragment } from "react-relay"

export interface NotificationArtworkProps
  extends Omit<RouterLinkProps, "to" | "width"> {
  artwork: NotificationArtwork_artwork$key
  contextModule?: AuthContextModule
  onClick?: () => void
}

export const NotificationPriceDrop: React.FC<
  React.PropsWithChildren<NotificationPriceDropProps>
> = ({ priceDrop: priceDropProp, contextModule, onClick, ...rest }) => {
  const priceDrop = useFragment(NotificationPriceDropFragment, priceDropProp)
  const artwork = priceDrop.artwork

  // TODO: significant drop check instead
  if (priceDrop.newPrice >= priceDrop.oldPrice) {
    return null
  }

  if (!artwork.image?.src) {
    return null
  }

  const image = resized(artwork.image.src, { width: CARD_MAX_WIDTH })

  const label =
    (artwork.title ?? "Artwork") +
    (artwork.artistNames ? ` by ${artwork.artistNames}` : "")

  return (
    <ManageArtworkForSavesProvider>
      <RouterLink
        to={artwork?.href}
        onClick={onClick}
        display="flex"
        flexDirection="column"
        textDecoration="none"
        aria-label={label}
        maxWidth={CARD_MAX_WIDTH}
        overflow="hidden"
        width="100%"
        {...rest}
        mb={2}
      >
        <Box
          position="relative"
          width="100%"
          style={{
            aspectRatio: `${artwork.image?.width ?? 1} / ${
              artwork.image?.height ?? 1
            }`,
          }}
          bg="mono10"
        >
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            lazyLoad
            alt=""
          />

          <ExclusiveAccessBadge artwork={artwork} />
        </Box>

        <Metadata
          artwork={artwork}
          contextModule={contextModule}
          showSaveButton
          disableRouterLinking
          maxWidth="100%"
        />
      </RouterLink>

      <Box mb={4} width="100%" maxWidth={CARD_MAX_WIDTH}>
        <Button
          // @ts-ignore
          as={RouterLink}
          to={artwork?.href}
          onClick={onClick}
        >
          View Work
        </Button>
      </Box>
    </ManageArtworkForSavesProvider>
  )
}

const NotificationPriceDropFragment = graphql`
  fragment NotificationPriceDrop_priceDrop on PriceDrop {
    oldPrice
    newPrice

    artwork {
      ...ExclusiveAccessBadge_artwork
      ...Metadata_artwork
      artistNames
      href
      image {
        src: url(version: ["larger", "large"])
        width
        height
      }
      title
    }
  }
`

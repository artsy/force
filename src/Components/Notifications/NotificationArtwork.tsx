import * as React from "react"
import { graphql, useFragment } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Router/RouterLink"
import { NotificationArtwork_artwork$key } from "__generated__/NotificationArtwork_artwork.graphql"
import Metadata from "Components/Artwork/Metadata"
import { AuthContextModule } from "@artsy/cohesion"
import { Box, Button, Image } from "@artsy/palette"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { resized } from "Utils/resized"

const MAX_WIDTH = 600

export interface NotificationArtworkProps
  extends Omit<RouterLinkProps, "to" | "width"> {
  artwork: NotificationArtwork_artwork$key
  contextModule?: AuthContextModule
  onClick?: () => void
}

export const NotificationArtwork: React.FC<NotificationArtworkProps> = ({
  artwork: artworkProp,
  contextModule,
  onClick,
  ...rest
}) => {
  const artwork = useFragment(notificationArtworkFragment, artworkProp)

  if (!artwork.image?.src) {
    return null
  }

  const image = resized(artwork.image.src, { width: MAX_WIDTH })

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
        maxWidth={MAX_WIDTH}
        overflow="hidden"
        width="100%"
        {...rest}
        mb={2}
      >
        <Box
          width="100%"
          style={{
            aspectRatio: `${artwork.image?.width ?? 1} / ${
              artwork.image?.height ?? 1
            }`,
          }}
          bg="black10"
        >
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            lazyLoad
            alt=""
          />
        </Box>

        <Metadata
          artwork={artwork}
          contextModule={contextModule}
          showSaveButton
          disableRouterLinking
          maxWidth="100%"
        />
      </RouterLink>

      <Box mb={4} width="100%" maxWidth={MAX_WIDTH}>
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

const notificationArtworkFragment = graphql`
  fragment NotificationArtwork_artwork on Artwork {
    artistNames
    href
    image {
      src: url(version: ["larger", "large"])
      width
      height
    }
    title

    ...Metadata_artwork
  }
`

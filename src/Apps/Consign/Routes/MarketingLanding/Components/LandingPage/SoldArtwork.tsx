import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { SoldArtwork_artwork$data } from "__generated__/SoldArtwork_artwork.graphql"
import { AuthContextModule } from "@artsy/cohesion"
import { Box, Image } from "@artsy/palette"
import { resized } from "Utils/resized"
import { SoldArtworkDetailsFragmentContainer } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SoldArtworkDetails"

export interface SoldArtworkProps
  extends Omit<RouterLinkProps, "to" | "width"> {
  artwork: SoldArtwork_artwork$data
  children?: React.ReactNode
  contextModule?: AuthContextModule
  lazyLoad?: boolean
  onClick?: () => void
}

const SoldArtwork: React.FC<SoldArtworkProps> = ({
  artwork,
  contextModule,
  lazyLoad,
  onClick,
  children,
  ...rest
}) => {
  // Resize image to largest width expected
  const width = [305, 362, 420]
  const image = artwork.image?.src
    ? resized(artwork.image.src, { width: width[width.length - 1] })
    : null

  const label =
    (artwork.title ?? "Artwork") +
    (artwork.artistNames ? ` by ${artwork.artistNames}` : "")

  return (
    <RouterLink
      to={artwork?.href}
      onClick={onClick}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      textDecoration="none"
      data-test="artworkShelfArtwork"
      data-testid="ShelfArtwork"
      aria-label={label}
      width={width}
      {...rest}
    >
      {image ? (
        <Box
          maxHeight={[380, 495]}
          maxWidth="100%"
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
            lazyLoad={lazyLoad}
            style={{ objectFit: "contain" }}
            alt=""
          />
        </Box>
      ) : (
        <Box style={{ aspectRatio: "1 / 1" }} maxWidth="100%" bg="black10" />
      )}

      <SoldArtworkDetailsFragmentContainer
        artwork={artwork}
        contextModule={contextModule}
      />
      {children}
    </RouterLink>
  )
}

export const SoldArtworkFragmentContainer = createFragmentContainer(
  SoldArtwork,
  {
    artwork: graphql`
      fragment SoldArtwork_artwork on Artwork {
        ...SoldArtworkDetails_artwork
        title
        href
        artistNames
        image {
          src: url(version: ["larger", "large"])
          width
          height
        }
      }
    `,
  }
)

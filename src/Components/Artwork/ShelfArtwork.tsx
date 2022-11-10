import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Router/RouterLink"
import { ShelfArtwork_artwork$data } from "__generated__/ShelfArtwork_artwork.graphql"
import Metadata, { MetadataPlaceholder } from "Components/Artwork/Metadata"
import { AuthContextModule } from "@artsy/cohesion"
import { Box, Image, SkeletonBox } from "@artsy/palette"
import { useHoverMetadata } from "Components/Artwork/useHoverMetadata"
import { resized } from "Utils/resized"

export interface ShelfArtworkProps
  extends Omit<RouterLinkProps, "to" | "width"> {
  artwork: ShelfArtwork_artwork$data
  children?: React.ReactNode
  contextModule?: AuthContextModule
  hideSaleInfo?: boolean
  lazyLoad?: boolean
  onClick?: () => void
  width?: number[]
}

const ShelfArtwork: React.FC<ShelfArtworkProps> = ({
  artwork,
  contextModule,
  hideSaleInfo,
  lazyLoad,
  onClick,
  width = [150, 175, 200],
  children,
  ...rest
}) => {
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverMetadata()

  // Resize image to largest width expected
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
          maxHeight={[250, 320]}
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

      <Metadata
        artwork={artwork}
        hideSaleInfo={hideSaleInfo}
        isHovered={isHovered}
        contextModule={contextModule}
        showSaveButton
        disableRouterLinking
        maxWidth="100%"
      />

      {children}
    </RouterLink>
  )
}

export const ShelfArtworkFragmentContainer = createFragmentContainer(
  ShelfArtwork,
  {
    artwork: graphql`
      fragment ShelfArtwork_artwork on Artwork {
        ...Metadata_artwork
        ...SaveButton_artwork
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

interface ShelfArtworkPlaceholderProps
  extends Pick<ShelfArtworkProps, "hideSaleInfo" | "children"> {
  // Used to cycle through a set of placeholder heights
  index: number
  width?: number[]
}

export const ShelfArtworkPlaceholder: React.FC<ShelfArtworkPlaceholderProps> = ({
  index,
  width = [150, 175, 200],
  children,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      width={width}
    >
      <SkeletonBox width="100W%" height={[200, 300, 250, 275][index % 4]} />

      <MetadataPlaceholder />

      {children}
    </Box>
  )
}

import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Router/RouterLink"
import { ShelfArtwork_artwork$data } from "__generated__/ShelfArtwork_artwork.graphql"
import Metadata, { MetadataPlaceholder } from "Components/Artwork/Metadata"
import { AuthContextModule } from "@artsy/cohesion"
import { Box, Image, SkeletonBox } from "@artsy/palette"
import { useHoverMetadata } from "Components/Artwork/useHoverMetadata"
import { maxWidthByArea, resized } from "Utils/resized"

const DEFAULT_AREA = 200 * 200
const DEFAULT_MAX_IMG_HEIGHT = 250
const DEFAULT_MAX_WIDTH = 500

export interface ShelfArtworkProps
  extends Omit<RouterLinkProps, "to" | "width"> {
  // Target number of pixels for image to occupy
  area?: number
  artwork: ShelfArtwork_artwork$data
  children?: React.ReactNode
  contextModule?: AuthContextModule
  hideSaleInfo?: boolean
  lazyLoad?: boolean
  maxImageHeight?: number
  onClick?: () => void
}

const ShelfArtwork: React.FC<ShelfArtworkProps> = ({
  area = DEFAULT_AREA,
  artwork,
  children,
  contextModule,
  hideSaleInfo,
  lazyLoad,
  maxImageHeight = DEFAULT_MAX_IMG_HEIGHT,
  maxWidth = DEFAULT_MAX_WIDTH,
  onClick,
  ...rest
}) => {
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverMetadata()

  if (!artwork.image?.src || !artwork.image.width || !artwork.image.height) {
    return null
  }

  const width = maxWidthByArea({
    area,
    height: artwork.image.height,
    width: artwork.image.width,
  })

  const image = resized(artwork.image.src, { width })

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
      aria-label={artwork.title ?? "Artwork"}
      width={width}
      maxWidth={maxWidth}
      {...rest}
    >
      <Box height={maxImageHeight} display="flex" alignItems="flex-end">
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
            lazyLoad={lazyLoad}
            style={{ display: "block", objectFit: "cover" }}
            alt=""
          />
        </Box>
      </Box>

      <Metadata
        artwork={artwork}
        isHovered={isHovered}
        contextModule={contextModule}
        hideSaleInfo={hideSaleInfo}
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
        image {
          src: url(version: ["normalized", "larger", "large"])
          width
          height
        }
      }
    `,
  }
)

type ShelfArtworkPlaceholderProps = {
  // Used to cycle through a set of placeholder heights
  index: number
} & Pick<
  ShelfArtworkProps,
  "area" | "hideSaleInfo" | "children" | "maxImageHeight"
>

export const ShelfArtworkPlaceholder: React.FC<ShelfArtworkPlaceholderProps> = ({
  index,
  hideSaleInfo,
  area = DEFAULT_AREA,
  maxImageHeight = DEFAULT_MAX_IMG_HEIGHT,
  children,
}) => {
  const width = [275, 200, 300, 250][index % 4]
  const height = [200, 300, 250, 275][index % 4]

  const maxWidth = maxWidthByArea({
    area,
    height,
    width,
  })
  const scaledHeight = Math.round((height / width) * maxWidth)

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      width={maxWidth}
    >
      <Box height={maxImageHeight} display="flex" alignItems="flex-end">
        <SkeletonBox width={maxWidth} height={scaledHeight} />
      </Box>

      <MetadataPlaceholder hideSaleInfo={hideSaleInfo} />

      {children}
    </Box>
  )
}

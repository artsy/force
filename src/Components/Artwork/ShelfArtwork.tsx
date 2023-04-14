import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Router/RouterLink"
import { ShelfArtwork_artwork$data } from "__generated__/ShelfArtwork_artwork.graphql"
import Metadata, { MetadataPlaceholder } from "Components/Artwork/Metadata"
import { AuthContextModule } from "@artsy/cohesion"
import { Box, Image, SkeletonBox } from "@artsy/palette"
import { useHoverMetadata } from "Components/Artwork/useHoverMetadata"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { maxWidthByArea, resized } from "Utils/resized"

const DEFAULT_AREA = 200 * 200
const DEFAULT_MAX_IMG_HEIGHT = 250
const DEFAULT_MAX_WIDTH = 500

const BIG_IMAGE_AREA = 400 * 400
const BIG_MAX_IMAGE_HEIGHT = 480

export interface ShelfArtworkProps
  extends Omit<RouterLinkProps, "to" | "width"> {
  // Target number of pixels for image to occupy
  area?: number
  artwork: ShelfArtwork_artwork$data
  children?: React.ReactNode
  contextModule?: AuthContextModule
  hideSaleInfo?: boolean
  hidePartnerName?: boolean
  lazyLoad?: boolean
  maxImageHeight?: number
  useBigImage?: boolean
  showSaveButton?: boolean
  onClick?: () => void
}

const ShelfArtwork: React.FC<ShelfArtworkProps> = ({
  area,
  artwork,
  children,
  contextModule,
  hideSaleInfo,
  hidePartnerName,
  lazyLoad,
  maxImageHeight,
  maxWidth = DEFAULT_MAX_WIDTH,
  useBigImage,
  showSaveButton = true,
  onClick,
  ...rest
}) => {
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverMetadata()

  const setArea = area ?? useBigImage ? BIG_IMAGE_AREA : DEFAULT_AREA
  const setImageHeight =
    maxImageHeight ?? useBigImage
      ? BIG_MAX_IMAGE_HEIGHT
      : DEFAULT_MAX_IMG_HEIGHT

  if (!artwork.image?.src || !artwork.image.width || !artwork.image.height) {
    return null
  }

  const width = maxWidthByArea({
    area: setArea,
    height: artwork.image.height,
    width: artwork.image.width,
  })

  const image = resized(artwork.image.src, { width })

  const label =
    (artwork.title ?? "Artwork") +
    (artwork.artistNames ? ` by ${artwork.artistNames}` : "")

  return (
    <ManageArtworkForSavesProvider>
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
        maxWidth={maxWidth}
        overflow="hidden"
        {...rest}
      >
        <Box height={setImageHeight} display="flex" alignItems="flex-end">
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
          hideSaleInfo={hideSaleInfo}
          hidePartnerName={hidePartnerName}
          isHovered={isHovered}
          contextModule={contextModule}
          showSaveButton={showSaveButton}
          disableRouterLinking
          maxWidth="100%"
        />

        {children}
      </RouterLink>
    </ManageArtworkForSavesProvider>
  )
}

export const ShelfArtworkFragmentContainer = createFragmentContainer(
  ShelfArtwork,
  {
    artwork: graphql`
      fragment ShelfArtwork_artwork on Artwork {
        ...Metadata_artwork
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
  extends Pick<
    ShelfArtworkProps,
    "area" | "hideSaleInfo" | "children" | "maxImageHeight"
  > {
  // Used to cycle through a set of placeholder heights
  index: number
}

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

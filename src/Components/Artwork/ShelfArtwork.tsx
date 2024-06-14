import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { ShelfArtwork_artwork$data } from "__generated__/ShelfArtwork_artwork.graphql"
import Metadata, { MetadataPlaceholder } from "Components/Artwork/Metadata"
import { AuthContextModule } from "@artsy/cohesion"
import { Box, Image, SkeletonBox } from "@artsy/palette"
import { useHoverMetadata } from "Components/Artwork/useHoverMetadata"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { maxDimensionsByArea, resized } from "Utils/resized"
import { ExclusiveAccessBadge } from "Components/Artwork/ExclusiveAccessBadge"

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

  const { width } = maxDimensionsByArea({
    area,
    height: artwork.image.height,
    width: artwork.image.width,
  })

  const image = resized(artwork.image.src, { width })
  const blurHashDataURL = artwork.image.blurhashDataURL

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
        <Box
          height={maxImageHeight}
          display="flex"
          alignItems="flex-end"
          position="relative"
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
              lazyLoad={lazyLoad}
              style={{ display: "block", objectFit: "cover" }}
              alt=""
              placeHolderURL={blurHashDataURL ?? undefined}
            />
          </Box>

          <ExclusiveAccessBadge artwork={artwork} />
        </Box>

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
    </ManageArtworkForSavesProvider>
  )
}

export const ShelfArtworkFragmentContainer = createFragmentContainer(
  ShelfArtwork,
  {
    artwork: graphql`
      fragment ShelfArtwork_artwork on Artwork {
        ...ExclusiveAccessBadge_artwork
        ...Metadata_artwork
        title
        href
        artistNames
        isUnlisted
        image {
          src: url(version: ["larger", "large"])
          width
          height
          blurhashDataURL
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

  const { width: maxWidth, height: maxHeight } = maxDimensionsByArea({
    area,
    height,
    width,
  })

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      width={maxWidth}
    >
      <Box height={maxImageHeight} display="flex" alignItems="flex-end">
        <SkeletonBox width={maxWidth} height={maxHeight} />
      </Box>

      <MetadataPlaceholder hideSaleInfo={hideSaleInfo} />

      {children}
    </Box>
  )
}

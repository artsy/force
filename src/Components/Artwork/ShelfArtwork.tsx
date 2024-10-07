import * as React from "react"
import { graphql, useFragment } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { ShelfArtwork_artwork$key } from "__generated__/ShelfArtwork_artwork.graphql"
import { Metadata, MetadataPlaceholder } from "Components/Artwork/Metadata"
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
  artwork: ShelfArtwork_artwork$key
  children?: React.ReactNode
  contextModule?: AuthContextModule
  hideSaleInfo?: boolean
  lazyLoad?: boolean
  maxImageHeight?: number
  onClick?: () => void
}

export const ShelfArtwork: React.FC<ShelfArtworkProps> = ({
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
  const artworkData = useFragment(ARTWORK_FRAGMENT, artwork)
  if (
    !artworkData.image?.src ||
    !artworkData.image.width ||
    !artworkData.image.height
  ) {
    return null
  }

  const { width } = maxDimensionsByArea({
    area,
    height: artworkData.image.height,
    width: artworkData.image.width,
  })

  const image = resized(artworkData.image.src, { width })
  const blurHashDataURL = artworkData.image.blurhashDataURL

  const label =
    (artworkData.title ?? "Artwork") +
    (artworkData.artistNames ? ` by ${artworkData.artistNames}` : "")

  return (
    <ManageArtworkForSavesProvider>
      <RouterLink
        to={artworkData?.href}
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
              aspectRatio: `${artworkData.image?.width ?? 1} / ${
                artworkData.image?.height ?? 1
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

          <ExclusiveAccessBadge artwork={artworkData} />
        </Box>

        <Metadata
          artwork={artworkData}
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

const ARTWORK_FRAGMENT = graphql`
  fragment ShelfArtwork_artwork on Artwork
    @argumentDefinitions(
      ignorePrimaryLabelSignals: { type: "[LabelSignalEnum]" }
    ) {
    ...ExclusiveAccessBadge_artwork
    ...Metadata_artwork
      @arguments(ignorePrimaryLabelSignals: $ignorePrimaryLabelSignals)
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
`

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

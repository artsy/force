import { AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Box, Flex, NoImageIcon, ResponsiveBox } from "@artsy/palette"
import { MagnifyImage } from "Components/MagnifyImage"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { useSystemContext } from "System/useSystemContext"
import { RouterLink } from "System/Router/RouterLink"
import { LocalImage, useLocalImage } from "Utils/localImageHelpers"
import { cropped, resized } from "Utils/resized"
import { userIsTeam } from "Utils/user"
import { GridItem_artwork$data } from "__generated__/GridItem_artwork.graphql"
import Badge from "./Badge"
import Metadata from "./Metadata"
import { useHoverMetadata } from "./useHoverMetadata"

export const DEFAULT_GRID_ITEM_ASPECT_RATIO = 4 / 3

interface ArtworkGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  artwork: GridItem_artwork$data
  contextModule?: AuthContextModule
  disableRouterLinking?: boolean
  hideSaleInfo?: boolean
  lazyLoad?: boolean
  onClick?: () => void
  showHighDemandIcon?: boolean
  showHoverDetails?: boolean
  showSaveButton?: boolean
  to?: string | null
  renderSaveButton?: (artworkId: string) => React.ReactNode
}

export const ArtworkGridItem: React.FC<ArtworkGridItemProps> = ({
  artwork,
  contextModule,
  disableRouterLinking,
  hideSaleInfo,
  lazyLoad = true,
  onClick,
  showHighDemandIcon = false,
  showHoverDetails,
  showSaveButton = true,
  to,
  renderSaveButton,
  ...rest
}) => {
  const localImage = useLocalImage(artwork.image)

  const { isHovered, onMouseEnter, onMouseLeave } = useHoverMetadata()

  const handleClick = () => {
    onClick?.()
  }

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onMouseEnter()
    rest.onMouseEnter?.(event)
  }

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onMouseLeave()
    rest.onMouseLeave?.(event)
  }

  const localImagePlaceholder =
    localImage && `${100 * (localImage.height / localImage.width)}%`

  const imagePlaceholder =
    localImagePlaceholder ||
    (artwork?.image?.url && artwork.image?.placeholder) ||
    undefined

  return (
    <div
      data-id={artwork.internalID}
      data-test="artworkGridItem"
      {...rest}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        position="relative"
        width="100%"
        bg="black10"
        style={{
          paddingBottom: imagePlaceholder,
        }}
      >
        <LinkContainer
          artwork={artwork}
          disableRouterLinking={disableRouterLinking}
          localImage={localImage}
          onClick={handleClick}
          to={to}
        >
          <ArtworkGridItemImage
            artwork={artwork}
            lazyLoad={lazyLoad}
            localImage={localImage}
          />
        </LinkContainer>
        <Badge artwork={artwork} />
      </Box>
      <Metadata
        artwork={artwork}
        isHovered={isHovered}
        contextModule={contextModule ?? ContextModule.artworkGrid}
        showSaveButton={showSaveButton}
        hideSaleInfo={hideSaleInfo}
        onClick={handleClick}
        showHighDemandIcon={showHighDemandIcon}
        showHoverDetails={showHoverDetails}
        disableRouterLinking={disableRouterLinking}
        to={to}
        renderSaveButton={renderSaveButton}
      />
    </div>
  )
}

const ArtworkGridItemImage: React.FC<
  Pick<ArtworkGridItemProps, "artwork" | "lazyLoad"> & {
    localImage: LocalImage | null
  }
> = ({ artwork, lazyLoad, localImage }) => {
  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)

  const aspectRatio =
    localImage?.aspectRatio ??
    artwork.image?.aspectRatio ??
    DEFAULT_GRID_ITEM_ASPECT_RATIO
  const width = 445
  const height = Math.floor(width / aspectRatio)
  const transform = aspectRatio === 1 ? cropped : resized
  const imageURL = artwork.image?.url
  const { src, srcSet } = imageURL
    ? transform(imageURL, {
        width,
        height,
      })
    : { src: "", srcSet: "" }

  if (localImage) {
    return (
      <ResponsiveBox
        aspectWidth={localImage.width}
        aspectHeight={localImage.height}
        position="relative"
        maxWidth="100%"
      >
        <MagnifyImage
          src={localImage.data}
          srcSet={""}
          width={localImage.width}
          height={localImage.height}
          lazyLoad={lazyLoad}
          preventRightClick={!isTeam}
        />
      </ResponsiveBox>
    )
  }

  if (imageURL) {
    return (
      <MagnifyImage
        alt={artwork.imageTitle ?? ""}
        src={src}
        srcSet={srcSet}
        lazyLoad={lazyLoad}
        preventRightClick={!isTeam}
      />
    )
  }

  return (
    <>
      <ResponsiveBox
        aspectWidth={4}
        aspectHeight={3}
        position="relative"
        maxWidth="100%"
      />
      <Flex
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <NoImageIcon width="28px" height="28px" fill="black60" />
      </Flex>
    </>
  )
}

ArtworkGridItem.displayName = "ArtworkGridItem"

const Link = styled(RouterLink)`
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const DisabledLink = styled(Box)`
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const LinkContainer: React.FC<
  Pick<ArtworkGridItemProps, "artwork" | "disableRouterLinking" | "to"> & {
    localImage: LocalImage | null
    onClick: () => void
  }
> = ({ artwork, children, disableRouterLinking, onClick, localImage, to }) => {
  const imageURL = artwork.image?.url
  if (!!disableRouterLinking) {
    return (
      <DisabledLink
        onClick={onClick}
        aria-label={`${artwork.title} by ${artwork.artistNames}`}
        position={imageURL ? "absolute" : "relative"}
      >
        {children}
      </DisabledLink>
    )
  }

  return (
    <Link
      to={to !== undefined ? to : artwork.href}
      onClick={onClick}
      aria-label={`${artwork.title} by ${artwork.artistNames}`}
      position={imageURL || localImage ? "absolute" : "relative"}
      data-testid="artwork-link"
    >
      {children}
    </Link>
  )
}

export const ArtworkGridItemFragmentContainer = createFragmentContainer(
  ArtworkGridItem,
  {
    artwork: graphql`
      fragment GridItem_artwork on Artwork
        @argumentDefinitions(
          includeAllImages: { type: "Boolean", defaultValue: false }
        ) {
        internalID
        title
        imageTitle
        image(includeAll: $includeAllImages) {
          internalID
          placeholder
          url(version: ["larger", "large"])
          aspectRatio
          versions
        }
        artistNames
        href
        ...Metadata_artwork
        ...Badge_artwork
      }
    `,
  }
)

export default ArtworkGridItemFragmentContainer

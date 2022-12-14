import { AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Box, Flex, NoImageIcon, ResponsiveBox } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { useSystemContext } from "System"
import { RouterLink } from "System/Router/RouterLink"
import { StoredImage } from "Utils/localImagesHelpers"
import { cropped, resized } from "Utils/resized"
import { userIsTeam } from "Utils/user"
import { GridItem_artwork$data } from "__generated__/GridItem_artwork.graphql"
import { MagnifyImage } from "Components/MagnifyImage"
import Badge from "./Badge"
import Metadata from "./Metadata"
import { useHoverMetadata } from "./useHoverMetadata"
import { useFeatureFlag } from "System/useFeatureFlag"

interface ArtworkGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  artwork: GridItem_artwork$data
  contextModule?: AuthContextModule
  disableRouterLinking?: boolean
  hideSaleInfo?: boolean
  isMyCollectionArtwork?: boolean
  lazyLoad?: boolean
  localHeroImage?: StoredImage | null
  onClick?: () => void
  showHoverDetails?: boolean
  showSaveButton?: boolean
}

export const ArtworkGridItem: React.FC<ArtworkGridItemProps> = ({
  artwork,
  contextModule,
  disableRouterLinking,
  hideSaleInfo,
  isMyCollectionArtwork = false,
  lazyLoad = true,
  localHeroImage,
  onClick,
  showHoverDetails,
  showSaveButton = true,
  ...rest
}) => {
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
        style={{ paddingBottom: artwork.image?.placeholder ?? undefined }}
      >
        <LinkContainer
          artwork={artwork}
          disableRouterLinking={disableRouterLinking}
          onClick={handleClick}
          isMyCollectionArtwork={isMyCollectionArtwork}
        >
          <ArtworkGridItemImage
            artwork={artwork}
            lazyLoad={lazyLoad}
            localHeroImage={localHeroImage}
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
        showHoverDetails={showHoverDetails}
        disableRouterLinking={disableRouterLinking}
        isMyCollectionArtwork={isMyCollectionArtwork}
      />
    </div>
  )
}

const ArtworkGridItemImage: React.FC<Pick<
  ArtworkGridItemProps,
  "localHeroImage" | "artwork" | "lazyLoad"
>> = ({ artwork, lazyLoad, localHeroImage }) => {
  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)

  const aspectRatio = artwork.image?.aspectRatio ?? 1
  const width = 445
  const height = Math.floor(width / aspectRatio)
  const transform = aspectRatio === 1 ? cropped : resized
  const imageURL = artwork.image?.url
  const { src, srcSet } = imageURL
    ? transform(imageURL, { width, height })
    : { src: "", srcSet: "" }

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
  if (localHeroImage) {
    return (
      <MagnifyImage
        src={localHeroImage.data}
        srcSet={""}
        height={localHeroImage.height}
        width={localHeroImage.width}
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
  Pick<
    ArtworkGridItemProps,
    "artwork" | "disableRouterLinking" | "isMyCollectionArtwork"
  > & {
    onClick: () => void
  }
> = ({
  artwork,
  children,
  disableRouterLinking,
  onClick,
  isMyCollectionArtwork,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

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

  // My collection artwork is a special case. We don't want to link to the standard artwork page,
  // but to a custom my collection artwork page.
  const to = !isMyCollectionArtwork
    ? artwork.href
    : isCollectorProfileEnabled
    ? `/collector-profile/my-collection/artwork/${artwork.internalID}`
    : `/my-collection/artwork/${artwork.internalID}`

  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label={`${artwork.title} by ${artwork.artistNames}`}
      position={imageURL ? "absolute" : "relative"}
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
      fragment GridItem_artwork on Artwork {
        internalID
        title
        imageTitle
        image {
          placeholder
          url(version: ["larger", "large"])
          aspectRatio
        }
        artistNames
        href
        ...Metadata_artwork
        ...SaveButton_artwork
        ...Badge_artwork
      }
    `,
  }
)

export default ArtworkGridItemFragmentContainer

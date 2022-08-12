import { AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Box, Flex, NoImageIcon, ResponsiveBox } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { useSystemContext } from "System"
import { RouterLink } from "System/Router/RouterLink"
import { cropped, resized } from "Utils/resized"
import { userIsTeam } from "Utils/user"
import { GridItem_artwork } from "__generated__/GridItem_artwork.graphql"
import { MagnifyImage } from "../MagnifyImage"
import Badge from "./Badge"
import Metadata from "./Metadata"
import { useHoverMetadata } from "./useHoverMetadata"

interface ArtworkGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  artwork: GridItem_artwork
  contextModule?: AuthContextModule
  disableRouterLinking?: boolean
  hideSaleInfo?: boolean
  isMyCollectionArtwork?: boolean
  lazyLoad?: boolean
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
  onClick,
  showHoverDetails,
  showSaveButton = true,
  ...rest
}) => {
  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverMetadata()

  const aspectRatio = artwork.image?.aspect_ratio ?? 1
  const width = 445
  const height = Math.floor(width / aspectRatio)
  const transform = aspectRatio === 1 ? cropped : resized
  const imageURL = artwork.image?.url
  const { src, srcSet } = imageURL
    ? transform(imageURL, { width, height })
    : { src: "", srcSet: "" }

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
          {imageURL ? (
            <MagnifyImage
              alt={artwork.image_title ?? ""}
              src={src}
              srcSet={srcSet}
              lazyLoad={lazyLoad}
              preventRightClick={!isTeam}
            />
          ) : (
            <>
              <ResponsiveBox
                aspectWidth={4}
                aspectHeight={3}
                position="relative"
                maxWidth="100%"
              />
              {!!isMyCollectionArtwork && (
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
              )}
            </>
          )}
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
      />
    </div>
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
        image_title: imageTitle
        image {
          placeholder
          url(version: "large")
          aspect_ratio: aspectRatio
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

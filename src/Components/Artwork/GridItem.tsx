import { AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Box, ResponsiveBox } from "@artsy/palette"
import { GridItem_artwork } from "__generated__/GridItem_artwork.graphql"
import { useSystemContext } from "System"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { userIsTeam } from "Utils/user"
import Badge from "./Badge"
import Metadata from "./Metadata"
import { RouterLink } from "System/Router/RouterLink"
import { cropped, resized } from "Utils/resized"
import { useHoverMetadata } from "./useHoverMetadata"
import { MagnifyImage } from "../MagnifyImage"
import { useEffect, useState } from "react"

interface ArtworkGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  artwork: GridItem_artwork
  contextModule?: AuthContextModule
  lazyLoad?: boolean
  onClick?: () => void
  hideSaleInfo?: boolean
  showSaveButton?: boolean
  showHoverDetails?: boolean
  disableRouterLinking?: boolean
}

export const ArtworkGridItem: React.FC<ArtworkGridItemProps> = ({
  artwork,
  lazyLoad = true,
  contextModule,
  onClick,
  hideSaleInfo,
  showSaveButton = true,
  showHoverDetails,
  disableRouterLinking,
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

  const [linkTo, setLinkTo] = useState(artwork.href)

  useEffect(() => {
    if (!!disableRouterLinking) {
      setLinkTo(window.location.href)
    } else {
      if (linkTo !== artwork.href) {
        setLinkTo(artwork.href)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disableRouterLinking])

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

  const LinkContainer = disableRouterLinking ? DisabledLink : Link

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
          to={linkTo}
          onClick={handleClick}
          aria-label={`${artwork.title} by ${artwork.artistNames}`}
          position={imageURL ? "absolute" : "relative"}
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
            <ResponsiveBox
              aspectWidth={4}
              aspectHeight={3}
              width={width}
              maxWidth="100%"
            />
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

const DisabledLink = styled(Link)`
  cursor: not-allowed;
`

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

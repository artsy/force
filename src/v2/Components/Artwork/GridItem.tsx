import { AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Image as BaseImage, Box } from "@artsy/palette"
import { GridItem_artwork } from "v2/__generated__/GridItem_artwork.graphql"
import { useSystemContext } from "v2/System"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { userIsTeam } from "v2/Utils/user"
import Badge from "./Badge"
import Metadata from "./Metadata"
import { SaveButtonFragmentContainer, useSaveButton } from "./SaveButton"
import { RouterLink } from "v2/System/Router/RouterLink"
import { cropped, resized } from "v2/Utils/resized"
import { useState } from "react"

const SHOULD_USE_HOVER_EFFECT = true

interface ArtworkGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  artwork: GridItem_artwork
  contextModule?: AuthContextModule
  lazyLoad?: boolean
  onClick?: () => void
}

export const ArtworkGridItem: React.FC<ArtworkGridItemProps> = ({
  artwork,
  lazyLoad = true,
  contextModule,
  onClick,
  ...rest
}) => {
  const { user } = useSystemContext()
  const isTeam = userIsTeam(user)
  const [isHovered, setIsHovered] = useState(false)

  const { containerProps, isSaveButtonVisible } = useSaveButton({
    isSaved: !!artwork.is_saved,
  })

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
    if (SHOULD_USE_HOVER_EFFECT) {
      setIsHovered(true)
    }

    containerProps.onMouseEnter(event)
    rest.onMouseEnter?.(event)
  }

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (SHOULD_USE_HOVER_EFFECT) {
      setIsHovered(false)
    }

    containerProps.onMouseLeave(event)
    rest.onMouseLeave?.(event)
  }

  return (
    <div
      data-id={artwork.internalID}
      data-test="artworkGridItem"
      {...containerProps}
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
        <Link
          to={artwork.href}
          onClick={handleClick}
          aria-label={`${artwork.title} by ${artwork.artistNames}`}
        >
          <Image
            title={artwork.title ?? undefined}
            alt={artwork.image_title ?? ""}
            src={src}
            srcSet={srcSet}
            lazyLoad={lazyLoad}
            preventRightClick={!isTeam}
          />
        </Link>

        <Badge artwork={artwork} />

        {isSaveButtonVisible && (
          <SaveButtonFragmentContainer
            contextModule={contextModule || ContextModule.artworkGrid}
            artwork={artwork}
          />
        )}
      </Box>

      <Metadata artwork={artwork} />
    </div>
  )
}

ArtworkGridItem.displayName = "ArtworkGridItem"

const Link = styled(RouterLink)`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Image = styled(BaseImage)`
  display: block;
  width: 100%;
  height: 100%;
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
        is_saved: isSaved
        ...Metadata_artwork
        ...SaveButton_artwork
        ...Badge_artwork
      }
    `,
  }
)

export default ArtworkGridItemFragmentContainer

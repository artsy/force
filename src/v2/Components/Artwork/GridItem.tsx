import { AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Image as BaseImage, Box } from "@artsy/palette"
import { GridItem_artwork } from "v2/__generated__/GridItem_artwork.graphql"
import { useSystemContext } from "v2/System"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { userIsTeam } from "v2/Utils/user"
import Badge from "./Badge"
import Metadata from "./Metadata"
import { SaveButtonFragmentContainer, useSaveButton } from "./SaveButton"
import { RouterLink } from "v2/System/Router/RouterLink"
import { cropped, resized } from "v2/Utils/resized"

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

  const { containerProps, isSaveButtonVisible } = useSaveButton({
    isSaved: !!artwork.is_saved,
  })

  const aspectRatio = artwork.image?.aspect_ratio ?? 1
  const width = 400
  const height = Math.floor(width / aspectRatio)
  const transform = aspectRatio === 1 ? cropped : resized
  const imageURL = artwork.image?.url
  const { src } = imageURL
    ? transform(imageURL, { width, height, quality: 80 })
    : { src: "" }

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div
      data-id={artwork.internalID}
      data-test="artworkGridItem"
      {...containerProps}
      {...rest}
    >
      <Box
        position="relative"
        width="100%"
        bg="black10"
        pb={artwork.image?.placeholder}
      >
        <Link
          to={artwork.href}
          onClick={handleClick}
          aria-label={`${artwork.title} by ${artwork.artistNames}`}
        >
          <Image
            title={artwork.title ?? undefined}
            alt={artwork.image_title ?? ""}
            src={src} // TODO: Support srcSet
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

export default createFragmentContainer(ArtworkGridItem, {
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
})

import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ShelfArtwork_artwork } from "v2/__generated__/ShelfArtwork_artwork.graphql"
import { SaveButtonFragmentContainer, useSaveButton } from "./SaveButton"
import Metadata from "./Metadata"
import { AuthContextModule } from "@artsy/cohesion"
import styled from "styled-components"
import { Image, Flex } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { scale } from "proportional-scale"
import { resized } from "v2/Utils/resized"

/**
 * The max height for an image in the carousel
 */
export const IMG_HEIGHT = {
  mobile: 250,
  desktop: 320,
}

interface ShelfArtworkProps {
  artwork: ShelfArtwork_artwork
  contextModule: AuthContextModule
  hideArtistName?: boolean
  hidePartnerName?: boolean
  hideSaleInfo?: boolean
  lazyLoad?: boolean
  showExtended?: boolean
  showMetadata?: boolean
  onClick?: () => void
}

const ShelfArtwork: React.FC<ShelfArtworkProps> = ({
  artwork,
  contextModule,
  hideArtistName,
  hidePartnerName,
  hideSaleInfo,
  lazyLoad,
  onClick,
  showExtended,
  showMetadata = true,
}) => {
  const { containerProps, isSaveButtonVisible } = useSaveButton({
    isSaved: !!artwork.is_saved,
  })

  const geometry = scale({
    width: artwork.image!.width!,
    height: artwork.image!.height!,
    maxWidth: 200,
  })

  const image = resized(artwork.image!.sourceUrl!, { width: 200 })

  return (
    <>
      <RouterLink
        to={artwork?.href}
        display="block"
        textDecoration="none"
        onClick={onClick}
        data-test="artworkShelfArtwork"
        {...containerProps}
      >
        <ResponsiveContainer artwork={artwork}>
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width={geometry.width}
            height={geometry.height}
            maxHeight={[IMG_HEIGHT.mobile, IMG_HEIGHT.desktop]}
            lazyLoad={lazyLoad}
            style={{ objectFit: "contain", display: "block" }}
          />

          <Media greaterThan="sm">
            {isSaveButtonVisible && (
              <SaveButtonFragmentContainer
                contextModule={contextModule}
                artwork={artwork}
              />
            )}
          </Media>
        </ResponsiveContainer>
      </RouterLink>

      {showMetadata && (
        <Metadata
          artwork={artwork}
          extended={showExtended}
          hidePartnerName={hidePartnerName}
          hideArtistName={hideArtistName}
          hideSaleInfo={hideSaleInfo}
          maxWidth={geometry.width}
        />
      )}
    </>
  )
}

const getHeight = (
  artwork: ShelfArtwork_artwork,
  size: keyof typeof IMG_HEIGHT
) => {
  const geometry = scale({
    width: artwork.image!.width!,
    height: artwork.image!.height!,
    maxWidth: 200,
  })

  return (geometry.height ?? 0) > IMG_HEIGHT[size]
    ? IMG_HEIGHT[size]
    : geometry.height
}

const ResponsiveContainer: React.FC<{ artwork: ShelfArtwork_artwork }> = ({
  artwork,
  children,
}) => {
  const geometry = scale({
    width: artwork.image!.width!,
    height: artwork.image!.height!,
    maxWidth: 200,
  })

  // FIXME: Replace with <picture> and specific sizes for different platforms
  return (
    <>
      <Media at="xs">
        <Container
          width={geometry?.width}
          height={getHeight(artwork, "mobile")}
        >
          {children}
        </Container>
      </Media>

      <Media greaterThan="xs">
        <Container
          width={geometry?.width}
          height={getHeight(artwork, "desktop")}
        >
          {children}
        </Container>
      </Media>
    </>
  )
}

const Container = styled(Flex)`
  position: relative;
`

export const ShelfArtworkFragmentContainer = createFragmentContainer(
  ShelfArtwork,
  {
    artwork: graphql`
      fragment ShelfArtwork_artwork on Artwork
        @argumentDefinitions(width: { type: "Int", defaultValue: 200 }) {
        image {
          aspectRatio
          width
          height
          sourceUrl: url(version: ["larger", "large"])
        }
        imageTitle
        title
        href
        is_saved: isSaved
        ...Metadata_artwork
        ...SaveButton_artwork
        ...Badge_artwork
      }
    `,
  }
)

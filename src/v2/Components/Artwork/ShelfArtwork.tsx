import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ShelfArtwork_artwork } from "v2/__generated__/ShelfArtwork_artwork.graphql"
import Metadata from "./Metadata"
import { AuthContextModule } from "@artsy/cohesion"
import styled from "styled-components"
import { Image, Flex } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { useHoverMetadata } from "./useHoverMetadata"

/**
 * The max height for an image in the carousel
 */
export const IMG_HEIGHT = {
  mobile: 250,
  desktop: 320,
}

interface ShelfArtworkProps {
  artwork: ShelfArtwork_artwork
  contextModule?: AuthContextModule
  hideSaleInfo?: boolean
  lazyLoad?: boolean
  showExtended?: boolean
  showMetadata?: boolean
  onClick?: () => void
}

const ShelfArtwork: React.FC<ShelfArtworkProps> = ({
  artwork,
  contextModule,
  hideSaleInfo,
  lazyLoad,
  onClick,
  showExtended,
  showMetadata = true,
}) => {
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverMetadata()

  return (
    <div
      data-test="artworkShelfArtwork"
      data-testid="ShelfArtwork"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <RouterLink
        to={artwork?.href}
        display="block"
        textDecoration="none"
        onClick={onClick}
      >
        <ResponsiveContainer artwork={artwork}>
          <Image
            src={artwork.image?.resized?.src!}
            srcSet={artwork.image?.resized?.srcSet}
            width={artwork.image?.resized?.width}
            maxHeight={[IMG_HEIGHT.mobile, IMG_HEIGHT.desktop]}
            lazyLoad={lazyLoad}
            style={{ objectFit: "contain", display: "block" }}
          />
        </ResponsiveContainer>
      </RouterLink>

      {showMetadata && (
        <Metadata
          artwork={artwork}
          extended={showExtended}
          hideSaleInfo={hideSaleInfo}
          maxWidth={artwork.image?.resized?.width}
          contextModule={contextModule}
          isHovered={isHovered}
          showSaveButton
        />
      )}
    </div>
  )
}

const getHeight = (
  artwork: ShelfArtwork_artwork,
  size: keyof typeof IMG_HEIGHT
) => {
  return (artwork.image?.resized?.height ?? 0) > IMG_HEIGHT[size]
    ? IMG_HEIGHT[size]
    : artwork?.image?.resized?.height
}

const ResponsiveContainer: React.FC<{ artwork: ShelfArtwork_artwork }> = ({
  artwork,
  children,
}) => {
  // FIXME: Replace with <picture> and specific sizes for different platforms
  return (
    <>
      <Media at="xs">
        <Container
          width={artwork.image?.resized?.width}
          height={getHeight(artwork, "mobile")}
        >
          {children}
        </Container>
      </Media>

      <Media greaterThan="xs">
        <Container
          width={artwork.image?.resized?.width}
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
          resized(width: $width) {
            src
            srcSet
            width
            height
          }
          aspectRatio
          height
        }
        imageTitle
        title
        href
        ...Metadata_artwork
        ...SaveButton_artwork
        ...Badge_artwork
      }
    `,
  }
)

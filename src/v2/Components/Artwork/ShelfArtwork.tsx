import { Box, Image } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ShelfArtwork_artwork } from "v2/__generated__/ShelfArtwork_artwork.graphql"
import {
  Container as SaveButtonContainer,
  SaveButtonFragmentContainer,
} from "./SaveButton"
import Metadata from "./Metadata"
import { AuthContextModule } from "@artsy/cohesion"
import styled from "styled-components"
import { Flex } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"

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
  const getHeight = (size: keyof typeof IMG_HEIGHT) => {
    // @ts-expect-error STRICT_NULL_CHECK
    return artwork.image?.resized.height > IMG_HEIGHT[size]
      ? IMG_HEIGHT[size]
      : // @ts-expect-error STRICT_NULL_CHECK
        artwork.image?.resized.height
  }

  const ResponsiveContainer = ({ children }) => {
    return (
      <>
        <Media at="xs">
          <Container
            // @ts-expect-error STRICT_NULL_CHECK
            width={artwork.image?.resized.width}
            height={getHeight("mobile")}
          >
            {children}
          </Container>
        </Media>
        <Media greaterThan="xs">
          <Container
            // @ts-expect-error STRICT_NULL_CHECK
            width={artwork.image?.resized.width}
            height={getHeight("desktop")}
          >
            {children}
          </Container>
        </Media>
      </>
    )
  }

  return (
    <Box>
      <RouterLink
        to={artwork?.href ?? ""}
        noUnderline
        onClick={() => {
          onClick && onClick()
        }}
      >
        <ResponsiveContainer>
          <Image
            src={artwork.image?.resized?.src!}
            srcSet={artwork.image?.resized?.srcSet}
            width={artwork.image?.resized?.width}
            maxHeight={[IMG_HEIGHT.mobile, IMG_HEIGHT.desktop]}
            lazyLoad={lazyLoad}
            style={{ objectFit: "contain" }}
          />

          <Media greaterThan="sm">
            <SaveButtonFragmentContainer
              contextModule={contextModule}
              artwork={artwork}
            />
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
          maxWidth={artwork.image?.resized?.width}
        />
      )}
    </Box>
  )
}

const Container = styled(Flex)`
  position: relative;

  &:hover {
    ${SaveButtonContainer} {
      opacity: 1;
    }
  }
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

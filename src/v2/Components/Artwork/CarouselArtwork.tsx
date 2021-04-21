import { Image } from "@artsy/palette"
import { useSystemContext } from "v2/Artsy"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { CarouselArtwork_artwork } from "v2/__generated__/CarouselArtwork_artwork.graphql"
import { ClickContainer, SaveButtonFragmentContainer } from "./SaveButton"
import Metadata from "./Metadata"
import { AuthContextModule } from "@artsy/cohesion"
import styled from "styled-components"
import { Flex } from "@artsy/palette"

/**
 * The max height for an image in the carousel
 */
const MAX_IMG_HEIGHT = 250
interface CarouselArtworkProps {
  artwork: CarouselArtwork_artwork
  contextModule: AuthContextModule
  hideArtistName?: boolean
  hidePartnerName?: boolean
  hideSaleInfo?: boolean
  lazyLoad?: boolean
  showExtended?: boolean
  showMetadata?: boolean
  onClick?: () => void
}

const CarouselArtwork: React.FC<CarouselArtworkProps> = ({
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
  const { mediator, user } = useSystemContext()
  const imgHeight =
    artwork.image.resized.height > MAX_IMG_HEIGHT
      ? MAX_IMG_HEIGHT
      : artwork.image.resized.height

  return (
    <RouterLink
      to={artwork.href}
      noUnderline
      onClick={() => {
        onClick && onClick()
      }}
    >
      <Container
        width={artwork.image.resized.width}
        height={imgHeight}
        bg="black10"
      >
        <Image
          src={artwork.image.resized.src}
          srcSet={artwork.image.resized.srcSet}
          width={artwork.image.resized.width}
          height={imgHeight}
          lazyLoad={lazyLoad}
          style={{ objectFit: "cover" }}
        />

        <SaveButtonFragmentContainer
          mediator={mediator}
          user={user}
          contextModule={contextModule}
          artwork={artwork}
        />
      </Container>

      {showMetadata && (
        <Metadata
          artwork={artwork}
          extended={showExtended}
          hidePartnerName={hidePartnerName}
          hideArtistName={hideArtistName}
          hideSaleInfo={hideSaleInfo}
        />
      )}
    </RouterLink>
  )
}

const Container = styled(Flex)`
  position: relative;

  &:hover {
    ${ClickContainer} {
      opacity: 1;
    }
  }
`
export const CarouselArtworkFragmentContainer = createFragmentContainer(
  CarouselArtwork,
  {
    artwork: graphql`
      fragment CarouselArtwork_artwork on Artwork
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

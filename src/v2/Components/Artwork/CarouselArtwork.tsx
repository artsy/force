import { Box, Image } from "@artsy/palette"
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

  return (
    <Box>
      <RouterLink
        to={artwork.href}
        noUnderline
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      >
        <Container>
          <Image
            src={artwork.image.resized.src}
            srcSet={artwork.image.resized.srcSet}
            lazyLoad={lazyLoad}
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
    </Box>
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

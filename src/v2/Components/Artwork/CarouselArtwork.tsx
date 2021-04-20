import { Box, Image } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CarouselArtwork_artwork } from "v2/__generated__/CarouselArtwork_artwork.graphql"

interface CarouselArtworkProps {
  artwork: CarouselArtwork_artwork
}

const CarouselArtwork: React.FC<CarouselArtworkProps> = props => {
  return (
    <Box>
      <Image src={props.artwork.image.url} width={200} />
    </Box>
  )
}

export const CarouselArtworkFragmentContainer = createFragmentContainer(
  CarouselArtwork,
  {
    artwork: graphql`
      fragment CarouselArtwork_artwork on Artwork {
        image {
          url(version: "large")
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

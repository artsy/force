import { Box, Image, Text, Title } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ExampleArtworkApp_artwork } from "v2/__generated__/ExampleArtworkApp_artwork.graphql"

export interface ExampleArtworkAppProps {
  artwork: ExampleArtworkApp_artwork
}

const ExampleArtworkApp: React.FC<ExampleArtworkAppProps> = ({ artwork }) => {
  return (
    <Box>
      <Title>{artwork.title} | Artsy</Title>
      <Text variant="title" mb={2}>
        {artwork.title}
      </Text>
      <Image src={artwork.imageUrl} alt={artwork.title} />
      <Text fontWeight="bold">{artwork.artistNames}</Text>
      <Text>{artwork.date}</Text>
      <Text>{artwork.medium}</Text>
    </Box>
  )
}

export const ExampleArtworkAppFragmentContainer = createFragmentContainer(
  ExampleArtworkApp,
  {
    artwork: graphql`
      fragment ExampleArtworkApp_artwork on Artwork {
        title
        artistNames
        medium
        imageUrl
        date
      }
    `,
  }
)

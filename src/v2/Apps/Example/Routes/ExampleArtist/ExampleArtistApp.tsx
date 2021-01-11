import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ExampleArtistApp_artist } from "v2/__generated__/ExampleArtistApp_artist.graphql"
import { Box, Text } from "@artsy/palette"
import { Title } from "react-head"

export interface ExampleArtistAppProps {
  artist: ExampleArtistApp_artist
}

const ExampleArtistApp: React.FC<ExampleArtistAppProps> = ({ artist }) => {
  return (
    <Box>
      <Title>{artist.name} | Artsy</Title>
      <Text variant="title" mb={2}>
        {artist.name}
      </Text>
      <Text>{artist.bio}</Text>
    </Box>
  )
}

export const ExampleArtistAppFragmentContainer = createFragmentContainer(
  ExampleArtistApp,
  {
    artist: graphql`
      fragment ExampleArtistApp_artist on Artist {
        name
        bio
      }
    `,
  }
)

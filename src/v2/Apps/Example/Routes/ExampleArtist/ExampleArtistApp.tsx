import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ExampleArtistApp_artist } from "v2/__generated__/ExampleArtistApp_artist.graphql"
import { Box, Text } from "@artsy/palette"
import { Title } from "react-head"
import { AnalyticsContext, useAnalyticsContext } from "v2/Artsy"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { ContextModule } from "@artsy/cohesion"

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
      <FollowArtistButton
        artist={artist}
        contextModule={ContextModule.artistHeader}
      />
      <Text>{artist.bio}</Text>
    </Box>
  )
}

/**
 * Routes with /:id require an additional AnalyticsContext.Provider
 * declaration to add slug and id, extending the context provided by <Boot>
 */
const TrackingWrappedExampleArtistApp: React.FC<ExampleArtistAppProps> = props => {
  const {
    artist: { internalID, slug },
  } = props

  const { contextPageOwnerType } = useAnalyticsContext()

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: internalID,
        contextPageOwnerSlug: slug,
        contextPageOwnerType,
      }}
    >
      <ExampleArtistApp {...props} />
    </AnalyticsContext.Provider>
  )
}

export const ExampleArtistAppFragmentContainer = createFragmentContainer(
  TrackingWrappedExampleArtistApp,
  {
    artist: graphql`
      fragment ExampleArtistApp_artist on Artist {
        name
        bio
        internalID
        slug
        ...FollowArtistButton_artist
      }
    `,
  }
)

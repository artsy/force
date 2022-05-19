import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ExampleArtistRoute_artist } from "v2/__generated__/ExampleArtistRoute_artist.graphql"
import { Box, Text } from "@artsy/palette"
import { Title } from "react-head"
import { AnalyticsContext, useAnalyticsContext } from "v2/System"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { ContextModule } from "@artsy/cohesion"

export interface ExampleArtistAppProps {
  artist: ExampleArtistRoute_artist
}

const ExampleArtistRoute: React.FC<ExampleArtistAppProps> = ({ artist }) => {
  return (
    <Box>
      <Title>{artist.name} | Artsy</Title>
      <Text variant="lg-display" mb={2}>
        {artist.name}
      </Text>
      <Box my={2}>
        <FollowArtistButton
          artist={artist}
          contextModule={ContextModule.artistHeader}
        />
      </Box>
      <Text>{artist.bio}</Text>
    </Box>
  )
}

/**
 * Routes with /:id require an additional AnalyticsContext.Provider
 * declaration to add slug and id, extending the context provided by <Boot>
 */
const TrackingWrappedExampleArtistRoute: React.FC<ExampleArtistAppProps> = props => {
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
      <ExampleArtistRoute {...props} />
    </AnalyticsContext.Provider>
  )
}

export const ExampleArtistRouteFragmentContainer = createFragmentContainer(
  TrackingWrappedExampleArtistRoute,
  {
    artist: graphql`
      fragment ExampleArtistRoute_artist on Artist {
        ...FollowArtistButton_artist
        name
        bio
        internalID
        slug
      }
    `,
  }
)

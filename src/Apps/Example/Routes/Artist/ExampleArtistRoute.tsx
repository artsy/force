import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ExampleArtistRoute_artist$data } from "__generated__/ExampleArtistRoute_artist.graphql"
import { Box, Text } from "@artsy/palette"
import { Title } from "react-head"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { ContextModule } from "@artsy/cohesion"

export interface ExampleArtistAppProps {
  artist: ExampleArtistRoute_artist$data
}

const ExampleArtistRoute: React.FC<ExampleArtistAppProps> = ({ artist }) => {
  return (
    <Box>
      <Title>{artist.name} | Artsy</Title>

      <Text variant="lg-display" mb={2}>
        {artist.name}
      </Text>

      <Box my={2}>
        <FollowArtistButtonQueryRenderer
          id={artist.internalID}
          contextModule={ContextModule.artistHeader}
        />
      </Box>

      <Text>{artist.bio}</Text>
    </Box>
  )
}

/**
 * Routes with :slugs require Analytics to provide the corresponding internalID
 */
const TrackingWrappedExampleArtistRoute: React.FC<ExampleArtistAppProps> = props => {
  const {
    artist: { internalID },
  } = props

  return (
    <Analytics contextPageOwnerId={internalID}>
      <ExampleArtistRoute {...props} />
    </Analytics>
  )
}

export const ExampleArtistRouteFragmentContainer = createFragmentContainer(
  TrackingWrappedExampleArtistRoute,
  {
    artist: graphql`
      fragment ExampleArtistRoute_artist on Artist {
        name
        bio
        internalID
      }
    `,
  }
)

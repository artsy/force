import { Box, Flex, Image, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { ExampleArtworkRoute_artwork$data } from "__generated__/ExampleArtworkRoute_artwork.graphql"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { MetaTags } from "Components/MetaTags"
import { extractNodes } from "Utils/extractNodes"

export interface ExampleArtworkRouteProps {
  artwork: ExampleArtworkRoute_artwork$data
}

const ExampleArtworkRoute: React.FC<ExampleArtworkRouteProps> = ({
  artwork,
}) => {
  const artists = extractNodes(artwork.artist?.related?.artistsConnection)

  return (
    <Box>
      <MetaTags title={`${artwork.title} | Artsy`} />

      <Box mb={4}>
        <Text variant="lg-display" mb={2}>
          {artwork.title}
        </Text>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <Image src={artwork.imageUrl} alt={artwork.title} />
        <Text fontWeight="bold">{artwork.artistNames}</Text>
        <Text>{artwork.date}</Text>
        <Text>{artwork.medium}</Text>
      </Box>
      <Box>
        <Text variant="sm-display">Related Artists</Text>
        <Flex my={2}>
          {artists.map(artist => (
            <Box
              key={artist.internalID}
              width={["100%", "25%"]}
              pr={[0, "20px"]}
            >
              <EntityHeaderArtistFragmentContainer artist={artist} />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

/**
 * Routes with :slugs require Analytics to provide the corresponding internalID
 */
const TrackingWrappedExampleArtworkRoute: React.FC<ExampleArtworkRouteProps> = props => {
  const {
    artwork: { internalID },
  } = props

  return (
    <Analytics contextPageOwnerId={internalID}>
      <ExampleArtworkRoute {...props} />
    </Analytics>
  )
}

export const ExampleArtworkRouteFragmentContainer = createFragmentContainer(
  TrackingWrappedExampleArtworkRoute,
  {
    artwork: graphql`
      fragment ExampleArtworkRoute_artwork on Artwork {
        title
        artistNames
        medium
        imageUrl
        date
        internalID
        slug
        artist {
          related {
            artistsConnection(kind: MAIN, first: 4)
              @connection(key: "ArtworkRelatedArtists_artistsConnection") {
              edges {
                node {
                  ...EntityHeaderArtist_artist
                  internalID
                }
              }
            }
          }
        }
      }
    `,
  }
)

import { Box, Flex, Image, Text, Title } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AnalyticsContext, useAnalyticsContext } from "v2/System"
import { ExampleArtworkRoute_artwork } from "v2/__generated__/ExampleArtworkRoute_artwork.graphql"
import { ArtistCardFragmentContainer as ArtistCard } from "v2/Components/ArtistCard"
import { ContextModule } from "@artsy/cohesion"

export interface ExampleArtworkRouteProps {
  artwork: ExampleArtworkRoute_artwork
}

const ExampleArtworkRoute: React.FC<ExampleArtworkRouteProps> = ({
  artwork,
}) => {
  return (
    <Box>
      <Title>{artwork.title} | Artsy</Title>
      <Box mb={4}>
        <Text variant="lg" mb={2}>
          {artwork.title}
        </Text>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <Image src={artwork.imageUrl} alt={artwork.title} />
        <Text fontWeight="bold">{artwork.artistNames}</Text>
        <Text>{artwork.date}</Text>
        <Text>{artwork.medium}</Text>
      </Box>
      <Box>
        <Text variant="md">Related Artists</Text>
        <Flex my={2}>
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          {artwork.artist.related.artistsConnection.edges.map(({ node }) => (
            <Box width={["100%", "25%"]} pr={[0, "20px"]}>
              <ArtistCard
                artist={node}
                contextModule={ContextModule.relatedArtistsRail}
              />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

/**
 * Routes with /:id require an additional AnalyticsContext.Provider
 * declaration to add slug and id, extending the context provided by <Boot>
 */
const TrackingWrappedExampleArtworkRoute: React.FC<ExampleArtworkRouteProps> = props => {
  const {
    artwork: { internalID, slug },
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
      <ExampleArtworkRoute {...props} />
    </AnalyticsContext.Provider>
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
                  ...ArtistCard_artist
                }
              }
            }
          }
        }
      }
    `,
  }
)

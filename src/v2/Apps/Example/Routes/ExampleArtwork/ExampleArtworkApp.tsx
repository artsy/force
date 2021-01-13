import { Box, Flex, Image, Text, Title } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AnalyticsContext, useAnalyticsContext } from "v2/Artsy"
import { ExampleArtworkApp_artwork } from "v2/__generated__/ExampleArtworkApp_artwork.graphql"
import { ArtistCardFragmentContainer as ArtistCard } from "v2/Components/ArtistCard"
import { ContextModule } from "@artsy/cohesion"

export interface ExampleArtworkAppProps {
  artwork: ExampleArtworkApp_artwork
}

const ExampleArtworkApp: React.FC<ExampleArtworkAppProps> = ({ artwork }) => {
  return (
    <Box>
      <Title>{artwork.title} | Artsy</Title>
      <Box mb={4}>
        <Text variant="title" mb={2}>
          {artwork.title}
        </Text>
        <Image src={artwork.imageUrl} alt={artwork.title} />
        <Text fontWeight="bold">{artwork.artistNames}</Text>
        <Text>{artwork.date}</Text>
        <Text>{artwork.medium}</Text>
      </Box>
      <Box>
        <Text variant="title">Related Artists</Text>
        <Flex my={2}>
          {artwork.artist.related.artistsConnection.edges.map(({ node }) => (
            <Box width={["100%", "25%"]} pr={[0, "20px"]}>
              <ArtistCard
                lazyLoad
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
const TrackingWrappedExampleArtworkApp: React.FC<ExampleArtworkAppProps> = props => {
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
      <ExampleArtworkApp {...props} />
    </AnalyticsContext.Provider>
  )
}

export const ExampleArtworkAppFragmentContainer = createFragmentContainer(
  TrackingWrappedExampleArtworkApp,
  {
    artwork: graphql`
      fragment ExampleArtworkApp_artwork on Artwork {
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

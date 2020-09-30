import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairFollowedArtists_fair } from "v2/__generated__/FairFollowedArtists_fair.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { ContextModule } from "@artsy/cohesion"
import { Box, BoxProps, Text } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

const IMAGE_HEIGHT = 160

interface FairFollowedArtistsProps extends BoxProps {
  fair: FairFollowedArtists_fair
}

export const FairFollowedArtists: React.FC<FairFollowedArtistsProps> = ({
  fair,
  ...rest
}) => {
  if (!fair.followedArtistArtworks?.edges?.length) return null

  return (
    <Box {...rest}>
      <Box display="flex" justifyContent="space-between">
        <Text variant="subtitle" as="h3" mb={2}>
          Works by artists you follow
        </Text>

        <Text variant="subtitle" color="black60">
          <RouterLink
            to={`/fair/${fair.slug}/artworks?include_artworks_by_followed_artists=true`}
            noUnderline
          >
            View all
          </RouterLink>
        </Text>
      </Box>

      <Carousel arrowHeight={IMAGE_HEIGHT}>
        {fair.followedArtistArtworks.edges.map(({ artwork }) => {
          return (
            <FillwidthItem
              contextModule={ContextModule.fairRail}
              artwork={artwork}
              imageHeight={IMAGE_HEIGHT}
              hidePartnerName
              lazyLoad
            />
          )
        })}
      </Carousel>
    </Box>
  )
}

export const FairFollowedArtistsFragmentContainer = createFragmentContainer(
  FairFollowedArtists,
  {
    fair: graphql`
      fragment FairFollowedArtists_fair on Fair {
        slug
        followedArtistArtworks: filterArtworksConnection(
          includeArtworksByFollowedArtists: true
          first: 20
        ) {
          edges {
            artwork: node {
              ...FillwidthItem_artwork
            }
          }
        }
      }
    `,
  }
)

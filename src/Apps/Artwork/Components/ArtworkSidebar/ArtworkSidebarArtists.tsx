import { EntityHeader, Join, Spacer } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule } from "@artsy/cohesion"
import { ArtworkSidebarArtists_artwork$data } from "__generated__/ArtworkSidebarArtists_artwork.graphql"
import { FollowArtistButtonFragmentContainer } from "Components/FollowButton/FollowArtistButton"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"

export interface ArtistsProps {
  artwork: ArtworkSidebarArtists_artwork$data
}

export const ArtworkSidebarArtists: React.FC<ArtistsProps> = ({
  artwork: { artists, cultural_maker },
}) => {
  if (!artists) return null

  return (
    <Join separator={<Spacer mt={2} />}>
      {artists.map(artist => {
        if (!artist || !artist.name) return null

        return (
          <EntityHeaderArtistFragmentContainer
            key={artist.internalID}
            // @ts-ignore RELAY UPGRADE 13
            artist={artist}
            FollowButton={
              <FollowArtistButtonFragmentContainer
                // @ts-ignore RELAY UPGRADE 13
                artist={artist}
                contextModule={ContextModule.artworkSidebar}
                triggerSuggestions
                size="small"
              >
                Follow
              </FollowArtistButtonFragmentContainer>
            }
          />
        )
      })}

      {artists.length === 0 && cultural_maker && (
        <EntityHeader
          name={cultural_maker}
          initials={cultural_maker.charAt(0)}
        />
      )}
    </Join>
  )
}

export const ArtworkSidebarArtistsFragmentContainer = createFragmentContainer(
  ArtworkSidebarArtists,
  {
    artwork: graphql`
      fragment ArtworkSidebarArtists_artwork on Artwork
        @argumentDefinitions(
          showFollowSuggestions: { type: "Boolean", defaultValue: true }
        ) {
        cultural_maker: culturalMaker
        artists {
          ...EntityHeaderArtist_artist
          internalID
          slug
          name
          ...FollowArtistButton_artist
            @arguments(showFollowSuggestions: $showFollowSuggestions)
        }
      }
    `,
  }
)

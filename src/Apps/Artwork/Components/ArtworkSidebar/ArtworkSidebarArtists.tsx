import { EntityHeader, Join, Spacer } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule } from "@artsy/cohesion"
import { ArtworkSidebarArtists_artwork$data } from "__generated__/ArtworkSidebarArtists_artwork.graphql"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"

export interface ArtistsProps {
  artwork: ArtworkSidebarArtists_artwork$data
}

export const ArtworkSidebarArtists: React.FC<ArtistsProps> = ({
  artwork: { artists, culturalMaker },
}) => {
  if (!artists) return null

  return (
    <Join separator={<Spacer mt={2} />}>
      {artists.map(artist => {
        if (!artist || !artist.name) return null

        return (
          <EntityHeaderArtistFragmentContainer
            key={artist.internalID}
            artist={artist}
            FollowButton={
              <FollowArtistButtonQueryRenderer
                id={artist.internalID}
                contextModule={ContextModule.artworkSidebar}
                triggerSuggestions
                size="small"
              />
            }
          />
        )
      })}

      {artists.length === 0 && culturalMaker && (
        <EntityHeader name={culturalMaker} initials={culturalMaker.charAt(0)} />
      )}
    </Join>
  )
}

export const ArtworkSidebarArtistsFragmentContainer = createFragmentContainer(
  ArtworkSidebarArtists,
  {
    artwork: graphql`
      fragment ArtworkSidebarArtists_artwork on Artwork {
        culturalMaker
        artists {
          ...EntityHeaderArtist_artist
          internalID
          slug
          name
        }
      }
    `,
  }
)

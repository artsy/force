import { EntityHeader, Join, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule } from "@artsy/cohesion"
import { ArtworkSidebarArtists_artwork } from "v2/__generated__/ArtworkSidebarArtists_artwork.graphql"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"

export interface ArtistsProps {
  artwork: ArtworkSidebarArtists_artwork
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
          <EntityHeader
            key={artist.internalID}
            name={artist.name}
            href={artist.href!}
            meta={artist.formattedNationalityAndBirthday!}
            imageUrl={artist.avatar?.cropped?.src}
            FollowButton={
              <FollowArtistButton
                artist={artist}
                contextModule={ContextModule.artworkSidebar}
                triggerSuggestions
                buttonProps={{ size: "small", variant: "secondaryOutline" }}
              >
                Follow
              </FollowArtistButton>
            }
          />
        )
      })}

      {artists.length === 0 && cultural_maker && (
        <Text variant="md">{cultural_maker}</Text>
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
          id
          internalID
          slug
          name
          formattedNationalityAndBirthday
          href
          avatar: image {
            cropped(width: 300, height: 300) {
              src
            }
          }
          ...FollowArtistButton_artist
            @arguments(showFollowSuggestions: $showFollowSuggestions)
        }
      }
    `,
  }
)

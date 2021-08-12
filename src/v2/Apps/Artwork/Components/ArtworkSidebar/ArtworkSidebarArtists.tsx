import { EntityHeader, Join, Spacer } from "@artsy/palette"
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
            image={{
              src: artist.avatar?.cropped?.src,
              srcSet: artist.avatar?.cropped?.srcSet,
            }}
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
          id
          internalID
          slug
          name
          formattedNationalityAndBirthday
          href
          avatar: image {
            cropped(width: 45, height: 45) {
              src
              srcSet
            }
          }
          ...FollowArtistButton_artist
            @arguments(showFollowSuggestions: $showFollowSuggestions)
        }
      }
    `,
  }
)

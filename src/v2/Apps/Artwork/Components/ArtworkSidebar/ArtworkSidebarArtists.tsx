import { Box, Text } from "@artsy/palette"

import { FollowIcon } from "v2/Components/FollowIcon"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ContextModule } from "@artsy/cohesion"
import { ArtworkSidebarArtists_artwork } from "v2/__generated__/ArtworkSidebarArtists_artwork.graphql"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

export interface ArtistsProps {
  artwork: ArtworkSidebarArtists_artwork
}

type Artist = ArtworkSidebarArtists_artwork["artists"][0]

export class ArtworkSidebarArtists extends React.Component<ArtistsProps> {
  private renderArtistName(artist: Artist, multiple = false) {
    return artist.href ? (
      <Text variant="title" as={multiple ? "span" : "h1"}>
        <RouterLink to={artist.href}>{artist.name}</RouterLink>
      </Text>
    ) : (
      <Text variant="title" as={multiple ? "span" : "h1"}>
        {artist.name}
      </Text>
    )
  }

  private renderSingleArtist = (artist: Artist) => {
    return (
      <React.Fragment>
        {this.renderArtistName(artist)}
        <FollowArtistButton
          artist={artist}
          contextModule={ContextModule.artworkSidebar}
          triggerSuggestions
          render={({ is_followed }) => {
            return <FollowIcon isFollowed={is_followed} />
          }}
        >
          Follow
        </FollowArtistButton>
      </React.Fragment>
    )
  }

  renderMultipleArtists() {
    const {
      artwork: { artists },
    } = this.props
    return (
      <Box as="h1">
        {artists.map((artist, index) => {
          return (
            <React.Fragment key={artist.id}>
              {this.renderArtistName(artist, true)}
              {index !== artists.length - 1 && ", "}
            </React.Fragment>
          )
        })}
      </Box>
    )
  }

  renderCulturalMaker(cultural_maker: string) {
    return (
      <Text variant="subtitle" display="inline-block" as="h1">
        {cultural_maker}
      </Text>
    )
  }
  render() {
    const {
      artwork: { artists, cultural_maker },
    } = this.props
    return (
      <Box>
        {artists.length === 1
          ? this.renderSingleArtist(artists[0])
          : this.renderMultipleArtists()}
        {artists.length === 0 &&
          cultural_maker &&
          this.renderCulturalMaker(cultural_maker)}
      </Box>
    )
  }
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
          href
          ...FollowArtistButton_artist
            @arguments(showFollowSuggestions: $showFollowSuggestions)
        }
      }
    `,
  }
)

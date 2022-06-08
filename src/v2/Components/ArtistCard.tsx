import { ArtistCard_artist } from "v2/__generated__/ArtistCard_artist.graphql"
import { FollowArtistButtonFragmentContainer } from "v2/Components/FollowButton/FollowArtistButton"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { EntityHeader } from "@artsy/palette"
import { AuthContextModule } from "@artsy/cohesion"

export interface ArtistCardProps {
  artist: ArtistCard_artist
  contextModule: AuthContextModule
  onClick?: () => void
}

export const ArtistCard: React.FC<ArtistCardProps> = ({
  artist,
  onClick,
  contextModule,
}) => {
  return (
    <>
      <EntityHeader
        name={artist.name ?? "-"}
        href={artist.href!}
        meta={artist.formatted_nationality_and_birthday!}
        image={{
          src: artist.image?.cropped?.src,
          srcSet: artist.image?.cropped?.srcSet,
          lazyLoad: true,
        }}
        onClick={onClick}
        FollowButton={
          <FollowArtistButtonFragmentContainer
            artist={artist}
            contextModule={contextModule}
            buttonProps={{ variant: "secondaryBlack", size: "small" }}
          />
        }
      />
    </>
  )
}

export const ArtistCardFragmentContainer = createFragmentContainer(
  ArtistCard as React.ComponentType<ArtistCardProps>,
  {
    artist: graphql`
      fragment ArtistCard_artist on Artist {
        name
        slug
        href
        image {
          cropped(width: 45, height: 45) {
            src
            srcSet
          }
        }
        formatted_nationality_and_birthday: formattedNationalityAndBirthday
        ...FollowArtistButton_artist
      }
    `,
  }
)

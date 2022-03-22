import * as React from "react"
import { Image, ResponsiveBox } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistsArtistCard_artist } from "v2/__generated__/ArtistsArtistCard_artist.graphql"
import { EntityHeaderArtistFragmentContainer } from "v2/Components/EntityHeaders/EntityHeaderArtist"

interface ArtistsArtistCardProps {
  artist: ArtistsArtistCard_artist
}

export const ArtistsArtistCard: React.FC<ArtistsArtistCardProps> = ({
  artist,
}) => {
  const { image } = artist

  if (!image) return null

  return (
    <>
      <RouterLink
        to={artist.href}
        display="block"
        textDecoration="none"
        tabIndex={-1}
      >
        <ResponsiveBox
          aspectWidth={445}
          aspectHeight={334}
          maxWidth="100%"
          bg="black10"
        >
          {image.thumb && (
            <Image
              width="100%"
              height="100%"
              src={image.thumb.src}
              srcSet={image.thumb.srcSet}
              alt=""
              lazyLoad
            />
          )}
        </ResponsiveBox>

        <EntityHeaderArtistFragmentContainer
          mt={1}
          alignItems="flex-start"
          artist={artist}
          displayAvatar={false}
          displayLink={false}
          displayCounts
        />
      </RouterLink>
    </>
  )
}

export const ArtistsArtistCardFragmentContainer = createFragmentContainer(
  ArtistsArtistCard,
  {
    artist: graphql`
      fragment ArtistsArtistCard_artist on Artist {
        ...EntityHeaderArtist_artist
        href
        image {
          thumb: cropped(width: 445, height: 334) {
            src
            srcSet
          }
        }
      }
    `,
  }
)

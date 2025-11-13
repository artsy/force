import { RouterLink } from "System/Components/RouterLink"
import { ShowMore, Text, VisuallyHidden } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import type { ArtworkSidebarArtists_artwork$data } from "__generated__/ArtworkSidebarArtists_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

const ARTISTS_TO_DISPLAY = 4

export interface ArtistsProps {
  artwork: ArtworkSidebarArtists_artwork$data
}

export const ArtworkSidebarArtists: React.FC<
  React.PropsWithChildren<ArtistsProps>
> = ({ artwork: { artists, culturalMaker } }) => {
  if (!artists) return null

  const showMoreText = `${artists.length - ARTISTS_TO_DISPLAY} more`

  return (
    <div>
      <ShowMore
        initial={ARTISTS_TO_DISPLAY}
        variant="lg-display"
        textDecoration="underline"
        showMoreText={showMoreText}
        hideText="Show less"
      >
        {artists.map((artist, index) => {
          if (!artist || !artist.name) return null

          let separator = ", "

          if (
            index === artists.length - 1 &&
            artists.length > ARTISTS_TO_DISPLAY
          ) {
            separator = ". "
          } else if (index === artists.length - 1) {
            separator = ""
          }

          return (
            <ArtistLink
              key={artist.id}
              variant="lg-display"
              as={RouterLink}
              to={artist.href}
            >
              {artist.name}
              {separator}
            </ArtistLink>
          )
        })}
      </ShowMore>

      {artists.length === 0 && culturalMaker && (
        <Text variant="lg-display">{culturalMaker}</Text>
      )}

      <VisuallyHidden>, </VisuallyHidden>
    </div>
  )
}

const ArtistLink = styled(Text)`
  color: ${themeGet("colors.mono100")};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const ArtworkSidebarArtistsFragmentContainer = createFragmentContainer(
  ArtworkSidebarArtists,
  {
    artwork: graphql`
      fragment ArtworkSidebarArtists_artwork on Artwork {
        culturalMaker
        artists(shallow: true) {
          id
          slug
          name
          href
        }
      }
    `,
  }
)

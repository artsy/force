import { ShowMore, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"
import { ArtworkSidebarArtists_artwork$data } from "__generated__/ArtworkSidebarArtists_artwork.graphql"

const ARTISTS_TO_DISPLAY = 4

export interface ArtistsProps {
  artwork: ArtworkSidebarArtists_artwork$data
}

const StyledArtistLink = styled(RouterLink)`
  color: ${themeGet("colors.black100")};

  &:hover {
    text-decoration: underline;
  }
`

export const ArtworkSidebarArtists: React.FC<ArtistsProps> = ({
  artwork: { artists, culturalMaker },
}) => {
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
            <Text variant="lg-display" as="span" key={artist.slug + index}>
              <StyledArtistLink
                to={`/artist/${artist.slug}`}
                textDecoration="none"
              >
                {artist.name}
                {separator}
              </StyledArtistLink>
            </Text>
          )
        })}
      </ShowMore>

      {artists.length === 0 && culturalMaker && (
        <Text variant="lg-display">{culturalMaker}</Text>
      )}
    </div>
  )
}

export const ArtworkSidebarArtistsFragmentContainer = createFragmentContainer(
  ArtworkSidebarArtists,
  {
    artwork: graphql`
      fragment ArtworkSidebarArtists_artwork on Artwork {
        culturalMaker
        artists {
          slug
          name
        }
      }
    `,
  }
)

import { ContextModule } from "@artsy/cohesion"
import { Box, Column, GridColumns, Spacer } from "@artsy/palette"
import {
  ArtistStylesAndTechniques,
  useHasArtistStylesAndTechniques,
} from "Apps/Artist/Components/ArtistHeader/ArtistStylesAndTechniques"
import {
  ArtistStoryBiography,
  useHasArtistStoryBiography,
} from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryBiography"
import { ArtistStoryCVLink } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryCVLink"
import {
  ArtistStoryPullQuote,
  useHasArtistStoryPullQuote,
} from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryPullQuote"
import {
  ArtistStoryRepresentation,
  useHasArtistStoryRepresentation,
} from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryRepresentation"
import type { ArtistStoryIntro_artist$key } from "__generated__/ArtistStoryIntro_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistStoryIntroProps {
  artist: ArtistStoryIntro_artist$key
}

export const ArtistStoryIntro: React.FC<ArtistStoryIntroProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const hasPullQuote = useHasArtistStoryPullQuote(artist)
  const hasBiography = useHasArtistStoryBiography(artist)
  const hasStylesAndTechniques = useHasArtistStylesAndTechniques(artist)
  const hasRepresentation = useHasArtistStoryRepresentation(artist)
  const hasBiographyRow = hasBiography || hasRepresentation
  const hasContentAboveCV =
    hasPullQuote || hasBiographyRow || hasStylesAndTechniques

  return (
    <Box data-testid="artist-story-intro">
      {hasPullQuote && (
        <GridColumns>
          <Column span={[12, 10]}>
            <ArtistStoryPullQuote artist={artist} />
          </Column>
        </GridColumns>
      )}

      {hasBiographyRow && (
        <>
          {hasPullQuote && <Spacer y={2} />}

          <GridColumns gridRowGap={4}>
            {hasBiography && (
              <Column span={[12, 8]}>
                <ArtistStoryBiography artist={artist} />
              </Column>
            )}

            {hasRepresentation && (
              <Column span={[12, 4]} start={[1, 9]}>
                <ArtistStoryRepresentation artist={artist} />
              </Column>
            )}
          </GridColumns>
        </>
      )}

      {hasStylesAndTechniques && (
        <>
          {(hasPullQuote || hasBiographyRow) && <Spacer y={4} />}

          <GridColumns>
            <Column span={[12, 6]}>
              <ArtistStylesAndTechniques
                artist={artist}
                contextModule={ContextModule.artistHeader}
              />
            </Column>
          </GridColumns>
        </>
      )}

      {hasContentAboveCV && <Spacer y={hasStylesAndTechniques ? 2 : 4} />}

      <ArtistStoryCVLink slug={artist.slug} />
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryIntro_artist on Artist {
    slug
    ...ArtistStoryPullQuote_artist
    ...ArtistStoryBiography_artist
    ...ArtistStylesAndTechniques_artist
    ...ArtistStoryRepresentation_artist
  }
`

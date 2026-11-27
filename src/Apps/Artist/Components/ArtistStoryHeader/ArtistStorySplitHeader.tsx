import { ContextModule } from "@artsy/cohesion"
import {
  Box,
  Column,
  Flex,
  FullBleed,
  GridColumns,
  Stack,
  THEME,
  Text,
  Theme,
} from "@artsy/palette"
import { ArtistHeaderSocialLink } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderSocialLink"
import {
  ArtistStylesAndTechniques,
  useHasArtistStylesAndTechniques,
} from "Apps/Artist/Components/ArtistHeader/ArtistStylesAndTechniques"
import { ArtistStoryBiography } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryBiography"
import { ArtistStoryCVLink } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryCVLink"
import { ArtistStoryFollowButton } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryFollowButton"
import { ArtistStoryHeaderImage } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryHeaderImage"
import { ArtistStoryPullQuote } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryPullQuote"
import {
  ArtistStoryRepresentation,
  useHasArtistStoryRepresentation,
} from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryRepresentation"
import { ArtistStoryVanguardBadge } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryVanguardBadge"
import type { ArtistStorySplitHeader_artist$key } from "__generated__/ArtistStorySplitHeader_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistStorySplitHeaderProps {
  artist: ArtistStorySplitHeader_artist$key
}

export const ArtistStorySplitHeader: React.FC<ArtistStorySplitHeaderProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const hasRepresentation = useHasArtistStoryRepresentation(artist)
  const hasStylesAndTechniques = useHasArtistStylesAndTechniques(artist)
  const instagramHandle = artist.instagramHandle?.trim() || null

  return (
    <FullBleed data-testid="artist-story-split-header">
      <GridColumns
        as="header"
        gridColumnGap={0}
        gridRowGap={0}
        minHeight={["auto", 760]}
      >
        <Column span={[12, 4]}>
          <Theme theme="light">
            <Box
              position="relative"
              height={[600, "100%"]}
              bg="mono5"
              color="mono0"
              overflow="hidden"
            >
              <ArtistStoryHeaderImage artist={artist} />

              <Box
                position="absolute"
                bottom={0}
                left={0}
                width="100%"
                height="50%"
                pointerEvents="none"
                background={THEME.effects.overlayGradient}
                aria-hidden="true"
              />

              {artist.vanguardYear && (
                <Box position="absolute" bottom={0} left={0} p={2}>
                  <ArtistStoryVanguardBadge artist={artist} />
                </Box>
              )}
            </Box>
          </Theme>
        </Column>

        <Column
          span={[12, 8]}
          display="flex"
          flexDirection="column"
          gap={4}
          p={[2, 6]}
        >
          <Stack gap={1} alignItems="flex-start">
            <Text as="h1" variant={["xl", "xxl"]}>
              {artist.name}
            </Text>

            {artist.formattedNationalityAndBirthday && (
              <Text as="h2" variant="sm-display">
                {artist.formattedNationalityAndBirthday}
              </Text>
            )}

            {instagramHandle && (
              <ArtistHeaderSocialLink instagramHandle={instagramHandle} />
            )}
          </Stack>

          <Flex alignItems="center" flexWrap="wrap" gap={2}>
            <ArtistStoryFollowButton
              artistID={artist.internalID}
              followers={artist.counts?.follows}
              width="fit-content"
            />

            <ArtistStoryCVLink slug={artist.slug} />
          </Flex>

          <ArtistStoryPullQuote artist={artist} />

          <ArtistStoryBiography artist={artist} />

          {hasStylesAndTechniques && (
            <ArtistStylesAndTechniques
              artist={artist}
              contextModule={ContextModule.artistHeader}
            />
          )}

          {hasRepresentation && (
            <Box mt="auto">
              <ArtistStoryRepresentation artist={artist} isInline />
            </Box>
          )}
        </Column>
      </GridColumns>
    </FullBleed>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStorySplitHeader_artist on Artist {
    internalID
    slug
    name
    formattedNationalityAndBirthday
    vanguardYear
    instagramHandle
    counts {
      follows
    }
    ...ArtistStoryHeaderImage_artist
    ...ArtistStoryVanguardBadge_artist
    ...ArtistStoryPullQuote_artist
    ...ArtistStoryBiography_artist
    ...ArtistStylesAndTechniques_artist
    ...ArtistStoryRepresentation_artist
  }
`

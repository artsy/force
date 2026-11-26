import { Box, FullBleed, Stack, THEME, Text, Theme } from "@artsy/palette"
import { ArtistHeaderSocialLink } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderSocialLink"
import { ArtistStoryFollowButton } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryFollowButton"
import { ArtistStoryHeaderImage } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryHeaderImage"
import { ArtistStoryVanguardBadge } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryVanguardBadge"
import { AppContainer } from "Apps/Components/AppContainer"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import type { ArtistStoryMobileHeader_artist$key } from "__generated__/ArtistStoryMobileHeader_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistStoryMobileHeaderProps {
  artist: ArtistStoryMobileHeader_artist$key
}

export const ArtistStoryMobileHeader: React.FC<
  ArtistStoryMobileHeaderProps
> = ({ artist: artistRef }) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const instagramHandle = artist.instagramHandle?.trim() || null
  const { mobile: navBarHeight } = useNavBarHeight()

  return (
    <Theme theme="light">
      <FullBleed data-testid="artist-story-mobile-header">
        <Box
          as="header"
          position="relative"
          height={`calc(100svh - ${navBarHeight}px)`}
          bg="mono100"
          color="mono0"
          overflow="hidden"
        >
          <ArtistStoryHeaderImage artist={artist} />

          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            pointerEvents="none"
            background={THEME.effects.overlayGradient}
            aria-hidden="true"
          />

          <Box position="absolute" bottom={0} left={0} right={0} pb={4}>
            <AppContainer px={2}>
              <Stack gap={2}>
                <Stack gap={1} alignItems="flex-start">
                  {artist.vanguardYear && (
                    <ArtistStoryVanguardBadge artist={artist} />
                  )}

                  <Text as="h1" variant="xl" color="mono0">
                    {artist.name}
                  </Text>

                  {artist.formattedNationalityAndBirthday && (
                    <Text as="h2" variant="sm-display" color="mono0">
                      {artist.formattedNationalityAndBirthday}
                    </Text>
                  )}

                  {instagramHandle && (
                    <ArtistHeaderSocialLink
                      instagramHandle={instagramHandle}
                      isInFeaturedStory
                    />
                  )}
                </Stack>

                <ArtistStoryFollowButton
                  artistID={artist.internalID}
                  followers={artist.counts?.follows}
                  variant="primaryWhite"
                  width="100%"
                />
              </Stack>
            </AppContainer>
          </Box>
        </Box>
      </FullBleed>
    </Theme>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryMobileHeader_artist on Artist {
    internalID
    name
    formattedNationalityAndBirthday
    vanguardYear
    instagramHandle
    counts {
      follows
    }
    ...ArtistStoryHeaderImage_artist
    ...ArtistStoryVanguardBadge_artist
  }
`

import {
  ActionType,
  type ClickedPauseVideo,
  type ClickedPlayVideo,
  ContextModule,
} from "@artsy/cohesion"
import { Box, Flex, FullBleed, Stack, THEME, Text, Theme } from "@artsy/palette"
import { ArtistHeaderSocialLink } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderSocialLink"
import { ArtistStoryFollowButton } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryFollowButton"
import { ArtistStoryHeaderMedia } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryHeaderMedia"
import { ArtistStoryVanguardBadge } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryVanguardBadge"
import { AppContainer } from "Apps/Components/AppContainer"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { formatFollowerCount } from "Utils/formatFollowerCount"
import type { ArtistStoryVideoHeader_artist$key } from "__generated__/ArtistStoryVideoHeader_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistStoryVideoHeaderProps {
  artist: ArtistStoryVideoHeader_artist$key
}

export const ArtistStoryVideoHeader: React.FC<ArtistStoryVideoHeaderProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()
  const trackVideo = (
    action: ActionType.clickedPlayVideo | ActionType.clickedPauseVideo,
  ) => {
    if (!contextPageOwnerId || !contextPageOwnerSlug) return

    const payload: ClickedPlayVideo | ClickedPauseVideo = {
      action,
      context_module: ContextModule.artistHeaderVideo,
      context_owner_type: contextPageOwnerType,
      context_owner_id: contextPageOwnerId,
      context_owner_slug: contextPageOwnerSlug,
    }
    trackEvent(payload)
  }

  const followers = artist.counts?.follows ?? 0
  const instagramHandle = artist.instagramHandle?.trim() || null

  return (
    <Theme theme="light">
      <FullBleed data-testid="artist-story-video-header">
        <Box
          as="header"
          position="relative"
          height={[600, 760]}
          bg="mono100"
          color="mono0"
          overflow="hidden"
        >
          <ArtistStoryHeaderMedia
            artist={artist}
            onPlayVideo={() => {
              trackVideo(ActionType.clickedPlayVideo)
            }}
            onPauseVideo={() => {
              trackVideo(ActionType.clickedPauseVideo)
            }}
          />

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

          <Box position="absolute" bottom={0} left={0} right={0} pb={[4, 6]}>
            <AppContainer px={[2, 4]}>
              <Flex
                flexDirection={["column", "row"]}
                alignItems={["stretch", "flex-end"]}
                justifyContent="space-between"
                gap={4}
              >
                <Stack gap={1} alignItems="flex-start">
                  {artist.vanguardYear && (
                    <ArtistStoryVanguardBadge artist={artist} />
                  )}

                  <Text as="h1" variant={["xl", "xxl"]} color="mono0">
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

                <Stack
                  gap={1}
                  alignItems={["stretch", "center"]}
                  flexShrink={[1, 0]}
                >
                  <ArtistStoryFollowButton
                    artistID={artist.internalID}
                    variant="primaryWhite"
                    width={["100%", "fit-content"]}
                  />

                  {!!followers && (
                    <Text variant="xs" textAlign="center">
                      {formatFollowerCount(followers)} Follower
                      {followers === 1 ? "" : "s"}
                    </Text>
                  )}
                </Stack>
              </Flex>
            </AppContainer>
          </Box>
        </Box>
      </FullBleed>
    </Theme>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryVideoHeader_artist on Artist {
    internalID
    name
    formattedNationalityAndBirthday
    vanguardYear
    instagramHandle
    counts {
      follows
    }
    ...ArtistStoryHeaderMedia_artist
    ...ArtistStoryVanguardBadge_artist
  }
`

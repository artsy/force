import {
  ActionType,
  type ClickedPauseVideo,
  type ClickedPlayVideo,
  type ClickedVanguardBadge,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import {
  Box,
  Flex,
  FullBleed,
  Spacer,
  Stack,
  THEME,
  Text,
  Theme,
} from "@artsy/palette"
import {
  ArtistHeaderEditorial,
  useHasArtistHeaderEditorial,
} from "Apps/Artist/Components/ArtistHeader/ArtistHeaderEditorial"
import { ArtistHeaderSocialLink } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderSocialLink"
import { ArtistStoryHeaderMedia } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryHeaderMedia"
import { ArtistStoryIntro } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryIntro"
import { AppContainer } from "Apps/Components/AppContainer"
import { FollowButtonInlineCount } from "Components/FollowButton/Button"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { ProgressiveOnboardingFollowArtist } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { formatFollowerCount } from "Utils/formatFollowerCount"
import type { ArtistStoryHeader_artist$key } from "__generated__/ArtistStoryHeader_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

const VANGUARD_COLLECTION_SLUG = "artsy-vanguard-artists"
const VANGUARD_COLLECTION_HREF = `/collection/${VANGUARD_COLLECTION_SLUG}`

interface ArtistStoryHeaderProps {
  artist: ArtistStoryHeader_artist$key
}

export const ArtistStoryHeader: React.FC<ArtistStoryHeaderProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()
  const hasEditorial = useHasArtistHeaderEditorial(artist)
  const story = artist.featuredStory

  if (!story) {
    return null
  }

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

  const handleVanguardBadgeClick = () => {
    if (!contextPageOwnerId || !contextPageOwnerSlug) return

    const payload: ClickedVanguardBadge = {
      action: ActionType.clickedVanguardBadge,
      context_module: ContextModule.artistVanguardBadge,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.collection,
      destination_page_owner_slug: VANGUARD_COLLECTION_SLUG,
    }
    trackEvent(payload)
  }

  const followers = artist.counts?.follows ?? 0
  const instagramHandle = artist.instagramHandle?.trim() || null

  return (
    <>
      <Theme theme="light">
        <FullBleed data-testid="artist-story-header">
          <Box
            as="header"
            position="relative"
            height={[600, 760]}
            bg="mono100"
            color="mono0"
            overflow="hidden"
          >
            <ArtistStoryHeaderMedia
              story={story}
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
                  <Box>
                    {artist.vanguardYear && (
                      <Box
                        as={RouterLink}
                        to={VANGUARD_COLLECTION_HREF}
                        textDecoration="none"
                        display="inline-flex"
                        alignItems="center"
                        height={30}
                        mb={1}
                        px={1}
                        color="mono0"
                        border="1px solid rgba(255, 255, 255, 0.7)"
                        borderRadius={15}
                        background="rgba(255, 255, 255, 0.16)"
                        onClick={handleVanguardBadgeClick}
                      >
                        <Text variant="xs">
                          {artist.vanguardYear} Vanguard Artist
                        </Text>
                      </Box>
                    )}

                    <Text as="h1" variant={["xl", "xxl"]} color="mono0">
                      {artist.name}
                    </Text>

                    {artist.formattedNationalityAndBirthday && (
                      <Text as="h2" variant="sm-display" color="mono0" mt={1}>
                        {artist.formattedNationalityAndBirthday}
                      </Text>
                    )}

                    {instagramHandle && (
                      <Box mt={1}>
                        <ArtistHeaderSocialLink
                          instagramHandle={instagramHandle}
                          isInFeaturedStory
                        />
                      </Box>
                    )}
                  </Box>

                  <Stack
                    gap={1}
                    alignItems={["stretch", "center"]}
                    flexShrink={[1, 0]}
                  >
                    <ProgressiveOnboardingFollowArtist>
                      <Box width={["100%", "auto"]}>
                        <FollowArtistButtonQueryRenderer
                          id={artist.internalID}
                          contextModule={ContextModule.artistHeader}
                          variant="primaryWhite"
                          size="large"
                          width={["100%", 190]}
                        >
                          {label => {
                            return (
                              <Stack
                                gap={0.5}
                                flexDirection="row"
                                alignItems="center"
                              >
                                <Box>{label}</Box>

                                {followers > 0 && (
                                  <FollowButtonInlineCount
                                    display={["block", "none"]}
                                  >
                                    {formatFollowerCount(followers)}
                                  </FollowButtonInlineCount>
                                )}
                              </Stack>
                            )
                          }}
                        </FollowArtistButtonQueryRenderer>
                      </Box>
                    </ProgressiveOnboardingFollowArtist>

                    {followers > 0 && (
                      <Text
                        variant="xs"
                        display={["none", "block"]}
                        textAlign="center"
                        flexShrink={0}
                      >
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

      <Spacer y={4} />

      <ArtistStoryIntro artist={artist} />

      {hasEditorial && (
        <>
          <Spacer y={4} />

          <FullBleed bg="mono5" py={2}>
            <AppContainer px={[2, 4]}>
              <ArtistHeaderEditorial artist={artist} isInFeaturedStory />
            </AppContainer>
          </FullBleed>
        </>
      )}
    </>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryHeader_artist on Artist {
    internalID
    name
    formattedNationalityAndBirthday
    vanguardYear
    instagramHandle
    counts {
      follows
    }
    featuredStory {
      ...ArtistStoryHeaderMedia_story
    }
    ...ArtistStoryIntro_artist
    ...ArtistHeaderEditorial_artist
  }
`

interface StoryWithHeaderMedia {
  headerVideo?: object | null
  headerImage?: object | null
}

export const hasArtistStoryHeaderMedia = (
  story?: StoryWithHeaderMedia | null,
) => {
  return !!story && (!!story.headerVideo || !!story.headerImage)
}

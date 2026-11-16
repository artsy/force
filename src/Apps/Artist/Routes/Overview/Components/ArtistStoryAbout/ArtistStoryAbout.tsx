import {
  ActionType,
  type ClickedPauseVideo,
  type ClickedPlayVideo,
  ContextModule,
} from "@artsy/cohesion"
import {
  Box,
  Column,
  GridColumns,
  HTML,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
  Theme,
} from "@artsy/palette"
import { ArtistStoryMotionVideos } from "Apps/Artist/Routes/Overview/Components/ArtistStoryAbout/ArtistStoryMotionVideos"
import { ArtistStoryProcessVideo } from "Apps/Artist/Routes/Overview/Components/ArtistStoryAbout/ArtistStoryProcessVideo"
import { getAccentColors } from "Apps/Artist/Routes/Overview/Components/ArtistStoryAbout/utils/getAccentColors"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ArtistStoryAbout_artist$key } from "__generated__/ArtistStoryAbout_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

type VideoModule =
  | ContextModule.artistProcessVideo
  | ContextModule.artistMotionVideo

interface ArtistStoryAboutProps {
  artist: ArtistStoryAbout_artist$key
}

export const ArtistStoryAbout: React.FC<ArtistStoryAboutProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  const story = artist.featuredStory
  const tagline = story?.about?.tagline?.trim()
  const body = story?.about?.body?.trim()
  const portrait = story?.about?.portrait
  const portraitImage = portrait?.image?.resized
  const processVideo = story?.processVideo
  const motionVideos = story?.motionVideos ?? []

  if (
    !story ||
    (!portraitImage &&
      !tagline &&
      !body &&
      !processVideo &&
      motionVideos.length === 0)
  ) {
    return null
  }

  const accent = getAccentColors(story.accentColor)

  const trackVideo = (
    action: ActionType.clickedPlayVideo | ActionType.clickedPauseVideo,
    contextModule: VideoModule,
  ) => {
    if (!contextPageOwnerId || !contextPageOwnerSlug) return

    const payload: ClickedPlayVideo | ClickedPauseVideo = {
      action,
      context_module: contextModule,
      context_owner_type: contextPageOwnerType,
      context_owner_id: contextPageOwnerId,
      context_owner_slug: contextPageOwnerSlug,
    }
    trackEvent(payload)
  }

  const hasText = !!tagline || !!body

  return (
    <Box data-testid="artist-story-about">
      <Text as="h2" variant="xl">
        About
      </Text>

      {(portraitImage || hasText) && (
        <>
          <Spacer y={[2, 4]} />

          <GridColumns gridRowGap={4} alignItems="center">
            {portrait && portraitImage && (
              <Column span={[12, 6]}>
                <Box as="figure" m={0}>
                  <Theme theme="light">
                    <Box
                      data-testid="artist-story-portrait"
                      bg={accent.bg}
                      pt={[2, 4]}
                      pr={[2, 4]}
                    >
                      <ResponsiveBox
                        aspectWidth={4}
                        aspectHeight={5}
                        maxWidth="100%"
                        bg="mono10"
                      >
                        <Image
                          src={portraitImage.src}
                          srcSet={portraitImage.srcSet}
                          alt={portrait.altText}
                          width="100%"
                          height="100%"
                          lazyLoad
                          style={{ objectFit: "cover" }}
                        />
                      </ResponsiveBox>
                    </Box>
                  </Theme>

                  {portrait.credit && (
                    <Text as="figcaption" variant="xs" color="mono60" mt={1}>
                      {portrait.credit}
                    </Text>
                  )}
                </Box>
              </Column>
            )}

            {hasText && (
              <Column span={[12, portraitImage ? 6 : 8]}>
                {tagline && (
                  <Text as="p" variant="lg-display">
                    {" "}
                    {tagline}
                  </Text>
                )}

                {tagline && body && <Spacer y={2} />}

                {body && <HTML variant={["sm", "md"]} html={body} />}
              </Column>
            )}
          </GridColumns>
        </>
      )}

      {processVideo && (
        <>
          <Spacer y={[4, 6]} />

          <GridColumns>
            <Column span={[12, 10]} start={[1, 2]}>
              <ArtistStoryProcessVideo
                video={processVideo.video}
                onPlay={() => {
                  trackVideo(
                    ActionType.clickedPlayVideo,
                    ContextModule.artistProcessVideo,
                  )
                }}
              />
            </Column>
          </GridColumns>
        </>
      )}

      {motionVideos.length > 0 && (
        <>
          <Spacer y={[4, 6]} />

          <ArtistStoryMotionVideos
            motionVideos={motionVideos}
            accent={accent}
            onPlay={() => {
              trackVideo(
                ActionType.clickedPlayVideo,
                ContextModule.artistMotionVideo,
              )
            }}
            onPause={() => {
              trackVideo(
                ActionType.clickedPauseVideo,
                ContextModule.artistMotionVideo,
              )
            }}
          />
        </>
      )}
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryAbout_artist on Artist {
    featuredStory {
      accentColor {
        hex
        textColor
      }
      about {
        tagline
        body(format: HTML)
        portrait {
          altText
          credit
          image {
            resized(
              width: 800
              version: ["main", "normalized", "larger", "large"]
            ) {
              src
              srcSet
            }
          }
        }
      }
      processVideo {
        video {
          ...ArtistStoryProcessVideo_video
        }
      }
      motionVideos {
        ...ArtistStoryMotionVideos_motionVideos
      }
    }
  }
`

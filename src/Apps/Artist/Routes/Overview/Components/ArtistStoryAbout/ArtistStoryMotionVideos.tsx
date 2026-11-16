import {
  Box,
  Column,
  FullBleed,
  GridColumns,
  ResponsiveBox,
  Stack,
  THEME,
  Text,
  Theme,
} from "@artsy/palette"
import type { AccentColors } from "Apps/Artist/Routes/Overview/Components/ArtistStoryAbout/utils/getAccentColors"
import { AppContainer } from "Apps/Components/AppContainer"
import { LoopingVimeoVideo } from "Components/LoopingVimeoVideo/LoopingVimeoVideo"
import type { ArtistStoryMotionVideos_motionVideos$key } from "__generated__/ArtistStoryMotionVideos_motionVideos.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistStoryMotionVideosProps {
  motionVideos: ArtistStoryMotionVideos_motionVideos$key
  accent: AccentColors
  onPlay?: () => void
  onPause?: () => void
}

export const ArtistStoryMotionVideos: React.FC<
  ArtistStoryMotionVideosProps
> = ({ motionVideos: motionVideosRef, accent, onPlay, onPause }) => {
  const motionVideos = useFragment(FRAGMENT, motionVideosRef)

  return (
    <Theme theme="light">
      <FullBleed
        data-testid="artist-story-motion-videos"
        bg={accent.bg}
        color={accent.color}
        py={[4, 6]}
      >
        <AppContainer px={[2, 4]}>
          <Stack gap={[4, 6]}>
            {motionVideos.map(({ internalID, caption, quote, video }) => {
              const quoteText = quote?.text.trim()
              const quoteAttribution = quote?.attribution?.trim()
              const captionText = caption?.trim()

              return (
                <GridColumns
                  key={internalID}
                  gridRowGap={4}
                  alignItems="center"
                >
                  {quoteText && (
                    <Column span={[12, 6]} textAlign="center">
                      <Text
                        as="blockquote"
                        variant={["lg-display", "xl"]}
                        color={accent.color}
                        m={0}
                      >
                        {`“${quoteText}”`}
                      </Text>

                      {quoteAttribution && (
                        <Text
                          variant={["xs", "sm"]}
                          color={accent.color}
                          mt={2}
                        >
                          {quoteAttribution}
                        </Text>
                      )}
                    </Column>
                  )}

                  <Column span={[12, 6]} start={quoteText ? undefined : [1, 4]}>
                    <Box as="figure" position="relative" m={0}>
                      <ResponsiveBox
                        aspectWidth={4}
                        aspectHeight={3}
                        maxWidth="100%"
                      >
                        <LoopingVimeoVideo
                          playerUrl={video.playerUrl}
                          aspectRatio={video.aspectRatio ?? 16 / 9}
                          title={video.title}
                          onPlay={onPlay}
                          onPause={onPause}
                        />
                      </ResponsiveBox>

                      {captionText && (
                        <Text
                          as="figcaption"
                          variant="xs"
                          color="mono0"
                          position="absolute"
                          left={2}
                          bottom={2}
                          pointerEvents="none"
                          style={{ textShadow: THEME.effects.textShadow }}
                        >
                          {captionText}
                        </Text>
                      )}
                    </Box>
                  </Column>
                </GridColumns>
              )
            })}
          </Stack>
        </AppContainer>
      </FullBleed>
    </Theme>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryMotionVideos_motionVideos on ArtistStoryVideo
  @relay(plural: true) {
    internalID
    caption
    quote {
      text
      attribution
    }
    video {
      playerUrl
      aspectRatio
      title
    }
  }
`

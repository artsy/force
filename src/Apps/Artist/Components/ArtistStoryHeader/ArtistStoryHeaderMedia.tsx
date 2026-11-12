import { Box, Image, THEME, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { LoopingVimeoVideo } from "Components/LoopingVimeoVideo/LoopingVimeoVideo"
import type { ArtistStoryHeaderMedia_story$key } from "__generated__/ArtistStoryHeaderMedia_story.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

interface ArtistStoryHeaderMediaProps {
  story: ArtistStoryHeaderMedia_story$key
  onPlayVideo?: () => void
  onPauseVideo?: () => void
}

export const ArtistStoryHeaderMedia: React.FC<ArtistStoryHeaderMediaProps> = ({
  story: storyRef,
  onPlayVideo,
  onPauseVideo,
}) => {
  const story = useFragment(FRAGMENT, storyRef)
  const [hasVideoFailed, setHasVideoFailed] = useState(false)
  const { headerVideo, headerImage } = story
  const image = headerImage?.image?.resized

  // A broken video gives way to the Header Image when there is one.
  if (headerVideo && !(hasVideoFailed && image)) {
    const { video } = headerVideo

    return (
      <LoopingVimeoVideo
        playerUrl={video.playerUrl}
        aspectRatio={video.aspectRatio ?? 16 / 9}
        title={video.title}
        posterUrl={image?.src}
        onPlay={onPlayVideo}
        onPause={onPauseVideo}
        onError={() => setHasVideoFailed(true)}
      />
    )
  }

  if (!headerImage || !image) {
    return null
  }

  return (
    <>
      <Image
        src={image.src}
        srcSet={image.srcSet}
        alt={headerImage.altText}
        width="100%"
        height="100%"
        fetchPriority="high"
        style={{ objectFit: "cover" }}
      />

      {headerImage.credit && (
        <Box position="absolute" top={0} left={0} pt={2}>
          <AppContainer px={[2, 4]}>
            <Text
              variant="xs"
              color="rgba(255, 255, 255, 0.7)"
              style={{ textShadow: THEME.effects.textShadow }}
            >
              {headerImage.credit}
            </Text>
          </AppContainer>
        </Box>
      )}
    </>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryHeaderMedia_story on ArtistStory {
    headerVideo {
      video {
        playerUrl
        aspectRatio
        title
      }
    }
    headerImage {
      altText
      credit
      image {
        resized(
          width: 1600
          version: ["main", "normalized", "larger", "large"]
        ) {
          src
          srcSet
        }
      }
    }
  }
`

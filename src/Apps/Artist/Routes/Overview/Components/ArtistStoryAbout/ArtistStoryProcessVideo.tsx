import {
  Box,
  Clickable,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
  Theme,
} from "@artsy/palette"
import {
  getAutoplayUrl,
  getVideoPosterUrl,
  isYouTubeUrl,
} from "Apps/Artist/Routes/Overview/Components/ArtistStoryAbout/utils/video"
import { useCookieConsentManager } from "Components/CookieConsentManager/CookieConsentManagerContext"
import { PlayIcon } from "Components/PlayIcon"
import type { ArtistStoryProcessVideo_video$key } from "__generated__/ArtistStoryProcessVideo_video.graphql"
import { useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface ArtistStoryProcessVideoProps {
  video: ArtistStoryProcessVideo_video$key
  onPlay?: () => void
}

/**
 * The player waits for a click on our own button: it runs in a cross-origin
 * iframe, so that click is the only reliable play signal for tracking.
 */
export const ArtistStoryProcessVideo: React.FC<
  ArtistStoryProcessVideoProps
> = ({ video: videoRef, onPlay }) => {
  const video = useFragment(FRAGMENT, videoRef)
  const { isDestinationAllowed, openConsentManager, ready } =
    useCookieConsentManager()
  const [isPlaying, setIsPlaying] = useState(false)
  const [posterUrl, setPosterUrl] = useState<string | null>(null)

  const { playerUrl } = video
  const src = getAutoplayUrl(playerUrl)
  // YouTube sets targeting cookies, so it waits for consent like the article
  // and feature page videos do.
  const isBlocked = isYouTubeUrl(playerUrl) && !isDestinationAllowed("YouTube")

  useEffect(() => {
    if (isBlocked) {
      return
    }

    let isCancelled = false

    getVideoPosterUrl(playerUrl)
      .then(url => {
        if (!isCancelled) setPosterUrl(url)
      })
      .catch(error => {
        console.error(error)
      })

    return () => {
      isCancelled = true
    }
  }, [isBlocked, playerUrl])

  if (!src) {
    return null
  }

  const handlePlay = () => {
    setIsPlaying(true)
    onPlay?.()
  }

  return (
    <>
      <Text as="h3" variant="lg-display">
        Process
      </Text>

      <Spacer y={2} />

      {/* Light theme in every mode, so the box stays black and the play button
          white. */}
      <Theme theme="light">
        <ResponsiveBox
          aspectWidth={16}
          aspectHeight={9}
          maxWidth="100%"
          bg="mono100"
          data-testid="artist-story-process-video"
        >
          {isBlocked && ready && (
            <Clickable
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              color="mono30"
              onClick={openConsentManager}
            >
              <Text variant="xs">Manage Cookies</Text>
            </Clickable>
          )}

          {!isBlocked && isPlaying && (
            <Box
              as="iframe"
              src={src}
              title={video.title}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              display="block"
              width="100%"
              height="100%"
              border={0}
            />
          )}

          {!isBlocked && !isPlaying && (
            <Clickable
              aria-label="Play Process Video"
              onClick={handlePlay}
              position="relative"
              display="block"
              width="100%"
              height="100%"
            >
              {posterUrl && (
                <Image
                  src={posterUrl}
                  alt=""
                  width="100%"
                  height="100%"
                  lazyLoad
                  style={{ objectFit: "cover" }}
                />
              )}

              <Box
                position="absolute"
                top="50%"
                left="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={[64, 88]}
                height={[64, 88]}
                borderRadius="50%"
                bg="mono0"
                color="mono100"
                style={{ transform: "translate(-50%, -50%)" }}
                aria-hidden="true"
              >
                <PlayIcon size={24} />
              </Box>
            </Clickable>
          )}
        </ResponsiveBox>
      </Theme>
    </>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryProcessVideo_video on Video {
    playerUrl
    title
  }
`

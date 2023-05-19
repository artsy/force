import { ActionType, ClickedPlayVideo, OwnerType } from "@artsy/cohesion"
import { ViewedVideo } from "@artsy/cohesion/dist/Schema/Events/Video"
import { BoxProps, Flex, ResponsiveBox } from "@artsy/palette"
import { MAX_DIMENSION } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkImageBrowser"
import { FC, useEffect, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ArtworkVideoPlayer_artwork$data } from "__generated__/ArtworkVideoPlayer_artwork.graphql"

interface ArtworkVideoPlayerProps extends BoxProps {
  activeIndex: number
  artwork: ArtworkVideoPlayer_artwork$data
  maxHeight: number
}

const ArtworkVideoPlayer: FC<ArtworkVideoPlayerProps> = ({
  activeIndex,
  artwork: { internalID, figures, slug },
  maxHeight,
  ...rest
}) => {
  const [hasTrackedPlay, setHasTrackedPlay] = useState(false)
  const { trackEvent } = useTracking()

  const activeVideo = figures[activeIndex]

  const trackViewedVideo = () => {
    const event: ViewedVideo = {
      action: ActionType.viewedVideo,
      context_screen_owner_id: internalID,
      context_screen_owner_slug: slug,
      context_screen_owner_type: OwnerType.artwork,
    }

    trackEvent(event)
  }

  const trackClickedPlayVideo = () => {
    if (hasTrackedPlay) {
      return
    }

    // Hack to detect clicks within iFrames
    setTimeout(() => {
      if (document.activeElement === document.querySelector("#vimeoPlayer")) {
        setHasTrackedPlay(true)

        const event: ClickedPlayVideo = {
          action: ActionType.clickedPlayVideo,
          context_owner_id: internalID,
          context_owner_slug: slug,
          context_owner_type: OwnerType.artwork,
        }

        trackEvent(event)
      }
    }, 0)
  }

  useEffect(() => {
    window.addEventListener("blur", trackClickedPlayVideo)

    trackViewedVideo()

    return () => {
      window.removeEventListener("blur", trackClickedPlayVideo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!activeVideo || activeVideo.__typename === "%other") {
    return null
  }

  return (
    <Flex
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={[null, null, maxHeight]}
      width="100%"
      {...rest}
    >
      <ResponsiveBox
        maxWidth={MAX_DIMENSION}
        maxHeight={MAX_DIMENSION}
        aspectWidth={activeVideo.videoWidth}
        aspectHeight={activeVideo.videoHeight}
        // TODO: Uncomment this when dimensions issue is investigated a bit more
        // bg="black10"
      >
        <iframe
          src={activeVideo.playerUrl}
          frameBorder={0}
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          title="Video player"
          width="100%"
          height="100%"
          id="vimeoPlayer"
          data-testid="vimeoPlayer"
        />
      </ResponsiveBox>
    </Flex>
  )
}

export const ArtworkVideoPlayerFragmentContainer = createFragmentContainer(
  ArtworkVideoPlayer,
  {
    artwork: graphql`
      fragment ArtworkVideoPlayer_artwork on Artwork
        @argumentDefinitions(
          includeAllImages: { type: "Boolean", defaultValue: false }
        ) {
        internalID
        slug
        figures(includeAll: $includeAllImages) {
          ... on Video {
            __typename
            playerUrl
            # Fields need to be aliased to prevent conflicting types
            videoWidth: width
            videoHeight: height
          }
        }
      }
    `,
  }
)

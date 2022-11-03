import React, { FC } from "react"
import { BoxProps, Flex, ResponsiveBox } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkVideoPlayer_artwork$data } from "__generated__/ArtworkVideoPlayer_artwork.graphql"
import { MAX_DIMENSION } from "Apps/Artwork/Components/ArtworkImageBrowser"

interface ArtworkVideoPlayerProps extends BoxProps {
  activeIndex: number
  artwork: ArtworkVideoPlayer_artwork$data
  maxHeight: number
}

const ArtworkVideoPlayer: FC<ArtworkVideoPlayerProps> = ({
  activeIndex,
  artwork: { figures },
  maxHeight,
  ...rest
}) => {
  const activeVideo = figures[activeIndex]

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
      px={[
        0,
        // FIXME: Pad to avoid overlapping with the next/prev buttons
        // We can just show/hide the UI when hovering over the video instead
        70,
      ]}
      {...rest}
    >
      <ResponsiveBox
        maxWidth={MAX_DIMENSION}
        maxHeight={MAX_DIMENSION}
        aspectWidth={activeVideo.videoWidth}
        aspectHeight={activeVideo.videoHeight}
        bg="black10"
      >
        <iframe
          src={activeVideo.url}
          frameBorder={0}
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          title="Video player"
          width="100%"
          height="100%"
        />
      </ResponsiveBox>
    </Flex>
  )
}

const ArtworkVideoPlayerFragmentContainer = createFragmentContainer(
  ArtworkVideoPlayer,
  {
    artwork: graphql`
      fragment ArtworkVideoPlayer_artwork on Artwork {
        figures {
          ... on Video {
            __typename
            url
            # Fields need to be aliased to prevent conflicting types
            videoWidth: width
            videoHeight: height
          }
        }
      }
    `,
  }
)

export {
  ArtworkVideoPlayer,
  ArtworkVideoPlayerFragmentContainer,
  ArtworkVideoPlayerProps,
}

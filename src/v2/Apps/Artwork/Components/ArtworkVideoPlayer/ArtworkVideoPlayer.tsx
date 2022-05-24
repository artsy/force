import React, { FC } from "react"
import { BoxProps, Flex, ResponsiveBox } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkVideoPlayer_artwork } from "v2/__generated__/ArtworkVideoPlayer_artwork.graphql"

interface ArtworkVideoPlayerProps extends BoxProps {
  activeIndex: number
  artwork: ArtworkVideoPlayer_artwork
  maxHeight: number
}

const ArtworkVideoPlayer: FC<ArtworkVideoPlayerProps> = ({
  activeIndex,
  artwork: { figures },
  maxHeight,
  ...rest
}) => {
  if (!figures) {
    return null
  }

  const activeVideo = figures[activeIndex]

  if (!activeVideo || activeVideo.type === "%other") {
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
        mx={[0, "70px"]}
        maxWidth="100%"
        aspectWidth={activeVideo.width}
        aspectHeight={activeVideo.height}
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
            type: __typename
            url
            height
            width
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

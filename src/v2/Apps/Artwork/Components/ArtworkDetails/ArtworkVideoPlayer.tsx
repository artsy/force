import React, { FC } from "react"
import { Box, ResponsiveBox } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkVideoPlayer_artwork } from "v2/__generated__/ArtworkVideoPlayer_artwork.graphql"

interface ArtworkVideoPlayerProps {
  artwork: ArtworkVideoPlayer_artwork
}

const ArtworkVideoPlayer: FC<ArtworkVideoPlayerProps> = ({
  artwork: { video },
}) => {
  if (!video) {
    return null
  }

  return (
    <Box
      my={2}
      width="100%"
      minHeight={800}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <ResponsiveBox
        bg="black10"
        mx={[0, 2]}
        // @ts-ignore
        maxWidth={video.width ?? "100%"}
        aspectWidth={video.width!}
        aspectHeight={video.height!}
      >
        <iframe
          src={video.src!}
          frameBorder="0"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          title="vimeo-player"
          style={{ width: "100%", height: "100%" }}
        ></iframe>
      </ResponsiveBox>
    </Box>
  )
}

const ArtworkVideoPlayerFragmentContainer = createFragmentContainer(
  ArtworkVideoPlayer,
  {
    artwork: graphql`
      fragment ArtworkVideoPlayer_artwork on Artwork {
        video {
          src
          height
          width
        }
      }
    `,
  }
)

export { ArtworkVideoPlayerFragmentContainer }

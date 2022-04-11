import React, { FC } from "react"
import { Box } from "@artsy/palette"
import { Video } from "../ArtworkImageBrowser/ArtworkImageBrowserLarge"

interface ArtworkVideoPlayerProps {
  video: Video
}

const ArtworkVideoPlayer: FC<ArtworkVideoPlayerProps> = ({ video }) => {
  return (
    <Box>
      Artwork Video Player
      {
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video height={video.height!} width={video.width!}>
          <source src={video.src!} type="video/mp4" />
        </video>
      }
    </Box>
  )
}

export { ArtworkVideoPlayer }

import React, { FC } from "react"
import { Box, ResponsiveBox } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkVideoPlayer_artwork } from "v2/__generated__/ArtworkVideoPlayer_artwork.graphql"
import styled from "styled-components"

interface ArtworkVideoPlayerProps {
  activeIndex: number
  artwork: ArtworkVideoPlayer_artwork
  small?: boolean
}

const ArtworkVideoPlayer: FC<ArtworkVideoPlayerProps> = ({
  activeIndex,
  artwork: { figures },
  small,
}) => {
  if (!figures) {
    return null
  }

  const activeVideo = figures[activeIndex]

  if (!activeVideo || activeVideo.type === "%other") {
    return null
  }

  return (
    <Box
      my={4}
      width="100%"
      // This minHeight works for the 10 POC video items
      // Should be replaced with a dynamic value in the future
      minHeight={small ? "inherit" : 800}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Casette
        bg="black10"
        mx={[0, 4]}
        px={[0, 2]}
        // @ts-ignore
        maxWidth={"100%"}
        aspectWidth={activeVideo.width}
        aspectHeight={activeVideo.height}
      >
        <iframe
          src={activeVideo.url}
          frameBorder="0"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          title="vimeo-player"
          style={{ width: "100%", height: "100%" }}
        ></iframe>
      </Casette>
    </Box>
  )
}

const Casette = styled(ResponsiveBox)`
  background: transparent;
`

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

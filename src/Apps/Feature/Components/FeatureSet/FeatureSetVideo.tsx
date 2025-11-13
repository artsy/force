import { Box, ResponsiveBox, Text } from "@artsy/palette"
import type { FeatureSetVideo_video$data } from "__generated__/FeatureSetVideo_video.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface FeatureSetVideoProps {
  video: FeatureSetVideo_video$data
}

export const FeatureSetVideo: React.FC<
  React.PropsWithChildren<FeatureSetVideoProps>
> = ({ video }) => {
  const { playerUrl, width, height, description, videoTitle } = video

  if (!playerUrl || !width || !height) {
    return null
  }

  return (
    <>
      <ResponsiveBox aspectWidth={width} aspectHeight={height} maxWidth="100%">
        <iframe
          src={playerUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          title={videoTitle ?? "Video"}
          style={{ display: "block" }}
        />
      </ResponsiveBox>

      {description && (
        <Box px={4} mt={2}>
          <Text
            variant="sm"
            color="mono100"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </Box>
      )}
    </>
  )
}

export const FeatureSetVideoFragmentContainer = createFragmentContainer(
  FeatureSetVideo,
  {
    video: graphql`
      fragment FeatureSetVideo_video on Video {
        id
        playerUrl
        width
        height
        videoTitle: title
        description(format: HTML)
      }
    `,
  }
)

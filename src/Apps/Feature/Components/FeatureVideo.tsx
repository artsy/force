import { Clickable, ResponsiveBox, Text } from "@artsy/palette"
import { useCookieConsentManager } from "Components/CookieConsentManager/CookieConsentManagerContext"
import type { FeatureVideo_video$data } from "__generated__/FeatureVideo_video.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface FeatureVideoProps {
  video: FeatureVideo_video$data
}

const FeatureVideo: FC<React.PropsWithChildren<FeatureVideoProps>> = ({
  video,
}) => {
  const { isDestinationAllowed, openConsentManager, ready } =
    useCookieConsentManager()

  if (!video.embed) return null

  return (
    <ResponsiveBox
      aspectWidth={16}
      aspectHeight={9}
      maxWidth="100%"
      bg="mono10"
      data-testid="FeatureVideo"
    >
      {ready && (
        <>
          {isDestinationAllowed("YouTube") ? (
            <Video
              dangerouslySetInnerHTML={{
                __html: video.embed,
              }}
            />
          ) : (
            <Clickable
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              color="mono60"
              onClick={openConsentManager}
            >
              <Text variant="xs">Manage Cookies</Text>
            </Clickable>
          )}
        </>
      )}
    </ResponsiveBox>
  )
}

export const FeatureVideoFragmentContainer = createFragmentContainer(
  FeatureVideo,
  {
    video: graphql`
      fragment FeatureVideo_video on FeatureVideo {
        embed(autoPlay: true)
      }
    `,
  },
)

const Video = styled.div`
  width: 100%;
  height: 100%;

  > iframe {
    display: block;
    width: 100%;
    height: 100%;
  }
`

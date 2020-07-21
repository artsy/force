import moment from "moment"
import React from "react"
import styled from "styled-components"
import { unica } from "@artsy/reaction/dist/Assets/Fonts"
import { Video } from "@artsy/reaction/dist/Components/Publishing"
import { Box, Flex, Sans, media } from "@artsy/palette"

interface SectionVideoProps {
  section: any
}

export const SectionVideo: React.SFC<SectionVideoProps> = props => {
  const { section } = props

  return (
    <SectionVideoContainer py={[4, 4, 4, 5]}>
      {renderVideo(section)}
    </SectionVideoContainer>
  )
}

function renderVideo(section) {
  const videoSection = {
    url: section.video_url,
    cover_image_url: section.cover_image_url,
  }

  if (section.published && videoSection.url) {
    return (
      <Video
        section={videoSection}
        trackingData={{
          type: "play video",
          label: section.featuring,
        }}
      />
    )
  } else {
    return (
      <VideoPreview backgroundSrc={videoSection.cover_image_url || ""}>
        <ReleaseDate
          justify-content="flex-start"
          align-items="flex-end"
          height="100%"
          py={[1, 1, 1, 15]}
          px={[2, 2, 2, 3]}
        >
          <Sans size={["6", "6", "6", "8"]} color="white">
            Available {moment(section.release_date).format("MMM. D") || "Soon"}
          </Sans>
        </ReleaseDate>
      </VideoPreview>
    )
  }
}

const SectionVideoContainer = styled(Box)`
  .VideoCover {
    justify-content: flex-start;
    align-items: flex-end;
    padding: 15px 30px;
  }

  .PlayButton {
    background: none;
    ${unica("s80")};
    width: auto;
    height: auto;

    &:after {
      color: white;
      content: "Play";
    }

    &__PlayButtonCaret {
      border-left: 45px solid white;
      border-top: 35px solid transparent;
      border-bottom: 35px solid transparent;
      margin-right: 20px;
    }
  }

  ${media.sm`
    .PlayButton {
      &:after {
        ${unica("s40")};
      }
      &__PlayButtonCaret {
        border-left: 30px solid white;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        margin-right 10px;
      }
    }
    .VideoCover {
      padding: 10px 20px;
    }
  `};
`

const VideoPreview = styled.div<{ backgroundSrc: string }>`
  height: 59vw;
  max-height: 668px;
  position: relative;
  background-image: ${props => `url(${props.backgroundSrc})`};
  background-color: black;
  background-position: 50%;
  background-size: cover;
  filter: grayscale(100%);
`

const ReleaseDate = styled(Flex)`
  background: rgba(0, 0, 0, 0.5);
`

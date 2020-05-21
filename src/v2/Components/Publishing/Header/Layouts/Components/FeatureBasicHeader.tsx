import { space } from "@artsy/palette"
import { pMedia } from "v2/Components/Helpers"
import { BylineContainer } from "v2/Components/Publishing/Byline/Byline"
import { ShareContainer } from "v2/Components/Publishing/Byline/Share"
import {
  CoverImage,
  getPlayerUrl,
  IFrame,
  Video,
  VIDEO_RATIO,
} from "v2/Components/Publishing/Sections/Video"
import React from "react"
import track from "react-tracking"
import styled from "styled-components"
import { EditImage, FeatureHeaderProps } from "../FeatureHeader"
import {
  Deck,
  FeatureInnerContent,
  SubContentContainer,
  Title,
} from "./FeatureInnerContent"

interface State {
  isPlaying: boolean
}

@track()
export class FeatureBasicHeader extends React.Component<
FeatureHeaderProps,
State
> {
  constructor(props: FeatureHeaderProps) {
    super(props)
    this.trackVideoPlay = this.trackVideoPlay.bind(this)
  }

  @track(props => ({
    action: "Click",
    label: "Basic feature video click",
    impression_type: "sa_basic_feature_video",
    context_type: "article_fixed",
  }))
  trackVideoPlay() {
    // noop
  }

  render() {
    const {
      article: { hero_section },
      editImage,
    } = this.props
    const { url } = hero_section
    const hasVideo = getPlayerUrl({ hostname: url }) ? true : false

    return (
      <BasicHeaderContainer hasVideo={hasVideo}>
        {editImage && <EditImage>{editImage}</EditImage>}
        {hasVideo && (
          <VideoContainer onClick={this.trackVideoPlay}>
            <Video section={hero_section} layout="feature" />
          </VideoContainer>
        )}
        <FeatureInnerContent {...this.props} />
      </BasicHeaderContainer>
    )
  }
}

export const VideoContainer = styled.div`
  width: 100%;
`

export const BasicHeaderContainer = styled.div.attrs<{ hasVideo: boolean }>({})`
  text-align: center;
  margin-top: ${props => (props.hasVideo ? "30" : "70")}px;
  padding: ${space(2)}px;
  position: relative;

  ${CoverImage},
  ${IFrame} {
    width: 100%;
    @media screen and (min-width: 1250px) {
      height: ${1100 * VIDEO_RATIO}px;
    }
    ${pMedia.xl`
      height: ${1100 * VIDEO_RATIO}px;
    `}
    ${pMedia.lg`
      height: ${950 * VIDEO_RATIO}px;
    `}
    ${pMedia.md`
      height: ${800 * VIDEO_RATIO}px;
    `}
    ${pMedia.sm`
      height: ${620 * VIDEO_RATIO}px;
    `}
    ${pMedia.xs`
      height: ${340 * VIDEO_RATIO}px;
      margin-top: 25px;
      margin-bottom: -25px;
    `}
  }

  ${Title} {
    max-width: 1250px;
    margin: 0 auto ${space(3)}px auto;
    ${pMedia.xs`
      margin-bottom: 15px;
    `}
  }

  ${SubContentContainer} {
    max-width: 680px;
    flex-direction: column;
    margin: auto;
    align-items: center;
  }

  ${Deck} {
    padding-right: 0;
    margin-right: 0;
    padding-bottom: ${space(1)}px;
    max-width: 100%;
  }

  ${BylineContainer} {
    justify-content: center;

    div {
      padding-right: ${space(3)}px;
    }

    ${ShareContainer} {
      padding-right: 0;
    }

    ${pMedia.xs`
      flex-direction: column;
      align-items: center;

      div {
        padding-right: 0;
        margin-right: 0;
      }

      ${ShareContainer} {
        margin-top: ${space(1)}px;
      }
    `}
  }
`

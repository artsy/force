import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"

interface EmbedProps {
  section: any
}

export const Embed: React.SFC<EmbedProps> = props => {
  const { url, height, mobile_height } = props.section
  return (
    <IFrame
      src={url}
      scrolling="no"
      frameBorder="0"
      height={height}
      mobileHeight={mobile_height}
    />
  )
}

interface FrameProps extends React.HTMLProps<HTMLIFrameElement> {
  mobileHeight?: number
  height: number
}

const iframe: StyledFunction<FrameProps> = styled.iframe

const IFrame = iframe`
  width: 100%;
  height: ${props => props.height + "px"};
  ${props => pMedia.sm`
    height: ${props.mobileHeight}px;
    width: 100%;
  `}
`

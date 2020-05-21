import React from "react"
import styled, { StyledFunction } from "styled-components"

interface Props {
  backgroundColor?: string
  backgroundUrl?: string
}

export const FixedBackground: React.SFC<Props> = props => {
  const { backgroundColor, backgroundUrl } = props

  if (backgroundUrl && !backgroundUrl.includes(".mp4")) {
    return (
      <FixedBackgroundContainer backgroundColor={backgroundColor}>
        <BackgroundImage backgroundUrl={backgroundUrl} />
        <BackgroundGradient />
      </FixedBackgroundContainer>
    )
  }
  return <FixedBackgroundContainer backgroundColor={backgroundColor} />
}

const Div: StyledFunction<Props & React.HTMLProps<HTMLDivElement>> = styled.div

export const FixedBackgroundContainer = Div`
  background-color: ${props => props.backgroundColor};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`
const BackgroundImage = Div`
  background-image: ${props => `url(${props.backgroundUrl})`};
  background-size: cover;
  background-position: 50%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
`

const BackgroundGradient = Div`
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6));
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`

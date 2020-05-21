import React from "react"
import styled, { StyledFunction } from "styled-components"

interface VideoControlsProps extends React.HTMLProps<HTMLDivElement> {
  mini?: boolean
}

export const VideoControls: React.SFC<VideoControlsProps> = props => {
  const { mini } = props

  return (
    <PlayButton mini={mini} className="PlayButton">
      <PlayButtonCaret className="PlayButton__PlayButtonCaret" mini={mini} />
    </PlayButton>
  )
}

const Div: StyledFunction<VideoControlsProps &
  React.HTMLProps<HTMLDivElement>> = styled.div

const PlayButtonCaret = Div`
  color: black;
  border-top: ${props => (props.mini ? "13" : "20")}px solid transparent;
  border-bottom: ${props => (props.mini ? "13" : "20")}px solid transparent;
  border-left: ${props => (props.mini ? "20" : "30")}px solid black;
`

const PlayButton = Div`
  background: white;
  width: ${props => (props.mini ? "50px" : "70px")};
  height: ${props => (props.mini ? "50px" : "70px")};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  cursor: pointer;
  border: 0;
  outline: 0;
`

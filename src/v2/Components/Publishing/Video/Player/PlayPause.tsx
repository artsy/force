import React from "react"
import styled from "styled-components"
import { IconVideoPause } from "../../Icon/IconVideoPause"
import { IconVideoPlay } from "../../Icon/IconVideoPlay"

interface Props extends React.HTMLProps<HTMLSpanElement> {
  isPlaying: boolean
  togglePlay: () => void
}

export class PlayPause extends React.PureComponent<Props, null> {
  render() {
    const { isPlaying, togglePlay } = this.props

    return (
      <PlayPauseContainer onClick={togglePlay}>
        {isPlaying ? (
          <IconVideoPause color="white" />
        ) : (
          <IconVideoPlay color="white" />
        )}
      </PlayPauseContainer>
    )
  }
}

const PlayPauseContainer = styled.div`
  height: 28px;
  width: 28px;
  cursor: pointer;
`

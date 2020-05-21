import React, { Component } from "react"
import styled, { StyledFunction } from "styled-components"

interface Props extends React.HTMLProps<HTMLDivElement> {
  duration: number
  currentTime: number
  isPlaying: boolean
  pause: () => void
  play: () => void
  seekTo: (v) => void
}

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  duration: number
  currentTime: number
}

interface State {
  isScrubbing: boolean
  isPlayingOnMouseDown: boolean
}

export class Scrubber extends Component<Props, State> {
  state = {
    isScrubbing: false,
    isPlayingOnMouseDown: false,
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.currentTime !== nextProps.currentTime ||
      this.props.duration !== nextProps.duration
    )
  }

  handleMouseDown = () => {
    this.setState({
      isPlayingOnMouseDown: this.props.isPlaying,
    })
    this.props.pause()
  }

  handleMouseUp = e => {
    if (!this.state.isScrubbing) {
      this.props.seekTo(e.target.value)
    }
    if (this.state.isPlayingOnMouseDown) {
      this.props.play()
    }
    this.setState({ isScrubbing: false })
  }

  handleChange = e => {
    this.setState({ isScrubbing: true })
    this.props.seekTo(e.target.value)
  }

  render() {
    const { duration, currentTime } = this.props

    return (
      <ScrubberInput
        type="range"
        step="any"
        max={duration && duration.toFixed(4)}
        value={currentTime}
        duration={duration}
        currentTime={currentTime}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onChange={this.handleChange}
      />
    )
  }
}

const Input: StyledFunction<InputProps & React.HTMLProps<HTMLInputElement>> =
  styled.input

const ScrubberInput = Input`
  width: 100%;
  background-size: ${props => (props.currentTime * 100) / props.duration}% 100%;
  height: 18px;
  margin-top: 15px;
  appearance: none;
  background: transparent;
  ::-webkit-slider-thumb {
    appearance: none;
  }
  ::-ms-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: transparent;
    border: 0px;
    color: transparent;
  }
  ::-webkit-slider-runnable-track {
    height: 2px;
    cursor: pointer;
    animate: 0.2s;
    background-color: white;
    border: 0px;
  }
  ::-moz-range-track {
    height: 2px;
    cursor: pointer;
    animate: 0.2s;
    background-color: white;
    border: 0px;
  }
  ::-webkit-slider-thumb {
    color: white;
    border: 0px;
    height: 12px;
    width: 12px;
    border-radius: 50px;
    background: white;
    cursor: pointer;
    margin-top: -5px;
    appearance: none;
  }
  ::-moz-range-thumb {
    color: white;
    box-shadow: 0px 0px 0px white;
    border: 0px;
    height: 12px;
    width: 12px;
    border-radius: 50px;
    background: white;
    cursor: pointer;
    margin-top: -5px;
    appearance: none;
  }
  ::-ms-fill-lower {
    background: white;
    border: 0px;
  }
  ::-ms-fill-upper {
    background: white;
    border: 0px;
  }
  ::-ms-thumb {
    color: white;
    box-shadow: 0px 0px 0px white;
    border: 0px;
    height: 12px;
    width: 12px;
    border-radius: 50px;
    background: white;
    cursor: pointer;
    margin-top: -5px;
    appearance: none;
  }
  &:focus::-webkit-slider-runnable-track {
    background: white;
  }
  &:focus {
    outline: none;
  }
`

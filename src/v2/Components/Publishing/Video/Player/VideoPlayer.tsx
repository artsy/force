import { memoize } from "lodash"
import React, { Component } from "react"
import track, { TrackingProp } from "react-tracking"
// @ts-ignore
import styled, { StyledComponentClass, StyledFunction } from "styled-components"
import {
  addFSEventListener,
  exitFullscreen,
  fullscreenEnabled,
  isFullscreen,
  removeFSEventListener,
  requestFullscreen,
} from "./FullscreenHelpers"
import { VideoControls, VideoControlsContainer } from "./VideoControls"

export interface VideoPlayerProps extends React.HTMLProps<HTMLDivElement> {
  url?: string
  title?: string
  notifyPlayToggle?: (e) => void
  forcePlay?: boolean
  tracking?: TrackingProp
}

export interface VideoPlayerState {
  isMuted: boolean
  isPlaying: boolean
  currentTime: number
  duration: number
  idleTime: number
  showControls: boolean
}

export interface DivProps {
  showControls: boolean
}

@track()
export class VideoPlayer extends Component<VideoPlayerProps, VideoPlayerState> {
  public video: HTMLVideoElement
  public videoPlayer: HTMLDivElement
  public timer

  state = {
    isMuted: false,
    isPlaying: this.props.forcePlay,
    currentTime: 0,
    duration: 0,
    idleTime: 0,
    showControls: true,
  }

  constructor(props) {
    super(props)
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
  }

  componentDidMount() {
    if (this.video) {
      if (fullscreenEnabled()) {
        addFSEventListener(this.video)
      }

      this.video.addEventListener("timeupdate", this.updateTime)
      this.video.addEventListener("loadedmetadata", this.setDuration)

      document.addEventListener("mousemove", this.resetTimer)
      document.addEventListener("keypress", this.resetTimer)
      document.addEventListener("touchstart", this.resetTimer)
      this.timer = setInterval(this.incrementTimer, 1000)
    }
  }

  componentWillUnmount() {
    if (fullscreenEnabled()) {
      removeFSEventListener(this.video)
    }

    this.video.removeEventListener("timeupdate", this.updateTime)

    document.removeEventListener("mousemove", this.resetTimer)
    document.removeEventListener("keypress", this.resetTimer)
    document.removeEventListener("touchstart", this.resetTimer)
    clearInterval(this.timer)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.forcePlay) {
      this.forcePlay()
    }
  }

  resetTimer = () => {
    this.setState({
      showControls: true,
      idleTime: 0,
    })
  }

  incrementTimer = () => {
    const newIdleTime = this.state.idleTime + 1

    this.setState({
      idleTime: newIdleTime,
      showControls: newIdleTime > 3 ? false : true,
    })
  }

  setDuration = e => {
    this.setState({
      duration: e.target.duration,
    })
  }

  updateTime = e => {
    this.trackProgress()
    this.setState({
      currentTime: e.target.currentTime,
    })
  }

  togglePlay = () => {
    if (this.state.isPlaying) {
      this.video.pause()
    } else {
      this.video.play()
    }

    if (this.props.notifyPlayToggle) {
      this.props.notifyPlayToggle(!this.state.isPlaying)
    }

    this.setState({
      isPlaying: !this.state.isPlaying,
    })
  }

  toggleMute = () => {
    this.setState({
      isMuted: !this.state.isMuted,
    })
  }

  forcePlay = () => {
    this.video.play()
    this.setState({
      isPlaying: true,
    })
  }

  @track(props => {
    return {
      action: "Click",
      label: "Fullscreen video",
    }
  })
  toggleFullscreen() {
    if (fullscreenEnabled()) {
      if (isFullscreen()) {
        exitFullscreen()
      } else {
        requestFullscreen(this.videoPlayer)
      }
    }
  }

  seekTo = value => {
    this.video.currentTime = value
    this.setState({
      currentTime: value,
    })
  }

  pause = () => {
    this.video.pause()
    this.setState({
      isPlaying: false,
    })
  }

  play = () => {
    this.video.play()
    this.setState({
      isPlaying: true,
    })
  }

  trackProgress = () => {
    const secondsComplete = Math.floor(this.video.currentTime)
    const percentComplete = Math.floor(
      (this.video.currentTime / this.video.duration) * 100
    )
    const percentCompleteInterval = Math.floor(percentComplete / 25) * 25

    // Track 25% duration intervals
    if (percentCompleteInterval > 0) {
      this.trackDuration(percentCompleteInterval)
    }

    // Track 3 & 10 seconds
    if (secondsComplete === 3 || secondsComplete === 10) {
      this.trackSeconds(secondsComplete)
    }
  }

  trackDuration = memoize(percentComplete => {
    this.props.tracking.trackEvent({
      action: "Video duration",
      label: "Video duration",
      percent_complete: percentComplete,
    })
  })

  trackSeconds = memoize(secondsComplete => {
    this.props.tracking.trackEvent({
      action: "Video seconds",
      label: "Video seconds",
      seconds_complete: secondsComplete,
    })
  })

  render() {
    const { url, title } = this.props

    return (
      <VideoContainer
        ref={container => (this.videoPlayer = container)}
        showControls={this.state.showControls}
      >
        <video
          playsInline
          src={url}
          ref={video => (this.video = video)}
          muted={this.state.isMuted}
        />
        <VideoControlsParent>
          <VideoControls
            title={title}
            duration={this.state.duration}
            currentTime={this.state.currentTime}
            toggleFullscreen={this.toggleFullscreen}
            toggleMute={this.toggleMute}
            togglePlay={this.togglePlay}
            pause={this.pause}
            play={this.play}
            seekTo={this.seekTo}
            isMuted={this.state.isMuted}
            isPlaying={this.state.isPlaying}
          />
        </VideoControlsParent>
      </VideoContainer>
    )
  }
}

const VideoControlsParent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`

const Div: StyledFunction<DivProps & React.HTMLProps<HTMLDivElement>> =
  styled.div
export const VideoContainer = Div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: black;
  video {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  ${VideoControlsContainer} {
    opacity: ${props => (props.showControls ? "1" : "0")};
  }
`

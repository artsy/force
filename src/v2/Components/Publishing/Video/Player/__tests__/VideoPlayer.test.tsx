import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import track from "react-tracking"
import * as FullscreenHelpers from "../FullscreenHelpers"
import { VideoPlayer } from "../VideoPlayer"

jest.useFakeTimers()

describe("VideoPlayer", () => {
  const trackEvent = jest.fn()

  const getWrapper = () => {
    return mount<VideoPlayer>(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
        tracking={{
          trackEvent,
          getTrackingData: jest.fn(),
        }}
      />
    )
  }

  beforeEach(() => {
    ;(FullscreenHelpers as any).addFSEventListener = jest.fn()
    ;(FullscreenHelpers as any).requestFullscreen = jest.fn()
    ;(FullscreenHelpers as any).exitFullscreen = jest.fn()
    ;(document as any).fullscreenEnabled = true
  })

  it("matches the snapshot", () => {
    const videoPlayer = renderer
      .create(
        <VideoPlayer
          url="http://files.artsy.net/videos/placeholder.mp4"
          title="The Video Title"
        />
      )
      .toJSON()
    expect(videoPlayer).toMatchSnapshot()
  })

  describe("Player controls", () => {
    it("#setDuration", () => {
      const videoPlayer = getWrapper()
      videoPlayer.instance().setDuration({
        target: {
          duration: 10000,
        },
      })
      expect(videoPlayer.state("duration")).toBe(10000)
    })

    it("#updateTime", () => {
      const videoPlayer = getWrapper()
      videoPlayer.instance().updateTime({
        target: {
          currentTime: 20000,
        },
      })
      expect(videoPlayer.state("currentTime")).toBe(20000)
    })

    it("#togglePlay - pauses video if its playing", () => {
      const videoPlayer = getWrapper()
      videoPlayer.setState({ isPlaying: true })
      videoPlayer.instance().togglePlay()
      expect(videoPlayer.state("isPlaying")).toBe(false)
    })

    it("#togglePlay - plays video if its paused", () => {
      const videoPlayer = getWrapper()
      videoPlayer.setState({ isPlaying: false })
      videoPlayer.instance().togglePlay()
      expect(videoPlayer.state("isPlaying")).toBe(true)
    })

    it("#toggleMute - mutes video if its unmuted", () => {
      const videoPlayer = getWrapper()
      videoPlayer.setState({ isMuted: false })
      videoPlayer.instance().toggleMute()
      expect(videoPlayer.state("isMuted")).toBe(true)
    })

    it("#toggleMute - mutes video if its unmuted", () => {
      const videoPlayer = getWrapper()
      videoPlayer.setState({ isMuted: true })
      videoPlayer.instance().toggleMute()
      expect(videoPlayer.state("isMuted")).toBe(false)
    })

    it("#toggleFullscreen - enters fullscreen", () => {
      const videoPlayer = getWrapper()
      videoPlayer.instance().toggleFullscreen()
      expect(FullscreenHelpers.requestFullscreen).toBeCalled()
    })

    it("#toggleFullscreen - exits fullscreen", () => {
      const videoPlayer = getWrapper()
      ;(FullscreenHelpers as any).isFullscreen = () => true
      videoPlayer.instance().toggleFullscreen()
      expect(FullscreenHelpers.exitFullscreen).toBeCalled()
    })

    it("#seekTo", () => {
      const videoPlayer = getWrapper()
      videoPlayer.instance().seekTo(5000)
      expect(videoPlayer.state("currentTime")).toBe(5000)
      expect(videoPlayer.instance().video.currentTime).toBe(5000)
    })

    it("#pause", () => {
      const videoPlayer = getWrapper()
      jest.spyOn(videoPlayer.instance().video, "pause")
      videoPlayer.instance().pause()
      expect(videoPlayer.state("isPlaying")).toBe(false)
      expect(videoPlayer.instance().video.pause).toBeCalled()
    })

    it("#play", () => {
      const videoPlayer = getWrapper()
      jest.spyOn(videoPlayer.instance().video, "play")
      videoPlayer.instance().play()
      expect(videoPlayer.state("isPlaying")).toBe(true)
      expect(videoPlayer.instance().video.play).toBeCalled()
    })

    it("fades out controls after 3 seconds of idle time", () => {
      const videoPlayer = getWrapper()
      jest.runTimersToTime(4000)
      expect(videoPlayer.state("showControls")).toBe(false)
    })

    it("controls stay visible under 3 seconds of idle time", () => {
      const videoPlayer = getWrapper()
      jest.runTimersToTime(2000)
      expect(videoPlayer.state("showControls")).toBe(true)
    })

    it("fades in controls on mousemove", () => {
      const videoPlayer = getWrapper()
      videoPlayer.simulate("mousemove")
      expect(videoPlayer.state("showControls")).toBe(true)
      expect(videoPlayer.state("idleTime")).toBe(0)
    })

    it("fades in controls on keypress", () => {
      const videoPlayer = getWrapper()
      videoPlayer.simulate("keypress")
      expect(videoPlayer.state("showControls")).toBe(true)
      expect(videoPlayer.state("idleTime")).toBe(0)
    })

    it("fades in controls on touchstart", () => {
      const videoPlayer = getWrapper()
      videoPlayer.simulate("touchstart")
      expect(videoPlayer.state("showControls")).toBe(true)
      expect(videoPlayer.state("idleTime")).toBe(0)
    })
  })

  describe("Analytics", () => {
    it("tracks fullscreen button", () => {
      const videoPlayer = getWrapper()
      videoPlayer.instance().toggleFullscreen()
      expect(track).toBeCalled()
    })

    it("tracks duration", () => {
      const videoPlayer = getWrapper()
      Object.defineProperty(videoPlayer.instance().video, "duration", {
        writable: true,
      })
      videoPlayer.instance().video.currentTime = 3
      ;(videoPlayer.instance().video as any).duration = 10
      videoPlayer.instance().trackProgress()
      expect(trackEvent).toBeCalledWith({
        action: "Video duration",
        label: "Video duration",
        percent_complete: 25,
      })
    })

    it("tracks seconds passed", () => {
      const videoPlayer = getWrapper()
      videoPlayer.instance().video.currentTime = 3
      videoPlayer.instance().trackProgress()
      expect(trackEvent).toBeCalledWith({
        action: "Video seconds",
        label: "Video seconds",
        seconds_complete: 3,
      })
    })
  })
})

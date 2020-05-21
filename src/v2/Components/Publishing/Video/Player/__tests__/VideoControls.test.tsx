import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { VideoControls } from "../VideoControls"

describe("VideoControls", () => {
  it("renders properly", () => {
    const videoControls = renderer
      .create(
        <VideoControls
          isMuted={false}
          isPlaying={false}
          title="Video Title"
          duration={5000}
          currentTime={0}
          toggleFullscreen={jest.fn()}
          toggleMute={jest.fn()}
          togglePlay={jest.fn()}
          pause={jest.fn()}
          play={jest.fn()}
          seekTo={jest.fn()}
        />
      )
      .toJSON()
    expect(videoControls).toMatchSnapshot()
  })
})

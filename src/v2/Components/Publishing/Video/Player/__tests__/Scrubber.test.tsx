import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Scrubber } from "../Scrubber"

describe("Scrubber", () => {
  it("matches the snapshot", () => {
    const scrubber = renderer
      .create(
        <Scrubber
          isPlaying={false}
          duration={5000}
          currentTime={0}
          pause={jest.fn()}
          play={jest.fn()}
          seekTo={jest.fn()}
        />
      )
      .toJSON()
    expect(scrubber).toMatchSnapshot()
  })

  it("handles #onMouseDown", () => {
    const pause = jest.fn()
    const component = mount(
      <Scrubber
        isPlaying={false}
        duration={5000}
        currentTime={0}
        pause={pause}
        play={jest.fn()}
        seekTo={jest.fn()}
      />
    )
    component.simulate("mouseDown")
    expect(pause).toBeCalled()
    expect(component.state("isPlayingOnMouseDown")).toBe(false)
  })

  it("sets isPlayingOnMouseDown if the video is playing on click", () => {
    const pause = jest.fn()
    const component = mount(
      <Scrubber
        isPlaying
        duration={5000}
        currentTime={0}
        pause={pause}
        play={jest.fn()}
        seekTo={jest.fn()}
      />
    )
    component.simulate("mouseDown")
    expect(pause).toBeCalled()
    expect(component.state("isPlayingOnMouseDown")).toBe(true)
  })

  it("resumes video and seeksTo on #onMouseUp if it was playing", () => {
    const play = jest.fn()
    const seekTo = jest.fn()
    const component = mount(
      <Scrubber
        isPlaying
        duration={5000}
        currentTime={0}
        pause={jest.fn()}
        play={play}
        seekTo={seekTo}
      />
    )
    component.setState({ isPlayingOnMouseDown: true })
    component.simulate("mouseup", { target: { value: 1000 } })
    expect(seekTo.mock.calls[0][0]).toBe(1000)
    expect(play).toBeCalled()
  })

  it("does not resume or seekTo #onMouseUp", () => {
    const play = jest.fn()
    const seekTo = jest.fn()
    const component = mount(
      <Scrubber
        isPlaying
        duration={5000}
        currentTime={0}
        pause={jest.fn()}
        play={play}
        seekTo={seekTo}
      />
    )
    component.setState({ isScrubbing: true })
    component.simulate("mouseup", { target: { value: 1000 } })
    expect(play).toHaveBeenCalledTimes(0)
    expect(seekTo).toHaveBeenCalledTimes(0)
  })

  it("allows single click scrubbing with #handleChange", () => {
    const play = jest.fn()
    const seekTo = jest.fn()
    const component = mount(
      <Scrubber
        isPlaying
        duration={5000}
        currentTime={0}
        pause={jest.fn()}
        play={play}
        seekTo={seekTo}
      />
    )
    component.simulate("change", { target: { value: 1000 } })
    expect(seekTo.mock.calls[0][0]).toBe(1000)
  })
})

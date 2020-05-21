import { IconVideoPause } from "v2/Components/Publishing/Icon/IconVideoPause"
import { IconVideoPlay } from "v2/Components/Publishing/Icon/IconVideoPlay"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { PlayPause } from "../PlayPause"

describe("Play/Pause Button", () => {
  it("matches the snapshot", () => {
    const playPause = renderer
      .create(<PlayPause isPlaying={false} togglePlay={jest.fn()} />)
      .toJSON()
    expect(playPause).toMatchSnapshot()
  })

  it("calls #togglePlay on click", () => {
    const togglePlay = jest.fn()
    const component = mount(
      <PlayPause isPlaying={false} togglePlay={togglePlay} />
    )
    component.simulate("click")
    expect(togglePlay).toBeCalled()
  })

  it("shows a pause icon if it is playing", () => {
    const component = mount(<PlayPause isPlaying togglePlay={jest.fn()} />)
    expect(component.find(IconVideoPause).length).toEqual(1)
  })

  it("shows a play icon if it is not playing", () => {
    const component = mount(
      <PlayPause isPlaying={false} togglePlay={jest.fn()} />
    )
    expect(component.find(IconVideoPlay).length).toEqual(1)
  })
})

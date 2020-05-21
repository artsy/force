import { IconVideoMute } from "v2/Components/Publishing/Icon/IconVideoMute"
import { IconVideoUnmute } from "v2/Components/Publishing/Icon/IconVideoUnmute"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { MuteUnmute } from "../MuteUnmute"

describe("Mute/Unmute Button", () => {
  it("matches the snapshot", () => {
    const muteUnmute = renderer
      .create(<MuteUnmute isMuted={false} toggleMute={jest.fn()} />)
      .toJSON()
    expect(muteUnmute).toMatchSnapshot()
  })

  it("calls #toggleMute on click", () => {
    const toggleMute = jest.fn()
    const component = mount(
      <MuteUnmute isMuted={false} toggleMute={toggleMute} />
    )
    component.simulate("click")
    expect(toggleMute).toBeCalled()
  })

  it("shows an unmute icon if it is not muted", () => {
    const toggleMute = jest.fn()
    const component = mount(
      <MuteUnmute isMuted={false} toggleMute={toggleMute} />
    )
    expect(component.find(IconVideoMute).length).toEqual(1)
  })

  it("shows a mute icon if it is muted", () => {
    const toggleMute = jest.fn()
    const component = mount(<MuteUnmute isMuted toggleMute={toggleMute} />)
    expect(component.find(IconVideoUnmute).length).toEqual(1)
  })
})

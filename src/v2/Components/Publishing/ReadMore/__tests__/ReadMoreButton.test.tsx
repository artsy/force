import { mockTracking } from "v2/Artsy/Analytics"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import Waypoint from "react-waypoint"
import { ReadMoreButton, ReadMoreContainer } from "../ReadMoreButton"

jest.unmock("react-tracking")

describe("ReadMoreButton", () => {
  let props
  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      referrer: "/article/this-cool-content",
    }
  })

  it("Calls onClick and tracking event on click", () => {
    const { Component, dispatch } = mockTracking(ReadMoreButton)
    const component = mount(<Component {...props} />)

    component
      .find(ReadMoreContainer)
      .at(0)
      .simulate("click")

    expect(dispatch).toBeCalledWith({
      action_type: "Clicked read more",
      context_module: "Read more",
      subject: "Read more",
    })
  })

  it("Calls a tracking impression", () => {
    const { Component, dispatch } = mockTracking(ReadMoreButton)
    const component = mount(<Component {...props} />)

    component
      .find(Waypoint)
      .getElement()
      .props.onEnter()

    expect(dispatch).toBeCalledWith({
      action_type: "Impression",
      context_module: "Read more",
      subject: "Read more",
    })
  })
})

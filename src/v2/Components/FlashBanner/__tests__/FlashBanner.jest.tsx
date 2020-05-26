import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { FlashMessage } from "../FlashMessage"

describe("FlashMessage", () => {
  it("renders a banner based on a message code", () => {
    const wrapper = mount(<FlashMessage messageCode="confirmed" />)
    expect(wrapper.text()).toContain("Your email has been confirmed.")
  })

  it("returns nothing without complaint if the message code is not supported", () => {
    const wrapper = mount(<FlashMessage messageCode="bad_message" />)
    expect(wrapper.html()).toBeNull()
  })
})

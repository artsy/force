import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { FlashBanner } from "../FlashBanner"

describe("FlashBanner", () => {
  it("renders a banner based on a message code", () => {
    const wrapper = mount(<FlashBanner messageCode="confirmed" />)
    expect(wrapper.text()).toContain("Your email has been confirmed.")
  })

  it("returns nothing without complaint if the message code is not supported", () => {
    const wrapper = mount(<FlashBanner messageCode={"bad_message" as any} />)
    expect(wrapper.html()).toBeNull()
  })
})

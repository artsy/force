import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { FlashBanner } from "v2/Components/FlashBanner"

const { location: originalLocation } = window

describe("FlashBanner", () => {
  afterEach(() => {
    window.location = originalLocation
  })

  it("renders a banner based on a messageCode prop", () => {
    const wrapper = mount(<FlashBanner messageCode="confirmed" />)
    expect(wrapper.text()).toContain("Your email has been confirmed.")
  })

  it("returns nothing without complaint if the message code is not supported", () => {
    const wrapper = mount(<FlashBanner messageCode="bad_message" />)
    expect(wrapper.html()).toBeNull()
  })

  it("can determine a messageCode from the query string", () => {
    delete window.location
    const fakeLocation: any = { search: "?flash_message=expired_token" }
    window.location = fakeLocation

    const wrapper = mount(<FlashBanner />)

    expect(wrapper.text()).toContain("Link expired. Resend verification email.")
  })
})

import React from "react"
import { mount } from "enzyme"
import { MockBoot } from "v2/DevTools"
import { Header } from "../Header"
import { Breakpoint } from "@artsy/palette"

describe("Header", () => {
  const getWrapper = (breakpoint = "lg") => {
    return mount(
      <MockBoot breakpoint={breakpoint as Breakpoint}>
        <Header />
      </MockBoot>
    )
  }

  it("links out to submission flow", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("RouterLink").props().to).toBe("/consign/submission")
  })

  it("tracks click", () => {
    // todo
  })

  describe("desktop", () => {
    it("shows all images", () => {
      const wrapper = getWrapper()
      expect(wrapper.find("Image").length).toBe(2)
      expect(wrapper.find("CenterImage").length).toBe(1)
    })
  })

  describe("mobile", () => {
    it("shows only one image", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find("Image").length).toBe(0)
      expect(wrapper.find("CenterImage").length).toBe(1)
    })
  })
})

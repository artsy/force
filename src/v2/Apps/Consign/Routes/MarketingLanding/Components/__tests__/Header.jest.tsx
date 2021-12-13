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
    expect(wrapper.find("RouterLink").props().to).toBe(
      "/consign/submission/artwork-details"
    )
  })

  it("tracks click", () => {
    // todo
  })

  describe("desktop", () => {
    it("shows all images", () => {
      const wrapper = getWrapper()
      expect(wrapper.find("FullBleedHeader").length).toBe(1)
    })
  })

  describe("mobile", () => {
    it("shows only one image", () => {
      const wrapper = getWrapper("xs")
      expect(wrapper.find("FullBleedHeader").length).toBe(1)
    })
  })
})

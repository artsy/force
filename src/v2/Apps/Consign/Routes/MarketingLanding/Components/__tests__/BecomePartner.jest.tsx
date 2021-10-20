import { mount } from "enzyme"
import { BecomePartner } from "../BecomePartner"
import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"

jest.mock("react-tracking")

describe("BecomePartner", () => {
  const getWrapper = (breakpoint = "md") => {
    return mount(
      <MockBoot breakpoint={breakpoint as Breakpoint}>
        <BecomePartner />
      </MockBoot>
    )
  }

  it("has correct link", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("a").props().href).toBe(
      "https://partners.artsy.net/gallery-partnerships"
    )
    const wrapperMobile = getWrapper("xs")
    expect(wrapperMobile.find("a").props().href).toBe(
      "https://partners.artsy.net/gallery-partnerships"
    )
  })
})

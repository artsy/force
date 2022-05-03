import { mount } from "enzyme"
import { ContactUs } from "../ContactUs"
import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"

jest.mock("react-tracking")

describe("ContactUs", () => {
  const getWrapper = (breakpoint = "md") => {
    return mount(
      <MockBoot breakpoint={breakpoint as Breakpoint}>
        <ContactUs />
      </MockBoot>
    )
  }

  it("contains correct email in body", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain(
      "Email us at sell@artsy.net or call +1-646-797-3423 for more information on how Artsy can sell your artwork."
    ) // pull text minus divs
  })

  it("has correct email link", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("a").first().props().href).toBe("mailto:sell@artsy.net")
    const wrapperMobile = getWrapper("xs")
    expect(wrapperMobile.find("a").first().props().href).toBe(
      "mailto:sell@artsy.net"
    )
  })
})

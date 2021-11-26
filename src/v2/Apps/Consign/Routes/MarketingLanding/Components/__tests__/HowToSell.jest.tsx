import { mount } from "enzyme"
import { MockBoot } from "v2/DevTools"
import { Header } from "../Header"
import { Breakpoint } from "@artsy/palette"

jest.mock("react-tracking")

describe("HowToSell", () => {
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
})

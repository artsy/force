import { mount } from "enzyme"
import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"
import { SellWithArtsy, tests } from "../SellWithArtsy"

jest.mock("react-tracking")

describe("SellWithArtsy", () => {
  const getWrapper = (breakpoint = "lg") => {
    return mount(
      <MockBoot breakpoint={breakpoint as Breakpoint}>
        <SellWithArtsy />
      </MockBoot>
    )
  }

  it("links out to submission flow", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Link").props().href).toBe(tests.DOWNLOAD_URL)
  })
})

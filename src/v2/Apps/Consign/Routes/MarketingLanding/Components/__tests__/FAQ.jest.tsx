import { mount } from "enzyme"
import { MockBoot } from "v2/DevTools"
import { FAQ } from "../FAQ"
import { Breakpoint } from "@artsy/palette"

describe("FAQ", () => {
  const getWrapper = (breakpoint = "md") => {
    return mount(
      <MockBoot breakpoint={breakpoint as Breakpoint}>
        <FAQ />
      </MockBoot>
    )
  }

  it("it toggles FAQ questions", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).not.toContain(
      "We offer no upfront fees." // hidden
    )
    wrapper.find("Clickable").first().simulate("click")
    wrapper.update()
    expect(wrapper.html()).toContain(
      "We offer no upfront fees." // visible on toggle click
    )
  })
})

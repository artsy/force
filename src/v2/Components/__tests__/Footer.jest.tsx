import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import React from "react"
import { Footer, LargeFooter, SmallFooter } from "../Footer"

describe("Footer", () => {
  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const small = mount(
      <MockBoot breakpoint="xs">
        <Footer />
      </MockBoot>
    )
    expect(small.find(SmallFooter).length).toEqual(1)

    const large = mount(
      <MockBoot breakpoint="lg">
        <Footer />
      </MockBoot>
    )
    expect(large.find(LargeFooter).length).toEqual(1)
  })
})

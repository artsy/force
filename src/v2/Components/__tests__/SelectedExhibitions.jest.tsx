import { exhibitions } from "v2/Apps/__tests__/Fixtures/SelectedExhibitions"
import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import React from "react"
import { SelectedExhibitions } from "../SelectedExhibitions"

describe("SelectedExhibitions", () => {
  const props = {
    ViewAllLink: <a href="#">hi</a>,
    artistID: "andy-warhol",
    exhibitions: exhibitions as any,
    totalExhibitions: 100,
  }

  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const small = mount(
      <MockBoot breakpoint="xs">
        <SelectedExhibitions {...props} />
      </MockBoot>
    )
    expect(
      (small.find("SelectedExhibitionsContainer").props() as any).collapsible
    ).toBe(true)

    const large = mount(
      <MockBoot>
        <SelectedExhibitions {...props} />
      </MockBoot>
    )
    expect(
      (large.find("SelectedExhibitionsContainer").props() as any).collapsible
    ).toBe(undefined)
  })

  it("shows count when collapsed", () => {
    const wrapper = mount(
      <MockBoot breakpoint="xs">
        <SelectedExhibitions {...props} />
      </MockBoot>
    )

    expect(wrapper.html()).toContain("Selected exhibitions (3)")
    expect(wrapper.html()).not.toContain("Sculpture on the Move 1946–2016") // second item
  })

  it("shows all exhibitions when clicked", () => {
    const wrapper = mount(
      <MockBoot breakpoint="xs">
        <SelectedExhibitions {...props} />
      </MockBoot>
    )

    expect(wrapper.html()).toContain("Selected exhibitions (3)")
    wrapper.find(".showLink").simulate("click")
    expect(wrapper.html()).toContain("Sculpture on the Move 1946–2016")
    expect(wrapper.html()).not.toContain("Selected exhibitions (3)")
  })
})

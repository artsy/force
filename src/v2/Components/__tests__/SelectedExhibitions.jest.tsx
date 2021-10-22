import { exhibitions } from "v2/Apps/__tests__/Fixtures/SelectedExhibitions"
import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import { SelectedExhibitions } from "../SelectedExhibitions"

describe("SelectedExhibitions", () => {
  const props = {
    exhibitions: exhibitions as any,
    artistID: "andy-warhol",
    totalExhibitions: 100,
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    ViewAllLink: <a href="#">hi</a>,
  }

  beforeAll(() => {
    // @ts-expect-error STRICT_NULL_CHECK
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
    wrapper.find("button").simulate("click")
    expect(wrapper.html()).toContain("Sculpture on the Move 1946–2016")
    expect(wrapper.html()).not.toContain("Selected exhibitions (3)")
  })
})

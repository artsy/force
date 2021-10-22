import { ShowMore } from "../ShowMore"
import { mount } from "enzyme"

describe("ShowMore", () => {
  it("shows more when clicked", () => {
    const wrapper = mount(
      <ShowMore initial={2}>
        <div>is visible</div>
        <div>is visible</div>
        <div>is hidden</div>
      </ShowMore>
    )

    expect(wrapper.html()).toContain("is visible")
    expect(wrapper.html()).not.toContain("is hidden")

    wrapper.find("button").simulate("click")

    expect(wrapper.html()).toContain("is visible")
    expect(wrapper.html()).toContain("is hidden")
  })

  it("and hides it", () => {
    const wrapper = mount(
      <ShowMore initial={2} expanded>
        <div>is visible</div>
        <div>is visible</div>
        <div>is hidden</div>
      </ShowMore>
    )

    expect(wrapper.html()).toContain("is visible")
    expect(wrapper.html()).toContain("is hidden")

    wrapper.find("button").simulate("click")

    expect(wrapper.html()).toContain("is visible")
    expect(wrapper.html()).not.toContain("is hidden")
  })
})

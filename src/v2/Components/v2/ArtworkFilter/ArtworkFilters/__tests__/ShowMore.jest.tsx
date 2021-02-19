import React from "react"
import { ShowMore } from "../ShowMore"
import { mount } from "enzyme"

describe("ShowMore", () => {
  it("shows more when clicked", () => {
    const wrapper = mount(<ShowMore>even if it was hidden from me</ShowMore>)

    expect(wrapper.html()).not.toContain("even if it was hidden from me")

    wrapper.find("button").simulate("click")

    expect(wrapper.html()).toContain("even if it was hidden from me")
  })

  it("and hides it", () => {
    const wrapper = mount(
      <ShowMore expanded>even if it was hidden from me</ShowMore>
    )

    expect(wrapper.html()).toContain("even if it was hidden from me")

    wrapper.find("button").simulate("click")

    expect(wrapper.html()).not.toContain("even if it was hidden from me")
  })
})

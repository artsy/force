import { Reveal } from "../Reveal"
import { mount } from "enzyme"
import React from "react"

describe("Reveal", () => {
  const getWrapper = props => {
    return mount(
      <Reveal {...props}>
        <div>Content</div>
      </Reveal>
    )
  }
  it("hides revealer if isEnabled is false", () => {
    const wrapper = getWrapper({ isEnabled: false })
    expect(wrapper.find("Revealer").length).toBe(0)
  })

  it("shows revealer if isEnabled is true", () => {
    const wrapper = getWrapper({ isEnabled: true })
    expect(wrapper.find("Revealer").length).toBe(1)
  })

  it("reveals hidden area when button is clicked", () => {
    const wrapper = getWrapper({ isEnabled: true })
    const revealer = () => wrapper.find("Revealer")
    const button = wrapper.find("Button")

    expect(wrapper.find("Revealer").length).toBe(1)
    expect(button.length).toBe(1)
    button.simulate("click")

    expect(wrapper.find("Revealer").length).toBe(0)
  })
})

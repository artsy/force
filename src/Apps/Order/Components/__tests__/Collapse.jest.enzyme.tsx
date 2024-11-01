import { mount } from "enzyme"
import React from "react"
import { Collapse } from "Apps/Order/Components/Collapse"

describe("Collapse", () => {
  it("is visible (height: auto) when open is true", () => {
    const component = mount(
      <Collapse open>The elegant spiral of the Nautilus shell, ...</Collapse>
    )
    expect(component.find("div").prop("style")).toHaveProperty("height", "auto")
  })

  it("is not visible (height: 0) when open is false", () => {
    const component = mount(
      <Collapse open={false}>The elegant spiral of the Nautilus ...</Collapse>
    )

    expect(component.find("div").prop("style")).toHaveProperty("height", "0px")
  })
})

import React from "react"
import { MemoryRouter } from "react-router"
import { mount } from "enzyme"
import { Wizard } from "./Wizard"

describe("Wizard", () => {
  it("can render", () => {
    const props = {}
    const wrapper = mount(
      <MemoryRouter>
        <Wizard {...props} />
      </MemoryRouter>
    )
    expect(wrapper.find("Route")).toHaveLength(4)
  })
})

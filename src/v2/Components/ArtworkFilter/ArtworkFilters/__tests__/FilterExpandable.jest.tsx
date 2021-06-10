import { Breakpoint } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"
import { FilterExpandable } from "../FilterExpandable"

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))

describe("FilterExpandable", () => {
  const getWrapper = (breakpoint: Breakpoint = "xl") => {
    return mount(
      <FilterExpandable expanded={false}>
        <></>
      </FilterExpandable>
    )
  }

  let wrapper

  beforeEach(() => {
    wrapper = getWrapper()
  })

  it("renders correctly", () => {
    expect(wrapper.find("Expandable")).toHaveLength(1)
    expect(wrapper.find("Expandable").prop("onClick")).toBeTruthy()
  })
})

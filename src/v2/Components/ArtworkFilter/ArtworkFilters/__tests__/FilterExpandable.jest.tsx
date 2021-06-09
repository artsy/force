import { Breakpoint } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"
import { MockBoot } from "v2/DevTools"
import { FilterExpandable } from "../FilterExpandable"

describe("FilterExpandable", () => {
  const getWrapper = (breakpoint: Breakpoint = "xl") => {
    return mount(
      <MockBoot breakpoint={breakpoint}>
        <FilterExpandable expanded={false}>
          <></>
        </FilterExpandable>
      </MockBoot>
    )
  }

  describe("desktop", () => {
    let wrapper

    beforeEach(() => {
      wrapper = getWrapper()
    })

    it("renders correctly", () => {
      expect(wrapper.find("FilterExpandableWithScrollIntoView")).toHaveLength(0)
    })

    it("doesn't pass onClick handler to Expandable", () => {
      expect(wrapper.find("Expandable").prop("onClick")).toBeFalsy()
    })
  })

  describe("mobile", () => {
    let wrapper

    beforeEach(() => {
      wrapper = getWrapper("xs")
    })

    it("renders correctly", () => {
      expect(wrapper.find("FilterExpandableWithScrollIntoView")).toHaveLength(1)
    })

    it("passes onClick handler to Expandable", () => {
      expect(wrapper.find("Expandable").prop("onClick")).toBeTruthy()
    })
  })
})

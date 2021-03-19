import { mount } from "enzyme"
import React from "react"
import { ArtworkFilterContextProvider } from "../../ArtworkFilterContext"
import { MaterialsFilter } from "../MaterialsFilter"

describe("MaterialsTermFilter", () => {
  const getWrapper = (contextProps = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <MaterialsFilter />
      </ArtworkFilterContextProvider>
    )
  }
  describe("materials", () => {
    it("renders materials", () => {
      const wrapper = getWrapper({
        aggregations: [
          {
            slice: "MATERIALS_TERMS",
            counts: [
              {
                name: "Oil",
                count: 10,
                value: "oil",
              },
              {
                name: "Canvas",
                count: 5,
                value: "canvas",
              },
            ],
          },
        ],
      })
      expect(wrapper.find("Checkbox").first().text()).toContain("Oil")
      expect(wrapper.find("Checkbox").last().text()).toContain("Canvas")
    })
  })
})

import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { MaterialsFilter } from "../MaterialsFilter"

describe("MaterialsTermFilter", () => {
  let context: ArtworkFilterContextProps

  const getWrapper = (contextProps = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <MaterialsFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const MaterialsFilterTest = () => {
    context = useArtworkFilterContext()
    return <MaterialsFilter />
  }

  describe("materials", () => {
    it("renders material term names", () => {
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

    it("acts on material term values", async () => {
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

      expect(context.filters.materialsTerms).toHaveLength(0)

      await wrapper.find("Checkbox").first().simulate("click")
      await wrapper.find("Checkbox").last().simulate("click")

      expect(context.filters.materialsTerms).toHaveLength(2)
      expect(context.filters.materialsTerms).toContain("oil")
      expect(context.filters.materialsTerms).toContain("canvas")
    })
  })
})

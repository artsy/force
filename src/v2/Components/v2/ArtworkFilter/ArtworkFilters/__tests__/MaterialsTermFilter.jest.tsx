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

    it("autocompletes available options", () => {
      const wrapper = getWrapper({
        aggregations: [
          {
            slice: "MATERIALS_TERMS",
            counts: [
              { name: "Acrylic", value: "acrylic", count: 42 },
              { name: "Brass", value: "brass", count: 42 },
              { name: "Bronze", value: "bronze", count: 42 },
              { name: "Canvas", value: "canvas", count: 42 },
              { name: "Drypoint", value: "drypoint", count: 42 },
              { name: "Enamel", value: "enamel", count: 42 },
              { name: "Foam", value: "foam", count: 42 },
              { name: "Glass", value: "glass", count: 42 },
            ],
          },
        ],
      })

      const input = wrapper.find("input")
      input.simulate("focus").simulate("change", { target: { value: "b" } })

      expect(wrapper.text()).toContain("Brass")
      expect(wrapper.text()).toContain("Bronze")

      expect(wrapper.text()).not.toContain("Acrylic")
      expect(wrapper.text()).not.toContain("Canvas")
      expect(wrapper.text()).not.toContain("Drypoint")
      expect(wrapper.text()).not.toContain("Enamel")
      expect(wrapper.text()).not.toContain("Foam")
      expect(wrapper.text()).not.toContain("Glass")
    })
  })
})

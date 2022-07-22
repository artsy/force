import { mount } from "enzyme"
import {
  Aggregations,
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { MaterialsFilter, MaterialsFilterProps } from "../MaterialsFilter"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("MaterialsTermFilter", () => {
  let context: ArtworkFilterContextProps

  const aggregations: Aggregations = [
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
  ]

  const getWrapper = (
    contextProps = {},
    filterProps: MaterialsFilterProps = { expanded: true }
  ) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <MaterialsFilterTest {...filterProps} />
      </ArtworkFilterContextProvider>
    )
  }

  const MaterialsFilterTest = (props: MaterialsFilterProps) => {
    context = useArtworkFilterContext()
    return <MaterialsFilter {...props} />
  }

  describe("materials", () => {
    it("renders the first 6 material term names", () => {
      const wrapper = getWrapper({ aggregations })

      expect(wrapper.find("Checkbox").first().text()).toContain("Acrylic")
      expect(wrapper.find("Checkbox").last().text()).toContain("Enamel")
    })

    it("acts on material term values", async () => {
      const wrapper = getWrapper({ aggregations })

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(context.filters.materialsTerms).toHaveLength(0)

      await wrapper.find("Checkbox").first().simulate("click")
      await wrapper.find("Checkbox").last().simulate("click")

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(context.filters.materialsTerms).toHaveLength(2)
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(context.filters.materialsTerms).toContain("acrylic")
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      expect(context.filters.materialsTerms).toContain("enamel")
    })

    it("autocompletes available options", () => {
      const wrapper = getWrapper({ aggregations })

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

  describe("the `expanded` prop", () => {
    it("hides the filter controls when not set", () => {
      const wrapper = getWrapper({ aggregations }, {})
      expect(wrapper.find("Checkbox").length).toBe(0)
    })

    it("hides the filter controls when `false`", () => {
      const wrapper = getWrapper({ aggregations }, { expanded: false })
      expect(wrapper.find("Checkbox").length).toBe(0)
    })

    it("shows the filter controls when `true`", () => {
      const wrapper = getWrapper({ aggregations }, { expanded: true })
      expect(wrapper.find("Checkbox").length).not.toBe(0)
    })
  })
})

import { mount } from "enzyme"
import {
  Aggregations,
  ArtworkFilterContextProvider,
} from "../../ArtworkFilterContext"
import { PartnersFilter, PartnersFilterProps } from "../PartnersFilter"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("PartnersFilter", () => {
  const aggregations: Aggregations = [
    {
      slice: "PARTNER",
      counts: [{ name: "Percy Z", count: 10, value: "percy-z" }],
    },
  ]

  const getWrapper = (
    contextProps = {},
    filterProps: PartnersFilterProps = { expanded: true }
  ) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <PartnersFilter {...filterProps} />
      </ArtworkFilterContextProvider>
    )
  }

  describe("partners", () => {
    it("renders partners", () => {
      const wrapper = getWrapper({ aggregations })
      expect(wrapper.find("Checkbox").first().text()).toContain("Percy Z")
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

  it("renders custom label", () => {
    const wrapper = getWrapper({ aggregations }, { label: "Custom label" })
    const header = wrapper.find("Clickable").at(0)
    const headerLabel = header.find("Text")

    expect(headerLabel.text()).toEqual("Custom label")
  })
})

import { mount } from "enzyme"
import {
  Aggregations,
  ArtworkFilterContextProvider,
} from "../../ArtworkFilterContext"
import {
  ArtworkLocationFilter,
  ArtworkLocationFilterProps,
} from "../ArtworkLocationFilter"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("ArtworkLocationFilter", () => {
  const aggregations: Aggregations = [
    {
      slice: "LOCATION_CITY",
      counts: [
        {
          name: "Cattown, Cat City, Nowhere USA",
          count: 10,
          value: "percy-z",
        },
      ],
    },
  ]

  const getWrapper = (
    contextProps = {},
    filterProps: ArtworkLocationFilterProps = { expanded: true }
  ) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <ArtworkLocationFilter {...filterProps} />
      </ArtworkFilterContextProvider>
    )
  }

  describe("locations", () => {
    it("renders locations", () => {
      const wrapper = getWrapper({ aggregations })
      expect(wrapper.find("Checkbox").first().text()).toContain(
        "Cattown, Cat City, Nowhere USA"
      )
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

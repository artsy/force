import { mount } from "enzyme"
import {
  Aggregations,
  ArtworkFilterContextProvider,
} from "../../ArtworkFilterContext"
import {
  ArtistNationalityFilter,
  ArtistNationalityFilterProps,
} from "../ArtistNationalityFilter"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("ArtworkLocationFilter", () => {
  const aggregations: Aggregations = [
    {
      slice: "ARTIST_NATIONALITY",
      counts: [
        {
          name: "Cat",
          count: 10,
          value: "cat",
        },
        {
          name: "Dog",
          count: 5,
          value: "dog",
        },
      ],
    },
  ]

  const getWrapper = (
    contextProps = {},
    filterProps: ArtistNationalityFilterProps = { expanded: true }
  ) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <ArtistNationalityFilter {...filterProps} />
      </ArtworkFilterContextProvider>
    )
  }

  describe("nationalities", () => {
    it("renders artist nationalities", () => {
      const wrapper = getWrapper({ aggregations })
      expect(wrapper.find("Checkbox").first().text()).toContain("Cat")
      expect(wrapper.find("Checkbox").last().text()).toContain("Dog")
    })

    it("renders nothing when there are no nationalities", () => {
      const wrapper = getWrapper({
        aggregations: [
          {
            slice: "ARTIST_NATIONALITY",
            counts: [],
          },
        ],
      })
      expect(wrapper.html()).not.toBeTruthy()
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

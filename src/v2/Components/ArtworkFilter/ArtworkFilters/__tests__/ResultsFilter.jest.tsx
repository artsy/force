import { mount } from "enzyme"
import {
  ArtworkFilterContextProvider,
  SelectedFiltersCountsLabels,
} from "../../ArtworkFilterContext"
import { ResultsFilter, sortResults } from "../ResultsFilter"

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("ArtworkLocationFilter", () => {
  const getWrapper = (contextProps = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <ResultsFilter
          facetName="locationCities"
          slice="LOCATION_CITY"
          placeholder="Enter a city"
          label="Artwork Location"
          filtersCountKey={SelectedFiltersCountsLabels.locationCities}
          expanded
        />
      </ArtworkFilterContextProvider>
    )
  }

  it("renders correctly", () => {
    const wrapper = getWrapper({
      aggregations: [
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
      ],
    })

    // Expandable title
    expect(wrapper.text()).toContain("Artwork Location")

    // Input placeholder
    expect(wrapper.find("input").prop("placeholder")).toContain("Enter a city")

    // Checkbox
    expect(wrapper.text()).toContain("Cattown, Cat City, Nowhere USA")
  })

  it("renders nothing when there are no results", () => {
    const wrapper = getWrapper({
      aggregations: [
        {
          slice: "LOCATION_CITY",
          counts: [],
        },
      ],
    })

    expect(wrapper.text()).toBeFalsy()
    expect(wrapper.find("input").exists()).toBeFalsy()
  })
})

describe("sortResults", () => {
  it("returns the original list, but with selected items moved to the front", () => {
    const results = [
      {
        value: "cat1",
        name: "Cat 1",
        count: 10,
      },
      {
        value: "cat2",
        name: "Cat 2",
        count: 10,
      },
      {
        value: "cat3",
        name: "Cat 3",
        count: 10,
      },
      {
        value: "cat4",
        name: "Cat 4",
        count: 10,
      },
      {
        value: "cat5",
        name: "Cat 5",
        count: 10,
      },
    ]

    const selected = ["cat4", "cat5"]

    expect(sortResults(selected, results)).toEqual([
      {
        value: "cat4",
        name: "Cat 4",
        count: 10,
      },
      {
        value: "cat5",
        name: "Cat 5",
        count: 10,
      },
      {
        value: "cat1",
        name: "Cat 1",
        count: 10,
      },
      {
        value: "cat2",
        name: "Cat 2",
        count: 10,
      },
      {
        value: "cat3",
        name: "Cat 3",
        count: 10,
      },
    ])
  })
})

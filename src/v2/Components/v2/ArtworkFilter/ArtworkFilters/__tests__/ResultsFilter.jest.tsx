import { mount } from "enzyme"
import React from "react"
import { ArtworkFilterContextProvider } from "../../ArtworkFilterContext"
import { ResultsFilter } from "../ResultsFilter"

describe("ArtworkLocationFilter", () => {
  const getWrapper = (contextProps = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <ResultsFilter
          facetName="locationCities"
          slice="LOCATION_CITY"
          placeholder="Enter a city"
          label="Artwork location"
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
    expect(wrapper.text()).toContain("Artwork location")

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
    expect(wrapper.html()).not.toBeTruthy()
  })
})

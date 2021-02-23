import { mount } from "enzyme"
import React from "react"
import { ArtworkFilterContextProvider } from "../../ArtworkFilterContext"
import { ArtworkLocationFilter } from "../ArtworkLocationFilter"

describe("ArtworkLocationFilter", () => {
  const getWrapper = (contextProps = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <ArtworkLocationFilter />
      </ArtworkFilterContextProvider>
    )
  }

  describe("locations", () => {
    it("renders locations", () => {
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
      expect(wrapper.find("Checkbox").first().text()).toContain(
        "Cattown, Cat City, Nowhere USA"
      )
    })
  })
})

import { mount } from "enzyme"
import React from "react"
import { ArtworkFilterContextProvider } from "../../ArtworkFilterContext"
import { ArtistNationalityFilter } from "../ArtistNationalityFilter"

describe("ArtworkLocationFilter", () => {
  const getWrapper = (contextProps = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <ArtistNationalityFilter />
      </ArtworkFilterContextProvider>
    )
  }

  describe("nationalities", () => {
    it("renders nationalities", () => {
      const wrapper = getWrapper({
        aggregations: [
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
        ],
      })
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
})

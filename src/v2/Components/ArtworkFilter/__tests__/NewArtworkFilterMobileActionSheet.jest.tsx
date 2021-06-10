import { mount } from "enzyme"
import React from "react"
import { ArtworkFilterContextProvider } from "../ArtworkFilterContext"
import { ArtworkFilterMobileActionSheet } from "../ArtworkFilterMobileActionSheet"
import { ArtworkFilters } from "../ArtworkFilters"
import { flushPromiseQueue } from "v2/DevTools"

jest.mock("sharify", () => ({
  data: {
    ENABLE_NEW_ARTWORK_FILTERS: true,
  },
}))

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({ sm: true }),
}))

describe("the new artwork filters", () => {
  const getWrapper = (props = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...props}>
        <ArtworkFilterMobileActionSheet onClose={jest.fn()}>
          <ArtworkFilters />
        </ArtworkFilterMobileActionSheet>
      </ArtworkFilterContextProvider>
    )
  }

  const aggregationsWithArtworkLocation = [
    {
      slice: "LOCATION_CITY",
      counts: [
        {
          name: "Glens Falls, NY, USA",
          count: 1,
          value: "glens-falls",
        },
        {
          name: "Schenectady, NY, USA",
          count: 1,
          value: "schenectady",
        },
      ],
    },
  ]

  const aggregationsWithArtistNationality = [
    {
      slice: "ARTIST_NATIONALITY",
      counts: [
        {
          name: "Glens Fallsian",
          count: 1,
          value: "glens-fallsian",
        },
        {
          name: "Schenectadian",
          count: 1,
          value: "schenectadian",
        },
      ],
    },
  ]

  describe("the count on the `Apply` button", () => {
    it("is 1 when 1 artwork location is selected", async () => {
      const wrapper = getWrapper({
        aggregations: aggregationsWithArtworkLocation,
      })

      wrapper
        .find("ArtworkLocationFilter")
        .find("div")
        .findWhere(label => label.text() === "Glens Falls, NY, USA")
        .first()
        .simulate("click")
      await flushPromiseQueue()

      expect(wrapper.find("ApplyButton").text()).toEqual("Apply (1)")
    })

    it("is 1 when 2 artwork locations are selected", async () => {
      const wrapper = getWrapper({
        aggregations: aggregationsWithArtworkLocation,
      })

      wrapper
        .find("ArtworkLocationFilter")
        .find("div")
        .findWhere(label => label.text() === "Glens Falls, NY, USA")
        .first()
        .simulate("click")
      await flushPromiseQueue()

      expect(wrapper.find("ApplyButton").text()).toEqual("Apply (1)")

      wrapper
        .find("ArtworkLocationFilter")
        .find("div")
        .findWhere(label => label.text() === "Schenectady, NY, USA")
        .first()
        .simulate("click")
      await flushPromiseQueue()

      expect(wrapper.find("ApplyButton").text()).toEqual("Apply (1)")
    })
  })

  it("is 1 when 1 artist nationality is selected", async () => {
    const wrapper = getWrapper({
      aggregations: aggregationsWithArtistNationality,
    })

    wrapper
      .find("ArtistNationalityFilter")
      .find("div")
      .findWhere(label => label.text() === "Glens Fallsian")
      .first()
      .simulate("click")
    await flushPromiseQueue()

    expect(wrapper.find("ApplyButton").text()).toEqual("Apply (1)")
  })

  it("is 1 when 2 artist nationalities are selected", async () => {
    const wrapper = getWrapper({
      aggregations: aggregationsWithArtistNationality,
    })

    wrapper
      .find("ArtistNationalityFilter")
      .find("div")
      .findWhere(label => label.text() === "Glens Fallsian")
      .first()
      .simulate("click")
    await flushPromiseQueue()

    expect(wrapper.find("ApplyButton").text()).toEqual("Apply (1)")

    wrapper
      .find("ArtistNationalityFilter")
      .find("div")
      .findWhere(label => label.text() === "Schenectadian")
      .first()
      .simulate("click")
    await flushPromiseQueue()

    expect(wrapper.find("ApplyButton").text()).toEqual("Apply (1)")
  })
})

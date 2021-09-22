import React from "react"
import { mount } from "enzyme"
import { HomeWorksForYouTabBar } from "../Components/HomeWorksForYouTabBar"

jest.mock("v2/Apps/Home/Components/HomeWorksByArtistsYouFollowRail", () => ({
  HomeWorksByArtistsYouFollowRailQueryRenderer: () => null,
}))
jest.mock("v2/Apps/Home/Components/HomeRecentlyViewedRail", () => ({
  HomeRecentlyViewedRailQueryRenderer: () => null,
}))

describe("HomeWorksForYouTabBar", () => {
  const getWrapper = () => {
    return mount(<HomeWorksForYouTabBar />)
  }

  it("renders correctly on first load", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain("New Works by Artists You Follow")
    expect(wrapper.text()).toContain("Recently Viewed")
    expect(
      wrapper.find("HomeWorksByArtistsYouFollowRailQueryRenderer").length
    ).toEqual(1)
  })

  it("renders correct tab content", () => {
    const wrapper = getWrapper()
    wrapper.find("button").first().simulate("click")
    expect(
      wrapper.find("HomeWorksByArtistsYouFollowRailQueryRenderer").length
    ).toEqual(1)
    wrapper.find("button").last().simulate("click")
    expect(wrapper.find("HomeRecentlyViewedRailQueryRenderer").length).toEqual(
      1
    )
  })
})

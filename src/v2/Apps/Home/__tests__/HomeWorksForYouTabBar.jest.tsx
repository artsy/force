import { mount } from "enzyme"
import { HomeWorksForYouTabBar } from "../Components/HomeWorksForYouTabBar"

jest.mock("v2/Apps/Home/Components/HomeNewWorksForYouRail", () => ({
  HomeNewWorksForYouRailQueryRenderer: () => null,
}))
jest.mock("v2/Apps/Home/Components/HomeRecentlyViewedRail", () => ({
  HomeRecentlyViewedRailQueryRenderer: () => null,
}))
jest.mock("v2/Apps/Home/Components/HomeWorksByArtistsYouFollowRail", () => ({
  HomeWorksByArtistsYouFollowRailQueryRenderer: () => null,
}))
jest.mock("v2/System/useSystemContext", () => ({
  useSystemContext: jest.fn().mockReturnValue({ user: true }),
}))

describe("HomeWorksForYouTabBar", () => {
  const getWrapper = () => {
    return mount(<HomeWorksForYouTabBar />)
  }

  it("renders the new for you tab by default", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain("New Works For You")
    expect(wrapper.text()).toContain("New Works by Artists You Follow")
    expect(wrapper.text()).toContain("Recently Viewed")

    expect(wrapper.find("HomeNewWorksForYouRailQueryRenderer")).toHaveLength(1)
    expect(
      wrapper.find("HomeWorksByArtistsYouFollowRailQueryRenderer")
    ).toHaveLength(0)
    expect(wrapper.find("HomeRecentlyViewedRailQueryRenderer")).toHaveLength(0)
  })

  it("renders other tabs when clicking", () => {
    const wrapper = getWrapper()
    wrapper.find("button").at(2).simulate("click")
    expect(wrapper.find("HomeRecentlyViewedRailQueryRenderer")).toHaveLength(1)
    wrapper.find("button").at(1).simulate("click")
    expect(
      wrapper.find("HomeWorksByArtistsYouFollowRailQueryRenderer")
    ).toHaveLength(1)
    wrapper.find("button").at(0).simulate("click")
    expect(wrapper.find("HomeNewWorksForYouRailQueryRenderer")).toHaveLength(1)
  })
})

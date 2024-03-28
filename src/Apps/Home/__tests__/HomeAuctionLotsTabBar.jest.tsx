import { HomeAuctionLotsTabBar } from "Apps/Home/Components/HomeAuctionLotsTabBar"
import { mount } from "enzyme"

jest.mock("Apps/Home/Components/HomeAuctionLotsRail", () => ({
  HomeAuctionLotsRailQueryRenderer: () => null,
}))
jest.mock("Apps/Home/Components/HomeAuctionLotsForYouRail", () => ({
  HomeAuctionLotsForYouRailQueryRenderer: () => null,
}))

jest.mock("System/useSystemContext", () => ({
  useSystemContext: jest.fn().mockReturnValue({ user: true }),
}))

describe("HomeAuctionLotsTabBar", () => {
  const getWrapper = () => {
    return mount(<HomeAuctionLotsTabBar />)
  }

  it("renders the new for you tab by default", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain("Auction Lots")
    expect(wrapper.text()).toContain("Auction Lots for You")

    expect(wrapper.find("HomeAuctionLotsRailQueryRenderer")).toHaveLength(1)
    expect(wrapper.find("HomeAuctionLotsForYouRailQueryRenderer")).toHaveLength(
      0
    )
  })

  it("renders other tabs when clicking", () => {
    const wrapper = getWrapper()
    wrapper.find("button").at(1).simulate("click")
    expect(wrapper.find("HomeAuctionLotsForYouRailQueryRenderer")).toHaveLength(
      1
    )
    wrapper.find("button").at(0).simulate("click")
    expect(wrapper.find("HomeAuctionLotsRailQueryRenderer")).toHaveLength(1)
  })
})

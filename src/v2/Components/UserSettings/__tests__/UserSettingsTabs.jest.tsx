import { mount } from "enzyme"
import { UserSettingsTabs } from "../UserSettingsTabs"
import { data as sd } from "sharify"

jest.mock("sharify")

describe("UserSettingsTabs", () => {
  const getWrapper = () => {
    return mount(<UserSettingsTabs route="/user/saves" username="Moira Rose" />)
  }

  const tabs = [
    ["/user/saves", "Saves & Follows"],
    ["/profile/edit", "Collector Profile"],
    ["/user/purchases", "Order History"],
    ["/user/auctions", "Bids"],
    ["/user/edit", "Settings"],
    ["/user/payments", "Payments"],
    ["/user/shipping", "Shipping"],
  ]

  beforeEach(() => {
    sd.ENABLE_SAVED_SEARCH = false
  })

  it("renders user's name", () => {
    const wrapper = getWrapper()
    const name = wrapper.find("Text")

    expect(name.text()).toContain("Moira Rose")
  })

  it("renders correct tabs", () => {
    const wrapper = getWrapper()
    const links = wrapper.find("RouteTab")

    tabs.forEach(([href, tabLabel], index) => {
      const tabLink = links.at(index)
      expect(href).toEqual(tabLink.prop("to"))
      expect(tabLabel).toEqual(tabLink.text())
    })
  })

  it('renders "Alerts" tab only when ENABLE_SAVED_SEARCH flag is enabled', () => {
    sd.ENABLE_SAVED_SEARCH = true

    const wrapper = getWrapper()
    const links = wrapper.find("RouteTab")
    const tabsWithFlag = [
      ["/user/saves", "Saves & Follows"],
      ["/user/alerts", "Alerts"],
      ["/profile/edit", "Collector Profile"],
      ["/user/purchases", "Order History"],
      ["/user/auctions", "Bids"],
      ["/user/edit", "Settings"],
      ["/user/payments", "Payments"],
      ["/user/shipping", "Shipping"],
    ]

    tabsWithFlag.forEach(([href, tabLabel], index) => {
      const tabLink = links.at(index)
      expect(href).toEqual(tabLink.prop("to"))
      expect(tabLabel).toEqual(tabLink.text())
    })
  })
})

import { MarketingLandingApp } from "../MarketingLandingApp"
import { mount } from "enzyme"
import { flushPromiseQueue } from "v2/DevTools"

jest.mock("v2/System/Analytics/AnalyticsContext", () => ({
  AnalyticsContext: { Provider: ({ children }) => children },
}))
jest.mock("../Components/ConsignMeta", () => ({
  ConsignMeta: () => <div />,
}))
jest.mock("../Components/Header", () => ({
  Header: () => <div />,
}))
jest.mock("../Components/PromoSpace", () => ({
  PromoSpace: () => <div />,
}))
jest.mock("../Components/SellArtDifferently", () => ({
  SellArtDifferently: () => <div />,
}))
jest.mock("../Components/GetPriceEstimate/GetPriceEstimate", () => ({
  GetPriceEstimate: () => <div />,
}))
jest.mock("../Components/HowToSell", () => ({
  HowToSell: () => <div />,
}))
jest.mock("../Components/ContactUs", () => ({
  ContactUs: () => <div />,
}))
jest.mock("../Components/InDemandNow/ConsignInDemandNow", () => ({
  ConsignInDemandNow: () => <div />,
}))
jest.mock("../Components/SoldRecently", () => ({
  SoldRecentlyQueryRenderer: () => <div />,
}))
jest.mock("../Components/ReadMore", () => ({
  ReadMore: () => <div />,
}))
jest.mock("../Components/ContactUs", () => ({
  ContactUs: () => <div />,
}))
jest.mock("../Components/FAQ", () => ({
  FAQ: () => <div />,
}))
jest.mock("../Components/ArtworkCredits", () => ({
  ArtworkCredits: () => <div />,
}))

let sessionStore = {}
Object.defineProperty(window, "sessionStorage", {
  value: { getItem: key => sessionStore[key] || null, setItem: jest.fn() },
})

let mockQueryUtmParams = {}
const mockSessionUtmParams = {
  utmMedium: "SessionMedium",
  utmSource: "SessionSource",
  utmTerm: "SessionTerm",
}
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: { location: { query: mockQueryUtmParams } },
  })),
}))

describe("MarketingLandingApp", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it("renders correct components", () => {
    const wrapper = mount(<MarketingLandingApp />)
    expect(wrapper.find("ConsignMeta").length).toBe(1)
    expect(wrapper.find("Header").length).toBe(1)
    expect(wrapper.find("PromoSpace").length).toBe(1)
    expect(wrapper.find("SellArtDifferently").length).toBe(1)
    expect(wrapper.find("GetPriceEstimate").length).toBe(1)
    expect(wrapper.find("HowToSell").length).toBe(1)
    expect(wrapper.find("ConsignInDemandNow").length).toBe(1)
    expect(wrapper.find("SoldRecentlyQueryRenderer").length).toBe(1)
    expect(wrapper.find("ReadMore").length).toBe(1)
    expect(wrapper.find("ContactUs").length).toBe(1)
    expect(wrapper.find("BecomePartner").length).toBe(1)
    expect(wrapper.find("FAQ").length).toBe(1)
    expect(wrapper.find("ArtworkCredits").length).toBe(1)
  })

  describe("Saving UTM params to session storage", () => {
    it("save if session storage is empty", async () => {
      mockQueryUtmParams = {
        utm_medium: "QueryMedium",
        utm_source: "QuerySource",
        utm_term: "QueryTerm",
      }

      const savedQueryUtmParams = {
        utmMedium: "QueryMedium",
        utmSource: "QuerySource",
        utmTerm: "QueryTerm",
      }

      const wrapper = mount(<MarketingLandingApp />)
      await flushPromiseQueue()
      wrapper.update()

      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "utmParams",
        JSON.stringify({ ...savedQueryUtmParams })
      )
    })

    it("don't save if session storage already has UTM params", async () => {
      sessionStore = { utmParams: JSON.stringify({ ...mockSessionUtmParams }) }

      const wrapper = mount(<MarketingLandingApp />)
      await flushPromiseQueue()
      wrapper.update()

      expect(sessionStorage.setItem).toHaveBeenCalledTimes(0)
    })
  })
})

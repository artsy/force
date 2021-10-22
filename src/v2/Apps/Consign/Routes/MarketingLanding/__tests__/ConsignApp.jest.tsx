import { MarketingLandingApp } from "../MarketingLandingApp"
import { mount } from "enzyme"

jest.mock("v2/System/Analytics/AnalyticsContext", () => ({
  AnalyticsContext: {
    Provider: ({ children }) => children,
  },
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
jest.mock("../Components/SellWithArtsy", () => ({
  SellWithArtsy: () => <div />,
}))
jest.mock("../Components/ArtworkCredits", () => ({
  ArtworkCredits: () => <div />,
}))

describe("MarketingLandingApp", () => {
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
})

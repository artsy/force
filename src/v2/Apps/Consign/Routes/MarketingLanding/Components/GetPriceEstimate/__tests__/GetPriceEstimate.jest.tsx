import { mount } from "enzyme"
import { GetPriceEstimate } from "../GetPriceEstimate"

jest.mock("react-autosuggest")

jest.mock("../ConsignArtistAutosuggest", () => ({
  ConsignArtistAutosuggest: () => <div />,
}))

jest.mock("../EstimateResults", () => ({
  EstimateResults: () => <div />,
}))

describe("GetPriceEstimate", () => {
  it("renders correct components", () => {
    const wrapper = mount(<GetPriceEstimate />)
    expect(wrapper.find("ConsignArtistAutosuggest").length).toBe(1)
    expect(wrapper.find("EstimateResults").length).toBe(1)
  })
})

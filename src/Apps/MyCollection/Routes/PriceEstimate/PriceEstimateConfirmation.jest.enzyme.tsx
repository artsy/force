import { mount } from "enzyme"
import { PriceEstimateConfirmation } from "./PriceEstimateConfirmation"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        artworkID: "some-id",
      },
    },
  }),
}))

jest.mock("Components/MetaTags", () => ({
  MetaTags: () => "MetaTags",
}))

describe("Price Estimate Confirmation page", () => {
  const wrapper = mount(<PriceEstimateConfirmation />)

  it("renders correctly", () => {
    const text = wrapper.text()

    expect(text).toContain("Price Estimate Request Sent")
    expect(text).toContain(
      "An Artsy Specialist will evaluate your artwork and contact you with a free price estimate."
    )
  })

  it("the button has the right link", () => {
    expect(wrapper.find("RouterLink").at(0).props().to).toContain(
      "/my-collection"
    )
    expect(wrapper.find("RouterLink").at(1).props().to).toContain(
      "/my-collection/artwork/some-id"
    )
  })
})

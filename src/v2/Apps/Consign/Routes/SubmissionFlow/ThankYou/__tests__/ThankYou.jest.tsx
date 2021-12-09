import { mount } from "enzyme"
import { ThankYou } from "../ThankYou"

jest.mock("../../../MarketingLanding/Components/SoldRecently", () => ({
  SoldRecentlyQueryRenderer: () => <div />,
}))
jest.mock("../../../MarketingLanding/Components/FAQ", () => ({
  FAQ: () => <div />,
}))

describe("ThankYou page", () => {
  it("renders correctly", () => {
    const wrapper = mount(<ThankYou />)
    const text = wrapper.text()

    expect(text).toContain("Thank you for submitting a work")
    expect(text).toContain(
      "We’ll email you within 1–3 business days to let you know the status of your submission"
    )
    expect(text).toContain(
      "In the meantime, feel free to submit another work—and benefit from Artsy’s low fees, informed pricing, and multiple selling options"
    )

    expect(
      wrapper.find("button[data-test-id='submit-another-work']").text()
    ).toContain("Submit Another Work")

    expect(
      wrapper.find("button[data-test-id='go-to-artsy-homepage']").text()
    ).toContain("Back to Artsy Homepage")

    expect(wrapper.find("SoldRecentlyQueryRenderer").length).toBe(1)
    expect(wrapper.find("FAQ").length).toBe(1)
  })
})

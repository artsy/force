import { ThankYouRoute } from "Apps/Sell/Routes/ThankYouRoute"
import { mount } from "enzyme"

describe("ThankYouRoute", () => {
  it("renders text and links", () => {
    const wrapper = mount(<ThankYouRoute />)
    const text = wrapper.text()

    expect(text).toContain("Thank you for submitting your artwork")

    expect(text).toContain("Submit Another Work")

    expect(text).toContain("View Artwork in My Collections")
  })
})

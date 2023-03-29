import { mount } from "enzyme"
import { ThankYouWhenFromMyCollection } from "Apps/Consign/Routes/SubmissionFlow/ThankYou/ThankYouWhenFromMyCollection" // pragma: allowlist secret

describe("ThankYou page when artwork is submitted from My Collection", () => {
  const wrapper = mount(<ThankYouWhenFromMyCollection />)

  it("renders correctly", () => {
    const text = wrapper.text()

    expect(text).toContain("Your artwork has been submitted")
    expect(text).toContain(
      "We will email you within 3-5 days to confirm if your artwork has been accepted or not."
    )
  })

  it("the button has the right link", () => {
    expect(wrapper.find("RouterLink").text()).toContain("Back to My Collection")
    expect(wrapper.find("RouterLink").at(0).props().to).toContain(
      "/my-collection"
    )
  })
})

import { mount } from "enzyme"
import { useSystemContext } from "System/useSystemContext"
import { ThankYouWhenFromMyCollection } from "../ThankYouWhenFromMyCollection"

jest.mock("System/useSystemContext")

const mockContext = useSystemContext as jest.Mock

describe("ThankYou page when artwork is submitted from My Collection", () => {
  describe("when the user is logged in", () => {
    beforeAll(() => {
      mockContext.mockImplementation(() => ({ isLoggedIn: true }))
    })

    it("renders correctly", () => {
      const wrapper = mount(<ThankYouWhenFromMyCollection />)
      const text = wrapper.text()

      expect(text).toContain("Your artwork has been submitted")
      expect(text).toContain(
        "We will email you within 1-3 days to confirm if your artwork has been accepted or not."
      )

      expect(
        wrapper.find("button[data-test-id='back-to-my-collection']").text()
      ).toContain("Back to My Collection")
      // /my-collection
      expect(wrapper.find("RouterLink").at(0).props().to).toContain(
        "/my-collection"
      )
    })
  })

  describe("when the user is not logged in", () => {
    beforeAll(() => {
      mockContext.mockImplementation(() => ({ isLoggedIn: false }))
    })

    it("renders the contents correctly", () => {
      const wrapper = mount(<ThankYouWhenFromMyCollection />)
      const text = wrapper.text()

      expect(text).toContain("Your artwork has been submitted")
      expect(text).toContain(
        "We will email you within 1-3 days to confirm if your artwork has been accepted or not."
      )

      expect(
        wrapper.find("button[data-test-id='back-to-artsy-homepage']").text()
      ).toContain("Back to Artsy Homepage")
      expect(wrapper.find("RouterLink").at(0).props().to).toContain("/")
    })
  })
})

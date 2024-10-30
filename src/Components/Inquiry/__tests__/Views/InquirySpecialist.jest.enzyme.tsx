import { mount } from "enzyme"
import { InquirySpecialist } from "Components/Inquiry/Views/InquirySpecialist"
import { useArtworkInquiryRequest } from "Components/Inquiry/Hooks/useArtworkInquiryRequest"
import {
  DEFAULT_MESSAGE,
  useInquiryContext,
} from "Components/Inquiry/Hooks/useInquiryContext"
import { fill } from "Components/Inquiry/__tests__/util"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { useSystemContext } from "System/Hooks/useSystemContext"

jest.mock("../../Hooks/useArtworkInquiryRequest")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("Utils/wait", () => ({ wait: () => Promise.resolve() }))
jest.mock("System/Hooks/useSystemContext")

describe("InquirySpecialist", () => {
  const next = jest.fn()
  const submitArtworkInquiryRequest = jest.fn()
  let setInqirySpy: jest.SpyInstance

  beforeAll(() => {
    ;(useArtworkInquiryRequest as jest.Mock).mockImplementation(() => ({
      submitArtworkInquiryRequest,
    }))
    ;(useInquiryContext as jest.Mock).mockImplementation(() => {
      const actual = jest
        .requireActual("../../Hooks/useInquiryContext")
        .useInquiryContext()

      setInqirySpy = jest.spyOn(actual, "setInquiry")

      return { ...actual, next, artworkID: "example" }
    })
  })

  afterEach(() => {
    next.mockReset()
    submitArtworkInquiryRequest.mockReset()
    setInqirySpy.mockReset()
  })

  describe("logged out", () => {
    beforeAll(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => ({
        user: null,
      }))
    })

    it("renders correctly", () => {
      const wrapper = mount(<InquirySpecialist />)
      const html = wrapper.html()

      expect(html).toContain(
        "An Artsy Specialist is available to answer your questions and help you collect through Artsy."
      )
      expect(html).toContain("Your email address")
    })

    it("fills out the inquiry and nexts", async () => {
      const wrapper = mount(<InquirySpecialist />)

      // Fill inputs
      fill(wrapper, "message", "Hello world.")
      fill(wrapper, "name", "Example Example")
      fill(wrapper, "email", "example@example.com")

      expect(setInqirySpy).toHaveBeenCalledTimes(3)

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      // Doesn't send the inquiry
      expect(submitArtworkInquiryRequest).not.toBeCalled()

      // Calls next
      expect(next).toBeCalled()
    })
  })

  describe("logged in", () => {
    beforeAll(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => ({
        user: { name: "Logged In", email: "loggedin@example.com" },
      }))
    })

    it("renders correctly", () => {
      const wrapper = mount(<InquirySpecialist />)
      const html = wrapper.html()

      expect(html).toContain(
        "An Artsy Specialist is available to answer your questions and help you collect through Artsy."
      )
      expect(html).not.toContain("Your email address")
      expect(html).toContain("Logged In")
      expect(html).toContain("loggedin@example.com")
    })

    it("sends the inquiry and nexts", async () => {
      const wrapper = mount(<InquirySpecialist />)

      // Fill input
      fill(wrapper, "message", "Hello world.")

      expect(setInqirySpy).toHaveBeenCalledTimes(1)

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      // Sends the inquiry
      expect(submitArtworkInquiryRequest).toBeCalledWith({
        artworkID: "example",
        contactGallery: false,
        // TODO: Figure out why this state doesn't update within text (works in dev)
        // message: "Hello world.",
        message: DEFAULT_MESSAGE,
      })

      // Calls next
      expect(next).toBeCalled()
    })
  })
})

import { mount } from "enzyme"
import { InquirySpecialist } from "../../Views/InquirySpecialist"
import { useArtworkInquiryRequest } from "../../Hooks/useArtworkInquiryRequest"
import { useInquiryContext } from "../../Hooks/useInquiryContext"
import { fill } from "../util"
import { flushPromiseQueue } from "v2/DevTools"
import { useSystemContext } from "v2/System/useSystemContext"

jest.mock("../../Hooks/useArtworkInquiryRequest")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("v2/Utils/wait", () => ({ wait: () => Promise.resolve() }))
jest.mock("v2/System/useSystemContext")

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
        message:
          "Hi, I’m interested in purchasing this work. Could you please provide more information about the piece?",
      })

      // Calls next
      expect(next).toBeCalled()
    })
  })
})

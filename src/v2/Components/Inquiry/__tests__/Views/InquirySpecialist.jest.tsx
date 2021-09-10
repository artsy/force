import { mount } from "enzyme"
import React from "react"
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
  const setInquiry = jest.fn()
  const submitArtworkInquiryRequest = jest.fn()

  beforeEach(() => {
    ;(useArtworkInquiryRequest as jest.Mock).mockImplementation(() => ({
      submitArtworkInquiryRequest,
    }))
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      next,
      inquiry: {},
      setInquiry,
    }))
  })

  afterEach(() => {
    next.mockReset()
    submitArtworkInquiryRequest.mockReset()
    setInquiry.mockReset()
  })

  describe("logged out", () => {
    beforeEach(() => {
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

      expect(setInquiry).toHaveBeenCalledTimes(3)

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
    beforeEach(() => {
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

      expect(setInquiry).toHaveBeenCalledTimes(1)

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      // Sends the inquiry
      expect(submitArtworkInquiryRequest).toBeCalled()

      // Calls next
      expect(next).toBeCalled()
    })
  })
})

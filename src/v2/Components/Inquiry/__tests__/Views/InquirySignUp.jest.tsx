import { mount } from "enzyme"
import React from "react"
import { flushPromiseQueue } from "v2/DevTools"
import { InquirySignUp } from "../../Views/InquirySignUp"
import { useArtworkInquiryRequest } from "../../Hooks/useArtworkInquiryRequest"
import { signUp } from "v2/Utils/auth"
import { useInquiryContext } from "../../Hooks/useInquiryContext"
import { fill } from "../util"

jest.mock("v2/Utils/auth")
jest.mock("../../Hooks/useArtworkInquiryRequest")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("v2/Utils/wait", () => ({ wait: () => Promise.resolve() }))

describe("InquirySignUp", () => {
  const next = jest.fn()
  const submitArtworkInquiryRequest = jest.fn()

  beforeEach(() => {
    ;(useArtworkInquiryRequest as jest.Mock).mockImplementation(() => ({
      submitArtworkInquiryRequest,
    }))
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      next,
      inquiry: { email: "example@example.com" },
    }))
  })

  afterEach(() => {
    next.mockReset()
    submitArtworkInquiryRequest.mockReset()
  })

  it("renders correctly", () => {
    const wrapper = mount(<InquirySignUp />)

    expect(wrapper.html()).toContain("Create an account to send your message")
  })

  describe("success", () => {
    beforeEach(() => {
      ;(signUp as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "id", access_token: "token" } })
      )
    })

    it("signs up the user and sends the message", async () => {
      const wrapper = mount(<InquirySignUp />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Fill inputs
      fill(wrapper, "name", "Example Example")
      fill(wrapper, "email", "example@example.com")
      fill(wrapper, "password", "secret")

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      expect(submitArtworkInquiryRequest).toBeCalled()
      expect(next).toBeCalled()
    })
  })

  describe("error", () => {
    beforeEach(() => {
      ;(signUp as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error("something went wrong"))
      )
    })

    it("handles and displays the error to the user", async () => {
      const wrapper = mount(<InquirySignUp />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Fill inputs
      fill(wrapper, "name", "Example Example")
      fill(wrapper, "email", "example@example.com")
      fill(wrapper, "password", "secret")

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()
      expect(wrapper.html()).toContain("something went wrong")
    })
  })
})

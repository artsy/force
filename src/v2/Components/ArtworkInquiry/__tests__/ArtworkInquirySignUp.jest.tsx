import { mount } from "enzyme"
import React from "react"
import { flushPromiseQueue } from "v2/DevTools"
import { ArtworkInquirySignUp } from "../ArtworkInquirySignUp"
import { useArtworkInquiryRequest } from "../useArtworkInquiryRequest"
import { signUp } from "../util"

jest.mock("../util")
jest.mock("../useArtworkInquiryRequest")

const fill = (
  wrapper: ReturnType<typeof mount>,
  name: string,
  value: string
) => {
  const input = wrapper.find(`input[name="${name}"]`)
  ;(input.getDOMNode() as HTMLInputElement).value = value
  input.simulate("change")
}

describe("ArtworkInquirySignUp", () => {
  beforeEach(() => {
    ;(useArtworkInquiryRequest as jest.Mock).mockImplementation(() => ({
      submitArtworkInquiryRequest: () => Promise.resolve(),
    }))
  })

  it("renders correctly", () => {
    const wrapper = mount(<ArtworkInquirySignUp />)

    expect(wrapper.html()).toContain("Create an account to send your message")
  })

  describe("success", () => {
    beforeEach(() => {
      ;(signUp as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "id", access_token: "token" } })
      )
    })

    it("signs up the user and sends the message", async () => {
      const wrapper = mount(<ArtworkInquirySignUp />)

      expect(wrapper.html()).not.toContain("Your Message Has Been Sent")

      // Fill inputs
      fill(wrapper, "name", "Example Example")
      fill(wrapper, "email", "example@example.com")
      fill(wrapper, "password", "secret")

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      expect(wrapper.html()).toContain("Your Message Has Been Sent")
    })
  })

  describe("error", () => {
    beforeEach(() => {
      ;(signUp as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error("something went wrong"))
      )
    })

    it("handles and displays the error to the user", async () => {
      const wrapper = mount(<ArtworkInquirySignUp />)

      expect(wrapper.html()).not.toContain("Your Message Has Been Sent")

      // Fill inputs
      fill(wrapper, "name", "Example Example")
      fill(wrapper, "email", "example@example.com")
      fill(wrapper, "password", "secret")

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      expect(wrapper.html()).not.toContain("Your Message Has Been Sent")
      expect(wrapper.html()).toContain("something went wrong")
    })
  })
})

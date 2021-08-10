import { mount } from "enzyme"
import React from "react"
import { ArtworkInquiryLogin } from "../ArtworkInquiryLogin"
import { login } from "../util"
import { useArtworkInquiryRequest } from "../useArtworkInquiryRequest"
import { flushPromiseQueue } from "v2/DevTools"

jest.mock("../util")
jest.mock("../useArtworkInquiryRequest")
jest.mock("../ArtworkInquiryContext", () => ({
  useArtworkInquiryContext: () => ({
    inquiry: { email: "example@example.com" },
  }),
}))

const fill = (
  wrapper: ReturnType<typeof mount>,
  name: string,
  value: string
) => {
  const input = wrapper.find(`input[name="${name}"]`)
  ;(input.getDOMNode() as HTMLInputElement).value = value
  input.simulate("change")
}

describe("ArtworkInquiryLogin", () => {
  beforeEach(() => {
    ;(useArtworkInquiryRequest as jest.Mock).mockImplementation(() => ({
      submitArtworkInquiryRequest: () => Promise.resolve(),
    }))
  })

  it("renders correctly", () => {
    const wrapper = mount(<ArtworkInquiryLogin />)

    expect(wrapper.html()).toContain(
      "We found an Artsy account associated with example@example.com."
    )
  })

  describe("without two-factor auth", () => {
    beforeEach(() => {
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "id", access_token: "token" } })
      )
    })

    it("logs in and sends the message", async () => {
      const wrapper = mount(<ArtworkInquiryLogin />)

      expect(wrapper.html()).not.toContain("Your Message Has Been Sent")

      // Enter password
      fill(wrapper, "password", "secret")

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      expect(wrapper.html()).toContain("Your Message Has Been Sent")
    })
  })

  describe("with two-factor auth", () => {
    it("logs in and sends the message", async () => {
      const wrapper = mount(<ArtworkInquiryLogin />)

      expect(wrapper.html()).not.toContain("Your Message Has Been Sent")

      // Enter password
      fill(wrapper, "password", "secret")

      // Login will error asking for 2fa code
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error("missing two-factor authentication code"))
      )

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()
      wrapper.update()

      // Input two factor auth code
      fill(wrapper, "authenticationCode", "code")

      // Login works now
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "id", access_token: "token" } })
      )

      // Submit form again
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      expect(wrapper.html()).toContain("Your Message Has Been Sent")
    })
  })
})

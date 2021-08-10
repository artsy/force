import React from "react"
import { mount } from "enzyme"
import { ArtworkInquiryResetPassword } from "../ArtworkInquiryResetPassword"

jest.mock("../ArtworkInquiryContext", () => ({
  useArtworkInquiryContext: () => ({
    inquiry: { email: "example@example.com" },
  }),
}))

describe("ArtworkInquiryResetPassword", () => {
  it("renders correctly", () => {
    const wrapper = mount(<ArtworkInquiryResetPassword />)

    expect(wrapper.html()).toContain(
      "Please check your email (example@example.com) for instructions on how to reset your password."
    )
  })
})

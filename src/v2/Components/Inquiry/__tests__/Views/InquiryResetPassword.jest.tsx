import React from "react"
import { mount } from "enzyme"
import { InquiryResetPassword } from "../../Views/InquiryResetPassword"

jest.mock("../../InquiryContext", () => ({
  useInquiryContext: () => ({
    inquiry: { email: "example@example.com" },
  }),
}))

describe("InquiryResetPassword", () => {
  it("renders correctly", () => {
    const wrapper = mount(<InquiryResetPassword />)

    expect(wrapper.html()).toContain(
      "Please check your email (example@example.com) for instructions on how to reset your password."
    )
  })
})

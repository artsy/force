import { MobileForgotPasswordForm } from "v2/Components/Authentication/Mobile/ForgotPasswordForm"
import QuickInput from "v2/Components/QuickInput"
import { mount } from "enzyme"
import React from "react"

jest.mock("sharify", () => ({
  data: { RECAPTCHA_KEY: "recaptcha-api-key" },
}))

// FIXME: mock Formik async and remove setTimeout
describe("MobileForgotPasswordForm", () => {
  let props

  beforeEach(() => {
    props = {
      values: { email: "email@email.com" },
      handleSubmit: jest.fn(),
      handleTypeChange: jest.fn(),
    }
    window.grecaptcha.execute.mockClear()
  })

  const getWrapper = (passedProps = props) => {
    return mount(<MobileForgotPasswordForm {...passedProps} />)
  }

  it("renders the email input", () => {
    const wrapper = getWrapper()
    const input = wrapper.find(QuickInput)
    expect(input.length).toBe(1)
    expect(input.props().type).toEqual("email")
  })

  it("renders errors", done => {
    props.values = {}
    const wrapper = getWrapper()
    const button = wrapper.find("button")
    button.simulate("submit")
    wrapper.update()

    setTimeout(() => {
      expect(wrapper.html()).toMatch("Please enter a valid email.")
      done()
    })
  })

  describe("onSubmit", () => {
    it("calls handleSubmit with expected params", done => {
      const wrapper = getWrapper()
      const button = wrapper.find("button")
      button.simulate("submit")
      wrapper.update()
      setTimeout(() => {
        expect(props.handleSubmit.mock.calls[0][0].email).toBe(
          "email@email.com"
        )
        done()
      })
    })

    it("fires reCAPTCHA event", done => {
      const wrapper = getWrapper()
      const button = wrapper.find("button")
      button.simulate("submit")
      wrapper.update()
      setTimeout(() => {
        expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
          action: "forgot_submit",
        })
        done()
      })
    })
  })
})

import {
  BackButton,
  ForgotPassword,
  SubmitButton,
} from "v2/Components/Authentication/commonElements"
import { MobileLoginForm } from "v2/Components/Authentication/Mobile/LoginForm"
import QuickInput from "v2/Components/QuickInput"
import { mount } from "enzyme"
import React from "react"
import { ChangeEvents } from "../fixtures"
import { flushPromiseQueue } from "v2/DevTools"
import { Link } from "@artsy/palette"

jest.mock("sharify", () => ({
  data: { RECAPTCHA_KEY: "recaptcha-api-key" },
}))

jest.mock("v2/Components/Authentication/helpers", () => ({
  checkEmail: jest.fn().mockResolvedValue(true),
}))

// FIXME: mock Formik async and remove setTimeout
describe("MobileLoginForm", () => {
  let props

  beforeEach(() => {
    props = {
      values: {},
      handleSubmit: jest.fn(),
      handleTypeChange: jest.fn(),
      onFacebookLogin: jest.fn(),
      onAppleLogin: jest.fn(),
    }
    window.grecaptcha.execute.mockClear()
    location.assign = jest.fn()
  })

  const getWrapper = (passedProps = props) => {
    return mount(<MobileLoginForm {...passedProps} />)
  }

  it("renders the first step", () => {
    const wrapper = getWrapper()
    const input = wrapper.find(QuickInput)
    expect(input.length).toBe(1)
    expect(input.props().type).toEqual("email")
  })

  it("renders email errors", done => {
    const wrapper = getWrapper()
    const button = wrapper.find("button")
    button.simulate("submit")
    wrapper.update()

    setTimeout(() => {
      expect(wrapper.html()).toMatch("Please enter a valid email.")
      done()
    })
  })

  it("does not render email errors for social sign ups", done => {
    const wrapper = getWrapper()
    const socialLink = wrapper.find("Link").at(0)
    socialLink.simulate("click")
    wrapper.update()

    setTimeout(() => {
      expect(wrapper.html()).not.toMatch("Please enter a valid email.")
      done()
    })
  })

  it("renders password error", async () => {
    ;(props.handleSubmit as jest.Mock).mockImplementation((values, actions) => {
      actions.setStatus({ error: "some password error" })
    })

    const wrapper = getWrapper()
    const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
    inputEmail.onChange(ChangeEvents.email)
    wrapper.find(SubmitButton).simulate("click")

    await flushPromiseQueue()
    wrapper.update()

    const inputPass = wrapper.find(QuickInput).instance() as QuickInput
    inputPass.onChange(ChangeEvents.password)
    wrapper.find(SubmitButton).simulate("click")

    await flushPromiseQueue()
    wrapper.update()

    expect(props.handleSubmit.mock.calls[0][0]).toEqual({
      email: "email@email.com",
      password: "password",
    })
    expect(wrapper.html()).toMatch("some password error")
  })

  it("renders global errors", () => {
    props.error = "Some global server error"
    const wrapper = getWrapper()
    wrapper.update()
    expect(wrapper.html()).toMatch("Some global server error")
  })

  it("calls onBackButtonClicked if back button is clicked on first page", () => {
    props.onBackButtonClicked = jest.fn()
    const wrapper = getWrapper()
    wrapper.find(BackButton).simulate("click")
    expect(props.onBackButtonClicked).toBeCalled()
  })

  it("Forgot link appends existing query params", async () => {
    window.history.pushState(
      {},
      "Log In",
      "/login?intent=login&contextModule=header&destination=/"
    )

    const wrapper = getWrapper()
    // Advance to next form step
    const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
    inputEmail.onChange(ChangeEvents.email)
    wrapper.find(SubmitButton).simulate("click")
    await flushPromiseQueue()
    wrapper.update()

    wrapper
      .find(ForgotPassword)
      .find(Link)
      .simulate("click")
    expect(location.assign).toBeCalledWith(
      "/forgot?intent=login&contextModule=header&destination=/"
    )
  })

  it("Forgot link does not append params when not present", async () => {
    window.history.pushState({}, "Log In", "/login")
    const wrapper = getWrapper()
    // Advance to next form step
    const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
    inputEmail.onChange(ChangeEvents.email)
    wrapper.find(SubmitButton).simulate("click")
    await flushPromiseQueue()
    wrapper.update()

    wrapper
      .find(ForgotPassword)
      .find(Link)
      .simulate("click")
    expect(location.assign).toBeCalledWith("/forgot")
  })

  describe("onSubmit", () => {
    it("calls handleSubmit with expected params", done => {
      const wrapper = getWrapper()
      const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
      inputEmail.onChange(ChangeEvents.email)
      wrapper.find(SubmitButton).simulate("click")

      setTimeout(() => {
        wrapper.update()
        const inputPass = wrapper.find(QuickInput).instance() as QuickInput
        inputPass.onChange(ChangeEvents.password)
        wrapper.find(SubmitButton).simulate("click")

        setTimeout(() => {
          expect(props.handleSubmit.mock.calls[0][0]).toEqual({
            email: "email@email.com",
            password: "password",
          })
          done()
        })
      })
    })

    it("calls handleSubmit with expected params when server requests a two-factor authentication code", done => {
      props.error = "missing two-factor authentication code"
      props.actions = {}
      const wrapper = getWrapper()
      const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
      inputEmail.onChange(ChangeEvents.email)
      wrapper.find(SubmitButton).simulate("click")

      setTimeout(() => {
        wrapper.update()
        const inputPass = wrapper.find(QuickInput).instance() as QuickInput
        inputPass.onChange(ChangeEvents.password)
        wrapper.find(SubmitButton).simulate("click")

        setTimeout(() => {
          wrapper.update()
          const inputOtp = wrapper.find(QuickInput).instance() as QuickInput
          inputOtp.onChange(ChangeEvents.otpAttempt)
          wrapper.find(SubmitButton).simulate("click")

          setTimeout(() => {
            expect(props.handleSubmit.mock.calls[0][0]).toEqual({
              email: "email@email.com",
              password: "password",
              otp_attempt: "123456",
            })
            done()
          })
        })
      })
    })

    it("fires reCAPTCHA event", done => {
      const wrapper = getWrapper()
      const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
      inputEmail.onChange(ChangeEvents.email)
      wrapper.find(SubmitButton).simulate("click")

      setTimeout(() => {
        wrapper.update()
        const inputPass = wrapper.find(QuickInput).instance() as QuickInput
        inputPass.onChange(ChangeEvents.password)
        wrapper.find(SubmitButton).simulate("click")

        setTimeout(() => {
          expect(window.grecaptcha.execute).toBeCalledWith(
            "recaptcha-api-key",
            {
              action: "login_submit",
            }
          )
          done()
        })
      })
    })
  })
})

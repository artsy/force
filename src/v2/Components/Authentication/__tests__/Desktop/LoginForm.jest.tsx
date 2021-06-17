import { LoginForm } from "v2/Components/Authentication/Desktop/LoginForm"
import { mount } from "enzyme"
import React from "react"
import { ChangeEvents, LoginValues } from "../fixtures"
import QuickInput from "v2/Components/QuickInput"
import { flushPromiseQueue } from "v2/DevTools"

jest.mock("sharify", () => ({ data: { RECAPTCHA_KEY: "recaptcha-api-key" } }))

// FIXME: mock Formik async and remove setTimeout
describe("LoginForm", () => {
  let props

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
      onFacebookLogin: jest.fn(),
      onAppleLogin: jest.fn(),
    }
    window.grecaptcha.execute.mockClear()
  })

  const getWrapper = (passedProps = props) => {
    return mount(<LoginForm {...passedProps} />)
  }

  it("renders errors", done => {
    const wrapper = getWrapper()
    const input = wrapper.find(`input[name="email"]`)
    input.simulate("blur")
    wrapper.update()

    setTimeout(() => {
      expect(wrapper.html()).toMatch("Please enter a valid email.")
      done()
    })
  })

  it("clears error after input change", done => {
    props.error = "Some global server error"
    const wrapper = getWrapper()
    const input = wrapper.find(`input[name="email"]`)
    expect((wrapper.state() as any).error).toEqual("Some global server error")
    input.simulate("change")
    wrapper.update()

    setTimeout(() => {
      expect((wrapper.state() as any).error).toEqual(null)
      done()
    })
  })

  it("renders spinner", done => {
    props.values = LoginValues
    const wrapper = getWrapper()
    const input = wrapper.find(`Formik`)
    input.simulate("submit")
    wrapper.update()

    setTimeout(() => {
      const submitButton = wrapper.find(`SubmitButton`)
      expect((submitButton.props() as any).loading).toEqual(true)
      done()
    })
  })

  describe("onSubmit", () => {
    it("calls handleSubmit with expected params", done => {
      props.values = LoginValues
      const wrapper = getWrapper()
      const input = wrapper.find(`Formik`)
      input.simulate("submit")
      wrapper.update()

      setTimeout(() => {
        expect(props.handleSubmit).toBeCalledWith(
          {
            email: "foo@bar.com",
            password: "password123",
          },
          expect.anything()
        )
        done()
      })
    })

    it("calls handleSubmit with expected params when server requests a two-factor authentication code", async () => {
      props.error = "missing two-factor authentication code"
      props.values = LoginValues
      const wrapper = getWrapper()
      const inputOtp = wrapper
        .find(QuickInput)
        .filterWhere(el => el.prop("name") === "otp_attempt")
        .instance() as QuickInput
      inputOtp.onChange(ChangeEvents.otpAttempt)
      const input = wrapper.find(`Formik`)
      input.simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(props.handleSubmit).toBeCalledWith(
        {
          email: "foo@bar.com",
          password: "password123",
          otp_attempt: "123456",
        },
        expect.anything()
      )
    })

    it("renders password error", async () => {
      ;(props.handleSubmit as jest.Mock).mockImplementation(
        (values, actions) => {
          actions.setStatus({ error: "some password error" })
        }
      )

      const wrapper = getWrapper()

      const inputEmail = wrapper
        .find(QuickInput)
        .filterWhere(el => el.prop("name") === "email")
        .instance() as QuickInput
      inputEmail.onChange(ChangeEvents.email)

      const inputPass = wrapper
        .find(QuickInput)
        .filterWhere(el => el.prop("name") === "password")
        .instance() as QuickInput
      inputPass.onChange(ChangeEvents.password)

      const form = wrapper.find(`Formik`)
      form.simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.html()).toMatch("some password error")

      expect(props.handleSubmit.mock.calls[0][0]).toEqual({
        email: "email@email.com",
        password: "password",
      })
    })

    it("does not render email errors for social sign ups", done => {
      const wrapper = getWrapper()
      const socialLink = wrapper.find("Link").at(1)
      socialLink.simulate("click")
      wrapper.update()

      setTimeout(() => {
        expect(wrapper.html()).not.toMatch("Please enter a valid email.")
        done()
      })
    })

    it("shows 2FA one-time password prompt", async () => {
      ;(props.handleSubmit as jest.Mock).mockImplementation(
        (values, actions) => {
          if (!values.otp_attempt) {
            actions.setStatus({
              error: "missing two-factor authentication code",
            })
          } else if (values.otp_attempt !== "123456") {
            actions.setStatus({
              error: "invalid two-factor authentication code",
            })
          } else {
            actions.setStatus(null)
          }
        }
      )

      const wrapper = getWrapper()

      const inputEmail = wrapper
        .find(QuickInput)
        .filterWhere(el => el.prop("name") === "email")
        .instance() as QuickInput
      inputEmail.onChange(ChangeEvents.email)

      const inputPass = wrapper
        .find(QuickInput)
        .filterWhere(el => el.prop("name") === "password")
        .instance() as QuickInput
      inputPass.onChange(ChangeEvents.password)

      const form = wrapper.find(`Formik`)
      form.simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.html()).not.toMatch(
        "missing two-factor authentication code"
      )
      expect(props.handleSubmit.mock.calls[0][0]).toEqual({
        email: "email@email.com",
        password: "password",
      })

      const inputOtp = wrapper
        .find(QuickInput)
        .filterWhere(el => el.prop("name") === "otp_attempt")
        .instance() as QuickInput
      inputOtp.onChange(ChangeEvents.invalidOtpAttempt)
      form.simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.html()).toMatch("invalid two-factor authentication code")
      expect(props.handleSubmit.mock.calls[1][0]).toEqual({
        email: "email@email.com",
        password: "password",
        otp_attempt: "111111",
      })

      inputOtp.onChange(ChangeEvents.otpAttempt)
      form.simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.html()).not.toMatch("Error")
      expect(props.handleSubmit.mock.calls[2][0]).toEqual({
        email: "email@email.com",
        password: "password",
        otp_attempt: "123456",
      })
    })

    it("fires reCAPTCHA event", done => {
      props.values = LoginValues
      const wrapper = getWrapper()
      const input = wrapper.find(`Formik`)
      input.simulate("submit")

      setTimeout(() => {
        expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
          action: "login_submit",
        })
        done()
      })
    })
  })
})

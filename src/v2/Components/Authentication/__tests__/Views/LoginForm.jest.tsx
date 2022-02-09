/* eslint-disable jest/no-done-callback */
import { LoginForm } from "v2/Components/Authentication/Views/LoginForm"
import { mount } from "enzyme"
import { ChangeEvents, LoginValues } from "../fixtures"
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
      onGoogleLogin: jest.fn(),
    }
    window.grecaptcha.execute.mockClear()
  })

  const getWrapper = (passedProps = props) => {
    return mount(<LoginForm {...passedProps} />)
  }

  it("renders errors", async () => {
    const wrapper = getWrapper({ values: { email: "" } })

    wrapper.find("form").simulate("submit")

    await flushPromiseQueue()

    expect(wrapper.html()).toMatch("Please enter a valid email.")
  })

  it("clears error after input change", done => {
    const wrapper = getWrapper({
      values: { email: "" },
      error: "Some global server error",
    })
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
    const wrapper = getWrapper({ values: LoginValues })
    const input = wrapper.find("form")
    input.simulate("submit")
    wrapper.update()

    setTimeout(() => {
      const submitButton = wrapper.find("Button").at(0)
      expect((submitButton.props() as any).loading).toEqual(true)
      done()
    })
  })

  describe("onSubmit", () => {
    it("calls handleSubmit with expected params", done => {
      props.values = LoginValues
      const wrapper = getWrapper()
      const input = wrapper.find("form")
      input.simulate("submit")
      wrapper.update()

      setTimeout(() => {
        expect(props.handleSubmit).toBeCalledWith(
          {
            email: "foo@bar.com",
            password: "password123", // pragma: allowlist secret
            otpRequired: false,
          },
          expect.anything()
        )
        done()
      })
    })

    it("calls handleSubmit with expected params when server requests a two-factor authentication code", async () => {
      const wrapper = getWrapper({
        ...props,
        values: { ...LoginValues, otp_attempt: "" },
        error: "missing two-factor authentication code",
      })

      wrapper
        .find("input[name='otp_attempt']")
        .simulate("change", ChangeEvents.otpAttempt)

      wrapper.find("form").simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(props.handleSubmit).toBeCalledWith(
        {
          email: "foo@bar.com",
          password: "password123", // pragma: allowlist secret
          otp_attempt: "123456",
          otpRequired: true,
        },
        expect.anything()
      )
    })

    it("renders password error", async () => {
      ;(props.handleSubmit as jest.Mock).mockImplementation(
        (_values, actions) => {
          actions.setStatus({ error: "some password error" })
        }
      )

      const wrapper = getWrapper({
        ...props,
        values: { email: "", password: "" },
      })

      wrapper.find('input[name="email"]').simulate("change", ChangeEvents.email)

      wrapper
        .find('input[name="password"]')
        .simulate("change", ChangeEvents.password)

      wrapper.find("form").simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.html()).toMatch("some password error")

      expect(props.handleSubmit.mock.calls[0][0]).toEqual({
        email: "email@email.com",
        password: "password", // pragma: allowlist secret
        otpRequired: false,
      })
    })

    it("does not render email errors for social sign ups", done => {
      const wrapper = getWrapper()
      const socialLink = wrapper.find("IconButton").at(0)

      expect(socialLink.text()).toContain("Continue with Apple")

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

      const wrapper = getWrapper({
        ...props,
        values: { email: "", password: "", otp_attempt: "" },
      })

      wrapper.find('input[name="email"]').simulate("change", ChangeEvents.email)

      wrapper
        .find('input[name="password"]')
        .simulate("change", ChangeEvents.password)

      const form = wrapper.find("form")
      form.simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.html()).not.toMatch(
        "missing two-factor authentication code"
      )

      expect(props.handleSubmit.mock.calls[0][0]).toEqual({
        email: "email@email.com",
        password: "password", // pragma: allowlist secret
        otpRequired: false,
        otp_attempt: "",
      })

      const inputOtp = wrapper.find('input[name="otp_attempt"]')

      inputOtp.simulate("change", ChangeEvents.invalidOtpAttempt)

      form.simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.html()).toMatch("invalid two-factor authentication code")
      expect(props.handleSubmit.mock.calls[1][0]).toEqual({
        email: "email@email.com",
        password: "password", // pragma: allowlist secret
        otp_attempt: "111111",
        otpRequired: true,
      })

      inputOtp.simulate("change", ChangeEvents.otpAttempt)
      form.simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.html()).not.toMatch("Error")
      expect(props.handleSubmit.mock.calls[2][0]).toEqual({
        email: "email@email.com",
        password: "password", // pragma: allowlist secret
        otp_attempt: "123456",
        otpRequired: true,
      })
    })

    it("shows on-demand one-time password prompt", async () => {
      ;(props.handleSubmit as jest.Mock).mockImplementation(
        (values, actions) => {
          if (!values.otp_attempt) {
            actions.setStatus({
              error: "missing on-demand authentication code",
            })
          } else if (values.otp_attempt !== "123456") {
            actions.setStatus({
              error: "invalid on-demand authentication code",
            })
          } else {
            actions.setStatus(null)
          }
        }
      )

      const wrapper = getWrapper({
        ...props,
        values: { email: "", password: "", otp_attempt: "" },
      })

      wrapper.find('input[name="email"]').simulate("change", ChangeEvents.email)

      wrapper
        .find('input[name="password"]')
        .simulate("change", ChangeEvents.password)

      const form = wrapper.find("form")

      form.simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.html()).not.toMatch(
        "missing on-demand authentication code"
      )
      expect(wrapper.html()).toMatch(
        "Your safety and security are important to us. Please check your email for a one-time authentication code to complete your login."
      )

      expect(props.handleSubmit.mock.calls[0][0]).toEqual({
        email: "email@email.com",
        password: "password", // pragma: allowlist secret
        otpRequired: false,
        otp_attempt: "",
      })
      expect((wrapper.state() as any).otpRequired).toEqual(true)

      const inputOtp = wrapper.find('input[name="otp_attempt"]')
      inputOtp.simulate("change", ChangeEvents.invalidOtpAttempt)
      form.simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.html()).toMatch("invalid on-demand authentication code")
      expect(props.handleSubmit.mock.calls[1][0]).toEqual({
        email: "email@email.com",
        password: "password", // pragma: allowlist secret
        otp_attempt: "111111",
        otpRequired: true,
      })

      inputOtp.simulate("change", ChangeEvents.otpAttempt)
      form.simulate("submit")

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.html()).not.toMatch("Error")
      expect(props.handleSubmit.mock.calls[2][0]).toEqual({
        email: "email@email.com",
        password: "password", // pragma: allowlist secret
        otp_attempt: "123456",
        otpRequired: true,
      })
    })

    it("fires reCAPTCHA event", done => {
      props.values = LoginValues
      const wrapper = getWrapper()
      const input = wrapper.find("form")
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

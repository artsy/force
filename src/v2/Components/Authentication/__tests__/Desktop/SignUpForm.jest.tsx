import { Link } from "@artsy/palette"
import { SignUpForm } from "v2/Components/Authentication/Desktop/SignUpForm"
import { mount } from "enzyme"
import { Formik } from "formik"
import React from "react"
import { SignupValues } from "../fixtures"

const mockEnableRequestSignInWithApple = jest.fn()

jest.mock("sharify", () => ({
  data: {
    RECAPTCHA_KEY: "recaptcha-api-key",
    get ENABLE_SIGN_IN_WITH_APPLE() {
      return mockEnableRequestSignInWithApple()
    },
  },
}))

// FIXME: mock Formik async and remove setTimeout
describe("SignUpForm", () => {
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
    return mount(<SignUpForm {...passedProps} />)
  }

  describe("onSubmit", () => {
    it("calls handleSubmit with expected params", done => {
      props.values = SignupValues
      const wrapper = getWrapper()
      const formik = wrapper.find("Formik")
      formik.simulate("submit")

      setTimeout(() => {
        expect(props.handleSubmit).toBeCalledWith(
          {
            email: "foo@bar.com",
            password: "password123",
            name: "John Doe",
            accepted_terms_of_service: true,
            recaptcha_token: "recaptcha-token",
          },
          expect.anything()
        )
        done()
      })
    })

    it("fires reCAPTCHA event", done => {
      props.values = SignupValues
      const wrapper = getWrapper()
      const formik = wrapper.find("Formik")
      formik.simulate("submit")

      setTimeout(() => {
        expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
          action: "signup_submit",
        })
        done()
      })
    })
  })

  it("renders captcha disclaimer if showRecaptchaDisclaimer", () => {
    props.showRecaptchaDisclaimer = true
    const wrapper = getWrapper()
    expect(wrapper.text()).toMatch(
      "This site is protected by reCAPTCHA and the Google Privacy Policy Terms of Service apply."
    )
  })

  it("renders errors", done => {
    const wrapper = getWrapper()
    const button = wrapper.find(`input[name="email"]`)
    button.simulate("blur")
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
    props.values = SignupValues
    const wrapper = getWrapper()
    const input = wrapper.find(Formik)

    input.simulate("submit")
    wrapper.update()

    setTimeout(() => {
      const submitButton = wrapper.find(`SubmitButton`)
      expect((submitButton.props() as any).loading).toEqual(true)
      done()
    })
  })

  it("calls apple callback on tapping link", done => {
    mockEnableRequestSignInWithApple.mockReturnValue(true)
    props.values = SignupValues
    const wrapper = getWrapper()

    wrapper
      .find(Link)
      .at(2)
      .simulate("click")

    setTimeout(() => {
      expect(props.onAppleLogin).toBeCalled()
      done()
    })
  })

  it("renders apple link with feature flag enabled", done => {
    mockEnableRequestSignInWithApple.mockReturnValue(true)
    props.onAppleLogin = jest.fn()
    props.values = SignupValues
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain("Apple")
    done()
  })

  it("does not render apple link with feature flag disabled", done => {
    mockEnableRequestSignInWithApple.mockReturnValue(false)
    props.onAppleLogin = jest.fn()
    props.values = SignupValues
    const wrapper = getWrapper()
    expect(wrapper.text()).not.toContain("Apple")
    done()
  })

  it("does not call apple callback without accepting terms of service", done => {
    props.onAppleLogin = jest.fn()
    props.values = SignupValues
    props.values.accepted_terms_of_service = false
    const wrapper = getWrapper()

    wrapper
      .find(Link)
      .at(2)
      .simulate("click")

    wrapper.update()

    setTimeout(() => {
      expect(props.onAppleLogin).not.toBeCalled()
      done()
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
})

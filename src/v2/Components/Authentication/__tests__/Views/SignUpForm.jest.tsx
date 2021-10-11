/* eslint-disable jest/no-done-callback */
import React from "react"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { tests } from "v2/Components/Authentication/Views/SignUpForm"
import { SignupValues } from "../fixtures"
import { ContextModule, Intent } from "@artsy/cohesion"

jest.unmock("react-relay")

jest.mock("sharify", () => ({
  data: {
    RECAPTCHA_KEY: "recaptcha-api-key",
  },
}))

describe("SignUpForm", () => {
  let passedProps

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <tests.SignUpFormFragmentContainer
          requestLocation={props.requestLocation}
          {...passedProps}
        />
      )
    },
    query: graphql`
      query SignUpFormLocation_tests_Query($ip: String!) {
        requestLocation(ip: $ip) {
          ...SignUpForm_requestLocation
        }
      }
    `,
  })

  beforeEach(() => {
    jest.clearAllMocks()

    passedProps = {
      contextModule: ContextModule.consignSubmissionFlow,
      handleSubmit: jest.fn(),
      intent: Intent.consign,
      onAppleLogin: jest.fn(),
      onFacebookLogin: jest.fn(),
      showRecaptchaDisclaimer: false,
      values: SignupValues,
    }
  })

  describe("general stuff", () => {
    it("renders errors", done => {
      passedProps.values.email = ""
      const wrapper = getWrapper()
      const button = wrapper.find(`input[name="email"]`)
      button.simulate("blur")

      setTimeout(() => {
        expect(wrapper.html()).toMatch("Please enter a valid email.")
        done()
      })
    })
  })

  describe("with a GDPR country code", () => {
    const countryCode = "GB"

    it("uses the GDPR label and shows the email checkbox", () => {
      const wrapper = getWrapper({
        RequestLocation: () => ({ countryCode }),
      })

      expect(wrapper.find("GdprLabel")).toHaveLength(1)
      expect(wrapper.find("EmailSubscriptionCheckbox")).toHaveLength(1)
    })
  })

  describe("with a non-GDPR country code", () => {
    const countryCode = "US"

    it("uses the fallback label and hides the email checkbox", () => {
      const wrapper = getWrapper({
        RequestLocation: () => ({ countryCode }),
      })

      expect(wrapper.find("FallbackLabel")).toHaveLength(1)
      expect(wrapper.find("EmailSubscriptionCheckbox")).toHaveLength(0)
    })
  })

  describe("recaptcha", () => {
    it("displays recaptcha warning", () => {
      passedProps.showRecaptchaDisclaimer = true
      const wrapper = getWrapper()
      const warning =
        "This site is protected by reCAPTCHA and the Google Privacy Policy Terms of Service apply."

      expect(wrapper.text()).toMatch(warning)
    })
  })

  describe("signup with Apple", () => {
    it("calls apple callback on tapping the button", done => {
      passedProps.values.accepted_terms_of_service = true
      const wrapper = getWrapper()

      const appleLink = wrapper.find("Clickable").at(0)
      expect(appleLink.text()).toEqual("Apple")
      appleLink.simulate("click")

      setTimeout(() => {
        expect(passedProps.onAppleLogin).toHaveBeenCalled()
        done()
      })
    })

    it("calls facebook callback on tapping the button", done => {
      passedProps.values.accepted_terms_of_service = true
      const wrapper = getWrapper()

      const appleLink = wrapper.find("Clickable").at(1)
      expect(appleLink.text()).toEqual("Facebook")
      appleLink.simulate("click")

      setTimeout(() => {
        expect(passedProps.onFacebookLogin).toHaveBeenCalled()
        done()
      })
    })

    it("does not call apple callback without accepting terms", done => {
      passedProps.values.accepted_terms_of_service = false
      const wrapper = getWrapper()

      const appleLink = wrapper.find("Clickable").at(0)
      expect(appleLink.text()).toEqual("Apple")
      appleLink.simulate("click")

      setTimeout(() => {
        expect(passedProps.onAppleLogin).not.toHaveBeenCalled()
        done()
      })
    })

    it("does not render email errors for social sign ups", done => {
      passedProps.values.accepted_terms_of_service = false
      const wrapper = getWrapper()

      const appleLink = wrapper.find("Clickable").at(0)
      expect(appleLink.text()).toEqual("Apple")
      appleLink.simulate("click")

      setTimeout(() => {
        expect(wrapper.html()).not.toMatch("Please enter a valid email.")
        done()
      })
    })
  })

  // These tests are skipped due to an issue with the formik onChange handlers that aren’t firing correctly
  // Plan is to explore Cypress integration testing for the Sign Up Flow to cover these tests scope
  // TODO: JIRA TICKET GRO-353: Add Cyprus based integration tests to Sign Up Flow
  describe.skip("Unit testing that needs to be bundled under Cypress Integration", () => {
    it("clears error after input change", done => {
      passedProps.error = "Some global server error"
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

    it("leaves email flag alone when accepting terms", done => {
      passedProps.values.accepted_terms_of_service = false
      passedProps.values.agreed_to_receive_emails = false

      const wrapper = getWrapper({
        RequestLocation: () => ({
          countryCode: "I_DONT_KNOW_WHAT_THIS_VALUE_IS",
        }),
      })

      const termsInput = wrapper.find("input[name='accepted_terms_of_service']")
      termsInput.simulate("change", { currentTarget: { checked: true } })
      const formik = wrapper.find("Formik")
      formik.simulate("submit")

      setTimeout(() => {
        const calls = passedProps.handleSubmit.mock.calls
        const {
          accepted_terms_of_service,
          agreed_to_receive_emails,
        } = calls[0][0]

        expect(accepted_terms_of_service).toEqual(true)
        expect(agreed_to_receive_emails).toEqual(false)

        done()
      })
    })

    it("mixes in the recaptcha token", done => {
      const wrapper = getWrapper()
      const formik = wrapper.find("Formik")
      formik.simulate("submit")

      setTimeout(() => {
        const calls = passedProps.handleSubmit.mock.calls
        const { recaptcha_token } = calls[0][0]

        expect(recaptcha_token).toEqual("recaptcha-token")

        done()
      })
    })
  })
})

/* eslint-disable jest/no-done-callback */
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { tests } from "v2/Components/Authentication/Views/SignUpForm"
import { SignupValues } from "../fixtures"
import { ContextModule, Intent } from "@artsy/cohesion"
import { flushPromiseQueue } from "v2/DevTools"

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
      query SignUpFormLocation_tests_Query($ip: String!) @relay_test_operation {
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
      onGoogleLogin: jest.fn(),
      showRecaptchaDisclaimer: false,
      values: SignupValues,
    }
  })

  it("renders errors", async () => {
    passedProps.values.email = ""
    const wrapper = getWrapper()

    wrapper.find("form").simulate("submit")

    await flushPromiseQueue()

    expect(wrapper.html()).toMatch("Please enter a valid email.")
  })

  describe("with a GDPR country code", () => {
    const countryCode = "GB"

    it("uses the GDPR label and shows the email checkbox", () => {
      const wrapper = getWrapper({
        RequestLocation: () => ({ countryCode }),
      })

      expect(wrapper.text()).toContain(
        "By checking this box, you consent to our"
      )
      expect(wrapper.text()).toContain(
        "Dive deeper into the art market with Artsy emails."
      )
    })
  })

  describe("with a non-GDPR country code", () => {
    const countryCode = "US"

    it("uses the fallback label and hides the email checkbox", () => {
      const wrapper = getWrapper({
        RequestLocation: () => ({ countryCode }),
      })

      expect(wrapper.text()).toContain("I agree to the")
      expect(wrapper.text()).not.toContain(
        "Dive deeper into the art market with Artsy emails."
      )
    })
  })

  describe("with a missing country code", () => {
    const countryCode = null

    it("uses the GDPR label and shows the email checkbox", () => {
      const wrapper = getWrapper({
        RequestLocation: () => ({ countryCode }),
      })

      expect(wrapper.text()).toContain(
        "By checking this box, you consent to our"
      )
      expect(wrapper.text()).toContain(
        "Dive deeper into the art market with Artsy emails."
      )
    })
  })

  describe("recaptcha", () => {
    it("displays recaptcha warning", () => {
      passedProps.showRecaptchaDisclaimer = true
      const wrapper = getWrapper()

      expect(wrapper.text()).toMatch(
        "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply."
      )
    })
  })

  describe("signup with social auth providers", () => {
    it("calls apple callback on tapping the button", done => {
      passedProps.values.accepted_terms_of_service = true
      const wrapper = getWrapper()

      const appleLink = wrapper
        .find("Button")
        .findWhere(node => node.text().includes("Continue with Apple"))
        .first()

      appleLink.simulate("click")

      setTimeout(() => {
        expect(passedProps.onAppleLogin).toHaveBeenCalled()
        done()
      })
    })

    it("calls facebook callback on tapping the button", done => {
      passedProps.values.accepted_terms_of_service = true
      const wrapper = getWrapper()

      const facebookLink = wrapper
        .find("Button")
        .findWhere(node => node.text().includes("Continue with Facebook"))
        .first()

      facebookLink.simulate("click")

      setTimeout(() => {
        expect(passedProps.onFacebookLogin).toHaveBeenCalled()
        done()
      })
    })

    it("calls google callback on tapping the button", done => {
      passedProps.values.accepted_terms_of_service = true
      const wrapper = getWrapper()

      const googleLink = wrapper
        .find("Button")
        .findWhere(node => node.text().includes("Continue with Google"))
        .first()

      googleLink.simulate("click")

      setTimeout(() => {
        expect(passedProps.onGoogleLogin).toHaveBeenCalled()
        done()
      })
    })

    it("does not call apple callback without accepting terms", done => {
      passedProps.values.accepted_terms_of_service = false
      const wrapper = getWrapper()

      const appleLink = wrapper
        .find("Button")
        .findWhere(node => node.text().includes("Continue with Apple"))
        .first()

      appleLink.simulate("click")

      setTimeout(() => {
        expect(passedProps.onAppleLogin).not.toHaveBeenCalled()
        done()
      })
    })

    it("does not render email errors for social sign ups", done => {
      passedProps.values.accepted_terms_of_service = false
      const wrapper = getWrapper()

      const appleLink = wrapper
        .find("Button")
        .findWhere(node => node.text().includes("Continue with Apple"))
        .first()

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
  // eslint-disable-next-line jest/no-disabled-tests
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

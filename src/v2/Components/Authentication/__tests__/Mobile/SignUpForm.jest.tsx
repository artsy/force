import { SubmitButton } from "v2/Components/Authentication/commonElements"
import { MobileSignUpForm } from "v2/Components/Authentication/Mobile/SignUpForm"
import Checkbox from "v2/Components/Checkbox"
import QuickInput from "v2/Components/QuickInput"
import { mount } from "enzyme"
import React from "react"
import { ChangeEvents } from "../fixtures"
import { flushPromiseQueue } from "v2/DevTools"

jest.mock("sharify", () => ({
  data: { RECAPTCHA_KEY: "recaptcha-api-key" },
}))

jest.mock("v2/Components/Authentication/helpers", () => ({
  checkEmail: jest.fn().mockResolvedValue(true),
}))

// FIXME: mock Formik async and remove setTimeout
describe("MobileSignUpForm", () => {
  let props

  const getWrapper = (passedProps = props) => {
    return mount(<MobileSignUpForm {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      values: {},
      handleSubmit: jest.fn(),
      handleTypeChange: jest.fn(),
    }
    window.grecaptcha.execute.mockClear()
  })

  it("renders the first step", () => {
    const wrapper = getWrapper()
    const input = wrapper.find(QuickInput)
    expect(input.length).toBe(1)
    expect(input.props().type).toEqual("email")
  })

  it("advances and renders the second step", done => {
    const wrapper = getWrapper()
    const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
    const termsCheckbox = wrapper.find(`Checkbox`).instance() as Checkbox
    inputEmail.onChange(ChangeEvents.email)
    termsCheckbox.onChange(ChangeEvents.accepted_terms_of_service)
    wrapper.find(SubmitButton).simulate("click")

    setTimeout(() => {
      wrapper.update()
      expect(wrapper.find(QuickInput).props().type).toEqual("password")
      done()
    })
  })

  it("advances and renders the third step", done => {
    const wrapper = getWrapper()
    const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
    const termsCheckbox = wrapper.find(`Checkbox`).instance() as Checkbox
    inputEmail.onChange(ChangeEvents.email)
    termsCheckbox.onChange(ChangeEvents.accepted_terms_of_service)
    wrapper.find(SubmitButton).simulate("click")

    setTimeout(() => {
      wrapper.update()
      const inputPass = wrapper.find(QuickInput).instance() as QuickInput
      inputPass.onChange(ChangeEvents.password)
      wrapper.find(SubmitButton).simulate("click")

      setTimeout(() => {
        wrapper.update()
        expect(wrapper.find(QuickInput).props().label).toEqual("Name")
        expect(wrapper.find(QuickInput).props().type).toEqual("text")
        done()
      })
    })
  })

  describe("onSubmit", () => {
    it("calls handleSubmit with expected params", done => {
      const wrapper = getWrapper()
      const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
      const termsCheckbox = wrapper.find(`Checkbox`).instance() as Checkbox
      inputEmail.onChange(ChangeEvents.email)
      termsCheckbox.onChange(ChangeEvents.accepted_terms_of_service)
      wrapper.find(SubmitButton).simulate("click")

      setTimeout(() => {
        wrapper.update()
        const inputPass = wrapper.find(QuickInput).instance() as QuickInput
        inputPass.onChange(ChangeEvents.password)
        wrapper.find(SubmitButton).simulate("click")

        setTimeout(() => {
          wrapper.update()
          const inputName = wrapper.find(QuickInput).instance() as QuickInput
          inputName.onChange(ChangeEvents.name)
          wrapper.find(SubmitButton).simulate("click")

          setTimeout(() => {
            expect(props.handleSubmit.mock.calls[0][0]).toEqual({
              email: "email@email.com",
              accepted_terms_of_service: true,
              password: "password",
              name: "User Name",
              recaptcha_token: "recaptcha-token",
            })
            done()
          })
        })
      })
    })

    it("fires reCAPTCHA event", done => {
      const wrapper = getWrapper()
      const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
      const termsCheckbox = wrapper.find(`Checkbox`).instance() as Checkbox
      inputEmail.onChange(ChangeEvents.email)
      termsCheckbox.onChange(ChangeEvents.accepted_terms_of_service)
      wrapper.find(SubmitButton).simulate("click")

      setTimeout(() => {
        wrapper.update()
        const inputPass = wrapper.find(QuickInput).instance() as QuickInput
        inputPass.onChange(ChangeEvents.password)
        wrapper.find(SubmitButton).simulate("click")

        setTimeout(() => {
          wrapper.update()
          const inputName = wrapper.find(QuickInput).instance() as QuickInput
          inputName.onChange(ChangeEvents.name)
          wrapper.find(SubmitButton).simulate("click")

          setTimeout(() => {
            expect(window.grecaptcha.execute).toBeCalledWith(
              "recaptcha-api-key",
              {
                action: "signup_submit",
              }
            )
            done()
          })
        })
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
    const button = wrapper.find("button")
    button.simulate("submit")
    wrapper.update()

    setTimeout(() => {
      expect(wrapper.html()).toMatch("Please enter a valid email.")
      done()
    })
  })

  it("renders password error", async () => {
    ;(props.handleSubmit as jest.Mock).mockImplementation((values, actions) => {
      actions.setStatus({ error: "some password error" })
    })

    const wrapper = getWrapper()
    const inputEmail = wrapper.find(QuickInput).instance() as QuickInput
    const termsCheckbox = wrapper.find(`Checkbox`).instance() as Checkbox
    inputEmail.onChange(ChangeEvents.email)
    termsCheckbox.onChange(ChangeEvents.accepted_terms_of_service)
    wrapper.find(SubmitButton).simulate("click")

    await flushPromiseQueue()
    wrapper.update()

    const inputPass = wrapper.find(QuickInput).instance() as QuickInput
    inputPass.onChange(ChangeEvents.password)
    wrapper.find(SubmitButton).simulate("click")

    await flushPromiseQueue()
    wrapper.update()

    const inputName = wrapper.find(QuickInput).instance() as QuickInput
    inputName.onChange(ChangeEvents.name)
    wrapper.find(SubmitButton).simulate("click")

    await flushPromiseQueue()
    wrapper.update()

    expect(props.handleSubmit.mock.calls[0][0]).toEqual({
      email: "email@email.com",
      accepted_terms_of_service: true,
      password: "password",
      name: "User Name",
      recaptcha_token: "recaptcha-token",
    })
    expect(wrapper.html()).toMatch("some password error")
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

  it("renders the default title", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain("Sign up for Artsy")
  })

  it("renders the specified title", () => {
    props.title = "Sign up to follow Andy Warhol"
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain("Sign up to follow Andy Warhol")
  })

  it("renders global errors", () => {
    props.error = "Some global server error"
    const wrapper = getWrapper()
    wrapper.update()
    expect(wrapper.html()).toMatch("Some global server error")
  })
})

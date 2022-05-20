import { ForgotPasswordForm } from "v2/Components/Authentication/Views/ForgotPasswordForm"
import { mount } from "enzyme"
import { Clickable } from "@artsy/palette"
import { AuthenticationFooter } from "v2/Components/Authentication/Components/AuthenticationFooter"
import { flushPromiseQueue } from "v2/DevTools"

jest.mock("sharify", () => ({ data: { RECAPTCHA_KEY: "recaptcha-api-key" } }))

// FIXME: mock Formik async and remove setTimeout
describe("ForgotPasswordForm", () => {
  let props

  beforeAll(() => {
    props = {
      handleSubmit: jest.fn(),
      values: { email: "foo@bar.com" },
      handleTypeChange: jest.fn(),
    }
    window.grecaptcha.execute.mockClear()
  })

  const getWrapper = (passedProps = props) => {
    return mount(<ForgotPasswordForm {...passedProps} />)
  }

  describe("onSubmit", () => {
    // eslint-disable-next-line jest/no-done-callback
    it("calls handleSubmit with expected params", done => {
      const wrapper = getWrapper()
      const input = wrapper.find(`Formik`)
      input.simulate("submit")
      wrapper.update()

      setTimeout(() => {
        expect(props.handleSubmit).toBeCalledWith(
          {
            email: "foo@bar.com",
          },
          expect.anything()
        )
        done()
      })
    })

    // eslint-disable-next-line jest/no-done-callback
    it("fires reCAPTCHA event", done => {
      const wrapper = getWrapper()
      const input = wrapper.find(`Formik`)
      input.simulate("submit")

      setTimeout(() => {
        expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
          action: "forgot_submit",
        })
        done()
      })
    })
  })

  it("renders errors", async () => {
    const wrapper = getWrapper({ values: { email: "" } })

    wrapper.find("form").simulate("submit")

    await flushPromiseQueue()

    expect(wrapper.html()).toMatch("Please enter a valid email.")
  })

  // eslint-disable-next-line jest/no-done-callback
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

  it("can switch to login form", () => {
    getWrapper()
      .find(AuthenticationFooter)
      .find(Clickable)
      .at(0)
      .simulate("click")
    expect(props.handleTypeChange).toBeCalledWith("login")
  })

  it("can switch to signup form", () => {
    getWrapper()
      .find(AuthenticationFooter)
      .find(Clickable)
      .at(1)
      .simulate("click")
    expect(props.handleTypeChange).toBeCalledWith("signup")
  })
})

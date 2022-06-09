import { ContextModule, Intent } from "@artsy/cohesion"
import { Clickable, Button } from "@artsy/palette"
import { mount } from "enzyme"
import { ForgotPasswordForm } from "../Views/ForgotPasswordForm"
import { LoginForm } from "../Views/LoginForm"
import { SignUpFormQueryRenderer } from "../Views/SignUpForm"
import { FormSwitcher } from "../FormSwitcher"
import { ModalType } from "../Types"
import { mockLocation } from "v2/DevTools/mockLocation"

describe("FormSwitcher", () => {
  const getWrapper = (props: any = {}) =>
    mount(
      <FormSwitcher
        type={props.type || ModalType.login}
        handleSubmit={jest.fn()}
        tracking={props.tracking}
        options={{
          contextModule: ContextModule.header,
          copy: "Foo Bar",
          destination: "/collect",
          intent: Intent.followArtist,
          redirectTo: "/foo",
          triggerSeconds: 1,
        }}
        submitUrls={props.submitURLs}
        onSocialAuthEvent={props.onSocialAuthEvent}
        isStatic={props.isStatic || false}
        handleTypeChange={jest.fn()}
      />
    )

  describe("renders states correctly", () => {
    it("login form", () => {
      const wrapper = getWrapper()
      expect(wrapper.find(LoginForm).length).toEqual(1)
    })

    it("signup form", () => {
      const wrapper = getWrapper({ type: ModalType.signup })
      expect(wrapper.find(SignUpFormQueryRenderer).length).toEqual(1)
    })

    it("forgot password form", () => {
      const wrapper = getWrapper({ type: ModalType.forgot })
      expect(wrapper.find(ForgotPasswordForm).length).toEqual(1)
    })

    it("prepopulates email input from URL query string", () => {
      window.history.replaceState(
        {},
        "Reset your password",
        "/forgot?email=user@example.com"
      )

      const wrapper = getWrapper({ type: ModalType.forgot })

      expect(wrapper.find(ForgotPasswordForm).length).toEqual(1)
      expect(wrapper.html()).toContain("user@example.com")
      expect(wrapper.find("input").prop("value")).toEqual("user@example.com")
    })
  })

  describe("#handleTypeChange", () => {
    beforeAll(() => {
      mockLocation({ search: "" })
    })

    it("redirects to a url if static", () => {
      const wrapper = getWrapper({ isStatic: true, type: ModalType.login })

      wrapper
        .find(Clickable)
        .findWhere(node => node.text() === "Sign up.")
        .first()
        .simulate("click")

      expect(window.location.assign).toHaveBeenCalledWith(
        "/signup?contextModule=header&copy=Foo%20Bar&destination=%2Fcollect&intent=followArtist&redirectTo=%2Ffoo&triggerSeconds=1"
      )
    })

    it("sets type and notifies parent component when type is changed", () => {
      const wrapper = getWrapper({ type: ModalType.login })

      wrapper
        .find(Clickable)
        .findWhere(node => node.text() === "Sign up.")
        .first()
        .simulate("click")

      expect((wrapper.state() as any).type).toMatch("signup")
      expect(wrapper.props().handleTypeChange).toBeCalled()
    })
  })

  describe("Third party sign in", () => {
    beforeAll(() => {
      mockLocation({ search: "" })
    })

    it("fires social auth event and redirects", () => {
      const wrapper = getWrapper({
        onSocialAuthEvent: jest.fn(),
        submitURLs: {
          apple: "/users/auth/apple",
          facebook: "/users/auth/facebook",
          google: "/users/auth/google",
          forgot: "/forgot",
          login: "/login",
          signup: "/signup",
        },
        type: ModalType.login,
      })

      wrapper
        .find(Button)
        .findWhere(node => node.text().includes("Continue with Apple"))
        .first()
        .simulate("click")

      expect(wrapper.props().onSocialAuthEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          service: "apple",
        })
      )

      expect((window.location.assign as any).mock.calls[0][0]).toEqual(
        "/users/auth/apple?contextModule=header&copy=Foo%20Bar&destination=%2Fcollect&intent=followArtist&redirectTo=%2Ffoo&triggerSeconds=1&accepted_terms_of_service=true&afterSignUpAction=&agreed_to_receive_emails=true&signup-referer=&redirect-to=%2Ffoo&signup-intent=followArtist&service=apple"
      )
    })
  })

  describe("Analytics", () => {
    it("tracks login impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      getWrapper({ tracking, type: ModalType.login })
      expect(tracking.trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          Object {
            "action": "authImpression",
            "context_module": "header",
            "intent": "followArtist",
            "modal_copy": "Foo Bar",
            "onboarding": false,
            "trigger": "timed",
            "trigger_seconds": 1,
            "type": "login",
          },
        ]
      `)
    })

    it("tracks forgot password impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      getWrapper({ tracking, type: ModalType.forgot })
      expect(tracking.trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          Object {
            "action": "authImpression",
            "context_module": "header",
            "intent": "followArtist",
            "modal_copy": "Foo Bar",
            "onboarding": false,
            "trigger": "timed",
            "trigger_seconds": 1,
            "type": "forgot",
          },
        ]
      `)
    })

    it("tracks signup impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      getWrapper({
        tracking,
        type: ModalType.signup,
      })
      expect(tracking.trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          Object {
            "action": "authImpression",
            "context_module": "header",
            "intent": "followArtist",
            "modal_copy": "Foo Bar",
            "onboarding": false,
            "trigger": "timed",
            "trigger_seconds": 1,
            "type": "signup",
          },
        ]
      `)
    })
  })
})

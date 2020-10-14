import { ContextModule, Intent } from "@artsy/cohesion"
import { Link } from "@artsy/palette"
import QuickInput from "v2/Components/QuickInput"
import { mount } from "enzyme"
import React from "react"
import { ForgotPasswordForm } from "../Desktop/ForgotPasswordForm"
import { LoginForm } from "../Desktop/LoginForm"
import { SignUpForm } from "../Desktop/SignUpForm"
import { FormSwitcher } from "../FormSwitcher"
import { MobileForgotPasswordForm } from "../Mobile/ForgotPasswordForm"
import { MobileLoginForm } from "../Mobile/LoginForm"
import { MobileSignUpForm } from "../Mobile/SignUpForm"
import { ModalType } from "../Types"
import { mockLocation } from "v2/DevTools/mockLocation"

jest.mock("sharify", () => ({
  data: {
    ENABLE_SIGN_IN_WITH_APPLE: true,
  },
}))

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
        isMobile={props.isMobile || false}
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
      expect(wrapper.find(SignUpForm).length).toEqual(1)
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
      expect(wrapper.find(QuickInput).prop("value")).toEqual("user@example.com")
    })
  })

  describe("renders mobile states correctly", () => {
    it("login form", () => {
      const wrapper = getWrapper({ type: ModalType.login, isMobile: true })
      expect(wrapper.find(MobileLoginForm).length).toEqual(1)
    })

    it("signup form", () => {
      const wrapper = getWrapper({ type: ModalType.signup, isMobile: true })
      expect(wrapper.find(MobileSignUpForm).length).toEqual(1)
    })

    it("forgot password form", () => {
      const wrapper = getWrapper({ type: ModalType.forgot, isMobile: true })
      expect(wrapper.find(MobileForgotPasswordForm).length).toEqual(1)
    })
  })

  describe("#handleTypeChange", () => {
    beforeEach(() => {
      mockLocation({ search: "" })
    })

    it("redirects to a url if static or mobile", () => {
      const wrapper = getWrapper({
        type: ModalType.login,
        isMobile: true,
      })

      wrapper.find(Link).at(2).simulate("click")

      expect(window.location.assign).toHaveBeenCalledWith(
        "/signup?contextModule=header&copy=Foo%20Bar&destination=%2Fcollect&intent=followArtist&redirectTo=%2Ffoo&triggerSeconds=1"
      )
    })

    it("sets type and notifies parent component when type is changed", () => {
      const wrapper = getWrapper({
        type: ModalType.login,
      })

      wrapper.find(Link).at(3).simulate("click")

      expect((wrapper.state() as any).type).toMatch("signup")
      expect(wrapper.props().handleTypeChange).toBeCalled()
    })
  })

  describe("Third party sign in", () => {
    beforeEach(() => {
      mockLocation({ search: "" })
    })

    it("fires social auth event and redirects", () => {
      const wrapper = getWrapper({
        type: ModalType.login,
        submitURLs: {
          apple: "/users/auth/apple",
          facebook: "/users/auth/facebook",
          twitter: "/users/auth/twitter",
          login: "/login",
          signup: "/signup",
          forgot: "/forgot",
        },
        onSocialAuthEvent: jest.fn(),
      })

      wrapper.find(Link).at(1).simulate("click")

      expect(wrapper.props().onSocialAuthEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          service: "apple",
        })
      )

      expect((window.location.assign as any).mock.calls[0][0]).toEqual(
        "/users/auth/apple?contextModule=header&copy=Foo%20Bar&destination=%2Fcollect&intent=followArtist&redirectTo=%2Ffoo&triggerSeconds=1&accepted_terms_of_service=true&agreed_to_receive_emails=true&signup-referer=&afterSignUpAction=&redirect-to=%2Ffoo&signup-intent=followArtist&service=apple"
      )
    })
  })

  describe("Analytics", () => {
    it("tracks login impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      getWrapper({ type: ModalType.login, tracking })
      expect(tracking.trackEvent).toBeCalledWith({
        action: "authImpression",
        intent: "followArtist",
        type: "login",
        context_module: "header",
        modal_copy: "Foo Bar",
        onboarding: false,
        trigger: "timed",
        trigger_seconds: 1,
      })
    })

    it("tracks forgot password impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      getWrapper({ type: ModalType.forgot, tracking })
      expect(tracking.trackEvent).toBeCalledWith({
        action: "authImpression",
        type: "forgot",
        intent: "followArtist",
        context_module: "header",
        modal_copy: "Foo Bar",
        onboarding: false,
        trigger: "timed",
        trigger_seconds: 1,
      })
    })

    it("tracks signup impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      getWrapper({
        type: ModalType.signup,
        tracking,
      })
      expect(tracking.trackEvent).toBeCalledWith({
        action: "authImpression",
        type: "signup",
        context_module: "header",
        onboarding: false,
        intent: "followArtist",
        modal_copy: "Foo Bar",
        trigger: "timed",
        trigger_seconds: 1,
      })
    })
  })
})

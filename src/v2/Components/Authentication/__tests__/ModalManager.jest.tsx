import { LoginForm } from "v2/Components/Authentication/Views/LoginForm"
import { ModalType } from "v2/Components/Authentication/Types"
import { ReactWrapper, mount } from "enzyme"

import { ContextModule, Intent } from "@artsy/cohesion"
import {
  ModalManager,
  ModalManagerProps,
} from "v2/Components/Authentication/ModalManager"

const getWrapper = (
  props?: ModalManagerProps
): ReactWrapper<ModalManagerProps> => {
  const wrapper = mount(
    <ModalManager
      submitUrls={{
        apple: "/users/auth/apple",
        facebook: "/users/auth/facebook",
        google: "/users/auth/google",
        login: "/login",
        signup: "/signup",
        forgot: "/forgot",
      }}
      csrf="CSRF_TOKEN"
      {...props}
    />
  )

  return wrapper
}

describe("ModalManager", () => {
  it("renders the right form when a type is passed in", () => {
    const wrapper = getWrapper()

    expect(wrapper.find(LoginForm).exists).toBeTruthy()
  })

  it("sets the currentType if openModal is called", () => {
    const wrapper = getWrapper()
    const manager = wrapper.instance() as ModalManager

    manager.openModal({
      mode: ModalType.login,
      intent: Intent.login,
      contextModule: ContextModule.header,
    })

    expect(manager.state.currentType).toEqual("login")
  })

  it("sets the currentType to null if closeModal is called", () => {
    const wrapper = getWrapper()
    const manager = wrapper.instance() as ModalManager

    manager.closeModal()

    expect(manager.state.currentType).toEqual(null)
  })

  it("prevents scrolling when opened", () => {
    const wrapper = getWrapper()
    const manager = wrapper.instance() as ModalManager

    expect(document.body).toHaveStyle({ overflowY: "visible" })

    manager.openModal({
      mode: ModalType.login,
      intent: Intent.login,
      contextModule: ContextModule.header,
    })

    expect(document.body).toHaveStyle({ overflowY: "hidden" })
  })

  it("handles type changes", () => {
    const wrapper = getWrapper()
    const manager = wrapper.instance() as ModalManager

    manager.openModal({
      mode: ModalType.login,
      intent: Intent.login,
      contextModule: ContextModule.header,
    })

    manager.handleTypeChange("signup")

    expect(manager.state.currentType).toEqual("signup")
    expect(manager.state.switchedForms).toEqual(true)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    expect(manager.state.options.mode).toEqual("signup")
  })

  it("returns the right subtitle", () => {
    const wrapper = getWrapper()
    const manager = wrapper.instance() as ModalManager

    manager.openModal({
      mode: ModalType.login,
      intent: Intent.signup,
      copy: "Foobar",
      contextModule: ContextModule.header,
    })
    expect(manager.getSubtitle()).toEqual("Foobar")

    manager.handleTypeChange("signup")
    expect(manager.getSubtitle()).toEqual("Sign up")

    manager.handleTypeChange("forgot")
    expect(manager.getSubtitle()).toEqual("Reset your password")
  })
})

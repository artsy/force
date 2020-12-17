import { LoginForm } from "v2/Components/Authentication/Desktop/LoginForm"
import { ModalType } from "v2/Components/Authentication/Types"
import { ReactWrapper, mount } from "enzyme"
import React from "react"

import { ContextModule, Intent } from "@artsy/cohesion"
import {
  ModalManager,
  ModalManagerProps,
} from "v2/Components/Authentication/Desktop/ModalManager"

const getWrapper = (
  props?: ModalManagerProps
): ReactWrapper<ModalManagerProps> => {
  const wrapper = mount(
    <ModalManager
      submitUrls={{
        apple: "/users/auth/apple",
        facebook: "/users/auth/facebook",
        forgot: "/forgot",
        login: "/login",
        signup: "/signup",
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
      contextModule: ContextModule.header,
      intent: Intent.login,
      mode: ModalType.login,
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

    expect(document.body.style.overflowY).toEqual("visible")

    manager.openModal({
      contextModule: ContextModule.header,
      intent: Intent.login,
      mode: ModalType.login,
    })

    expect(document.body.style.overflowY).toEqual("hidden")
  })

  it("handles type changes", () => {
    const wrapper = getWrapper()
    const manager = wrapper.instance() as ModalManager

    manager.openModal({
      contextModule: ContextModule.header,
      intent: Intent.login,
      mode: ModalType.login,
    })

    manager.handleTypeChange("signup")

    expect(manager.state.currentType).toEqual("signup")
    expect(manager.state.switchedForms).toEqual(true)
    expect(manager.state.options.mode).toEqual("signup")
  })

  it("returns the right subtitle", () => {
    const wrapper = getWrapper()
    const manager = wrapper.instance() as ModalManager

    manager.openModal({
      contextModule: ContextModule.header,
      copy: "Foobar",
      intent: Intent.signup,
      mode: ModalType.login,
    })
    expect(manager.getSubtitle()).toEqual("Foobar")

    manager.handleTypeChange("signup")
    expect(manager.getSubtitle()).toEqual("Sign up")

    manager.handleTypeChange("forgot")
    expect(manager.getSubtitle()).toEqual("Reset your password")
  })
})

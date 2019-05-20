import * as actions from "desktop/apps/consign/client/actions"
import React from "react"
import reducers from "desktop/apps/consign/client/reducers"
import { createStore } from "redux"
import { mount } from "enzyme"
import CreateAccount from "../index"
import { ModalHeader } from "reaction/Components/Modal/ModalHeader"
import { LoginForm } from "@artsy/reaction/dist/Components/Authentication/Desktop/LoginForm"
import { ForgotPasswordForm } from "@artsy/reaction/dist/Components/Authentication/Desktop/ForgotPasswordForm"
import { SignUpForm } from "@artsy/reaction/dist/Components/Authentication/Desktop/SignUpForm"

describe("React components", () => {
  let initialStore

  beforeEach(() => {
    initialStore = createStore(reducers)
  })

  const getWrapper = () => {
    return mount(<CreateAccount store={initialStore} />)
  }

  describe("CreateAccount", () => {
    describe("log in", () => {
      it("renders the log in form", () => {
        initialStore.dispatch(actions.updateAuthFormState("logIn"))
        const wrapper = getWrapper()
        expect(
          wrapper
            .find(ModalHeader)
            .at(0)
            .text()
        ).toBe("Log in")
        expect(wrapper.find(LoginForm).length).toBe(1)
      })
    })

    describe("forgot password", () => {
      it("renders the forgot password form", () => {
        initialStore.dispatch(actions.updateAuthFormState("forgotPassword"))
        const wrapper = getWrapper()
        expect(
          wrapper
            .find(ModalHeader)
            .at(0)
            .text()
        ).toBe("Enter the email address associated with your account")
        expect(wrapper.find(ForgotPasswordForm).length).toBe(1)
      })
    })

    describe("sign up", () => {
      it("the signup form", () => {
        const wrapper = getWrapper()
        expect(
          wrapper
            .find(ModalHeader)
            .at(0)
            .text()
        ).toBe("Create an account")
        expect(wrapper.find(SignUpForm).length).toBe(1)
      })
    })
  })
})

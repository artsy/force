import * as actions from "desktop/apps/consign/client/actions"
import React from "react"
import reducers from "desktop/apps/consign/client/reducers"
import { createStore } from "redux"
import { mount } from "enzyme"
import CreateAccount, {
  CreateAccount as UnconnectedCreateAccount,
} from "../index"
import { ModalHeader } from "reaction/Components/Modal/ModalHeader"
import { LoginForm } from "@artsy/reaction/dist/Components/Authentication/Desktop/LoginForm"
import { ForgotPasswordForm } from "@artsy/reaction/dist/Components/Authentication/Desktop/ForgotPasswordForm"
import { SignUpForm } from "@artsy/reaction/dist/Components/Authentication/Desktop/SignUpForm"
import { ModalType } from "@artsy/reaction/dist/Components/Authentication/Types"

jest.mock("@artsy/reaction/dist/Artsy/SystemContext", () => ({
  SystemContextProvider: ({ children }) => children,
  withSystemContext: Component => Component,
}))

jest.mock("desktop/apps/authentication/helpers", () => ({
  handleSubmit: jest.fn(),
}))

const handleSubmitMock = require("desktop/apps/authentication/helpers")
  .handleSubmit as jest.Mock

describe("React components", () => {
  let initialStore
  let props

  beforeEach(() => {
    initialStore = createStore(reducers)
    props = {
      title: "Log In",
      type: "login",
      updateAuthFormStateAndClearErrorAction: jest.fn(),
    }
  })

  const getWrapper = (passedProps = props) => {
    return mount(<CreateAccount store={initialStore} {...passedProps} />)
  }

  describe("CreateAccount", () => {
    describe("log in", () => {
      it("renders the log in form", () => {
        initialStore.dispatch(actions.updateAuthFormState("login"))
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
        initialStore.dispatch(actions.updateAuthFormState("forgot"))
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

  it("#handleTypeChange calls updateAuthFormStateAndClearErrorAction", () => {
    const wrapper = mount(
      <UnconnectedCreateAccount {...props} />
    ).instance() as UnconnectedCreateAccount
    wrapper.handleTypeChange("login" as ModalType)
    expect(props.updateAuthFormStateAndClearErrorAction).toBeCalledWith("login")
  })

  it("#handleSubmit calls props.handleSubmit with expected args", () => {
    const wrapper = mount(
      <UnconnectedCreateAccount {...props} />
    ).instance() as UnconnectedCreateAccount
    wrapper.handleSubmit(
      {
        email: "user@email.com",
        password: "mypassword",
      },
      {}
    )
    expect(handleSubmitMock).toBeCalledWith(
      "login",
      {
        contextModule: "consignSubmissionFlow",
        copy: "Log In",
        intent: "consign",
        redirectTo: "/consign/submission",
      },
      { email: "user@email.com", password: "mypassword" },
      {}
    )

    const wrapperWithTrackingParams = mount(
      <UnconnectedCreateAccount {...props} contextPath="foo" subject="bar" />
    ).instance() as UnconnectedCreateAccount

    wrapperWithTrackingParams.handleSubmit(
      {
        email: "user@email.com",
        password: "mypassword",
      },
      {}
    )

    expect(handleSubmitMock).toBeCalledWith(
      "login",
      {
        contextModule: "consignSubmissionFlow",
        copy: "Log In",
        intent: "consign",
        redirectTo: "/consign/submission?contextPath=foo&subject=bar",
      },
      { email: "user@email.com", password: "mypassword" },
      {}
    )
  })
})

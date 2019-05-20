import React from "react"
import block from "bem-cn-lite"
import { connect } from "react-redux"
import { Box } from "@artsy/palette"
import { FormSwitcher } from "@artsy/reaction/dist/Components/Authentication/FormSwitcher"
import { handleSubmit } from "desktop/apps/auth2/helpers"
import { ModalHeader } from "reaction/Components/Modal/ModalHeader"
import { updateAuthFormStateAndClearError } from "../../client/actions"
import { ModalType } from "@artsy/reaction/dist/Components/Authentication/Types"

interface CreateAccountProps {
  title: string
  type: string
  updateAuthFormStateAndClearErrorAction: (type: string) => void
}

export class CreateAccount extends React.Component<CreateAccountProps> {
  handleSubmit = (values, formikBag) => {
    handleSubmit("login" as ModalType, {}, values, formikBag)
  }

  handleTypeChange = type => {
    const { updateAuthFormStateAndClearErrorAction } = this.props
    let authType
    if (type === "login") {
      authType = "logIn"
    } else if (type === "forgot") {
      authType = "forgotPassword"
    } else {
      authType = "signUp"
    }
    updateAuthFormStateAndClearErrorAction(authType)
  }

  render() {
    const b = block("consignments-submission-create-account")

    return (
      <div className={b()}>
        <Box mx="auto" maxWidth={550}>
          <ModalHeader title={this.props.title} />
          <FormSwitcher
            options={{
              title: this.props.title,
              contextModule: "consignments", // TODO: use schema
            }}
            type={this.props.type as ModalType}
            handleSubmit={this.handleSubmit}
            handleTypeChange={this.handleTypeChange}
            submitUrls={{
              login: "/log_in",
              forgot: "/forgot_password",
              signup: "/sign_up",
              facebook: "/users/auth/facebook",
              twitter: "/users/auth/twitter",
            }}
            showRecaptchaDisclaimer={true}
          />
        </Box>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    submissionFlow: { authFormState },
  } = state

  const stateTotype = {
    logIn: "login",
    signUp: "signup",
    forgotPassword: "forgot",
  }

  const stateToTitle = {
    logIn: "Log in",
    signUp: "Create an account",
    forgotPassword: "Enter the email address associated with your account",
  }

  return {
    type: stateTotype[authFormState],
    title: stateToTitle[authFormState],
  }
}

const mapDispatchToProps = {
  updateAuthFormStateAndClearErrorAction: updateAuthFormStateAndClearError,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccount)

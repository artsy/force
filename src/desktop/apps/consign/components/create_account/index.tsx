import React from "react"
import { connect } from "react-redux"
import { Box } from "@artsy/palette"
import { FormSwitcher } from "@artsy/reaction/dist/Components/Authentication/FormSwitcher"
import { handleSubmit } from "desktop/apps/authentication/helpers"
import { ModalHeader } from "reaction/Components/Modal/ModalHeader"
import { updateAuthFormStateAndClearError } from "../../client/actions"
import { ModalType } from "@artsy/reaction/dist/Components/Authentication/Types"
import {
  AuthIntent,
  ContextModule,
} from "@artsy/reaction/dist/Artsy/Analytics/v2/Schema"

interface CreateAccountProps {
  title: string
  type: ModalType
  updateAuthFormStateAndClearErrorAction: (type: ModalType) => void
}

export class CreateAccount extends React.Component<CreateAccountProps> {
  handleSubmit = (values, formikBag) => {
    handleSubmit(
      this.props.type,
      {
        copy: this.props.title,
        contextModule: ContextModule.consignSubmissionFlow,
        intent: AuthIntent.consign,
        redirectTo: "/consign/submission",
      },
      values,
      formikBag
    )
  }

  handleTypeChange = (type: ModalType) => {
    const { updateAuthFormStateAndClearErrorAction } = this.props
    updateAuthFormStateAndClearErrorAction(type)
  }

  render() {
    return (
      <Box mx="auto" maxWidth={550}>
        <ModalHeader title={this.props.title} />
        <FormSwitcher
          options={{
            copy: this.props.title,
            contextModule: ContextModule.consignSubmissionFlow,
            intent: AuthIntent.consign,
            redirectTo: "/consign/submission",
          }}
          type={this.props.type}
          handleSubmit={this.handleSubmit}
          handleTypeChange={this.handleTypeChange}
          submitUrls={{
            login: "/log_in",
            forgot: "/forgot_password",
            signup: "/sign_up",
            apple: "/users/auth/apple",
            facebook: "/users/auth/facebook",
          }}
          showRecaptchaDisclaimer={true}
        />
      </Box>
    )
  }
}

const mapStateToProps = state => {
  const {
    submissionFlow: { authFormState },
  } = state

  const stateToTitle = {
    login: "Log in",
    signup: "Create an account",
    forgot: "Enter the email address associated with your account",
  }

  return {
    type: authFormState,
    title: stateToTitle[authFormState],
  }
}

const mapDispatchToProps = {
  updateAuthFormStateAndClearErrorAction: updateAuthFormStateAndClearError,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)

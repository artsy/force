import React from "react"
import { connect } from "react-redux"
import { Box } from "@artsy/palette"
import { FormSwitcher } from "@artsy/reaction/dist/Components/Authentication/FormSwitcher"
import { handleSubmit } from "desktop/apps/authentication/helpers"
import { ModalHeader } from "reaction/Components/Modal/ModalHeader"
import { updateAuthFormStateAndClearError } from "../../client/actions"
import { ModalType } from "@artsy/reaction/dist/Components/Authentication/Types"
import { AuthIntent, ContextModule } from "@artsy/cohesion"

interface CreateAccountProps {
  contextPath: string
  subject: string
  title: string
  type: ModalType
  updateAuthFormStateAndClearErrorAction: (type: ModalType) => void
}

export class CreateAccount extends React.Component<CreateAccountProps> {
  handleSubmit = (values, formikBag) => {
    const { contextPath, subject, title, type } = this.props

    handleSubmit(
      type,
      {
        copy: title,
        contextModule: ContextModule.consignSubmissionFlow,
        intent: AuthIntent.consign,
        redirectTo: `/consign/submission?contextPath=${contextPath}&subject=${subject}`,
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
    submissionFlow: { authFormState, contextPath, subject },
  } = state

  const stateToTitle = {
    login: "Log in",
    signup: "Create an account",
    forgot: "Enter the email address associated with your account",
  }

  return {
    contextPath,
    subject,
    type: authFormState,
    title: stateToTitle[authFormState],
  }
}

const mapDispatchToProps = {
  updateAuthFormStateAndClearErrorAction: updateAuthFormStateAndClearError,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)

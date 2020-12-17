import React from "react"
import { connect } from "react-redux"
import { Box } from "@artsy/palette"
import { FormSwitcher } from "v2/Components/Authentication/FormSwitcher"
import { handleSubmit } from "desktop/apps/authentication/helpers"
import { ModalHeader } from "v2/Components/Modal/ModalHeader"
import { updateAuthFormStateAndClearError } from "../../client/actions"
import { ModalType } from "v2/Components/Authentication/Types"
import { ContextModule, Intent } from "@artsy/cohesion"

interface CreateAccountProps {
  artistId: string
  artistName: string
  contextPath: string
  subject: string
  title: string
  type: ModalType
  updateAuthFormStateAndClearErrorAction: (type: ModalType) => void
}

export class CreateAccount extends React.Component<CreateAccountProps> {
  get redirectUrl() {
    const { artistId, artistName, contextPath, subject } = this.props

    let analyticsParams = []
    if (artistId && artistName) {
      analyticsParams.push(`artistId=${artistId}`, `artistName=${artistName}`)
    }
    if (contextPath && subject) {
      analyticsParams.push(`contextPath=${contextPath}`, `subject=${subject}`)
    }

    let joinedParams = ""
    if (analyticsParams.length) {
      joinedParams = "?" + analyticsParams.join("&")
    }

    return `/consign/submission${joinedParams}`
  }

  handleSubmit = (values, formikBag) => {
    const { title, type } = this.props

    handleSubmit(
      type,
      {
        contextModule: ContextModule.consignSubmissionFlow,
        copy: title,
        intent: Intent.consign,
        redirectTo: this.redirectUrl,
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
            contextModule: ContextModule.consignSubmissionFlow,
            copy: this.props.title,
            intent: Intent.consign,
            redirectTo: this.redirectUrl,
          }}
          type={this.props.type}
          handleSubmit={this.handleSubmit}
          handleTypeChange={this.handleTypeChange}
          submitUrls={{
            apple: "/users/auth/apple",
            facebook: "/users/auth/facebook",
            forgot: "/forgot_password",
            login: "/log_in",
            signup: "/sign_up",
          }}
          showRecaptchaDisclaimer={true}
        />
      </Box>
    )
  }
}

const mapStateToProps = state => {
  const {
    submissionFlow: {
      inputs: { artist_id },
      artistName,
      authFormState,
      contextPath,
      subject,
    },
  } = state

  const stateToTitle = {
    forgot: "Enter the email address associated with your account",
    login: "Log in",
    signup: "Create an account",
  }

  return {
    artistId: artist_id,
    artistName,
    contextPath,
    subject,
    title: stateToTitle[authFormState],
    type: authFormState,
  }
}

const mapDispatchToProps = {
  updateAuthFormStateAndClearErrorAction: updateAuthFormStateAndClearError,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)

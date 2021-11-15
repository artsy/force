import { Component } from "react"
import { connect } from "react-redux"
import { Box, ThemeProviderV3 } from "@artsy/palette"
import { FormSwitcher } from "v2/Components/Authentication/FormSwitcher"
import { handleSubmit } from "v2/Apps/Authentication/Utils/helpers"
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

export class CreateAccount extends Component<CreateAccountProps> {
  get redirectUrl() {
    const { artistId, artistName, contextPath, subject } = this.props

    let analyticsParams = []
    if (artistId && artistName) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      analyticsParams.push(`artistId=${artistId}`, `artistName=${artistName}`)
    }
    if (contextPath && subject) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
        copy: title,
        contextModule: ContextModule.consignSubmissionFlow,
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
      <ThemeProviderV3>
        <Box mx="auto" maxWidth={550}>
          <ModalHeader title={this.props.title} />
          <FormSwitcher
            options={{
              copy: this.props.title,
              contextModule: ContextModule.consignSubmissionFlow,
              intent: Intent.consign,
              redirectTo: this.redirectUrl,
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
      </ThemeProviderV3>
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
    login: "Log in",
    signup: "Create an account",
    forgot: "Enter the email address associated with your account",
  }

  return {
    artistId: artist_id,
    artistName,
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

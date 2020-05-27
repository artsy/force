import { AuthModalType, authImpression } from "@artsy/cohesion"
import { Theme } from "@artsy/palette"
import qs from "querystring"
import React from "react"
import track, { TrackingProp } from "react-tracking"
import Events from "v2/Utils/Events"

import { SystemContextProvider } from "v2/Artsy"
import { ForgotPasswordForm } from "v2/Components/Authentication/Desktop/ForgotPasswordForm"
import { LoginForm } from "v2/Components/Authentication/Desktop/LoginForm"
import { SignUpForm } from "v2/Components/Authentication/Desktop/SignUpForm"
import { MobileForgotPasswordForm } from "v2/Components/Authentication/Mobile/ForgotPasswordForm"
import { MobileLoginForm } from "v2/Components/Authentication/Mobile/LoginForm"
import { MobileSignUpForm } from "v2/Components/Authentication/Mobile/SignUpForm"
import {
  AfterSignUpAction,
  FormComponentType,
  InputValues,
  ModalOptions,
  ModalType,
  SubmitHandler,
} from "./Types"

export interface FormSwitcherProps {
  error?: string
  handleSubmit: SubmitHandler
  handleTypeChange?: (e: ModalType) => void
  isMobile?: boolean
  isStatic?: boolean
  onAppleLogin?: (e: Event) => void
  onFacebookLogin?: (e: Event) => void
  onTwitterLogin?: (e: Event) => void
  options: ModalOptions
  title?: string
  showRecaptchaDisclaimer?: boolean
  submitUrls: { [P in ModalType]: string } & {
    apple: string
    facebook: string
    twitter?: string
  }
  tracking?: TrackingProp
  type: ModalType
  values?: InputValues
  onSocialAuthEvent?: (options) => void
  onBackButtonClicked?: (e: Event) => void
}

export interface State {
  type?: ModalType
}

@track({}, { dispatch: data => Events.postEvent(data) })
export class FormSwitcher extends React.Component<FormSwitcherProps, State> {
  static defaultProps: Partial<FormSwitcherProps> = {
    values: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
    }
  }

  componentDidMount() {
    const {
      options: {
        contextModule,
        copy,
        redirectTo,
        intent,
        title,
        triggerSeconds,
      },
      type,
      tracking,
    } = this.props

    // Analytics
    const event = Object.assign(
      {
        contextModule,
        intent,
        copy: copy || title,
        triggerSeconds,
        type: AuthModalType[type],
      },
      type === "signup"
        ? {
            onboarding: !redirectTo,
          }
        : null
    )

    const trackingArgs = authImpression(event)

    if (tracking) {
      tracking.trackEvent(trackingArgs)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type && nextProps.type) {
      this.setState({
        type: nextProps.type,
      })
    }
  }

  handleTypeChange = (newType: ModalType) => {
    const { isMobile, isStatic, handleTypeChange, options } = this.props

    if (isMobile || isStatic) {
      if (typeof window !== "undefined") {
        window.location.assign(`/${newType}?${qs.stringify(options)}`)
      }
    } else {
      this.setState({ type: newType })
      if (handleTypeChange) {
        handleTypeChange(newType)
      }
    }
  }

  getAfterSignupAction = (options: ModalOptions): AfterSignUpAction => {
    const { afterSignUpAction, action, kind, objectId } = options
    return (
      afterSignUpAction || {
        action,
        kind,
        objectId,
      }
    )
  }

  getEmailValue = (): string => {
    const { values } = this.props
    const isClient = typeof window !== "undefined"
    let email

    if (isClient) {
      const searchQuery = window.location.search.slice(1)
      email = qs.parse(searchQuery).email as string
    }

    return email || values.email || ""
  }

  render() {
    const {
      error,
      isMobile,
      title,
      options,
      showRecaptchaDisclaimer,
    } = this.props

    const queryData = Object.assign(
      {},
      options,
      {
        accepted_terms_of_service: true,
        agreed_to_receive_emails: true,
        "signup-referer": options.signupReferer,
        afterSignUpAction: this.getAfterSignupAction(options),
      },
      options.redirectTo || options["redirect-to"]
        ? {
            "redirect-to": options.redirectTo || options["redirect-to"],
          }
        : null,
      options.intent
        ? {
            "signup-intent": options.intent,
          }
        : null
    )

    const authQueryData = qs.stringify(queryData)

    let Form: FormComponentType
    switch (this.state.type) {
      case ModalType.login:
        Form = isMobile ? MobileLoginForm : LoginForm
        break
      case ModalType.signup:
        Form = isMobile ? MobileSignUpForm : SignUpForm
        break
      case ModalType.forgot:
        Form = isMobile ? MobileForgotPasswordForm : ForgotPasswordForm
        break
      default:
        return null
    }

    const { handleSubmit, onBackButtonClicked, values } = this.props

    const defaultValues = {
      email: this.getEmailValue(),
      password: values.password || "",
      name: values.name || "",
      accepted_terms_of_service: values.accepted_terms_of_service || false,
    }

    return (
      <SystemContextProvider>
        <Theme>
          <Form
            title={title}
            contextModule={options.contextModule}
            error={error}
            values={defaultValues}
            handleTypeChange={this.handleTypeChange}
            handleSubmit={handleSubmit}
            intent={options.intent}
            onBackButtonClicked={onBackButtonClicked}
            onAppleLogin={() => {
              if (this.props.onSocialAuthEvent) {
                this.props.onSocialAuthEvent({
                  ...options,
                  service: "apple",
                })
              }
              if (typeof window !== "undefined") {
                const href =
                  this.props.submitUrls.apple +
                  `?${authQueryData}` +
                  "&service=apple"
                window.location.assign(href)
              }
            }}
            onFacebookLogin={() => {
              if (this.props.onSocialAuthEvent) {
                this.props.onSocialAuthEvent({
                  ...options,
                  service: "facebook",
                })
              }
              if (typeof window !== "undefined") {
                const href =
                  this.props.submitUrls.facebook +
                  `?${authQueryData}` +
                  "&service=facebook"
                window.location.assign(href)
              }
            }}
            showRecaptchaDisclaimer={showRecaptchaDisclaimer}
          />
        </Theme>
      </SystemContextProvider>
    )
  }
}

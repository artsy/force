import { ActionType, AuthImpression, AuthModalType } from "@artsy/cohesion"
import qs from "querystring"
import { Component } from "react"
import track, { TrackingProp } from "react-tracking"
import Events from "Utils/Events"
import { SystemContextProvider } from "System"
import { ForgotPasswordForm } from "Components/Authentication/Views/ForgotPasswordForm"
import { LoginForm } from "Components/Authentication/Views/LoginForm"
import { SignUpFormQueryRenderer } from "Components/Authentication/Views/SignUpForm"
import {
  FormComponentType,
  InputValues,
  ModalOptions,
  ModalType,
  SubmitHandler,
} from "./Types"
import sanitizeRedirect from "Server/passport/sanitize-redirect"

export interface FormSwitcherProps {
  error?: string
  handleSubmit: SubmitHandler
  handleTypeChange?: (e: ModalType) => void
  isStatic?: boolean
  onAppleLogin?: (e: Event) => void
  onFacebookLogin?: (e: Event) => void
  onGoogleLogin?: (e: Event) => void
  options: ModalOptions
  showRecaptchaDisclaimer?: boolean
  submitUrls: { [P in ModalType]: string } & {
    apple: string
    facebook: string
    google: string
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
export class FormSwitcher extends Component<FormSwitcherProps, State> {
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
      options: { contextModule, copy, redirectTo, intent, triggerSeconds },
      type,
      tracking,
    } = this.props

    const trackingArgs: AuthImpression = {
      action: ActionType.authImpression,
      context_module: contextModule!,
      modal_copy: copy,
      intent: intent!,
      trigger: triggerSeconds ? "timed" : "click",
      trigger_seconds: triggerSeconds,
      type: AuthModalType[type],
      onboarding: type === "signup" ? !redirectTo : false,
    }
    tracking?.trackEvent(trackingArgs)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type && nextProps.type) {
      this.setState({
        type: nextProps.type,
      })
    }
  }

  handleTypeChange = (newType: ModalType) => {
    const { isStatic, handleTypeChange, options } = this.props

    if (isStatic) {
      if (typeof window !== "undefined") {
        window.location.assign(`/${newType}?${qs.stringify(options as any)}`)
      }
    } else {
      this.setState({ type: newType })
      if (handleTypeChange) {
        handleTypeChange(newType)
      }
    }
  }

  getEmailValue = (): string => {
    const { values } = this.props
    const isClient = typeof window !== "undefined"
    let email

    if (isClient) {
      const searchQuery = window.location.search.slice(1)
      email = qs.parse(searchQuery).email as string
    }

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    return email || values.email || ""
  }

  render() {
    const { error, options, showRecaptchaDisclaimer } = this.props

    const queryData = Object.assign(
      {},
      options,
      {
        accepted_terms_of_service: true,
        afterSignUpAction: options.afterSignUpAction,
        agreed_to_receive_emails: true,
        "signup-referer": options.signupReferer,
      },
      options.redirectTo || options["redirect-to"]
        ? {
            "redirect-to": sanitizeRedirect(
              options.redirectTo || options["redirect-to"]
            ),
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
        Form = LoginForm
        break
      case ModalType.signup:
        Form = SignUpFormQueryRenderer
        break
      case ModalType.forgot:
        Form = ForgotPasswordForm
        break
      default:
        return null
    }

    const { handleSubmit, onBackButtonClicked, values } = this.props

    const defaultValues = {
      accepted_terms_of_service: true,
      email: this.getEmailValue(),
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      name: values.name || "",
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      password: values.password || "",
    }

    return (
      <SystemContextProvider>
        <Form
          contextModule={options.contextModule!}
          error={error}
          values={defaultValues}
          handleTypeChange={this.handleTypeChange}
          handleSubmit={handleSubmit}
          intent={options.intent!}
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
          onGoogleLogin={() => {
            if (this.props.onSocialAuthEvent) {
              this.props.onSocialAuthEvent({
                ...options,
                service: "google",
              })
            }
            if (typeof window !== "undefined") {
              const href =
                this.props.submitUrls.google +
                `?${authQueryData}` +
                "&service=google"
              window.location.assign(href)
            }
          }}
          showRecaptchaDisclaimer={showRecaptchaDisclaimer}
        />
      </SystemContextProvider>
    )
  }
}

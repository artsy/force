import { ActionType, AuthImpression, AuthModalType } from "@artsy/cohesion"
import qs from "querystring"
import { Component } from "react"
import track, { TrackingProp } from "react-tracking"
import Events from "v2/Utils/Events"
import { SystemContextProvider } from "v2/System"
import { ForgotPasswordForm } from "v2/Components/Authentication/Views/ForgotPasswordForm"
import { LoginForm } from "v2/Components/Authentication/Views/LoginForm"
import { SignUpFormQueryRenderer } from "v2/Components/Authentication/Views/SignUpForm"
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
  isStatic?: boolean
  onAppleLogin?: (e: Event) => void
  onFacebookLogin?: (e: Event) => void
  onGoogleLogin?: (e: Event) => void
  options: ModalOptions
  title?: string
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

    const trackingArgs: AuthImpression = {
      action: ActionType.authImpression,
      context_module: contextModule!,
      modal_copy: copy || title,
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

  getAfterSignupAction = (options: ModalOptions): AfterSignUpAction => {
    const { afterSignUpAction, action, kind, objectId } = options
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    return email || values.email || ""
  }

  render() {
    const { error, title, options, showRecaptchaDisclaimer } = this.props

    const queryData = Object.assign(
      {},
      options,
      {
        accepted_terms_of_service: true,
        afterSignUpAction: this.getAfterSignupAction(options),
        agreed_to_receive_emails: true,
        "signup-referer": options.signupReferer,
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
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      accepted_terms_of_service: values.accepted_terms_of_service || false,
      email: this.getEmailValue(),
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      name: values.name || "",
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      password: values.password || "",
    }

    return (
      <SystemContextProvider>
        <Form
          title={title}
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

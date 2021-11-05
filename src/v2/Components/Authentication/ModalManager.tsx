import { FormikProps } from "formik"
import { Component } from "react"
import { TrackingProp } from "react-tracking"
import { AuthenticationModal } from "v2/Components/Authentication/Components/AuthenticationModal"
import { FormSwitcher } from "v2/Components/Authentication/FormSwitcher"
import { handleSubmit as defaultHandleSubmit } from "v2/Components/Authentication/helpers"
import {
  InputValues,
  ModalOptions,
  ModalType,
  SubmitHandler,
} from "v2/Components/Authentication/Types"
import { ReCaptchaContainer } from "v2/Utils/ReCaptchaContainer"

export interface ModalManagerProps {
  blurContainerSelector?: string
  csrf?: string
  handleSubmit?: (
    type: ModalType,
    options: ModalOptions,
    values: InputValues,
    formikBag: FormikProps<InputValues>
  ) => void
  image?: string
  onModalClose?: () => void
  onModalOpen?: () => void
  onSocialAuthEvent?: (options) => void
  redirectTo?: string
  showRecaptchaDisclaimer?: boolean
  submitUrls?: { [P in ModalType]: string } & {
    apple: string
    facebook: string
    twitter?: string
    forgot?: string
  }
  tracking?: TrackingProp
  type?: ModalType
}

export interface ModalManagerState {
  currentType?: ModalType
  error?: string
  options?: ModalOptions
  recaptchaLoaded: boolean
  switchedForms: boolean
}

export class ModalManager extends Component<
  ModalManagerProps,
  ModalManagerState
> {
  state: ModalManagerState = {
    // @ts-expect-error STRICT_NULL_CHECK
    currentType: null,
    options: {} as ModalOptions,
    recaptchaLoaded: false,
    switchedForms: false,
  }

  openModal = (options: ModalOptions) => {
    const { mode } = options

    this.setState({
      currentType: mode,
      options,
      recaptchaLoaded: true,
    })

    document.body.style.overflowY = "hidden"
    this.props.onModalOpen && this.props.onModalOpen()
  }

  closeModal = () => {
    let afterClose = this.state.options?.afterClose

    this.setState({
      // @ts-expect-error STRICT_NULL_CHECK
      currentType: null,
      options: {} as ModalOptions,
    })

    document.body.style.overflowY = "auto"
    this.props.onModalClose?.()
    afterClose?.()
  }

  handleTypeChange = type => {
    const newOptions = {
      ...this.state.options,
      mode: type,
    }

    this.setState({
      currentType: type,
      options: newOptions,
      switchedForms: true,
    })
  }

  setError = err => this.setState({ error: err })

  getSubtitle = () => {
    const { options, switchedForms, currentType } = this.state

    if (switchedForms) {
      switch (currentType) {
        case ModalType.login:
          return "Log in"
        case ModalType.signup:
          return "Sign up"
        case ModalType.forgot:
          return "Reset your password"
        default:
          return "The art world online"
      }
    } else {
      return (options && options.copy) || "The art world online"
    }
  }

  render() {
    const { blurContainerSelector, csrf, submitUrls, redirectTo } = this.props
    const { currentType, error, options } = this.state

    const handleSubmit: SubmitHandler = !!this.props.handleSubmit
      ? this.props.handleSubmit.bind(this, currentType, options)
      : // @ts-expect-error STRICT_NULL_CHECK
        defaultHandleSubmit(submitUrls[currentType], csrf, redirectTo)

    return (
      <AuthenticationModal
        blurContainerSelector={blurContainerSelector}
        show={!!currentType}
        onTypeChange={this.openModal}
        onClose={this.closeModal}
        subtitle={this.getSubtitle()}
        type={currentType}
        image={options && options.image}
        disableCloseOnBackgroundClick={Boolean(
          options?.disableCloseOnBackgroundClick
        )}
      >
        {this.state.recaptchaLoaded ? <ReCaptchaContainer /> : null}
        <FormSwitcher
          type={currentType}
          error={error}
          handleSubmit={handleSubmit}
          submitUrls={submitUrls}
          options={options}
          handleTypeChange={this.handleTypeChange}
          onSocialAuthEvent={this.props.onSocialAuthEvent}
          showRecaptchaDisclaimer={this.props.showRecaptchaDisclaimer}
        />
      </AuthenticationModal>
    )
  }
}

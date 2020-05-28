import { Flex } from "@artsy/palette"
import { withSystemContext } from "v2/Artsy"
import { checkEmail } from "v2/Components/Authentication/helpers"
import Icon from "v2/Components/Icon"
import PasswordInput from "v2/Components/PasswordInput"
import { ProgressIndicator } from "v2/Components/ProgressIndicator"
import QuickInput from "v2/Components/QuickInput"
import { Step, Wizard } from "v2/Components/Wizard"
import { FormikProps, useFormikContext } from "formik"
import React, { Component, Fragment, useEffect } from "react"
import { Environment } from "relay-runtime"
import { recaptcha } from "v2/Utils/recaptcha"
import {
  BackButton,
  Error,
  Footer,
  ForgotPassword,
  MobileContainer,
  MobileHeader,
  MobileInnerWrapper,
  SubmitButton,
} from "../commonElements"
import { FormProps, InputValues, ModalType } from "../Types"
import { MobileLoginValidator } from "../Validators"
import { StepElement } from "v2/Components/Wizard/types"

interface ConditionalOtpInputProps {
  error: string
}

const OtpInput: React.FC<ConditionalOtpInputProps> = props => {
  const {
    errors,
    values,
    handleBlur,
    handleChange,
    setTouched,
  } = useFormikContext<InputValues>()

  return (
    <QuickInput
      block
      error={errors.otp_attempt}
      name="otp_attempt"
      placeholder="Enter an authentication code"
      value={values.otp_attempt}
      label="Authentication Code"
      onChange={handleChange}
      onBlur={handleBlur}
      setTouched={setTouched}
      touchedOnChange={false}
      autoFocus
    />
  )
}

interface OtpInputTriggerProps {
  setShowOtp: (show: boolean, cb: () => void) => void
  showOtp: boolean
  next: (e: null, values: InputValues) => void
  error: string
}

const OtpInputTrigger: React.FC<OtpInputTriggerProps> = props => {
  const { status, values } = useFormikContext<InputValues>()

  const globalError = props.error || (status && !status.success && status.error)
  const isOtpMissing = globalError === "missing two-factor authentication code"

  useEffect(() => {
    if (!props.showOtp && isOtpMissing) {
      props.setShowOtp(true, () => {
        props.next(null, values)
      })
    }
  }, [status, isOtpMissing, props, values])

  return null
}

interface LoginFormState {
  error: string
  showOtp: boolean
  isSocialSignUp: boolean
}

class MobileLoginFormWithSystemContext extends Component<
  FormProps & { relayEnvironment: Environment },
  LoginFormState
> {
  constructor(props) {
    super(props)

    this.state = {
      isSocialSignUp: false,
      error: props.error,
      showOtp: props.error === "missing two-factor authentication code",
    }
  }

  showError = status => {
    const { error } = this.state

    const globalError = error || (status && !status.success && status.error)
    const isOtpMissing =
      globalError === "missing two-factor authentication code"

    if (globalError && !isOtpMissing) {
      return <Error show>{globalError}</Error>
    }

    return null
  }

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    recaptcha("login_submit")
    this.props.handleSubmit(values, formikBag)
  }

  steps: StepElement[] = [
    <Step
      validationSchema={MobileLoginValidator.email}
      onSubmit={(values, actions) =>
        checkEmail({
          relayEnvironment: this.props.relayEnvironment,
          values,
          actions,
          shouldExist: true,
        })
      }
    >
      {({ form: { errors, values, handleChange, handleBlur, setTouched } }) => (
        <QuickInput
          block
          error={!this.state.isSocialSignUp && errors.email}
          placeholder="Enter your email address"
          name="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          setTouched={setTouched}
          touchedOnChange={false}
          autoFocus
        />
      )}
    </Step>,
    <Step validationSchema={MobileLoginValidator.password}>
      {({
        wizard,
        form: { errors, touched, values, handleChange, handleBlur, setTouched },
      }) => (
        <Fragment>
          <PasswordInput
            block
            error={errors.password}
            name="password"
            label="Password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            setTouched={setTouched}
            touchedOnChange={false}
            autoFocus
          />
          <Flex alignItems="center" justifyContent="flex-end">
            <ForgotPassword onClick={() => this.getForgotUrl()} />
          </Flex>
        </Fragment>
      )}
    </Step>,
  ]

  otpStep = (
    <Step validationSchema={MobileLoginValidator.otpAttempt}>
      {() => <OtpInput error={this.state.error} />}
    </Step>
  )

  setShowOtp = (show, cb) => this.setState({ showOtp: show }, cb)

  getForgotUrl = () => {
    const options = location.search
    location.assign(`/forgot${options && options}`)
  }

  render() {
    const { showOtp } = this.state

    return (
      <Wizard
        steps={showOtp ? this.steps.concat([this.otpStep]) : this.steps}
        onComplete={this.onSubmit}
      >
        {context => {
          const {
            wizard,
            form: { handleSubmit, values, status, isSubmitting },
          } = context

          const { currentStep, isLastStep, next } = wizard

          return (
            <MobileContainer data-test="LoginForm">
              <ProgressIndicator percentComplete={wizard.progressPercentage} />
              <MobileInnerWrapper>
                {!showOtp && (
                  <BackButton
                    onClick={e =>
                      this.props.onBackButtonClicked &&
                      wizard.currentStepIndex === 0
                        ? this.props.onBackButtonClicked(e as any)
                        : wizard.previous(e, values)
                    }
                  >
                    <Icon name="chevron-left" color="black60" fontSize="16px" />
                  </BackButton>
                )}
                <MobileHeader>Log in to Artsy</MobileHeader>
                {currentStep}
                {this.showError(status)}
                <OtpInputTrigger
                  error={this.state.error}
                  next={next}
                  showOtp={this.state.showOtp}
                  setShowOtp={this.setShowOtp}
                />
                <SubmitButton
                  onClick={e => {
                    this.setState(
                      {
                        isSocialSignUp: false,
                      },
                      () => {
                        handleSubmit(e)
                      }
                    )
                  }}
                  loading={isLastStep && isSubmitting}
                >
                  {isLastStep ? "Log in" : "Next"}
                </SubmitButton>
                <Footer
                  mode={"login" as ModalType}
                  handleTypeChange={this.props.handleTypeChange}
                  onAppleLogin={e => {
                    this.setState(
                      {
                        isSocialSignUp: true,
                      },
                      () => {
                        this.props.onAppleLogin(e)
                      }
                    )
                  }}
                  onFacebookLogin={e => {
                    this.setState(
                      {
                        isSocialSignUp: true,
                      },
                      () => {
                        this.props.onFacebookLogin(e)
                      }
                    )
                  }}
                />
              </MobileInnerWrapper>
            </MobileContainer>
          )
        }}
      </Wizard>
    )
  }
}

export const MobileLoginForm = withSystemContext(
  MobileLoginFormWithSystemContext
)

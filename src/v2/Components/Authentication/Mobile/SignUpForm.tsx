import { withSystemContext } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import {
  BackButton,
  Error,
  Footer,
  MobileContainer,
  MobileHeader,
  MobileInnerWrapper,
  SubmitButton,
  TermsOfServiceCheckbox,
} from "v2/Components/Authentication/commonElements"
import { checkEmail } from "v2/Components/Authentication/helpers"
import {
  FormProps,
  InputValues,
  ModalType,
} from "v2/Components/Authentication/Types"
import { MobileSignUpValidator } from "v2/Components/Authentication/Validators"
import Icon from "v2/Components/Icon"
import PasswordInput from "v2/Components/PasswordInput"
import { ProgressIndicator } from "v2/Components/ProgressIndicator"
import QuickInput from "v2/Components/QuickInput"
import { Step, Wizard } from "v2/Components/Wizard"
import { FormikProps } from "formik"
import React, { Component, Fragment } from "react"
import { Environment } from "relay-runtime"
import { recaptcha } from "v2/Utils/recaptcha"

export interface MobileSignUpFormState {
  isSocialSignUp: boolean
}

export const currentStepActionName = {
  0: Schema.ActionName.EmailNextButton,
  1: Schema.ActionName.PasswordNextButton,
}

@track()
class TrackedMobileSignUpForm extends Component<
FormProps & {
  relayEnvironment: Environment
},
MobileSignUpFormState
> {
  state = {
    isSocialSignUp: false,
  }

  @track((props: { contextModule: string; intent: string }, state, args) => ({
    action_type: Schema.ActionType.Click,
    action_name: currentStepActionName[args[0]],
    contextModule: args[1],
    flow: "auth",
    subject: "clicked next button",
    intent: props.intent,
  }))
  trackNextClick(currentStepIndex, contextModule) {
    // no op
  }

  showError = status => {
    const { error } = this.props
    if (error) {
      return <Error show>{error}</Error>
    }

    if (status && !status.success) {
      return <Error show>{status.error}</Error>
    }

    return null
  }

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    recaptcha("signup_submit", recaptcha_token => {
      const valuesWithToken = {
        ...values,
        recaptcha_token,
      }
      this.props.handleSubmit(valuesWithToken, formikBag)
    })
  }

  render() {
    const steps = [
      <Step
        validationSchema={MobileSignUpValidator.email}
        onSubmit={(values, actions) =>
          checkEmail({
            relayEnvironment: this.props.relayEnvironment,
            values,
            actions,
            shouldExist: false,
          })
        }
      >
        {({
          wizard,
          form: { errors, values, handleChange, handleBlur, setTouched },
        }) => (
            <Fragment>
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
              <TermsOfServiceCheckbox
                error={errors.accepted_terms_of_service}
                checked={values.accepted_terms_of_service}
                value={values.accepted_terms_of_service}
                type="checkbox"
                name="accepted_terms_of_service"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Fragment>
          )}
      </Step>,
      <Step validationSchema={MobileSignUpValidator.password}>
        {({
          wizard,
          form: { errors, values, handleChange, handleBlur, setTouched },
        }) => (
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
              showPasswordMessage
            />
          )}
      </Step>,
      <Step validationSchema={MobileSignUpValidator.name}>
        {({
          wizard,
          form: { errors, values, handleChange, handleBlur, setTouched },
        }) => (
            <QuickInput
              block
              error={errors.name}
              name="name"
              label="Name"
              placeholder="Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              setTouched={setTouched}
              touchedOnChange={false}
            />
          )}
      </Step>,
    ]

    return (
      <Wizard
        steps={steps}
        onComplete={this.onSubmit}
        initialValues={{ accepted_terms_of_service: false }}
      >
        {context => {
          const {
            form: { handleSubmit, values, setTouched, isSubmitting, status },
            wizard,
          } = context
          const { currentStep, isLastStep } = wizard

          return (
            <MobileContainer data-test="SignUpForm">
              <ProgressIndicator percentComplete={wizard.progressPercentage} />
              <MobileInnerWrapper>
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
                <MobileHeader>
                  {this.props.title || "Sign up for Artsy"}
                </MobileHeader>
                {currentStep}
                {this.showError(status)}
                <SubmitButton
                  onClick={e => {
                    if (wizard.shouldAllowNext && this.props.contextModule) {
                      this.trackNextClick(
                        wizard.currentStepIndex,
                        this.props.contextModule
                      )
                    }

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
                  {isLastStep ? "Create account" : "Next"}
                </SubmitButton>
                <Footer
                  mode={"signup" as ModalType}
                  onAppleLogin={e => {
                    if (!values.accepted_terms_of_service) {
                      this.setState(
                        {
                          isSocialSignUp: true,
                        },
                        () => {
                          setTouched({
                            accepted_terms_of_service: true,
                          })
                        }
                      )
                    } else {
                      if (this.props.onAppleLogin) {
                        this.props.onAppleLogin(e)
                      }
                    }
                  }}
                  onFacebookLogin={e => {
                    if (!values.accepted_terms_of_service) {
                      this.setState(
                        {
                          isSocialSignUp: true,
                        },
                        () => {
                          setTouched({
                            accepted_terms_of_service: true,
                          })
                        }
                      )
                    } else {
                      if (this.props.onFacebookLogin) {
                        this.props.onFacebookLogin(e)
                      }
                    }
                  }}
                  handleTypeChange={this.props.handleTypeChange}
                  showRecaptchaDisclaimer={this.props.showRecaptchaDisclaimer}
                />
              </MobileInnerWrapper>
            </MobileContainer>
          )
        }}
      </Wizard>
    )
  }
}

export const MobileSignUpForm = withSystemContext(TrackedMobileSignUpForm)

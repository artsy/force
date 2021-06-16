import { Flex } from "@artsy/palette"
import {
  Error,
  Footer,
  ForgotPassword,
  FormContainer as Form,
  SubmitButton,
} from "v2/Components/Authentication/commonElements"
import {
  FormProps,
  InputValues,
  ModalType,
} from "v2/Components/Authentication/Types"
import { LoginValidator } from "v2/Components/Authentication/Validators"
import { PasswordInput } from "v2/Components/PasswordInput"
import QuickInput from "v2/Components/QuickInput"
import { Formik, FormikProps, useFormikContext } from "formik"
import React, { Component, useEffect, useState } from "react"
import { recaptcha } from "v2/Utils/recaptcha"

interface ConditionalOtpInputProps {
  error: string
}

// @ts-expect-error STRICT_NULL_CHECK
const ConditionalOtpInput: React.FC<ConditionalOtpInputProps> = props => {
  const [show, setShow] = useState(false)
  const {
    errors,
    values,
    handleBlur,
    handleChange,
    setTouched,
  } = useFormikContext<InputValues>()

  if (!show && props.error === "missing two-factor authentication code") {
    setShow(true)
  }

  return (
    show && (
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
  )
}

export interface LoginFormState {
  error: string
  isSocialSignUp: boolean
  isLoading: boolean
}

export class LoginForm extends Component<FormProps, LoginFormState> {
  // @ts-expect-error STRICT_NULL_CHECK
  state = {
    error: this.props.error,
    isSocialSignUp: false,
    isLoading: false,
  }

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    recaptcha("login_submit")
    this.setState(
      {
        isSocialSignUp: false,
        isLoading: true,
      },
      () => {
        // @ts-expect-error STRICT_NULL_CHECK
        this.props.handleSubmit(values, formikBag)
      }
    )
  }

  render() {
    return (
      <Formik
        initialValues={this.props.values || {}}
        onSubmit={this.onSubmit}
        validationSchema={LoginValidator}
      >
        {({
          values,
          errors,
          touched,
          handleChange: formikHandleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          status,
          setStatus,
        }: FormikProps<InputValues>) => {
          const globalError =
            this.state.error || (status && !status.success && status.error)

          useEffect(() => {
            if (globalError) {
              this.setState({ isLoading: false })
            }
          }, [globalError])

          const handleChange = e => {
            setStatus(null)
            // @ts-expect-error STRICT_NULL_CHECK
            this.setState({ error: null })
            formikHandleChange(e)
          }

          return (
            <Form onSubmit={handleSubmit} data-test="LoginForm">
              <QuickInput
                block
                // @ts-expect-error STRICT_NULL_CHECK
                error={
                  !this.state.isSocialSignUp && touched.email && errors.email
                }
                placeholder="Enter your email address"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
              />
              <PasswordInput
                block
                // @ts-expect-error STRICT_NULL_CHECK
                error={touched.password && errors.password}
                placeholder="Enter your password"
                name="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ConditionalOtpInput error={globalError} />
              <Flex alignItems="center" justifyContent="flex-end">
                <ForgotPassword
                  // @ts-expect-error STRICT_NULL_CHECK
                  onClick={() => this.props.handleTypeChange(ModalType.forgot)}
                />
              </Flex>
              {globalError &&
                globalError !== "missing two-factor authentication code" && (
                  <Error show>{globalError}</Error>
                )}
              <SubmitButton loading={isSubmitting || this.state.isLoading}>
                Log in
              </SubmitButton>
              <Footer
                handleTypeChange={() =>
                  // @ts-expect-error STRICT_NULL_CHECK
                  this.props.handleTypeChange(ModalType.signup)
                }
                mode={"login" as ModalType}
                onAppleLogin={e => {
                  this.setState(
                    {
                      isSocialSignUp: true,
                    },
                    () => {
                      // @ts-expect-error STRICT_NULL_CHECK
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
                      // @ts-expect-error STRICT_NULL_CHECK
                      this.props.onFacebookLogin(e)
                    }
                  )
                }}
                inline
              />
            </Form>
          )
        }}
      </Formik>
    )
  }
}

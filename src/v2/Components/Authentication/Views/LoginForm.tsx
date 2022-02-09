import {
  Banner,
  Box,
  Button,
  Clickable,
  Input,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import {
  FormProps,
  InputValues,
  ModalType,
} from "v2/Components/Authentication/Types"
import { LoginValidator } from "v2/Components/Authentication/Validators"
import { Formik, FormikProps } from "formik"
import { Component, useEffect } from "react"
import * as React from "react"
import { recaptcha } from "v2/Utils/recaptcha"
import { isOtpError } from "v2/Components/Authentication/helpers"
import { AuthenticationPasswordInput } from "../Components/AuthenticationPasswordInput"
import { AuthenticationFooter } from "../Components/AuthenticationFooter"
import { AuthenticationOtpInput } from "../Components/AuthenticationOtpInput"

export interface LoginFormState {
  error?: string | null
  isSocialSignUp: boolean
  isLoading: boolean
  otpRequired: boolean
}

interface SubmitValues extends InputValues {
  otpRequired: boolean
}

export class LoginForm extends Component<FormProps, LoginFormState> {
  state = {
    error: this.props.error,
    isSocialSignUp: false,
    isLoading: false,
    otpRequired: false,
  }

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    recaptcha("login_submit")
    this.setState({ isSocialSignUp: false, isLoading: true }, () => {
      const submitValues: SubmitValues = {
        ...values,
        otpRequired: this.state.otpRequired,
      }
      this.props.handleSubmit?.(submitValues, formikBag)
    })
  }

  render() {
    return (
      <Formik
        initialValues={this.props.values || {}}
        onSubmit={this.onSubmit}
        validationSchema={LoginValidator}
        validateOnBlur={false}
        validateOnChange={false}
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
          const globalError: string =
            this.state.error || (status && !status.success && status.error)

          useEffect(() => {
            if (globalError) {
              this.setState({ isLoading: false })
            }

            if (isOtpError(globalError)) {
              this.setState({ otpRequired: true })
            }
          }, [globalError, status])

          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setStatus(null)
            this.setState({ error: null })
            formikHandleChange(event)
          }

          return (
            <Box
              as="form"
              data-test="LoginForm"
              width="100%"
              // @ts-ignore
              onSubmit={handleSubmit}
            >
              <Join separator={<Spacer mt={2} />}>
                <Input
                  error={
                    (!this.state.isSocialSignUp &&
                      touched.email &&
                      errors.email) ||
                    ""
                  }
                  placeholder="Enter your email address"
                  name="email"
                  title="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoFocus
                  autoComplete="email"
                />

                <AuthenticationPasswordInput
                  error={(touched.password && errors.password) || ""}
                  placeholder="Enter your password"
                  name="password"
                  title="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                />

                <AuthenticationOtpInput error={globalError} />

                <Text variant="xs" textAlign="right">
                  <Clickable
                    data-test="forgot"
                    color="black60"
                    textDecoration="underline"
                    onClick={() =>
                      this.props.handleTypeChange?.(ModalType.forgot)
                    }
                  >
                    Forgot Password?
                  </Clickable>
                </Text>

                {globalError && !isOtpError(globalError) && (
                  <Banner variant="error">{globalError}</Banner>
                )}

                <Button
                  type="submit"
                  width="100%"
                  loading={isSubmitting || this.state.isLoading}
                >
                  Log in
                </Button>

                <Text variant="sm" textAlign="center" color="black60">
                  or
                </Text>

                <AuthenticationFooter
                  mode={"login" as ModalType}
                  handleTypeChange={() =>
                    this.props.handleTypeChange?.(ModalType.signup)
                  }
                  onAppleLogin={e => {
                    this.setState({ isSocialSignUp: true }, () => {
                      this.props.onAppleLogin?.(e)
                    })
                  }}
                  onFacebookLogin={e => {
                    this.setState({ isSocialSignUp: true }, () => {
                      this.props.onFacebookLogin?.(e)
                    })
                  }}
                  onGoogleLogin={e => {
                    this.setState({ isSocialSignUp: true }, () => {
                      this.props.onGoogleLogin?.(e)
                    })
                  }}
                />
              </Join>
            </Box>
          )
        }}
      </Formik>
    )
  }
}

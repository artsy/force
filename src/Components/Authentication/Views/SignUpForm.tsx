import { createFragmentContainer, graphql } from "react-relay"
import { SignUpFormLocationQuery } from "__generated__/SignUpFormLocationQuery.graphql"
import { useSystemContext } from "System"
import {
  FormProps,
  InputValues,
  ModalType,
} from "Components/Authentication/Types"
import { SignUpValidator } from "Components/Authentication/Validators"
import { Formik, FormikProps } from "formik"
import { Component } from "react"
import * as React from "react"
import { recaptcha } from "Utils/recaptcha"
import { data as sd } from "sharify" // eslint-disable-line no-restricted-imports
import { SignUpForm_requestLocation$data } from "__generated__/SignUpForm_requestLocation.graphql"
import { Banner, Box, Button, Input, Join, Spacer, Text } from "@artsy/palette"
import { AuthenticationPasswordInput } from "Components/Authentication/Components/AuthenticationPasswordInput"
import { AuthenticationCheckbox } from "Components/Authentication/Components/AuthenticationCheckbox"
import { AuthenticationFooter } from "Components/Authentication/Components/AuthenticationFooter"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { AuthenticationSignUpPlaceholder } from "Components/Authentication/Components/AuthenticationSignUpPlaceholder"

const gdprCountries = [
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
]

export interface SignUpFormState {
  error?: string | null
}

interface SignUpFormProps extends FormProps {
  requestLocation?: SignUpForm_requestLocation$data
}

export class SignUpForm extends Component<SignUpFormProps, SignUpFormState> {
  state = {
    error: this.props.error,
  }

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    recaptcha("signup_submit", recaptcha_token => {
      const valuesWithToken = {
        ...values,
        recaptcha_token,
      }

      this.props.handleSubmit?.(valuesWithToken, formikBag)
    })
  }

  render() {
    const countryCode = this.props.requestLocation?.countryCode || ""
    const isAutomaticallySubscribed = !!(
      countryCode && !gdprCountries.includes(countryCode)
    )

    const initialValues = {
      ...this.props.values,
      agreed_to_receive_emails: isAutomaticallySubscribed,
      accepted_terms_of_service: true,
    }

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.onSubmit}
        validationSchema={SignUpValidator}
        validateOnBlur={false}
      >
        {({
          errors,
          handleBlur,
          handleChange: formikHandleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setStatus,
          status,
          touched,
          values,
        }: FormikProps<InputValues>) => {
          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setStatus(null)
            this.setState({ error: null })
            formikHandleChange(event)
          }

          const emailErrorMessage = touched.email ? errors.email : ""
          const passwordErrorMessage = touched.password ? errors.password : ""
          const nameErrorMessage = touched.name ? errors.name : ""

          return (
            <Box
              as="form"
              data-test="SignUpForm"
              width="100%"
              // @ts-ignore
              onSubmit={handleSubmit}
            >
              <Join separator={<Spacer y={2} />}>
                <Input
                  autoFocus
                  error={nameErrorMessage}
                  title="Name"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  type="text"
                  value={values.name}
                  autoComplete="name"
                />

                <Input
                  error={emailErrorMessage}
                  title="Email"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  type="email"
                  value={values.email}
                  autoComplete="email"
                />

                <Box>
                  <AuthenticationPasswordInput
                    error={passwordErrorMessage}
                    title="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter a password"
                    value={values.password}
                    autoComplete="new-password"
                  />

                  {!passwordErrorMessage && (
                    <Text variant="xs" color="black60" mt={0.5}>
                      Password must be at least 8 characters and include a
                      lowercase letter, uppercase letter, and digit.
                    </Text>
                  )}
                </Box>

                {status && !status.success && (
                  <Banner variant="error">{status.error}</Banner>
                )}

                {!isAutomaticallySubscribed && (
                  <AuthenticationCheckbox
                    selected={values.agreed_to_receive_emails}
                    onSelect={selected => {
                      setFieldValue("agreed_to_receive_emails", selected)
                    }}
                  >
                    Dive deeper into the art market with Artsy emails. Subscribe
                    to hear about our products, services, editorials, and other
                    promotional content. Unsubscribe at any time.
                  </AuthenticationCheckbox>
                )}

                <Button type="submit" loading={isSubmitting} width="100%">
                  Sign up
                </Button>

                <Text variant="sm" textAlign="center" color="black60">
                  or
                </Text>

                <AuthenticationFooter
                  mode={"signup" as ModalType}
                  handleTypeChange={() =>
                    this.props.handleTypeChange?.(ModalType.login)
                  }
                  onAppleLogin={async e => {
                    e.preventDefault()
                    this.props.onAppleLogin?.(e)
                  }}
                  onFacebookLogin={async e => {
                    e.preventDefault()
                    this.props.onFacebookLogin?.(e)
                  }}
                  onGoogleLogin={async e => {
                    e.preventDefault()
                    this.props.onGoogleLogin?.(e)
                  }}
                  showRecaptchaDisclaimer={this.props.showRecaptchaDisclaimer}
                  isAutomaticallySubscribed={isAutomaticallySubscribed}
                />
              </Join>
            </Box>
          )
        }}
      </Formik>
    )
  }
}

const SignUpFormFragmentContainer = createFragmentContainer(SignUpForm, {
  requestLocation: graphql`
    fragment SignUpForm_requestLocation on RequestLocation {
      countryCode
    }
  `,
})

export const SignUpFormQueryRenderer: React.FC<FormProps> = passedProps => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<SignUpFormLocationQuery>
      environment={relayEnvironment!}
      variables={{ ip: sd.IP_ADDRESS || "0.0.0.0" }}
      query={graphql`
        query SignUpFormLocationQuery($ip: String!) {
          requestLocation(ip: $ip) {
            ...SignUpForm_requestLocation
          }
        }
      `}
      placeholder={<AuthenticationSignUpPlaceholder />}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return <SignUpForm {...passedProps} />
        }

        if (!props?.requestLocation) {
          return <AuthenticationSignUpPlaceholder />
        }

        return (
          <SignUpFormFragmentContainer
            {...passedProps}
            requestLocation={props.requestLocation}
          />
        )
      }}
    />
  )
}

export const tests = {
  SignUpFormFragmentContainer,
}

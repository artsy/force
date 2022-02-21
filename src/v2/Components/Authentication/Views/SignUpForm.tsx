import { createFragmentContainer, graphql } from "react-relay"
import { SignUpFormLocationQuery } from "v2/__generated__/SignUpFormLocationQuery.graphql"
import { useSystemContext } from "v2/System"
import {
  FormProps,
  InputValues,
  ModalType,
} from "v2/Components/Authentication/Types"
import { SignUpValidator } from "v2/Components/Authentication/Validators"
import { Formik, FormikProps } from "formik"
import { Component } from "react"
import * as React from "react"
import { recaptcha } from "v2/Utils/recaptcha"
import { data as sd } from "sharify" // eslint-disable-line no-restricted-imports
import { SignUpForm_requestLocation$data } from "v2/__generated__/SignUpForm_requestLocation.graphql"
import { Banner, Box, Button, Input, Join, Spacer, Text } from "@artsy/palette"
import { AuthenticationPasswordInput } from "../Components/AuthenticationPasswordInput"
import { AuthenticationCheckbox } from "../Components/AuthenticationCheckbox"
import { AuthenticationFooter } from "../Components/AuthenticationFooter"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

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
    const initialValues = {
      accepted_terms_of_service: false,
      agreed_to_receive_emails: false,
      ...this.props.values,
    }

    const countryCode = this.props.requestLocation?.countryCode || ""
    const collapseCheckboxes =
      countryCode && !gdprCountries.includes(countryCode)

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
          setTouched,
          status,
          touched,
          validateForm,
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
          const termsErrorMessage = touched.accepted_terms_of_service
            ? errors.accepted_terms_of_service
            : ""

          return (
            <Box
              as="form"
              data-test="SignUpForm"
              width="100%"
              // @ts-ignore
              onSubmit={handleSubmit}
            >
              <Join separator={<Spacer mt={2} />}>
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
                      Password must be at least 8 characters.
                    </Text>
                  )}
                </Box>

                {status && !status.success && (
                  <Banner variant="error">{status.error}</Banner>
                )}

                {collapseCheckboxes ? (
                  <AuthenticationCheckbox
                    error={!!termsErrorMessage}
                    selected={values.accepted_terms_of_service}
                    onSelect={selected => {
                      setFieldValue("agreed_to_receive_emails", selected)
                      setFieldValue("accepted_terms_of_service", selected)
                    }}
                    data-test="agreeToTerms"
                  >
                    {"I agree to the "}
                    <a href="https://www.artsy.net/terms" target="_blank">
                      Terms of Use
                    </a>
                    {", "}
                    <a href="https://www.artsy.net/privacy" target="_blank">
                      Privacy Policy
                    </a>
                    {", and "}
                    <a
                      href="https://www.artsy.net/conditions-of-sale"
                      target="_blank"
                    >
                      Conditions of Sale
                    </a>
                    {" and to receiving emails from Artsy."}
                  </AuthenticationCheckbox>
                ) : (
                  <AuthenticationCheckbox
                    error={!!termsErrorMessage}
                    selected={values.accepted_terms_of_service}
                    onSelect={selected => {
                      setFieldValue("accepted_terms_of_service", selected)
                    }}
                    data-test="agreeToTerms"
                  >
                    {"By checking this box, you consent to our "}
                    <a href="https://www.artsy.net/terms" target="_blank">
                      Terms of Use
                    </a>
                    {", "}
                    <a href="https://www.artsy.net/privacy" target="_blank">
                      Privacy Policy
                    </a>
                    {", and "}
                    <a
                      href="https://www.artsy.net/conditions-of-sale"
                      target="_blank"
                    >
                      Conditions of Sale
                    </a>
                    {"."}
                  </AuthenticationCheckbox>
                )}

                {!collapseCheckboxes && (
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
                    if (!values.accepted_terms_of_service) {
                      setTouched({ accepted_terms_of_service: true })
                      await validateForm()
                    } else {
                      this.props.onAppleLogin?.(e)
                    }
                  }}
                  onFacebookLogin={async e => {
                    e.preventDefault()
                    if (!values.accepted_terms_of_service) {
                      setTouched({ accepted_terms_of_service: true })
                      await validateForm()
                    } else {
                      this.props.onFacebookLogin?.(e)
                    }
                  }}
                  onGoogleLogin={async e => {
                    e.preventDefault()
                    if (!values.accepted_terms_of_service) {
                      setTouched({ accepted_terms_of_service: true })
                      await validateForm()
                    } else {
                      this.props.onGoogleLogin?.(e)
                    }
                  }}
                  showRecaptchaDisclaimer={this.props.showRecaptchaDisclaimer}
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
      placeholder={<SignUpForm {...passedProps} />}
      render={({ error, props }) => {
        if (error || !props || !props.requestLocation) {
          return <SignUpFormFragmentContainer {...passedProps} />
        } else {
          return (
            <SignUpFormFragmentContainer
              {...passedProps}
              requestLocation={props.requestLocation}
            />
          )
        }
      }}
    />
  )
}

export const tests = {
  SignUpFormFragmentContainer,
}

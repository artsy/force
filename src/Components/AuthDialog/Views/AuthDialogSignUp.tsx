import * as Yup from "yup"
import {
  Box,
  Button,
  Clickable,
  Input,
  Join,
  Message,
  PasswordInput,
  Spacer,
  Text,
} from "@artsy/palette"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { AuthDialogSocial } from "Components/AuthDialog/Components/AuthDialogSocial"
import { Form, Formik } from "formik"
import { FC } from "react"
import { signUp } from "Utils/auth"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { getENV } from "Utils/getENV"
import { AuthDialogSignUpQuery } from "__generated__/AuthDialogSignUpQuery.graphql"
import { AuthDialogSignUp_requestLocation$data } from "__generated__/AuthDialogSignUp_requestLocation.graphql"
import { AuthTermsCheckboxes } from "Components/AuthDialog/Components/AuthTermsCheckboxes"
import { useAfterAuthentication } from "Components/AuthDialog/Hooks/useAfterAuthentication"

interface AuthDialogSignUpProps {
  requestLocation?: AuthDialogSignUp_requestLocation$data | null
}

export const AuthDialogSignUp: FC<AuthDialogSignUpProps> = ({
  requestLocation,
}) => {
  const { dispatch } = useAuthDialogContext()

  const { runAfterAuthentication } = useAfterAuthentication()

  const countryCode = requestLocation?.countryCode ?? ""
  const isAutomaticallySubscribed = !GDPR_COUNTRY_CODES.includes(countryCode)

  return (
    <Formik
      validateOnBlur={false}
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={async ({ mode, ...values }, { setFieldValue, setStatus }) => {
        setStatus({ error: null })
        setFieldValue("mode", "Loading")

        try {
          const { user } = await signUp(values)

          runAfterAuthentication({ accessToken: user.accessToken })

          setFieldValue("mode", "Success")
        } catch (err) {
          console.error(err)

          setFieldValue("mode", "Error")
          setStatus({ error: err.message })
        }
      }}
    >
      {({
        dirty,
        errors,
        handleBlur,
        handleChange,
        isValid,
        status,
        touched,
        values,
      }) => {
        return (
          <Form data-test="SignUpForm">
            <Join separator={<Spacer y={2} />}>
              <Input
                name="name"
                title="Name"
                placeholder="Enter your full name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="name"
                autoFocus
                error={touched.name && errors.name}
              />

              <Input
                name="email"
                title="Email"
                type="email"
                placeholder="Enter your email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                error={touched.email && errors.email}
              />

              <Box>
                <PasswordInput
                  name="password"
                  title="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="new-password"
                  error={touched.password && errors.password}
                />

                <Spacer y={0.5} />

                <Text variant="xs" color="black60">
                  Password must be at least 8 characters and include a lowercase
                  letter, uppercase letter, and digit.
                </Text>
              </Box>

              <AuthTermsCheckboxes
                isAutomaticallySubscribed={isAutomaticallySubscribed}
              />

              {status?.error && (
                <Message variant="error">{status.error}</Message>
              )}

              <Button
                width="100%"
                type="submit"
                loading={values.mode === "Loading" || values.mode === "Success"}
                disabled={!isValid || !dirty}
              >
                Sign up
              </Button>

              <Text variant="xs" textAlign="center" color="black60" my={-1}>
                or
              </Text>

              <AuthDialogSocial />

              <Text variant="xs" color="black60" textAlign="center">
                Already have an account?{" "}
                <Clickable
                  textDecoration="underline"
                  onClick={() => {
                    dispatch({ type: "MODE", payload: { mode: "Login" } })
                  }}
                >
                  Log in.
                </Clickable>
              </Text>

              <Text variant="xs" color="black60" textAlign="center">
                This site is protected by reCAPTCHA and the{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </Text>
            </Join>
          </Form>
        )
      }}
    </Formik>
  )
}

const AuthDialogSignUpFragmentContainer = createFragmentContainer(
  AuthDialogSignUp,
  {
    requestLocation: graphql`
      fragment AuthDialogSignUp_requestLocation on RequestLocation {
        countryCode
      }
    `,
  }
)

export const AuthDialogSignUpQueryRenderer: FC = () => {
  return (
    <SystemQueryRenderer<AuthDialogSignUpQuery>
      variables={{ ip: getENV("IP_ADDRESS") || "0.0.0.0" }}
      query={graphql`
        query AuthDialogSignUpQuery($ip: String!) {
          requestLocation(ip: $ip) {
            ...AuthDialogSignUp_requestLocation
          }
        }
      `}
      placeholder={<AuthDialogSignUp />}
      render={({ error, props }) => {
        if (error || !props || !props.requestLocation) {
          return <AuthDialogSignUpFragmentContainer />
        }

        return (
          <AuthDialogSignUpFragmentContainer
            requestLocation={props.requestLocation}
          />
        )
      }}
    />
  )
}

export const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  accepted_terms_of_service: false,
  agreed_to_receive_emails: false,
  mode: "Pending",
}

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
  password: Yup.string()
    .required("Password required")
    .min(8, "Your password must be at least 8 characters.")
    .matches(/\d{1}/, "Your password must have at least 1 digit.")
    .matches(/[a-z]{1}/, "Your password must have at least 1 lowercase letter.")
    .matches(
      /[A-Z]{1}/,
      "Your password must have at least 1 uppercase letter."
    ),
  accepted_terms_of_service: Yup.boolean()
    .required("You must agree to our terms to continue.")
    .oneOf([true]),
})

const GDPR_COUNTRY_CODES = [
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

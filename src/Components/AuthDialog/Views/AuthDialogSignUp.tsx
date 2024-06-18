import * as Yup from "yup"
import {
  Box,
  Button,
  Checkbox,
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
import { useAfterAuthentication } from "Components/AuthDialog/Hooks/useAfterAuthentication"
import { formatErrorMessage } from "Components/AuthDialog/Utils/formatErrorMessage"
import { isTouch } from "Utils/device"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { AuthDialogSignUpPlaceholder } from "Components/AuthDialog/Components/AuthDialogSignUpPlaceholder"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { RouterLink } from "System/Components/RouterLink"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

export const AuthDialogSignUp: FC = () => {
  const {
    dispatch,
    state: { options },
  } = useAuthDialogContext()

  const { runAfterAuthentication } = useAfterAuthentication()

  const track = useAuthDialogTracking()

  const { loading, countryCode } = useCountryCode()

  const showNewDisclaimer = useFeatureFlag("diamond_new-terms-and-conditions")

  const isAutomaticallySubscribed = !!(
    countryCode && !GDPR_COUNTRY_CODES.includes(countryCode)
  )

  if (loading) {
    return <AuthDialogSignUpPlaceholder />
  }

  return (
    <Formik
      validateOnBlur={false}
      initialValues={{
        ...INITIAL_VALUES,
        agreedToReceiveEmails: isAutomaticallySubscribed,
      }}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={async (
        { name, email, password, agreedToReceiveEmails },
        { setFieldValue, setStatus }
      ) => {
        setStatus({ error: null })
        setFieldValue("mode", "Loading")

        try {
          const { user } = await signUp({
            email,
            name,
            password,
            agreedToReceiveEmails,
          })

          runAfterAuthentication({ accessToken: user.accessToken })

          setFieldValue("mode", "Success")

          track.signedUp({ service: "email", userId: user.id })

          options.onSuccess?.()
        } catch (err) {
          console.error(err)

          setFieldValue("mode", "Error")
          setStatus({ error: formatErrorMessage(err) })
        }
      }}
    >
      {({
        dirty,
        errors,
        handleBlur,
        handleChange,
        isValid,
        setFieldValue,
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

              {!isAutomaticallySubscribed && (
                <Checkbox
                  selected={values.agreedToReceiveEmails}
                  onSelect={selected => {
                    setFieldValue("agreedToReceiveEmails", selected)
                  }}
                >
                  <Text variant="xs">
                    Dive deeper into the art market with Artsy emails. Subscribe
                    to hear about our products, services, editorials, and other
                    promotional content. Unsubscribe at any time.
                  </Text>
                </Checkbox>
              )}

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
                  data-test="login"
                  textDecoration="underline"
                  onClick={() => {
                    dispatch({ type: "MODE", payload: { mode: "Login" } })
                  }}
                >
                  Log in.
                </Clickable>
              </Text>

              <Text
                variant="xs"
                color="black60"
                textAlign="center"
                data-testid="disclaimer"
              >
                By {isTouch ? "tapping" : "clicking"} Sign Up or Continue with
                {showNewDisclaimer ? " Email, " : " "}
                Apple, Google, or Facebook, you agree to Artsy’s{" "}
                <RouterLink inline to="/terms" target="_blank">
                  {showNewDisclaimer ? "Terms and Conditions" : "Terms of Use"}
                </RouterLink>{" "}
                and{" "}
                <RouterLink inline to="/privacy" target="_blank">
                  Privacy Policy
                </RouterLink>
                {isAutomaticallySubscribed && (
                  <> and to receiving emails from Artsy</>
                )}
                .
              </Text>

              <Text variant="xs" color="black60" textAlign="center">
                This site is protected by reCAPTCHA and the{" "}
                <RouterLink
                  inline
                  to="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Privacy Policy
                </RouterLink>{" "}
                and{" "}
                <RouterLink
                  inline
                  to="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </RouterLink>{" "}
                apply.
              </Text>
            </Join>
          </Form>
        )
      }}
    </Formik>
  )
}

export const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  agreedToReceiveEmails: false,
  mode: "Pending",
}

export const passwordValidator = Yup.string()
  .required("Password required")
  .min(8, "Your password must be at least 8 characters.")
  .max(128, "Your password must be less than 128 characters.")
  .matches(/\d{1}/, "Your password must have at least 1 digit.")
  .matches(/[a-z]{1}/, "Your password must have at least 1 lowercase letter.")
  .matches(/[A-Z]{1}/, "Your password must have at least 1 uppercase letter.")

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
  password: passwordValidator,
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

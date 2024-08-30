import * as Yup from "yup"
import {
  Box,
  Button,
  Checkbox,
  Input,
  Message,
  PasswordInput,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { Form, Formik } from "formik"
import { FC } from "react"
import { signUp } from "Utils/auth"
import { useAfterAuthentication } from "Components/AuthDialog/Hooks/useAfterAuthentication"
import { formatErrorMessage } from "Components/AuthDialog/Utils/formatErrorMessage"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { AuthDialogSignUpPlaceholder } from "Components/AuthDialog/Components/AuthDialogSignUpPlaceholder"
import {
  GDPR_COUNTRY_CODES,
  useCountryCode,
} from "Components/AuthDialog/Hooks/useCountryCode"
import { AuthDialogDisclaimer } from "Components/AuthDialog/Views/AuthDialogDisclaimer"

export const AuthDialogSignUp: FC = () => {
  const {
    state: { options, values },
  } = useAuthDialogContext()

  const { runAfterAuthentication } = useAfterAuthentication()

  const track = useAuthDialogTracking()

  const { loading, countryCode } = useCountryCode()

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
        email: values.email || "",
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
            <Stack gap={4}>
              <Stack gap={1}>
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
                    Password must be at least 8 characters and include a
                    lowercase letter, uppercase letter, and digit.
                  </Text>
                </Box>
              </Stack>

              {!isAutomaticallySubscribed && (
                <Checkbox
                  selected={values.agreedToReceiveEmails}
                  onSelect={selected => {
                    setFieldValue("agreedToReceiveEmails", selected)
                  }}
                >
                  <Text variant="xs">
                    Subscribe to email to hear about our products, services,
                    editorials, and other promotional content. Unsubscribe at
                    any time.
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

              <AuthDialogDisclaimer />
            </Stack>
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

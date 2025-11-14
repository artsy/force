import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { AuthDialogSignUpPlaceholder } from "Components/AuthDialog/Components/AuthDialogSignUpPlaceholder"
import { useAfterAuthentication } from "Components/AuthDialog/Hooks/useAfterAuthentication"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { formatErrorMessage } from "Components/AuthDialog/Utils/formatErrorMessage"
import { AuthDialogDisclaimer } from "Components/AuthDialog/Views/AuthDialogDisclaimer"
import { signUp } from "Utils/auth"
import {
  Box,
  Button,
  Checkbox,
  Clickable,
  Input,
  Message,
  PasswordInput,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import { Form, Formik } from "formik"
import type { FC } from "react"
import * as Yup from "yup"

export const AuthDialogSignUp: FC<React.PropsWithChildren<unknown>> = () => {
  const {
    dispatch,
    state: { options, values, isFallback },
  } = useAuthDialogContext()

  const { runAfterAuthentication } = useAfterAuthentication()

  const track = useAuthDialogTracking()

  const { loading, isAutomaticallySubscribed } = useCountryCode()

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
        { setFieldValue, setStatus },
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

          const message =
            formatErrorMessage(err) ||
            "Something went wrong. Please try again or contact support@artsy.net."

          setFieldValue("mode", "Error")
          setStatus({ error: message })
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

                  <Text variant="xs" color="mono60">
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

              <Stack gap={1}>
                <Button
                  width="100%"
                  type="submit"
                  loading={
                    values.mode === "Loading" || values.mode === "Success"
                  }
                  disabled={!isValid || !dirty}
                >
                  Sign up
                </Button>

                {isFallback && (
                  <Text variant="xs" color="mono60" textAlign="center">
                    Already have an account?{" "}
                    <Clickable
                      textDecoration="underline"
                      color="mono100"
                      onClick={() => {
                        dispatch({ type: "MODE", payload: { mode: "Login" } })
                      }}
                    >
                      Log in.
                    </Clickable>
                  </Text>
                )}
              </Stack>

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

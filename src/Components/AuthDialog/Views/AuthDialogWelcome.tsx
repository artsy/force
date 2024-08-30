import * as Yup from "yup"
import { Button, Input, Stack, Text } from "@artsy/palette"
import { FC } from "react"
import { Form, Formik } from "formik"
import { AuthDialogSocial } from "Components/AuthDialog/Components/AuthDialogSocial"
import { AuthDialogDisclaimer } from "Components/AuthDialog/Views/AuthDialogDisclaimer"
import { fetchQuery, graphql } from "react-relay"
import { AuthDialogWelcomeQuery } from "__generated__/AuthDialogWelcomeQuery.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  DEFAULT_AUTH_MODAL_INTENTS,
  useAuthDialogContext,
} from "Components/AuthDialog/AuthDialogContext"
import { recaptcha } from "Utils/recaptcha"

interface AuthDialogWelcomeProps {}

export const AuthDialogWelcome: FC<AuthDialogWelcomeProps> = () => {
  const { relayEnvironment } = useSystemContext()

  const { dispatch, state } = useAuthDialogContext()

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{ email: "", mode: "Pending" }}
      onSubmit={async ({ email }) => {
        try {
          const recaptchaToken = await recaptcha("verify_user")

          const res = await fetchQuery<AuthDialogWelcomeQuery>(
            relayEnvironment,
            QUERY,
            { email, recaptchaToken: recaptchaToken ?? "" }
          ).toPromise()

          const exists = !!res?.verifyUser?.exists
          const mode = exists ? "Login" : "SignUp"

          dispatch({
            type: "SET",
            payload: {
              values: { email },
              analytics: {
                ...state.analytics,
                intent: DEFAULT_AUTH_MODAL_INTENTS[mode],
              },
            },
          })

          dispatch({
            type: "MODE",
            payload: { mode },
          })
        } catch (error) {
          console.error(error)

          dispatch({
            type: "SET",
            payload: {
              values: { email },
              analytics: {
                ...state.analytics,
                intent: DEFAULT_AUTH_MODAL_INTENTS.SignUp,
              },
            },
          })

          dispatch({ type: "FALLBACK" })
        }
      }}
    >
      {({
        dirty,
        errors,
        handleBlur,
        handleChange,
        isSubmitting,
        isValid,
        touched,
        values,
      }) => {
        return (
          <Form data-test="AuthDialogWelcomeForm">
            <Stack gap={4}>
              <Input
                name="email"
                title="Email"
                placeholder="Enter your email address"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                data-autofocus // For react-focus-lock
                autoComplete="email"
                error={touched.email && errors.email}
              />

              <Button
                type="submit"
                width="100%"
                loading={isSubmitting}
                disabled={!isValid || !dirty}
              >
                Continue
              </Button>

              <Stack gap={2}>
                <Text variant="xs" textAlign="center" color="black60" my={-1}>
                  Or continue with
                </Text>

                <AuthDialogSocial />
              </Stack>

              <AuthDialogDisclaimer />
            </Stack>
          </Form>
        )
      }}
    </Formik>
  )
}

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Email required."),
})

const QUERY = graphql`
  query AuthDialogWelcomeQuery($email: String!, $recaptchaToken: String!) {
    verifyUser(email: $email, recaptchaToken: $recaptchaToken) {
      exists
    }
  }
`

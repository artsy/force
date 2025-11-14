import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { AuthDialogSocial } from "Components/AuthDialog/Components/AuthDialogSocial"
import { AuthDialogDisclaimer } from "Components/AuthDialog/Views/AuthDialogDisclaimer"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { recaptcha } from "Utils/recaptcha"
import { Button, Input, Stack, Text } from "@artsy/palette"
import type { AuthDialogWelcomeQuery } from "__generated__/AuthDialogWelcomeQuery.graphql"
import { Form, Formik } from "formik"
import type { FC } from "react"
import { fetchQuery, graphql } from "react-relay"
import * as Yup from "yup"

type AuthDialogWelcomeProps = {}

export const AuthDialogWelcome: FC<
  React.PropsWithChildren<AuthDialogWelcomeProps>
> = () => {
  const { relayEnvironment } = useSystemContext()

  const {
    dispatch,
    state: { values },
  } = useAuthDialogContext()

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{ email: values.email || "", mode: "Pending" }}
      onSubmit={async ({ email }) => {
        dispatch({ type: "SET", payload: { values: { email } } })

        try {
          const recaptchaToken = await recaptcha("verify_user")

          const res = await fetchQuery<AuthDialogWelcomeQuery>(
            relayEnvironment,
            QUERY,
            { email, recaptchaToken: recaptchaToken ?? "" },
          ).toPromise()

          const verifyUser = res?.verifyUser

          if (!verifyUser) {
            throw new Error("Failed to verify user.")
          }

          const mode = verifyUser.exists ? "Login" : "SignUp"

          dispatch({ type: "MODE", payload: { mode } })
        } catch (error) {
          console.error(error)
          dispatch({ type: "FALLBACK" })
        }
      }}
    >
      {({
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
                disabled={!isValid}
              >
                Continue
              </Button>

              <Stack gap={2}>
                <Text variant="xs" textAlign="center" color="mono60" my={-1}>
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

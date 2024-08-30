import * as Yup from "yup"
import { Button, Input, Stack, Text } from "@artsy/palette"
import { FC } from "react"
import { Form, Formik } from "formik"
import { AuthDialogSocial } from "Components/AuthDialog/Components/AuthDialogSocial"
import { AuthDialogDisclaimer } from "Components/AuthDialog/Views/AuthDialogDisclaimer"
import { fetchQuery, graphql } from "react-relay"
import { AuthDialogWelcomeQuery } from "__generated__/AuthDialogWelcomeQuery.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { recaptcha } from "Utils/auth"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"

interface AuthDialogWelcomeProps {}

export const AuthDialogWelcome: FC<AuthDialogWelcomeProps> = props => {
  const { relayEnvironment } = useSystemContext()

  const { dispatch } = useAuthDialogContext()

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{ email: "", mode: "Pending" }}
      onSubmit={async ({ email }) => {
        try {
          const recaptchaToken = await recaptcha("verify_user")

          dispatch({ type: "SET", payload: { values: { email } } })

          if (!recaptchaToken) {
            // FIXME: Needs a user surfaceable error message
            throw new Error("reCAPTCHA failed")
          }

          const res = await fetchQuery<AuthDialogWelcomeQuery>(
            relayEnvironment,
            QUERY,
            { email, recaptchaToken }
          ).toPromise()

          const exists = !!res?.verifyUser?.exists

          dispatch({
            type: "MODE",
            payload: { mode: exists ? "Login" : "SignUp" },
          })
        } catch (error) {
          console.error(error)
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
        status,
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

import {
  Button,
  Clickable,
  Input,
  Join,
  Message,
  Spacer,
  Text,
} from "@artsy/palette"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { formatErrorMessage } from "Components/AuthDialog/Utils/formatErrorMessage"
import { forgotPassword } from "Utils/auth"
import { Form, Formik } from "formik"
import type { FC } from "react"
import * as Yup from "yup"

export const AuthDialogForgotPassword: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const {
    dispatch,
    state: { options, values },
  } = useAuthDialogContext()

  const track = useAuthDialogTracking()

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{ email: values.email || "", mode: "Pending" }}
      onSubmit={async ({ email }, { setStatus, setFieldValue }) => {
        setStatus({ error: null })
        setFieldValue("mode", "Loading")

        try {
          await forgotPassword({ email })

          setFieldValue("mode", "Success")

          track.resetPassword()

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
        isSubmitting,
        isValid,
        status,
        touched,
        values,
      }) => {
        return (
          <Form data-test="ForgotPasswordForm">
            <Join separator={<Spacer y={2} />}>
              <Input
                name="email"
                title="Email"
                type="email"
                placeholder="Enter your email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                autoComplete="email"
                error={touched.email && errors.email}
              />

              {status?.error && (
                <Message variant="error">{status.error}</Message>
              )}

              {values.mode === "Success" && (
                <Message variant="success">
                  We've sent a link to reset your password if an account is
                  associated with this email.
                </Message>
              )}

              <Button
                width="100%"
                type="submit"
                loading={isSubmitting}
                disabled={!isValid}
              >
                Send me reset instructions
              </Button>

              <Text variant="xs" textAlign="center" color="mono60">
                Don’t need to reset?{" "}
                <Clickable
                  textDecoration="underline"
                  data-test="login"
                  onClick={() => {
                    dispatch({ type: "MODE", payload: { mode: "Welcome" } })
                  }}
                >
                  Log in
                </Clickable>{" "}
                or{" "}
                <Clickable
                  textDecoration="underline"
                  data-test="signup"
                  onClick={() => {
                    dispatch({ type: "MODE", payload: { mode: "Welcome" } })
                  }}
                >
                  sign up.
                </Clickable>
              </Text>
            </Join>
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

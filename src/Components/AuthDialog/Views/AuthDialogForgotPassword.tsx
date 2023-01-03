import * as Yup from "yup"
import { FC } from "react"
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
import { Form, Formik } from "formik"
import { forgotPassword } from "Utils/auth"
import { formatErrorMessage } from "Components/AuthDialog/Utils/formatErrorMessage"

export const AuthDialogForgotPassword: FC = () => {
  const { dispatch } = useAuthDialogContext()

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{ email: "", mode: "Pending" }}
      onSubmit={async ({ email }, { setStatus, setFieldValue }) => {
        setStatus({ error: null })
        setFieldValue("mode", "Loading")

        try {
          await forgotPassword({ email })
          setFieldValue("mode", "Success")
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
                  We’ve sent you an email with a link to reset your password.
                </Message>
              )}

              <Button
                width="100%"
                type="submit"
                loading={isSubmitting}
                disabled={!isValid || !dirty}
              >
                Send me reset instructions
              </Button>

              <Text variant="xs" textAlign="center" color="black60">
                Don’t need to reset?{" "}
                <Clickable
                  textDecoration="underline"
                  onClick={() => {
                    dispatch({ type: "MODE", payload: { mode: "Login" } })
                  }}
                >
                  Log in
                </Clickable>{" "}
                or{" "}
                <Clickable
                  textDecoration="underline"
                  onClick={() => {
                    dispatch({ type: "MODE", payload: { mode: "SignUp" } })
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

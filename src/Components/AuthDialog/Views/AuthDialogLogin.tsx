import * as Yup from "yup"
import { FC } from "react"
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
import { login } from "Utils/auth"
import { useAfterAuthentication } from "Components/AuthDialog/Hooks/useAfterAuthentication"
import { formatErrorMessage } from "Components/AuthDialog/Utils/formatErrorMessage"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"

export const AuthDialogLogin: FC = () => {
  const {
    dispatch,
    state: { options },
  } = useAuthDialogContext()

  const { runAfterAuthentication } = useAfterAuthentication()

  const track = useAuthDialogTracking()

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{
        email: "",
        password: "",
        authenticationCode: "",
        mode: "Pending",
      }}
      onSubmit={async (
        { email, password, authenticationCode },
        { setStatus, setFieldValue }
      ) => {
        setStatus({ error: null })
        setFieldValue("mode", "Loading")

        try {
          const { user } = await login({ email, password, authenticationCode })

          runAfterAuthentication({ accessToken: user.accessToken })

          setFieldValue("mode", "Success")

          track.loggedIn({ service: "email", userId: user.id })

          options.onSuccess?.()
        } catch (err) {
          console.error(err)

          switch (err.message) {
            case "missing on-demand authentication code": {
              setFieldValue("mode", "OnDemand")
              return
            }

            case "missing two-factor authentication code": {
              setFieldValue("mode", "TwoFactor")
              return
            }

            case "invalid two-factor authentication code": {
              setFieldValue("mode", "TwoFactor")
              setStatus({ error: formatErrorMessage(err) })
              return
            }

            default: {
              setFieldValue("mode", "Error")
              setStatus({ error: formatErrorMessage(err) })
              return
            }
          }
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
          <Form data-test="LoginForm">
            <Join separator={<Spacer y={2} />}>
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

              <Box>
                <PasswordInput
                  name="password"
                  title="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                  error={touched.password && errors.password}
                />

                <Spacer y={0.5} />

                <Text variant="xs" textAlign="right" color="black60">
                  <Clickable
                    textDecoration="underline"
                    data-test="forgot"
                    onClick={() => {
                      dispatch({
                        type: "MODE",
                        payload: { mode: "ForgotPassword" },
                      })
                    }}
                  >
                    Forgot Password?
                  </Clickable>
                </Text>
              </Box>

              {values.mode === "OnDemand" && (
                <Message variant="info">
                  Your safety and security are important to us. Please check
                  your email for a one-time authentication code to complete your
                  login.
                </Message>
              )}

              {(values.mode === "TwoFactor" || values.mode === "OnDemand") && (
                <Input
                  name="authenticationCode"
                  title="Authentication Code"
                  placeholder="Enter an authentication code"
                  inputMode={"numeric"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoFocus
                  error={
                    touched.authenticationCode && errors.authenticationCode
                  }
                />
              )}

              {status?.error && (
                <Message variant="error">{status.error}</Message>
              )}

              <Button
                type="submit"
                width="100%"
                loading={values.mode === "Loading" || values.mode === "Success"}
                disabled={!isValid || !dirty}
              >
                Log in
              </Button>

              <Text variant="xs" textAlign="center" color="black60" my={-1}>
                or
              </Text>

              <AuthDialogSocial />

              <Text variant="xs" textAlign="center" color="black60">
                Don’t have an account?{" "}
                <Clickable
                  data-test="signup"
                  textDecoration="underline"
                  onClick={() => {
                    dispatch({ type: "MODE", payload: { mode: "SignUp" } })
                  }}
                >
                  Sign up.
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
  // We allow any input for password since requirements have changed over the years.
  password: Yup.string().required("Password required"),
  // If auth code then require it
  authenticationCode: Yup.string()
    .when("mode", {
      is: "OnDemand",
      then: Yup.string().required("Authentication code required."),
    })
    .when("mode", {
      is: "TwoFactor",
      then: Yup.string().required("Authentication code required."),
    }),
})

/** biome-ignore-all lint/suspicious/noThenProperty: ugh */
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useAfterAuthentication } from "Components/AuthDialog/Hooks/useAfterAuthentication"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { formatErrorMessage } from "Components/AuthDialog/Utils/formatErrorMessage"
import { login } from "Utils/auth"
import {
  Box,
  Button,
  Clickable,
  Input,
  Join,
  Message,
  PasswordInput,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import { Form, Formik } from "formik"
import type { FC } from "react"
import * as Yup from "yup"

export const AuthDialogLogin: FC<React.PropsWithChildren<unknown>> = () => {
  const { dispatch, state } = useAuthDialogContext()

  const { runAfterAuthentication } = useAfterAuthentication()

  const track = useAuthDialogTracking()

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{
        email: state.values.email || "",
        password: "",
        authenticationCode: "",
        mode: "Pending",
      }}
      onSubmit={async (
        { email, password, authenticationCode },
        { setStatus, setFieldValue },
      ) => {
        setStatus({ error: null })
        setFieldValue("mode", "Loading")

        try {
          const { user } = await login({ email, password, authenticationCode })

          runAfterAuthentication({ accessToken: user.accessToken })

          setFieldValue("mode", "Success")

          track.loggedIn({ service: "email", userId: user.id })

          state.options.onSuccess?.()
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
            <Join separator={<Spacer y={4} />}>
              <Box>
                <PasswordInput
                  name="password"
                  title="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                  autoFocus
                  error={touched.password && errors.password}
                />

                <Spacer y={0.5} />

                <Text variant="xs" textAlign="right" color="mono60">
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

              <Stack gap={1}>
                <Button
                  type="submit"
                  width="100%"
                  loading={
                    values.mode === "Loading" || values.mode === "Success"
                  }
                  disabled={!isValid || !dirty}
                >
                  Log in
                </Button>

                {state.isFallback && (
                  <Text variant="xs" textAlign="center" color="mono60">
                    Don’t have an account?{" "}
                    <Clickable
                      textDecoration="underline"
                      color="mono100"
                      onClick={() => {
                        dispatch({ type: "MODE", payload: { mode: "SignUp" } })
                      }}
                    >
                      Sign up.
                    </Clickable>
                  </Text>
                )}
              </Stack>
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

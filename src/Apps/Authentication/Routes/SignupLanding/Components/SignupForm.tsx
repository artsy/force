import {
  Box,
  Button,
  Checkbox,
  Clickable,
  Input,
  Message,
  PasswordInput,
  Separator,
  Stack,
  Text,
} from "@artsy/palette"
import { useAfterAuthentication } from "Components/AuthDialog/Hooks/useAfterAuthentication"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { formatErrorMessage } from "Components/AuthDialog/Utils/formatErrorMessage"
import {
  AUTHENTICATION_MODES,
  type AuthenticationMode,
  loginValidationSchema,
} from "Components/AuthDialog/Views/AuthDialogLogin"
import {
  emailValidator,
  passwordValidator,
} from "Components/AuthDialog/Views/AuthDialogSignUp"
import { welcomeValidationSchema } from "Components/AuthDialog/Views/AuthDialogWelcome"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useRecaptcha } from "Utils/EnableRecaptcha"
import { login, signUp } from "Utils/auth"
import { recaptcha } from "Utils/recaptcha"
import type { SignupFormQuery } from "__generated__/SignupFormQuery.graphql"
import { Form, Formik, type FormikHelpers } from "formik"
import { useReducer } from "react"
import { fetchQuery, graphql } from "react-relay"
import * as Yup from "yup"
import { SignupFormDisclaimer } from "./SignupFormDisclaimer"
import { SignupFormSocial } from "./SignupFormSocial"

const FORM_STEPS = {
  Welcome: "Welcome",
  SignUp: "SignUp",
  Login: "Login",
} as const

type FormStep = (typeof FORM_STEPS)[keyof typeof FORM_STEPS]

const STEP_COPY = {
  [FORM_STEPS.Welcome]: {
    title: "Sign up or log in",
    submit: "Continue",
  },
  [FORM_STEPS.SignUp]: {
    title: "Join Artsy today",
    submit: "Create Account",
  },
  [FORM_STEPS.Login]: {
    title: "Welcome back",
    submit: "Log in",
  },
} satisfies Record<FormStep, { title: string; submit: string }>

type SignupFormState = {
  step: FormStep
  error?: string
}

type SignupFormAction =
  | { type: "ClearError" }
  | { type: "Error"; error: string }
  | { type: "Reset" }
  | { type: "Step"; step: FormStep }

const signupFormReducer = (
  state: SignupFormState,
  action: SignupFormAction,
): SignupFormState => {
  switch (action.type) {
    case "ClearError":
      return { ...state, error: undefined }
    case "Error":
      return { ...state, error: action.error }
    case "Reset":
      return { step: FORM_STEPS.Welcome }
    case "Step":
      return { step: action.step }
  }
}

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  email: emailValidator,
  password: passwordValidator,
  agreedToReceiveEmails: Yup.boolean(),
})

const signupFormValuesSchema = Yup.object({
  name: Yup.string().defined(),
  email: emailValidator,
  password: Yup.string().defined(),
  authenticationCode: Yup.string().defined(),
  mode: Yup.string()
    .oneOf(Object.values(AUTHENTICATION_MODES))
    .required() as Yup.StringSchema<AuthenticationMode>,
  agreedToReceiveEmails: Yup.boolean().defined(),
})

type SignupFormValues = Yup.InferType<typeof signupFormValuesSchema>

const initialValues: SignupFormValues = {
  name: "",
  email: "",
  password: "",
  authenticationCode: "",
  mode: AUTHENTICATION_MODES.Pending,
  agreedToReceiveEmails: false,
}

export const SignupForm = () => {
  const [{ step, error }, dispatch] = useReducer(signupFormReducer, {
    step: FORM_STEPS.Welcome,
  })

  useRecaptcha()

  const { relayEnvironment } = useSystemContext()
  const { runAfterAuthentication } = useAfterAuthentication()
  const { isAutomaticallySubscribed } = useCountryCode()

  const track = useAuthDialogTracking()

  const verifyUserExists = async (email: string) => {
    const recaptchaToken = await recaptcha("verify_user")

    const res = await fetchQuery<SignupFormQuery>(relayEnvironment, QUERY, {
      email,
      recaptchaToken: recaptchaToken ?? "",
    }).toPromise()

    const verifyUser = res?.verifyUser

    if (!verifyUser) {
      throw new Error("Failed to verify user.")
    }

    return verifyUser.exists
  }

  const resetAuthenticationFields = (
    actions: FormikHelpers<SignupFormValues>,
  ) => {
    actions.setFieldValue("password", "")
    actions.setFieldValue("authenticationCode", "")
    actions.setFieldValue("mode", AUTHENTICATION_MODES.Pending)
  }

  const handleSubmit = async (
    values: SignupFormValues,
    actions: FormikHelpers<SignupFormValues>,
  ) => {
    if (step === FORM_STEPS.Welcome) {
      dispatch({ type: "ClearError" })

      try {
        const exists = await verifyUserExists(values.email)

        dispatch({
          type: "Step",
          step: exists ? FORM_STEPS.Login : FORM_STEPS.SignUp,
        })
        resetAuthenticationFields(actions)
      } catch (err) {
        console.error(err)
        dispatch({
          type: "Error",
          error: "Something went wrong. Please try again.",
        })
        actions.setSubmitting(false)
      }

      return
    }

    if (step === FORM_STEPS.Login) {
      dispatch({ type: "ClearError" })
      actions.setFieldValue("mode", AUTHENTICATION_MODES.Loading)

      try {
        const response = await login({
          email: values.email,
          password: values.password,
          authenticationCode: values.authenticationCode,
        })

        track.loggedIn({ service: "email", userId: response.user.id })

        actions.setFieldValue("mode", AUTHENTICATION_MODES.Success)

        await runAfterAuthentication({ accessToken: response.user.accessToken })
      } catch (err) {
        switch (err.message) {
          case "missing on-demand authentication code": {
            actions.setFieldValue("mode", AUTHENTICATION_MODES.OnDemand)
            return
          }

          case "missing two-factor authentication code": {
            actions.setFieldValue("mode", AUTHENTICATION_MODES.TwoFactor)
            return
          }

          case "invalid two-factor authentication code": {
            actions.setFieldValue("mode", AUTHENTICATION_MODES.TwoFactor)
            dispatch({ type: "Error", error: formatErrorMessage(err) })
            return
          }

          default: {
            actions.setFieldValue("mode", AUTHENTICATION_MODES.Error)
            dispatch({ type: "Error", error: formatErrorMessage(err) })
            return
          }
        }
      }

      return
    }

    dispatch({ type: "ClearError" })

    try {
      const response = await signUp({
        name: values.name,
        email: values.email,
        password: values.password,
        agreedToReceiveEmails: values.agreedToReceiveEmails,
      })

      track.signedUp({ service: "email", userId: response.user.id })

      await runAfterAuthentication({ accessToken: response.user.accessToken })
    } catch (err) {
      const message =
        formatErrorMessage(err) || "Something went wrong. Please try again."

      try {
        const exists = await verifyUserExists(values.email)

        if (exists) {
          dispatch({ type: "Step", step: FORM_STEPS.Login })
          resetAuthenticationFields(actions)
          actions.setSubmitting(false)
          return
        }
      } catch (verifyUserError) {
        console.error(verifyUserError)
      }

      dispatch({ type: "Error", error: message })
      actions.setSubmitting(false)
    }
  }

  return (
    <Stack gap={1} bg={["transparent", "mono5"]} p={[0, 4]}>
      <Text
        variant="lg-display"
        // Visually normalize top padding
        mt={[0, -1]}
      >
        {STEP_COPY[step].title}
      </Text>

      <Formik<SignupFormValues>
        initialValues={initialValues}
        validationSchema={
          step === FORM_STEPS.Welcome
            ? welcomeValidationSchema
            : step === FORM_STEPS.SignUp
              ? signupSchema
              : loginValidationSchema
        }
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          isValid,
          dirty,
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          resetForm,
        }) => (
          <Form>
            <Stack gap={2}>
              <Box>
                {step === FORM_STEPS.SignUp && (
                  <Input
                    title="Name"
                    name="name"
                    placeholder="Your full name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                    error={touched.name && errors.name}
                    required
                  />
                )}

                {step === FORM_STEPS.Welcome && (
                  <Input
                    title="Email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    error={touched.email && errors.email}
                    required
                  />
                )}

                {step !== FORM_STEPS.Welcome && (
                  <PasswordInput
                    title="Password"
                    name="password"
                    placeholder={
                      step === FORM_STEPS.SignUp
                        ? "Create a password"
                        : "Enter your password"
                    }
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete={
                      step === FORM_STEPS.SignUp
                        ? "new-password"
                        : "current-password"
                    }
                    error={touched.password && errors.password}
                    required
                  />
                )}

                {values.mode === AUTHENTICATION_MODES.OnDemand && (
                  <Message variant="info" mt={2}>
                    Your safety and security are important to us. Please check
                    your email for a one-time authentication code to complete
                    your login.
                  </Message>
                )}

                {(values.mode === AUTHENTICATION_MODES.TwoFactor ||
                  values.mode === AUTHENTICATION_MODES.OnDemand) && (
                  <Input
                    title="Authentication Code"
                    name="authenticationCode"
                    placeholder="Enter an authentication code"
                    value={values.authenticationCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="one-time-code"
                    error={
                      touched.authenticationCode && errors.authenticationCode
                    }
                    required
                  />
                )}
              </Box>

              <Stack gap={2}>
                {/* Show email subscription checkbox only for non-GDPR countries */}
                {step === FORM_STEPS.SignUp && !isAutomaticallySubscribed && (
                  <Checkbox
                    selected={values.agreedToReceiveEmails}
                    onSelect={selected => {
                      setFieldValue("agreedToReceiveEmails", selected)
                    }}
                  >
                    <Text variant="xs">
                      Subscribe to email updates about products and services
                    </Text>
                  </Checkbox>
                )}

                {error && <Message variant="error">{error}</Message>}

                <Button
                  type="submit"
                  loading={
                    isSubmitting ||
                    values.mode === AUTHENTICATION_MODES.Loading ||
                    values.mode === AUTHENTICATION_MODES.Success
                  }
                  disabled={!isValid || !dirty || isSubmitting}
                  width="100%"
                >
                  {STEP_COPY[step].submit}
                </Button>

                {step !== FORM_STEPS.Welcome ? (
                  <Text variant="xs" textAlign="center" color="mono60">
                    Use a different email?{" "}
                    <Clickable
                      textDecoration="underline"
                      color="mono100"
                      onClick={() => {
                        dispatch({ type: "Reset" })
                        resetForm({ values: initialValues })
                      }}
                    >
                      Go back.
                    </Clickable>
                  </Text>
                ) : (
                  <>
                    <Separator />

                    <Text
                      variant="xs"
                      textAlign="center"
                      color="mono60"
                      my={-1}
                    >
                      Or continue with
                    </Text>

                    <SignupFormSocial />

                    <SignupFormDisclaimer />
                  </>
                )}
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  )
}

const QUERY = graphql`
  query SignupFormQuery($email: String!, $recaptchaToken: String!) {
    verifyUser(email: $email, recaptchaToken: $recaptchaToken) {
      exists
    }
  }
`

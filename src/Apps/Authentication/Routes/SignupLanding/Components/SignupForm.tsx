import { useState } from "react"
import {
  Box,
  Button,
  Checkbox,
  Input,
  PasswordInput,
  Stack,
  Text,
} from "@artsy/palette"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { signUp } from "Utils/auth"
import { useRecaptcha } from "Utils/EnableRecaptcha"
import { useAfterAuthentication } from "Components/AuthDialog/Hooks/useAfterAuthentication"
import { SignupFormSocial } from "./SignupFormSocial"
import { SignupFormDisclaimer } from "./SignupFormDisclaimer"

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
  password: Yup.string()
    .required("Password required")
    .min(8, "Your password must be at least 8 characters.")
    .max(128, "Your password must be less than 128 characters.")
    .matches(/\d{1}/, "Your password must have at least 1 digit.")
    .matches(/[a-z]{1}/, "Your password must have at least 1 lowercase letter.")
    .matches(
      /[A-Z]{1}/,
      "Your password must have at least 1 uppercase letter.",
    ),
  agreedToReceiveEmails: Yup.boolean(),
})

export const SignupForm = () => {
  const { user } = useSystemContext()
  const [error, setError] = useState<string>()

  useRecaptcha()

  const { runAfterAuthentication } = useAfterAuthentication()

  const handleSubmit = async (values, actions) => {
    try {
      const response = await signUp({
        name: values.name,
        email: values.email,
        password: values.password,
        agreedToReceiveEmails: values.agreedToReceiveEmails,
      })
      // Match existing /signup behavior - onboarding modal will appear
      await runAfterAuthentication({ accessToken: response.user.accessToken })
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
      actions.setSubmitting(false)
    }
  }

  // If already logged in, show message
  if (user) {
    return (
      <Box bg="mono5" p={4} textAlign="center">
        <Text variant="md">You're already signed in!</Text>
      </Box>
    )
  }

  return (
    <Box bg="mono5" p={4}>
      <Text variant="lg" mb={2}>
        Join Artsy today
      </Text>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          agreedToReceiveEmails: false,
        }}
        validationSchema={signupSchema}
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
        }) => (
          <Form>
            <Stack gap={1}>
              <Input
                title="Name"
                name="name"
                placeholder="Your full name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                // @ts-expect-error
                error={touched.name && errors.name}
                required
              />

              <Input
                title="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                // @ts-expect-error
                error={touched.email && errors.email}
                required
              />

              <PasswordInput
                title="Password"
                name="password"
                placeholder="Create a password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                // @ts-expect-error
                error={touched.password && errors.password}
                required
              />

              {/* Show email subscription checkbox only for non-GDPR countries */}
              {!isGDPRCountry() && (
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

              {error && (
                <Text variant="sm" color="red100">
                  {error}
                </Text>
              )}

              <Button
                type="submit"
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                width="100%"
              >
                Create Account
              </Button>

              <Text variant="xs" textAlign="center" color="mono60" my={-1}>
                Or continue with
              </Text>

              <SignupFormSocial />

              <SignupFormDisclaimer />
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

// Helper to detect GDPR countries (copy from AuthDialog)
const isGDPRCountry = () => {
  // Implementation from AuthDialogSignUp.tsx
  // Check user's country code against GDPR list
  return false // Placeholder
}

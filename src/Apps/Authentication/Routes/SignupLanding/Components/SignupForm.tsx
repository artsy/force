import {
  Box,
  Button,
  Checkbox,
  Input,
  PasswordInput,
  Separator,
  Stack,
  Text,
} from "@artsy/palette"
import { useAfterAuthentication } from "Components/AuthDialog/Hooks/useAfterAuthentication"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { useRecaptcha } from "Utils/EnableRecaptcha"
import { signUp } from "Utils/auth"
import { Form, Formik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import { SignupFormDisclaimer } from "./SignupFormDisclaimer"
import { SignupFormSocial } from "./SignupFormSocial"

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
  const [error, setError] = useState<string>()

  useRecaptcha()

  const { runAfterAuthentication } = useAfterAuthentication()
  const { isAutomaticallySubscribed } = useCountryCode()

  const track = useAuthDialogTracking()

  // FIXME: Needs typing
  const handleSubmit = async (values, actions) => {
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
      setError(err.message || "Something went wrong. Please try again.")
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
            <Stack gap={2}>
              <Box>
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
              </Box>

              <Stack gap={2}>
                {/* Show email subscription checkbox only for non-GDPR countries */}
                {!isAutomaticallySubscribed && (
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

                <Separator />

                <Text variant="xs" textAlign="center" color="mono60" my={-1}>
                  Or continue with
                </Text>

                <SignupFormSocial />

                <SignupFormDisclaimer />
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  )
}

import {
  ArtsyLogoBlackIcon,
  Spacer,
  Button,
  Flex,
  Join,
  Text,
  PasswordInput,
  useToasts,
} from "@artsy/palette"
import { Formik } from "formik"
import React from "react"
import { MetaTags } from "v2/Components/MetaTags"
import { useRouter } from "v2/System/Router/useRouter"
import { resetPassword } from "v2/Utils/auth"
import { getENV } from "v2/Utils/getENV"
import { useMode } from "v2/Utils/Hooks/useMode"
import * as Yup from "yup"
import { password } from "v2/Components/Authentication/Validators"

interface ResetPasswordRouteProps {}

type Mode = "Pending" | "Loading" | "Success" | "Error"

export const ResetPasswordRoute: React.FC<ResetPasswordRouteProps> = () => {
  const { match } = useRouter()

  const query = match?.location?.query ?? {}
  const resetPasswordToken = getENV("RESET_PASSWORD_TOKEN")

  const { sendToast } = useToasts()

  const [mode, setMode] = useMode<Mode>("Pending")

  const verb = query.set_password ? "Set" : "Change"

  const label = {
    ["Pending"]: `${verb} My Password`,
    ["Loading"]: `${verb} My Password`,
    ["Success"]: "Password Updated",
    ["Error"]: `${verb} My Password`,
  }[mode]

  return (
    <>
      <MetaTags title="Reset Password | Artsy" />

      <Formik
        validateOnMount
        validationSchema={Yup.object({
          password,
          passwordConfirmation: Yup.string()
            .required("Password confirmation required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        })}
        initialValues={{
          password: "",
          passwordConfirmation: "",
        }}
        onSubmit={async values => {
          if (!resetPasswordToken) {
            return sendToast({
              variant: "error",
              message: "Reset password token is missing.",
              description:
                "Check your email for instructions for resetting your password.",
            })
          }

          setMode("Loading")

          try {
            await resetPassword({ ...values, resetPasswordToken })

            sendToast({
              variant: "success",
              message: "Password successfully reset. Redirecting...",
              ttl: 10000,
            })

            setMode("Success")

            window.location.assign(query.reset_password_redirect_to || "/login")
          } catch (err) {
            console.error(err)

            sendToast({ variant: "error", message: err.message })

            setMode("Error")
          }
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
        }) => {
          return (
            <Flex
              as="form"
              data-test="ResetPasswordForm"
              alignItems="center"
              flexDirection="column"
              minHeight="100vh"
              justifyContent="center"
              mx="auto"
              py={4}
              maxWidth={440}
              // @ts-ignore
              onSubmit={handleSubmit}
            >
              <Join separator={<Spacer mt={2} />}>
                <ArtsyLogoBlackIcon />

                <Text variant="lg">{verb} Your Password</Text>

                <PasswordInput
                  name="password"
                  title="New Password"
                  placeholder="New Password"
                  width="100%"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoFocus
                  autoComplete="new-password"
                  error={touched.password && errors.password}
                  value={values.password}
                />

                <PasswordInput
                  name="passwordConfirmation"
                  title="Confirm New Password"
                  placeholder="Confirm New Password"
                  width="100%"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="new-password"
                  error={
                    touched.passwordConfirmation && errors.passwordConfirmation
                  }
                  value={values.passwordConfirmation}
                />

                <Button
                  width="100%"
                  loading={isSubmitting}
                  disabled={mode === "Success" || isSubmitting || !isValid}
                >
                  {label}
                </Button>
              </Join>
            </Flex>
          )
        }}
      </Formik>
    </>
  )
}

import AppleIcon from "@artsy/icons/AppleIcon"
import FacebookIcon from "@artsy/icons/FacebookIcon"
import GoogleIcon from "@artsy/icons/GoogleIcon"
import {
  Button,
  Clickable,
  Join,
  Message,
  PasswordInput,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useAfterAuthentication } from "Components/AuthDialog/Hooks/useAfterAuthentication"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { formatErrorMessage } from "Components/AuthDialog/Utils/formatErrorMessage"
import { useRouter } from "System/Hooks/useRouter"
import { login } from "Utils/auth"
import { AUTH_ERROR_CODES, AUTH_PROVIDERS } from "Utils/authConstants"
import { getENV } from "Utils/getENV"
import { Form, Formik } from "formik"
import { stringify } from "qs"
import { type FC, useState } from "react"
import * as Yup from "yup"

const PERMITTED_PROVIDERS = ["email", "google", "facebook", "apple"] as const
type Provider = (typeof PERMITTED_PROVIDERS)[number]

const PROVIDER_ICONS: Record<Exclude<Provider, "email">, FC> = {
  apple: AppleIcon,
  google: GoogleIcon,
  facebook: FacebookIcon,
}

export const AuthDialogLinkAccounts: FC = () => {
  const {
    match: { location },
  } = useRouter()

  const { email, provider, existing_providers } = location.query

  const providerName = AUTH_PROVIDERS[provider] ?? provider ?? "social"

  const permittedProviders = (existing_providers ?? "")
    .split(",")
    .filter((p: string): p is Provider =>
      (PERMITTED_PROVIDERS as readonly string[]).includes(p),
    )

  const emailOnly =
    permittedProviders.length === 1 && permittedProviders[0] === "email"

  // Fall back to password form if providers are missing or unrecognised
  const [showPasswordForm, setShowPasswordForm] = useState(
    emailOnly || permittedProviders.length === 0,
  )

  return showPasswordForm ? (
    <PasswordForm
      email={email}
      providerName={providerName}
      emailOnly={emailOnly}
      onBack={emailOnly ? undefined : () => setShowPasswordForm(false)}
    />
  ) : (
    <ProviderList
      email={email}
      permittedProviders={permittedProviders}
      onShowPasswordForm={() => setShowPasswordForm(true)}
    />
  )
}

interface ProviderListProps {
  email: string
  permittedProviders: Provider[]
  onShowPasswordForm: () => void
}

const ProviderList: FC<ProviderListProps> = ({
  email,
  permittedProviders,
  onShowPasswordForm,
}) => {
  const { applePath, facebookPath, googlePath } = getENV("AP") ?? {
    applePath: "/users/auth/apple",
    facebookPath: "/users/auth/facebook",
    googlePath: "/users/auth/google",
  }

  const oauthPaths: Record<Exclude<Provider, "email">, string> = {
    apple: applePath,
    google: googlePath,
    facebook: facebookPath,
  }

  const query = stringify({ "redirect-to": "/login" }, { skipNulls: true })

  return (
    <Stack gap={2}>
      <Text variant="sm">
        {email
          ? `You already have an Artsy account with ${email}. `
          : "You already have an account with that email address. "}
        Link both log-in options to your Artsy account by logging in with your
        previous log-in method.
      </Text>

      <Stack gap={1}>
        {permittedProviders.map(p => {
          if (p === "email") {
            return (
              <Button
                key="email"
                variant="secondaryBlack"
                width="100%"
                onClick={onShowPasswordForm}
              >
                Continue with Email
              </Button>
            )
          }

          const Icon = PROVIDER_ICONS[p]

          return (
            <Button
              key={p}
              variant="secondaryBlack"
              width="100%"
              // @ts-ignore
              as="a"
              href={`${oauthPaths[p]}?${query}`}
              rel="nofollow"
            >
              <Icon />
              <Text ml={1} variant="sm">
                Continue with {AUTH_PROVIDERS[p]}
              </Text>
            </Button>
          )
        })}
      </Stack>
    </Stack>
  )
}

interface PasswordFormProps {
  email: string
  providerName: string
  emailOnly: boolean
  onBack: (() => void) | undefined
}

const PasswordForm: FC<PasswordFormProps> = ({
  email,
  providerName,
  emailOnly,
  onBack,
}) => {
  const { runAfterAuthentication } = useAfterAuthentication()
  const { dispatch } = useAuthDialogContext()
  const track = useAuthDialogTracking()

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{ password: "", mode: "Pending" as FormMode }}
      onSubmit={async ({ password }, { setStatus, setFieldValue }) => {
        setStatus({ error: null })
        setFieldValue("mode", "Loading")

        try {
          const res = await login({
            email,
            password,
            authenticationCode: "",
          })

          if (res.linkingError) {
            setFieldValue("mode", "LinkError")

            track.errorMessageViewed({
              error_code: "link_accounts_error",
              title: "Account linking failed",
              message: LINK_ERROR_MESSAGE(providerName),
              flow: "Link Accounts",
            })

            return
          }

          setFieldValue("mode", "Success")

          setTimeout(() => {
            runAfterAuthentication({ accessToken: res.user?.accessToken })
          }, 1500)
        } catch (err) {
          if (
            err.message === "missing two-factor authentication code" ||
            err.message === "missing on-demand authentication code"
          ) {
            setFieldValue("mode", "TwoFactorBlocked")
            setStatus({
              error: AUTH_ERROR_CODES.TWO_FACTOR_AUTHENTICATION_ENABLED,
            })

            track.errorMessageViewed({
              error_code: "two_factor_authentication_enabled",
              title: "Two-factor authentication enabled",
              message: AUTH_ERROR_CODES.TWO_FACTOR_AUTHENTICATION_ENABLED,
              flow: "Link Accounts",
            })

            return
          }

          const errorMessage = formatErrorMessage(err)
          setFieldValue("mode", "Error")
          setStatus({ error: errorMessage })

          track.errorMessageViewed({
            error_code: err.message,
            title: "Account linking failed",
            message: errorMessage,
            flow: "Link Accounts",
          })
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
          <Form>
            <Join separator={<Spacer y={4} />}>
              <Text variant="sm">
                {emailOnly
                  ? `You already have an Artsy account with ${email}. Enter your password to link both log-in options to your account.`
                  : "Enter your password to link both log-in options to your account."}
              </Text>

              <PasswordInput
                name="password"
                title="Artsy Password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
                autoFocus
                error={touched.password && errors.password}
              />

              {status?.error && (
                <Message variant="error">{status.error}</Message>
              )}

              {values.mode === "Success" && (
                <Message variant="success">
                  Your {providerName} account has been successfully linked.
                </Message>
              )}

              {values.mode === "LinkError" && (
                <Message variant="error">
                  {LINK_ERROR_MESSAGE(providerName)}
                </Message>
              )}

              <Stack gap={1}>
                {values.mode === "TwoFactorBlocked" ? (
                  <Button
                    variant="secondaryBlack"
                    width="100%"
                    type="button"
                    onClick={() => {
                      dispatch({ type: "MODE", payload: { mode: "Login" } })
                    }}
                  >
                    Go Back
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    width="100%"
                    loading={values.mode === "Loading"}
                    disabled={!isValid || !dirty || values.mode === "Success"}
                  >
                    {emailOnly ? "Yes, Link Accounts" : "Link Accounts"}
                  </Button>
                )}

                {onBack && values.mode !== "TwoFactorBlocked" && (
                  <Button
                    variant="secondaryBlack"
                    width="100%"
                    onClick={onBack}
                    type="button"
                  >
                    Back
                  </Button>
                )}

                <Text variant="xs" textAlign="right" color="mono60">
                  <Clickable
                    textDecoration="underline"
                    onClick={() => {
                      window.location.href = "/users/password/new"
                    }}
                  >
                    Forgot Password?
                  </Clickable>
                </Text>
              </Stack>
            </Join>
          </Form>
        )
      }}
    </Formik>
  )
}

type FormMode =
  | "Pending"
  | "Loading"
  | "Success"
  | "Error"
  | "LinkError"
  | "TwoFactorBlocked"

const LINK_ERROR_MESSAGE = (providerName: string) =>
  `Your account was signed in, but we couldn't link your ${providerName} account. Please try again from Settings.`

const VALIDATION_SCHEMA = Yup.object().shape({
  password: Yup.string().required("Password required"),
})

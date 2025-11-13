import { AuthenticationInlineDialogProvider } from "Apps/Authentication/Components/AuthenticationInlineDialogProvider"
import { useAuthDialogOptions } from "Apps/Authentication/Hooks/useAuthDialogOptions"
import { AuthDialogView } from "Components/AuthDialog/AuthDialog"
import type { AuthDialogMode } from "Components/AuthDialog/AuthDialogContext"
import { AuthDialogTitle } from "Components/AuthDialog/AuthDialogTitle"
import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import { useRecaptcha } from "Utils/EnableRecaptcha"
import { Box, Flex, Stack, Text, useToasts } from "@artsy/palette"
import { type FC, useEffect } from "react"

const AuthenticationInlineDialogContents: FC<
  React.PropsWithChildren<unknown>
> = () => {
  useRecaptcha()
  const { title, pageTitle, description } = useAuthDialogOptions()

  const { sendToast } = useToasts()

  const {
    match: { location },
  } = useRouter()

  // Errors might come back from 3rd party authentication so display them if present.
  useEffect(() => {
    if (!location.query.error_code) return

    const message = (
      ERROR_CODES[location.query.error_code] || ERROR_CODES.UNKNOWN
    ).replace(/{provider}/g, PROVIDERS[location.query.provider] || "—")

    if (location.query.error) {
      console.error(location.query.error)
    }

    sendToast({ message, variant: "error", ttl: Number.POSITIVE_INFINITY })
  }, [
    location.query.error,
    location.query.error_code,
    location.query.provider,
    sendToast,
  ])

  return (
    <>
      <MetaTags title={pageTitle} pathname={location.pathname} />

      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        minHeight="100vh"
        mx="auto"
        py={4}
        maxWidth={["100%", 450]}
      >
        <Box width="100%">
          <Stack gap={2}>
            <AuthDialogTitle title={title} />

            {description && (
              <Text variant="sm-display" lineClamp={6}>
                {description}
              </Text>
            )}

            <AuthDialogView />
          </Stack>
        </Box>
      </Flex>
    </>
  )
}

interface AuthenticationInlineDialogProps {
  mode: AuthDialogMode
}

export const AuthenticationInlineDialog: FC<
  React.PropsWithChildren<AuthenticationInlineDialogProps>
> = ({ mode }) => {
  return (
    <AuthenticationInlineDialogProvider mode={mode}>
      <AuthenticationInlineDialogContents />
    </AuthenticationInlineDialogProvider>
  )
}

const ERROR_CODES = {
  ALREADY_EXISTS: `A user with this email address already exists. Log in to Artsy via email and password and link {provider} in your settings instead.`,
  PREVIOUSLY_LINKED_SETTINGS: `{provider} account previously linked to Artsy. Log in to your Artsy account via email and password and link {provider} in your settings instead.`,
  PREVIOUSLY_LINKED: `{provider} account previously linked to Artsy.`,
  IP_BLOCKED: "Your IP address was blocked by {provider}.",
  UNKNOWN: "An unknown error occurred. Please try again.",
}

const PROVIDERS = {
  facebook: "Facebook",
  google: "Google",
  apple: "Apple",
}

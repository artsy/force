import { Box, Flex, Stack, Text, useToasts } from "@artsy/palette"
import { AuthenticationInlineDialogProvider } from "Apps/Authentication/Components/AuthenticationInlineDialogProvider"
import { useAuthDialogOptions } from "Apps/Authentication/Hooks/useAuthDialogOptions"
import { AuthDialogView } from "Components/AuthDialog/AuthDialog"
import type { AuthDialogMode } from "Components/AuthDialog/AuthDialogContext"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { AuthDialogTitle } from "Components/AuthDialog/AuthDialogTitle"
import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import { useRecaptcha } from "Utils/EnableRecaptcha"
import { AUTH_ERROR_CODES, AUTH_PROVIDERS } from "Utils/authConstants"
import { useFlag } from "@unleash/proxy-client-react"
import { type FC, useEffect } from "react"

const AuthenticationInlineDialogContents: FC<
  React.PropsWithChildren<unknown>
> = () => {
  useRecaptcha()
  const { title, pageTitle, description } = useAuthDialogOptions()

  const { sendToast } = useToasts()
  const { dispatch } = useAuthDialogContext()
  const isInlineAccountLinkingEnabled = !!useFlag(
    "diamond_inline-account-linking",
  )

  const {
    match: { location },
  } = useRouter()

  // When an OAuth attempt finds an existing account, switch to the link
  // accounts view instead of showing a generic error toast.
  useEffect(() => {
    if (location.query.error_code !== "ALREADY_EXISTS") return
    if (!isInlineAccountLinkingEnabled) return
    dispatch({ type: "MODE", payload: { mode: "LinkAccounts" } })
  }, [location.query.error_code, dispatch, isInlineAccountLinkingEnabled])

  // All other OAuth errors surface as a toast.
  // When the inline account linking flag is off, ALREADY_EXISTS also surfaces
  // as a toast directing the user to link via settings.
  useEffect(() => {
    if (!location.query.error_code) return
    if (
      location.query.error_code === "ALREADY_EXISTS" &&
      isInlineAccountLinkingEnabled
    ) {
      return
    }

    const message = (
      AUTH_ERROR_CODES[location.query.error_code] || AUTH_ERROR_CODES.UNKNOWN
    ).replace(/{provider}/g, AUTH_PROVIDERS[location.query.provider] || "—")

    if (location.query.error) {
      console.error(location.query.error)
    }

    sendToast({ message, variant: "error", ttl: Number.POSITIVE_INFINITY })
  }, [
    isInlineAccountLinkingEnabled,
    location.query.error,
    location.query.error_code,
    location.query.provider,
    sendToast,
  ])

  // Success toast after an OAuth re-auth linking flow completes.
  useEffect(() => {
    if (!location.query.linked_provider) return

    const providerName =
      AUTH_PROVIDERS[location.query.linked_provider] ||
      location.query.linked_provider

    sendToast({
      message: `Your ${providerName} account has been successfully linked.`,
      variant: "success",
    })
  }, [location.query.linked_provider, sendToast])

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

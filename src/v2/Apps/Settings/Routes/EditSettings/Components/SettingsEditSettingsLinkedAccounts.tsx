import { FC, useEffect } from "react"
import {
  Box,
  Button,
  FacebookIcon,
  GoogleIcon,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import {
  SettingsEditSettingsLinkedAccounts_me,
  AuthenticationProvider,
} from "v2/__generated__/SettingsEditSettingsLinkedAccounts_me.graphql"
import { useRouter } from "v2/System/Router/useRouter"
import { useUnlinkSettingsLinkedAccount } from "./useUnlinkSettingsLinkedAccount"
import { getENV } from "v2/Utils/getENV"
import { useMode } from "v2/Utils/Hooks/useMode"

interface SettingsEditSettingsLinkedAccountsProps {
  me: SettingsEditSettingsLinkedAccounts_me
}

export const SettingsEditSettingsLinkedAccounts: FC<SettingsEditSettingsLinkedAccountsProps> = ({
  me,
}) => {
  const { match } = useRouter()
  const { sendToast } = useToasts()

  const authenticationPaths = getENV("AP")

  // Errors from authentication providers are handled by routing back to
  // this page with an `error` query string.
  const query = match?.location?.query ?? {}

  useEffect(() => {
    if (query.error) {
      sendToast({
        variant: "error",
        message: query.error,
        ttl: Infinity,
      })
    }
  }, [query.error, sendToast])

  return (
    <>
      <Text variant="lg" mb={4}>
        Linked Accounts
      </Text>

      <SettingsEditSettingsLinkedAccountsButton
        me={me}
        provider="FACEBOOK"
        href={authenticationPaths?.facebookPath}
        icon={<FacebookIcon mr={0.5} fill="currentColor" />}
      />

      <Spacer mt={2} />

      <SettingsEditSettingsLinkedAccountsButton
        me={me}
        provider="APPLE"
        href={authenticationPaths?.applePath}
        icon={
          <Box display="inline-block" mr={0.5}>
            
          </Box>
        }
      />

      <Spacer mt={2} />

      <SettingsEditSettingsLinkedAccountsButton
        me={me}
        provider="GOOGLE"
        href={authenticationPaths?.googlePath}
        icon={<GoogleIcon mr={0.5} />}
      />
    </>
  )
}

export const SettingsEditSettingsLinkedAccountsFragmentContainer = createFragmentContainer(
  SettingsEditSettingsLinkedAccounts,
  {
    me: graphql`
      fragment SettingsEditSettingsLinkedAccounts_me on Me {
        authentications {
          provider
        }
      }
    `,
  }
)

interface SettingsEditSettingsLinkedAccountsButtonProps {
  icon: JSX.Element
  me: SettingsEditSettingsLinkedAccounts_me
  href?: string
  provider: AuthenticationProvider
}

type Mode = "Disconnected" | "Connecting" | "Connected" | "Disconnecting"

const SettingsEditSettingsLinkedAccountsButton: FC<SettingsEditSettingsLinkedAccountsButtonProps> = ({
  icon,
  me,
  href,
  provider,
}) => {
  const isConnected = me.authentications.find(
    authentication => authentication.provider === provider
  )

  const { sendToast } = useToasts()
  const { submitMutation } = useUnlinkSettingsLinkedAccount()

  const [mode, setMode] = useMode<Mode>(
    isConnected ? "Connected" : "Disconnected"
  )

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (mode === "Disconnected") {
      setMode("Connecting")
      return // Pass through
    }

    event.preventDefault()
    setMode("Disconnecting")

    try {
      await submitMutation({ variables: { input: { provider } } })

      sendToast({
        variant: "success",
        message: "Account disconnected.",
      })

      setMode("Disconnected")
    } catch (err) {
      console.error(err)

      sendToast({
        variant: "error",
        message: "There was an error disconnecting your account.",
        description: err.message,
      })

      setMode("Connected")
    }
  }

  const action = {
    ["Connecting"]: "Connect",
    ["Connected"]: "Disconnect",
    ["Disconnected"]: "Connect",
    ["Disconnecting"]: "Connect",
  }[mode]

  return (
    <Button
      onClick={handleClick}
      loading={mode === "Connecting" || mode === "Disconnecting"}
      {...(mode === "Connected"
        ? { variant: "secondaryOutline" }
        : {
            variant: "primaryBlack",
            as: "a",
            href: href,
          })}
    >
      {icon} {action} {provider.charAt(0) + provider.slice(1).toLowerCase()}{" "}
      Account
    </Button>
  )
}

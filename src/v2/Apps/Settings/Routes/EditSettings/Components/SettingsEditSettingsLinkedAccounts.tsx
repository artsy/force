import { FC, useState, useEffect } from "react"
import {
  Box,
  Button,
  FacebookIcon,
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

enum Mode {
  Disconnected,
  Connecting,
  Connected,
  Disconnecting,
}

interface SettingsEditSettingsLinkedAccountsButtonProps {
  icon: JSX.Element
  me: SettingsEditSettingsLinkedAccounts_me
  href?: string
  provider: AuthenticationProvider
}

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

  const [mode, setMode] = useState(
    isConnected ? Mode.Connected : Mode.Disconnected
  )

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (mode === Mode.Disconnected) {
      setMode(Mode.Connecting)
      return // Pass through
    }

    event.preventDefault()
    setMode(Mode.Disconnecting)

    try {
      await submitMutation({ input: { provider } })

      sendToast({
        variant: "success",
        message: "Account disconnected.",
      })

      setMode(Mode.Disconnected)
    } catch (err) {
      console.error(err)

      sendToast({
        variant: "error",
        message: "There was an error disconnecting your account.",
        description: err.message,
      })

      setMode(Mode.Connected)
    }
  }

  const action = {
    [Mode.Connecting]: "Connect",
    [Mode.Connected]: "Disconnect",
    [Mode.Disconnected]: "Connect",
    [Mode.Disconnecting]: "Connect",
  }[mode]

  return (
    <Button
      onClick={handleClick}
      loading={mode === Mode.Connecting || mode === Mode.Disconnecting}
      {...(mode === Mode.Connected
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

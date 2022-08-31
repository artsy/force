import {
  AppleIcon,
  Button,
  FacebookIcon,
  GoogleIcon,
  IconProps,
  Join,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { FC, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { getENV } from "Utils/getENV"
import { useMode } from "Utils/Hooks/useMode"
import {
  AuthenticationProvider,
  SettingsEditSettingsLinkedAccounts_me,
} from "__generated__/SettingsEditSettingsLinkedAccounts_me.graphql"
import { useUnlinkSettingsLinkedAccount } from "./useUnlinkSettingsLinkedAccount"

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
      <Text variant={["md", "lg"]} mb={4}>
        Linked Accounts
      </Text>

      <Join separator={<Spacer mt={2} />}>
        <SettingsEditSettingsLinkedAccountsButton
          me={me}
          provider="FACEBOOK"
          href={authenticationPaths?.facebookPath}
          Icon={FacebookIcon}
        />

        <SettingsEditSettingsLinkedAccountsButton
          me={me}
          provider="APPLE"
          href={authenticationPaths?.applePath}
          Icon={AppleIcon}
        />

        <SettingsEditSettingsLinkedAccountsButton
          me={me}
          provider="GOOGLE"
          href={authenticationPaths?.googlePath}
          Icon={GoogleIcon}
        />
      </Join>
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
  Icon: React.FunctionComponent<IconProps>
  me: SettingsEditSettingsLinkedAccounts_me
  href?: string
  provider: AuthenticationProvider
}

type Mode = "Disconnected" | "Connecting" | "Connected" | "Disconnecting"

const SettingsEditSettingsLinkedAccountsButton: FC<SettingsEditSettingsLinkedAccountsButtonProps> = ({
  Icon,
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
        ? { variant: "secondaryBlack" }
        : {
            variant: "primaryBlack",
            as: "a",
            href: href,
          })}
      Icon={Icon}
    >
      {action} {provider.charAt(0) + provider.slice(1).toLowerCase()} Account
    </Button>
  )
}

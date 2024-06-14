import { Button, Join, Spacer, Text, useToasts } from "@artsy/palette"
import { FC, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { useMode } from "Utils/Hooks/useMode"
import {
  AuthenticationProvider,
  SettingsEditSettingsLinkedAccounts_me$data,
} from "__generated__/SettingsEditSettingsLinkedAccounts_me.graphql"
import { useUnlinkSettingsLinkedAccount } from "./useUnlinkSettingsLinkedAccount"
import FacebookIcon from "@artsy/icons/FacebookIcon"
import AppleIcon from "@artsy/icons/AppleIcon"
import GoogleIcon from "@artsy/icons/GoogleIcon"

interface SettingsEditSettingsLinkedAccountsProps {
  me: SettingsEditSettingsLinkedAccounts_me$data
}

const providerNames = ["Apple", "Facebook", "Google"]

export const SettingsEditSettingsLinkedAccounts: FC<SettingsEditSettingsLinkedAccountsProps> = ({
  me,
}) => {
  const { match } = useRouter()
  const { sendToast } = useToasts()

  const authenticationPaths = getENV("AP")
  const query = match?.location?.query ?? {}

  useEffect(() => {
    if (query.error === "already-linked") {
      const providerName = query.provider

      if (providerNames.includes(providerName)) {
        const message =
          `${providerName} account already linked to another Artsy account. ` +
          `Try logging out and back in with ${providerName}. Then consider ` +
          `deleting that user account and re-linking ${providerName}. `

        sendToast({
          variant: "error",
          message,
          ttl: Infinity,
        })
      }
    }
  }, [query.error, query.provider, sendToast])

  return (
    <>
      <Text variant={["md", "lg"]} mb={4}>
        Linked Accounts
      </Text>

      <Join separator={<Spacer y={2} />}>
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
  Icon: React.FunctionComponent<any>
  me: SettingsEditSettingsLinkedAccounts_me$data
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

      const error = Array.isArray(err) ? err[0] : err

      sendToast({
        variant: "error",
        message: "There was an error disconnecting your account.",
        description: error.message,
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

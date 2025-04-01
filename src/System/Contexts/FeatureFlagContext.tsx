import {
  FlagProvider,
  IConfig,
  IFlagProvider,
} from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"

export const FeatureFlagProvider: React.FC<
  React.PropsWithChildren<IFlagProvider>
> = ({ children }) => {
  const { user } = useSystemContext()

  let unleashConfig: IConfig

  if (process.env.NODE_ENV === "test") {
    unleashConfig = {
      url: "http://mock-unleash-url",
      clientKey: "mock-client-key", // pragma: allowlist secret
      refreshInterval: 0,
      appName: "mock-app-name",
      context: {
        userId: "mock-user-id",
        sessionId: "mock-session-id",
      },
    }
  } else {
    unleashConfig = {
      url: `${getENV("UNLEASH_API_URL")}/frontend`,
      clientKey: getENV("UNLEASH_CLIENT_KEY"),
      refreshInterval: 30, // How often (in seconds) the client should poll the proxy for updates
      appName: getENV("UNLEASH_APP_NAME"),
      environment: getENV("UNLEASH_ENVIRONMENT"),
      context: {
        userId: user?.id,
        sessionId: getENV("SESSION_ID"),
      },
    }
  }

  return <FlagProvider config={unleashConfig}>{children}</FlagProvider>
}

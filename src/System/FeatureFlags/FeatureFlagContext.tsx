import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import {
  FlagProvider,
  type IConfig,
  type IFlagProvider,
} from "@unleash/proxy-client-react"

export const FeatureFlagProvider: React.FC<
  React.PropsWithChildren<IFlagProvider>
> = ({ children }) => {
  const { user, featureFlags } = useSystemContext()

  const unleashConfig: IConfig = {
    url: `${getENV("UNLEASH_API_URL")}/frontend`,
    clientKey: getENV("UNLEASH_FRONTEND_KEY"),
    refreshInterval: 30, // How often (in seconds) the client should poll for updates
    appName: getENV("UNLEASH_APP_NAME"),
    environment: getENV("UNLEASH_ENVIRONMENT"),
    context: {
      userId: user?.id,
      sessionId: getENV("SESSION_ID"),
    },
    bootstrap: featureFlags?.toggles || [],
  }

  return <FlagProvider config={unleashConfig}>{children}</FlagProvider>
}

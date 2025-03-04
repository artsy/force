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

  const unleashConfig: IConfig = {
    url: `${getENV("UNLEASH_API")}frontend/`,
    clientKey: getENV("UNLEASH_CLIENT_KEY"),
    refreshInterval: 15,
    appName: getENV("UNLEASH_APP_NAME"),
    environment: getENV("NODE_ENV"),
    context: {
      userId: user?.id,
      sessionId: getENV("SESSION_ID"),
    },
  }

  return <FlagProvider config={unleashConfig}>{children}</FlagProvider>
}

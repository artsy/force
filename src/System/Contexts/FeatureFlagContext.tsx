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
    url: `http://localhost:5000/frontend/`,
    clientKey: getENV("UNLEASH_CLIENT_KEY") || "kljl;ksdfg",
    refreshInterval: 15,
    appName: getENV("UNLEASH_APP_NAME") || "test",
    environment: getENV("NODE_ENV") || "test",
    context: {
      userId: user?.id,
      sessionId: getENV("SESSION_ID"),
    },
    disableRefresh: true,
    bootstrap: [],
  }
  debugger
  return <FlagProvider config={unleashConfig}>{children}</FlagProvider>
}

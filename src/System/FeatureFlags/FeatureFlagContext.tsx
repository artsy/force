import {
  FlagProvider,
  type IConfig,
  type IFlagProvider,
} from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"

export const FeatureFlagProvider: React.FC<
  React.PropsWithChildren<IFlagProvider>
> = ({ children }) => {
  const { user } = useSystemContext()

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
  }

  // FlagProvider wraps its updates in startTransition by default. A
  // QueryRenderer whose response lands during that transition render can lose
  // its state update and stay on its loading state for good, so render flag
  // updates normally.
  return (
    <FlagProvider
      config={unleashConfig}
      startTransition={callback => {
        callback()
      }}
    >
      {children}
    </FlagProvider>
  )
}
